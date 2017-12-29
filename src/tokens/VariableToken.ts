import { TokenNode } from "./TokenNode";

const NAME_REGEX:RegExp = /^((?:[0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))((?:[0-9A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))*$/;

export class VariableToken implements TokenNode {
	readonly token:"variable" = "variable";
	readonly name:string;

	constructor( name:string ) {
		if( ! NAME_REGEX.test( name ) ) throw new Error( "Invalid variable name" );

		this.name = name;
	}

	toString():string {
		return `?${ this.name }`;
	}
}
