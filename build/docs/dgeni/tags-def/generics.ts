import { TagDef } from "./TagDef";
import { Document } from "dgeni";

export function generics():TagDef {
	return {
		name: "generics",
		defaultFn( doc:Document ):string {
			if( doc.docType === "module" ) return;
			if( ! doc.declaration.typeParameters ) return;

			return `<${ doc.declaration.typeParameters.map( type => type.getText() ).join( ", " ) }>`;
		},
	};
}
