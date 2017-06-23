import {
	ElementPattern,
	GraphPattern,
	IRIResolver,
	SupportedNativeTypes,
	TriplesNodePattern,
	TriplesSameSubject,
	TriplesSameSubjectMore,
} from "sparqler/patterns";
import {
	SAME_PROPERTY_SEPARATOR,
	SAME_SUBJECT_SEPARATOR,
} from "sparqler/patterns/tokens";
import {
	Literal,
	Resource,
	Variable,
} from "sparqler/patterns/triples";
import { Token } from "sparqler/tokens";
import { serialize } from "sparqler/utils/ObjectPattern";

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


	has( property:string | Variable | Resource, object:SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( property:string | Variable | Resource, objects:(SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ):TriplesSameSubjectMore<T> & T;
	has( property:string | Variable | Resource, objects ):TriplesSameSubjectMore<T> & T {
		this.patternTokens = [];
		return this._addPattern( property, objects );
	}

	getSelfTokens():Token[] {
		return this.elementTokens;
	}

	protected init():void {
		this.interfaces = {
			addPattern: {
				and: ( property, objects ) => {
					this.patternTokens.push( SAME_SUBJECT_SEPARATOR );
					return this._addPattern( property, objects );
				},
			},
		};
	};

	private _addPattern( property:string | Variable | Resource, values:ElementPattern | ElementPattern[] ):TriplesSameSubjectMore<T> & T {
		let tokens:Token[] = ( typeof property === "string" || property instanceof String )
			? this.resolver._resolveIRI( property as string, true )
			: property.getSelfTokens();

		values = Array.isArray( values ) ? values : [ values ];
		values.forEach( ( value, index, array ) => {
			tokens.push( ...serialize( value ) );
			if( index < array.length - 1 ) tokens.push( SAME_PROPERTY_SEPARATOR );
		} );

		this.patternTokens.push( ...tokens );
		return Object.assign( {}, this.interfaces.addPattern, this.interfaces.graphPattern );
	}

}

export default TriplesPattern;
