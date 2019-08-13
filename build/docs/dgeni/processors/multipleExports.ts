import { Processor, DocCollection } from "dgeni";
import { SymbolFlags } from "typescript";
import { getExportDocType } from "dgeni-packages/typescript/services/TsParser";
import { Host } from "dgeni-packages/typescript/services/ts-host/host";
import { ConstExportDoc } from "dgeni-packages/typescript/api-doc-types/ConstExportDoc";
import { MethodMemberDoc } from "dgeni-packages/typescript/api-doc-types/MethodMemberDoc";
import { InterfaceExportDoc } from "dgeni-packages/typescript/api-doc-types/InterfaceExportDoc";


export function multipleExports():MultipleExports {
	return new MultipleExports();
}

interface ConstantExport extends ConstExportDoc {
	members?: MethodMemberDoc[];
}

export class MultipleExports implements Processor {

	$runBefore = [ "parsing-tags" ];
	docs: DocCollection;
	$process( docs:DocCollection ) {
		this.docs = docs;
		docs.forEach( doc => {
			switch( doc.docType ) {
				case "class":
					this._ensureClassAndInterface( doc );
					break;

				case "interface":
					this._ensureInterfaceAndConstant( doc );
					break;
			}
		});
		
		return this.docs;
	}
	
	
	
	_ensureInterfaceAndConstant(doc: any) {
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
	
	_ensureClassAndInterface(doc: any) {
		// If it is just a class return
		if (! (doc.symbol.flags ^ SymbolFlags.Class )) return;
		
		// Remove class flag temporarily
		doc.symbol.flags = doc.symbol.flags ^ SymbolFlags.Class;
		
		switch( getExportDocType( doc.symbol ) ) {
			case "interface":
				let host:Host = new Host();
				let exportDoc:InterfaceExportDoc = new InterfaceExportDoc(host, doc.moduleDoc, doc.symbol);
				doc.interface = exportDoc
				break;
			default:
				let log:any;
				log.error( `Other declaration merged for ${ doc.name }` );
				break;
		}
			
		// Return class flag
		doc.symbol.flags = doc.symbol.flags | SymbolFlags.Class;
	}

}

