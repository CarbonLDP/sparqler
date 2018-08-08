import { TokenNode } from "../tokens/TokenNode";

import { IRIResolver2 } from "./IRIResolver2";


/**
 * Interface that describe the necessary data for the creation
 * of a {@link Container}.
 */
export interface ContainerData<TOKEN extends TokenNode> {
	/**
	 * @see Container.iriResolver
	 */
	iriResolver:IRIResolver2;
	/**
	 * @see Container.targetToken
	 */
	targetToken:TOKEN;
}


/**
 * Immutable class that contains the hidden data of the query builder.
 *
 * Every step of the builder uses a different instance of the container
 * to make the query builder independent of the step and be able to
 * reuse a stored sept in a immutable-like pattern.
 */
export class Container<TOKEN extends TokenNode> implements ContainerData<TOKEN> {
	/**
	 * The IRI resolver used to resolve and create IRIs and
	 * Prefixed Names
	 */
	readonly iriResolver:IRIResolver2;
	/**
	 * The target token where the state of the current query step is
	 * actually stored.
	 */
	readonly targetToken:TOKEN;


	/**
	 * Object with the base data of the Container.
	 *
	 * @param iriResolver The IRI resolver for the new Container instance
	 * @param targetToken The target token for the new Container instance
	 */
	constructor( { iriResolver, targetToken }:ContainerData<TOKEN> ) {
		this.iriResolver = iriResolver;
		this.targetToken = targetToken;

		if( new.target === Container ) Object.freeze( this );
	}

}
