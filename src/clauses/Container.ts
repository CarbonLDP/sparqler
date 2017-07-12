import { finishDecorator as originalFinishDecorator } from "sparqler/clauses/decorators/finish";
import { FinishClause } from "sparqler/clauses/interfaces";
import { IRIResolver } from "sparqler/iri/IRIResolver";
import { GraphPattern } from "sparqler/patterns/interfaces";
import { Token } from "sparqler/tokens/Token";


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
	readonly _iriResolver:IRIResolver;

	constructor();
	constructor( finishDecorator:FinishDecorator<T> );
	constructor( previousContainer:Container<any>, newTokens:Token[] );
	constructor( previousContainer:Container<any>, newTokens:Token[], iriResolver:IRIResolver );
	constructor( previousContainerOrFinishDecorator?:Container<any> | FinishDecorator<T>, newTokens?:Token[], iriResolver?:IRIResolver ) {
		const container:Container<any> = previousContainerOrFinishDecorator instanceof Function
			? void 0
			: previousContainerOrFinishDecorator;

		const finishDecorator:FinishDecorator<T> = previousContainerOrFinishDecorator instanceof Function
			? previousContainerOrFinishDecorator
			: originalFinishDecorator as FinishDecorator<T>;

		this._iriResolver = iriResolver
			? iriResolver : container
				? new IRIResolver( container._iriResolver )
				: new IRIResolver();

		const previousTokens:Token[] = container ? container._tokens : [];
		this._tokens = newTokens
			? previousTokens.concat( newTokens )
			: previousTokens;

		this._finishDecorator = container
			? container._finishDecorator
			: finishDecorator;

		if( new.target === Container ) Object.freeze( this );
	}
}

export default Container;
