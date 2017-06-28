import { finishDecorator as originalFinishDecorator } from "sparqler/clauses/decorators/finish";
import { FinishClause } from "sparqler/clauses/interfaces";
import {
	GraphPattern,
	IRIResolver,
} from "sparqler/patterns/interfaces";
import { PREFIX_SYMBOL } from "sparqler/patterns/tokens";
import { StringLiteral } from "sparqler/tokens/StringLiteral";
import { Token } from "sparqler/tokens/Token";
import {
	getPrefixedParts,
	isPrefixed,
	resolve,
} from "sparqler/utils/IRI";


// Base decorator

export interface ObjectClause {
	[ method:string ]:Function;
}

export function genericDecorator<U extends ObjectClause, W extends object>( properties:U, base:Container<any>, object:W ):W & U {
	for( const key of Object.keys( properties ) ) properties[ key ] = properties[ key ].bind( base );
	return Object.assign<W, U>( object, properties );
}


// IRIResolver implementation

export type PrefixMap = Map<string, boolean>;

export class Resolver implements IRIResolver {

	/**
	 * Map to store prefixes and information of its usage
	 */
	readonly _prefixes:PrefixMap;

	/**
	 * IRI to resolve relative RDF properties
	 */
	readonly _vocab:string;

	constructor( base?:Resolver, vocab?:string ) {
		this._prefixes = base
			? new Map( base._prefixes.entries() )
			: new Map();

		this._vocab = vocab ? vocab : base ? base._vocab : void 0;

		Object.freeze( this );
	}

	_resolveIRI( relativeIRI:string, vocab:boolean = false ):Token[] {
		let tokens:Token[];

		if( isPrefixed( relativeIRI ) ) {
			const [ prefix, prefixIRI ]:[ string, string ] = getPrefixedParts( relativeIRI );

			const used:boolean = this._prefixes.get( prefix );
			if( used === void 0 ) throw new Error( "IllegalArgumentError: The used prefix has not been declared" );

			tokens = [ new StringLiteral( prefix ), PREFIX_SYMBOL, new StringLiteral( prefixIRI ) ];
			if( ! used ) this._prefixes.set( prefix, true );
		} else {
			tokens = resolve( relativeIRI, vocab ? this._vocab : void 0 );
		}

		return tokens;
	}
}

// Base container
export interface FinishDecorator<T extends FinishClause | GraphPattern> extends Function {
	<W extends object>( container:Container<T>, object:W ):T & W;
}

export class Container<T extends FinishClause | GraphPattern = FinishClause> {

	/**
	 * Array containing the query tokens
	 */
	readonly _tokens:Token[];

	/**
	 * Decorator that extends the finish clause
	 */
	readonly _finishDecorator:FinishDecorator<T>;

	/**
	 * Implementation of the IRI Resolver interface
	 */
	readonly _iriResolver:Resolver;

	constructor();
	constructor( finishDecorator:FinishDecorator<T> );
	constructor( previousContainer:Container<any>, newTokens:Token[] );
	constructor( previousContainer:Container<any>, newTokens:Token[], iriResolver:Resolver );
	constructor( previousContainerOrFinishDecorator?:Container<any> | FinishDecorator<T>, newTokens?:Token[], iriResolver?:Resolver ) {
		const container:Container<any> = previousContainerOrFinishDecorator instanceof Function
			? void 0
			: previousContainerOrFinishDecorator;

		const finishDecorator:FinishDecorator<T> = previousContainerOrFinishDecorator instanceof Function
			? previousContainerOrFinishDecorator
			: originalFinishDecorator as FinishDecorator<T>;

		this._iriResolver = iriResolver
			? iriResolver : container
				? new Resolver( container._iriResolver )
				: new Resolver();

		this._tokens = newTokens
			? container._tokens.concat( newTokens )
			: [];

		this._finishDecorator = container
			? container._finishDecorator
			: finishDecorator;

		if( new.target === Container ) Object.freeze( this );
	}
}

export default Container;
