import {
	TriplesSameSubject,
	TriplesSameSubjectMore,
	supportedNativeTypes,
	TriplesNodePattern,
	IRIResolver,
	GraphPattern,
	ElementPattern
} from "../Patterns";
import { Literal } from "./Literals";
import { Resource } from "./Resource";
import * as PatternObject from "../Utils/PatternObject";
import { Variable } from "./Variable";
import { Token } from "../Tokens/Token";
import {
	END_SAME_SUBJECT,
	END_SAME_PROPERTY
} from "../Tokens";

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

	has( propertyIRI:string, value:supportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, resource:Resource ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, variable:Variable ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, literal:Literal ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, value:supportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, resource:Resource ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, variable:Variable ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, literal:Literal ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;
	has( propertyIRIOrVariable:string | Variable, valueOrValues ):TriplesSameSubjectMore<T> & T {
		let property:Token[] = ( typeof propertyIRIOrVariable === "string" || propertyIRIOrVariable instanceof String )
			? this.resolver._resolveIRI( propertyIRIOrVariable as string, true )
			: propertyIRIOrVariable.getSelfTokens();

		valueOrValues = Array.isArray( valueOrValues ) ? valueOrValues : [ valueOrValues ];

		if( this.patternTokens.length > 0 )
			property.unshift( END_SAME_SUBJECT );
		this.patternTokens.push( ...property );

		valueOrValues.forEach( ( value, index ) => {
			this.patternTokens.push( ...PatternObject.serialize( value ) );
			if( index < valueOrValues.length - 1 ) this.patternTokens.push( END_SAME_PROPERTY );
		} );


		return Object.assign( {}, this.interfaces.addPattern, this.interfaces.graphPattern );
	}

	getSelfTokens():Token[] {
		return this.elementTokens;
	}

	private init():void {
		this.interfaces = {
			addPattern: {
				and: this.has.bind( this ),
			},
		};
	};
}

export default TriplesPattern;
