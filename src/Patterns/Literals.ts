import { TriplesSubject } from "./TriplesSubject";
import { IRIResolver } from "../Patterns";
import * as PatternObject from "../Utils/PatternObject";

export abstract class Literal extends TriplesSubject {

	_subject:string;

	constructor( resolver:IRIResolver, value:string | number | boolean ) {
		super( resolver );
		this._subject = `"${ value }"`;
	}

}

export class RDFLiteral extends Literal {

	private _type:string;
	private _language:string;

	ofType( type:string ):Literal {
		this._type = type;
		return this;
	};

	withLanguage( language:string ):Literal {
		this._language = language;
		return this;
	};

	toString():string {
		if( this._type )
			return PatternObject.addType( this._subject, this._type );

		if( this._language )
			return `${ this._subject }@${ this._language }`;

		return this._subject;
	}

}

export class NumericLiteral extends Literal {

	constructor( resolver:IRIResolver, value:number ) {
		super( resolver, value );

		let type:string = Number.isInteger( value ) ? "integer" : "float";
		this._subject = PatternObject.addType( this._subject, type );
	}

}

export class BooleanLiteral extends Literal {

	constructor( resolver:IRIResolver, value:boolean ) {
		super( resolver, value );
		this._subject = PatternObject.addType( this._subject, "boolean" );
	}

}

export default Literal;