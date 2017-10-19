import { Document } from "dgeni";
import { TagDef } from "./TagDef";

export function generics():TagDef {
	return {
		name: "generics",
		defaultFn( doc:Document ):{ text:string } {
			if( doc.docType === "module" ) return;
			if( ! doc.declaration.typeParameters ) return;

			return {
				text: `<${ doc.declaration.typeParameters.map( type => type.getText() ).join( ", " ) }>`,
			};
		},
	};
}
