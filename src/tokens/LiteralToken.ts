import { isPrefixed } from "sparqler/iri";

import { BooleanToken } from "./BooleanToken";
import { IRIToken } from "./IRIToken";
import { LanguageToken } from "./LanguageToken";
import { NumberToken } from "./NumberToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { StringToken } from "./StringToken";
import { TokenNode } from "./TokenNode";

export class LiteralToken implements TokenNode {
	readonly token:"literal" = "literal";
	value?:NumberToken | BooleanToken | StringToken;
	type?:IRIToken | PrefixedNameToken;
	language?:LanguageToken;

	constructor( value?:boolean | number | string ) {
		if( value === void 0 ) return;
		this.setValue( value );
	}

	setValue( value:boolean | number | string ):void {
		if( this.value && this.value.value === value ) return;

		this.value = typeof  value === "boolean" ? new BooleanToken( value ) :
			typeof value === "number" ? new NumberToken( value ) :
				new StringToken( value );
	}

	setType( type:string ):void {
		if( ! this.value ) throw new Error( "Must set a value before a type." );
		if( this.value.token !== "string" ) this.value = new StringToken( `${ this.value }` );

		this.type = isPrefixed( type ) ? new PrefixedNameToken( type ) : new IRIToken( type );
	}

	setLanguage( language:string ):void {
		if( ! this.value || this.value.token !== "string" ) throw new Error( "Non-string value can't have a language." );
		this.type = void 0;
		this.language = new LanguageToken( language );
	}

	toString():string {
		if( this.language ) return `${ this.value }${ this.language }`;
		if( this.type ) return `${ this.value }^^${ this.type }`;
		return `${ this.value }`;
	}
}
