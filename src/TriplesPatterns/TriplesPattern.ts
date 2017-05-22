import {
	TriplesSameSubject,
	TriplesSameSubjectMore,
	SupportedNativeTypes,
	IRIResolver,
	GraphPattern,
	ElementPattern,
	TriplesNodePattern
} from "../Patterns";
import { Literal } from "./Literals";
import { Resource } from "./Resource";
import * as ObjectPattern from "../Utils/ObjectPattern";
import { Variable } from "./Variable";
import { Token } from "../Tokens/Token";
import {
	SAME_SUBJECT_SEPARATOR,
	SAME_PROPERTY_SEPARATOR
} from "../Patterns/Tokens";

export abstract class TriplesPattern<T extends GraphPattern> implements TriplesSameSubject<T>, ElementPattern {

	protected abstract elementTokens:Token[];
	protected patternTokens:Token[];

	protected interfaces:{
		addPattern:TriplesSameSubjectMore<T>;
		graphPattern?:T
	};

	private resolver:IRIResolver;

	constructor( resolver:IRIResolver ) {
		this.resolver = resolver;
		this.patternTokens = [];
		this.init();
	}

	has( propertyIRI:string, value:SupportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, resource:Resource ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, variable:Variable ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, literal:Literal ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, values:( SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, value:SupportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, resource:Resource ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, variable:Variable ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, literal:Literal ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, values:( SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;
	has( property:string | Variable, values ):TriplesSameSubjectMore<T> & T {
		this.patternTokens = [];
		return this._addPattern( property, values );
	}

	getSelfTokens():Token[] {
		return this.elementTokens;
	}

	protected init():void {
		this.interfaces = {
			addPattern: {
				and: ( property, values ) => {
					this.patternTokens.push( SAME_SUBJECT_SEPARATOR );
					return this._addPattern( property, values );
				},
			},
		};
	};

	private _addPattern( property:string | Variable, values:ElementPattern | ElementPattern[] ):TriplesSameSubjectMore<T> & T;
	private _addPattern( property, values ):TriplesSameSubjectMore<T> & T {
		let tokens:Token[] = ( typeof property === "string" || property instanceof String )
			? this.resolver._resolveIRI( property as string, true )
			: property.getSelfTokens();

		values = Array.isArray( values ) ? values : [ values ];
		values.forEach( ( value, index ) => {
			tokens.push( ...ObjectPattern.serialize( value ) );
			if( index < values.length - 1 ) tokens.push( SAME_PROPERTY_SEPARATOR );
		} );

		this.patternTokens.push( ...tokens );
		return Object.assign( {}, this.interfaces.addPattern, this.interfaces.graphPattern );
	}

}

export default TriplesPattern;
