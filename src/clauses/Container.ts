import { subFinishDecorator } from "sparqler/clauses/decorators/subFinish";
import { FinishClause } from "sparqler/clauses/FinishClause";
import { SubFinishClause, } from "sparqler/clauses/interfaces";
import { IRIResolver } from "sparqler/iri/IRIResolver";
import { Token } from "sparqler/tokens/Token";

// TODO: Remove File


/**
 * Interface of possible functions to be be used as finish decorators.
 *
 * Should accept a container with the query data as first parameter and
 * as second the object to decorate.
 */
export interface FinishDecorator<T extends FinishClause | SubFinishClause> extends Function {
	<W extends object>( container:Container<T>, object:W ):T & W;
}

/**
 * Immutable class that contains the hidden data of the query builder.
 *
 * Every step of the builder uses a different instance of the container
 * to make the query builder immutable-like.
 */
export class Container<T extends FinishClause | SubFinishClause = FinishClause> {

	/**
	 * Array containing the query tokens.
	 */
	readonly _tokens:Token[];

	/**
	 * Decorator that extends the finish clause.
	 */
	readonly _finishDecorator:FinishDecorator<T>;

	/**
	 * Optional implementation of the IRI Resolver interface.
	 */
	readonly _iriResolver?:IRIResolver;

	/**
	 * Creates an empty container with the default finish decorator: {@link finishDecorator}.
	 */
	constructor();
	/**
	 * Creates an empty container with a custom finish decorator.
	 *
	 * @param finishDecorator The finish decorated to be used in the container.
	 */
	constructor( finishDecorator?:FinishDecorator<T> );
	/**
	 * Creates a container copping the data of the previous container provided.
	 *
	 * If `newTokens` parameter is provided its data will be appended to the tokens
	 * of the previous container tokens.
	 *
	 * If the `iriResolver` is provided, it will be used in the new container instead
	 * of the IRIResolver of the previous container. But if the value is `null` the
	 * `_iriResolver` property will be undefined.
	 *
	 * @param previousContainer Container to be copied.
	 * @param newTokens Tokens to append to the to the previousContainer tokens copied.
	 * @param iriResolver IRIResolver to be used.
	 */
	constructor( previousContainer:Container<any>, newTokens?:Token[], iriResolver?:IRIResolver );
	constructor( containerOrFunction?:Container<any> | FinishDecorator<T>, newTokens?:Token[], iriResolver?:IRIResolver ) {
		// @ts-ignore
		const container:Container<any> = containerOrFunction instanceof Function ?
			void 0 : containerOrFunction;

		const finishDecorator:FinishDecorator<T> = containerOrFunction instanceof Function
			// @ts-ignore
			? containerOrFunction : originalFinishDecorator as FinishDecorator<T>;

		// @ts-ignore
		this._iriResolver = finishDecorator !== subFinishDecorator ? ! iriResolver ? container ? container._iriResolver ?
			new IRIResolver( container._iriResolver ) : void 0 : new IRIResolver() : iriResolver : void 0;

		const previousTokens:Token[] = container ? container._tokens : [];
		if( ! newTokens ) newTokens = [];
		this._tokens = previousTokens.concat( newTokens );

		this._finishDecorator = container
			? container._finishDecorator
			: finishDecorator;

		if( new.target === Container ) Object.freeze( this );
	}
}

export default Container;
