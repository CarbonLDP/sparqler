import {
	DocCollection,
	Document,
	Processor,
} from "dgeni";
import { MethodMemberDoc } from "dgeni-packages/typescript/api-doc-types/MethodMemberDoc";

export function extendsTypescriptProcessor():FixTypescript {
	return new FixTypescript();
}

export class FixTypescript implements Processor {

	constructor() {}

	$runAfter = [ "files-read" ];
	$runBefore = [ "parsing-tags" ];

	$process( docs:DocCollection ) {
		docs.forEach( doc => {
			// Fix missing constructor overloads
			this.fixConstructors( docs, doc );
		} );
	}

	fixConstructors( allDocs:DocCollection, currentDoc:Document ):void {
		if( currentDoc.docType !== "class" ) return;
		if( ! currentDoc.symbol.members ) return;

		const constructorSymbol = currentDoc.symbol.members.get( "__constructor" );
		if( ! constructorSymbol ) return;

		const constructorDoc:Document = currentDoc.constructorDoc;
		if( constructorDoc.overloads.length ) return;

		const overloads:Document[] = constructorDoc.overloads;

		const missingDocs:Document[] = constructorSymbol
			.getDeclarations()
			.filter( declaration => declaration !== constructorDoc.declaration )
			.map( declaration => {
				return new MethodMemberDoc( currentDoc, constructorSymbol, declaration, currentDoc.basePath, currentDoc.namespacesToInclude, false, overloads );
			} );

		allDocs.push( ...missingDocs );

		if( ! constructorDoc.declaration.body )
			overloads.push( constructorDoc );

		overloads.push( ...missingDocs.filter( doc => {
			if( ! doc.declaration.body ) return true;

			currentDoc.constructorDoc = doc;
			return false;
		} ) );
	}

}

