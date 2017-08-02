import {
	DocCollection,
	Processor,
} from "dgeni";

export function extendsTypescriptProcessor():ExtendsTypescript {
	return new ExtendsTypescript();
}

export class ExtendsTypescript implements Processor {

	constructor() {}

	$runAfter = [ "docs-processed" ];
	$runBefore = [ "rendering-docs" ];

	$process( docs:DocCollection ) {

		docs.forEach( doc => {
			if(
				doc.name === "SPARQLER"
			// || doc.name === "LimitOffsetContainer"
			) {
				// console.log( doc );
			}

			// Fix incomplete type params
			if( doc.typeParams ) {
				doc.typeParams = `<${ doc.declaration.typeParameters.map( type => type.getText() ).join( ", " ) }>`;
			}
		} );

	}

}

