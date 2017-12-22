import { IRIResolver } from "../../iri/IRIResolver";
import {
	StringLiteral,
	Token,
} from "../../tokens";
import { addType } from "../../utils/ObjectPattern";
import {
	CLOSE_QUOTE,
	LANG_SYMBOL,
	OPEN_QUOTE,
} from "../tokens";
import { TriplesSubject } from "./TriplesSubject";

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
		this.elementTokens = addType( this.value, type );
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
		this.elementTokens = addType( this.value, type );
	}

}

export class BooleanLiteral extends Literal {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, value:boolean ) {
		super( resolver, value );
		this.elementTokens = addType( this.value, "boolean" );
	}

}
