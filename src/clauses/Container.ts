import { IRIResolver } from "../iri/IRIResolver";
import { Token } from "../tokens/Token";
import { finishDecorator as originalFinishDecorator } from "./decorators/finish";
import { subFinishDecorator } from "./decorators/subFinish";
import {
	FinishClause,
	SubFinishClause,
} from "./interfaces";


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
	 * Creates an empty container with a custom finish decorator if set.
	 * If none is provided {@link clauses/decorators/finishDecorator}
	 * will be used.
	 *
	 * @param finishDecorator The finish decorator to be used in the container.
	 */
	constructor( finishDecorator?:FinishDecorator<T> );
	/**
	 * Creates a container copping the data of the previous container provided.
	 *
	 * If `newTokens` parameter is provided its data will be appended to the tokens
	 * of the previous container tokens.
	 *
	 * If the `iriResolver` is provided, it will be used in the new container instead
	 * of the IRIResolver of the previous container.
	 *
	 * If the previousContainer has {@link subFinishDecorator} as finish decorator,
	 * the `_iriResolver` property will be un set.
	 *
	 * @param previousContainer Container to copied its properties.
	 * @param newTokens Tokens to append to the to the `previousContainer` tokens copied.
	 * @param iriResolver IRIResolver to be used for the new container.
	 */
	constructor( previousContainer:Container<any>, newTokens?:Token[], iriResolver?:IRIResolver );
	constructor( containerOrFunction?:Container<any> | FinishDecorator<T>, newTokens?:Token[], iriResolver?:IRIResolver ) {
		const container:Container<any> = containerOrFunction instanceof Function ?
			void 0 : containerOrFunction;

		const finishDecorator:FinishDecorator<T> = containerOrFunction instanceof Function
			? containerOrFunction : originalFinishDecorator as FinishDecorator<T>;

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
