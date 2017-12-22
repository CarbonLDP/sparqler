import { IRIResolver } from "../../iri/IRIResolver";
import {
	Literal,
	Resource,
	Variable,
} from "../../patterns/triples";
import {
	LeftSymbol,
	Operator,
	RightSymbol,
	StringLiteral,
	Token,
} from "../../tokens";
import { serialize } from "../../utils/ObjectPattern";
import {
	ElementPattern,
	GraphPattern,
	SupportedNativeTypes,
	TriplesNodePattern,
	TriplesSameSubject,
	TriplesSameSubjectMore,
} from "../interfaces";
import {
	SAME_PROPERTY_SEPARATOR,
	SAME_SUBJECT_SEPARATOR,
} from "../tokens";

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

	private _addPattern( property:string | Variable | Resource, objects:ElementPattern | ElementPattern[] ):TriplesSameSubjectMore<T> & T {
		let tokens:Token[] = ( typeof property === "string" )
			? this._resolvePath( property )
			: property.getSelfTokens();

		objects = Array.isArray( objects ) ? objects : [ objects ];
		objects.forEach( ( value, index, array ) => {
			tokens.push( ...serialize( value ) );
			if( index < array.length - 1 ) tokens.push( SAME_PROPERTY_SEPARATOR );
		} );

		this.patternTokens.push( ...tokens );
		return Object.assign( {}, this.interfaces.addPattern, this.interfaces.graphPattern );
	}

	private static PATH_OPERATORS:string[] = [ "|", "/", "^", "?", "*", "+", "!", "(", ")" ];

	private _resolvePath( propertyPath:string ):Token[] {
		const tokens:Token[] = propertyPath
			.split( /(<.*?>)/ ).reduce( ( array:string[], part:string ) => {
				// Is an IRI
				if( part.startsWith( "<" ) ) {
					array.push( part );
				}

				// Everything else
				else {
					array.push( ...part.split( /([|/^?*+!()])/ ) );
				}

				return array;
			}, [] )
			.reduce( ( array:Token[], part:string ) => {
				if( ! part ) return array;

				// Operators
				if( TriplesPattern.PATH_OPERATORS.indexOf( part ) !== - 1 ) {
					array.push( new Operator( part ) );
				}

				// "a" keyword
				else if( part === "a" ) {
					array.push( new StringLiteral( part ) );
				}

				// IRI or prefix
				else {
					if( part.startsWith( "<" ) && part.endsWith( ">" ) ) part = part.slice( 1, - 1 );
					array.push( ...this.resolver.resolve( part, true ) );
				}

				return array;
			}, [] );


		if( tokens[ 0 ] instanceof Operator )
			tokens.unshift( new LeftSymbol( "" ) );
		if( tokens[ tokens.length - 1 ] instanceof Operator )
			tokens.push( new RightSymbol( "" ) );

		return tokens;
	}

}

export default TriplesPattern;
