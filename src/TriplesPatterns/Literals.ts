import { TriplesSubject } from "./TriplesSubject";
import { IRIResolver } from "../Patterns";
import * as ObjectPattern from "../Utils/ObjectPattern";
import { Token } from "../Tokens/Token";
import { StringLiteral } from "../Tokens/StringLiteral";
import {
	OPEN_QUOTE,
	CLOSE_QUOTE,
	LANG_SYMBOL
} from "../Patterns/Tokens";

export abstract class Literal extends TriplesSubject {

	protected value:string;

	constructor( resolver:IRIResolver, value:string | number | boolean ) {
		super( resolver );
		this.value = value + "";
	}

}

export class RDFLiteral extends Literal {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, value:string ) {
		super( resolver, value );
		this.elementTokens = [ OPEN_QUOTE, new StringLiteral( value ), CLOSE_QUOTE ];
	}

	ofType( type:string ):Literal {
		this.elementTokens = ObjectPattern.addType( this.value, type );
		return this;
	};

	withLanguage( language:string ):Literal {
		this.elementTokens = [ OPEN_QUOTE, new StringLiteral( this.value ), CLOSE_QUOTE, LANG_SYMBOL, new StringLiteral( language ) ];
		return this;
	};

}

export class NumericLiteral extends Literal {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, value:number ) {
		super( resolver, value );

		let type:string = Number.isInteger( value ) ? "integer" : "float";
		this.elementTokens = ObjectPattern.addType( this.value, type );
	}

}

export class BooleanLiteral extends Literal {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, value:boolean ) {
		super( resolver, value );
		this.elementTokens = ObjectPattern.addType( this.value, "boolean" );
	}

}

export default Literal;