import { Processor, DocCollection } from "dgeni";
import { SymbolFlags } from "typescript";
import { getExportDocType } from "dgeni-packages/typescript/services/TsParser";
import { Host } from "dgeni-packages/typescript/services/ts-host/host";
import { ConstExportDoc } from "dgeni-packages/typescript/api-doc-types/ConstExportDoc";
import { MethodMemberDoc } from "dgeni-packages/typescript/api-doc-types/MethodMemberDoc";


export function interfaceAndConstExport():InterfaceAndConstExport {
	return new InterfaceAndConstExport();
}

interface ConstantExport extends ConstExportDoc {
	members?: MethodMemberDoc[];
}

export class InterfaceAndConstExport implements Processor {

	$runBefore = [ "parsing-tags" ];
	docs: DocCollection;
	$process( docs:DocCollection ) {
		this.docs = docs;
		docs.forEach( doc => {
            if (doc.docType !== "interface") return;
			this._ensureCorrectDescription(doc);
		});
		
		return this.docs;
	}
	
	
	
	_ensureCorrectDescription(doc: any) {
		// Not only an interface
		if( ! (doc.symbol.flags ^ SymbolFlags.Interface) ) return;

		// Remove interface momentary
		doc.symbol.flags = doc.symbol.flags ^ SymbolFlags.Interface;

		switch( getExportDocType( doc.symbol ) ) {
			case "const":
				let host:Host = new Host();
				let exportDoc:ConstantExport = new ConstExportDoc(host, doc.moduleDoc, doc.symbol)
				doc.constants = [exportDoc];
				exportDoc.members = [];
				try {
					let members = doc.constants[0].declaration.type.members;
					this.docs.push(exportDoc);
					members.forEach(member => {
						let methodDoc:MethodMemberDoc = new MethodMemberDoc(host, doc, member.symbol, member);
						exportDoc.members.push(methodDoc);
						this.docs.push(methodDoc);
					})
				}
				catch {
					let container = doc.constants[0].variableDeclaration.initializer.nextContainer;
					let methodDoc:MethodMemberDoc = new MethodMemberDoc(host, doc, container.symbol, container);
					exportDoc.members.push(methodDoc);
					this.docs.push(exportDoc);
					this.docs.push(methodDoc);
				}
				break;
			default:
				let log:any;
				log.error( `Other declaration merged for ${ doc.name }` );
				break;
		}

		// Return interface flag
		doc.symbol.flags = doc.symbol.flags | SymbolFlags.Interface;
	}

}

