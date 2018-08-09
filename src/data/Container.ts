import { TokenNode } from "../tokens/TokenNode";

import { IRIResolver } from "./IRIResolver";


/**
 * Interface that describe the necessary data for the creation
 * of a {@link Container}.
 */
export interface ContainerData<TOKEN extends TokenNode> {
	/**
	 * @see Container.iriResolver
	 */
	iriResolver:IRIResolver;
	/**
	 * @see Container.targetToken
	 */
	targetToken:TOKEN;
}


/**
 * Immutable class that contains the hidden data of the query statement.
 *
 * Every statement of the builder uses a different instance of the container
 * to make the query builder independent of the step and be able to
 * reuse it in a immutable-like pattern.
 */
export class Container<TOKEN extends TokenNode> implements ContainerData<TOKEN> {
	/**
	 * The IRI resolver used to resolve and create IRIs and
	 * Prefixed Names
	 */
	readonly iriResolver:IRIResolver;
	/**
	 * The target token where the state of the current query step is
	 * actually stored.
	 */
	readonly targetToken:TOKEN;


	/**
	 * Constructor that receives an object with the base data of the
	 * container.
	 *
	 * @param data The base data for the container creation.
	 */
	constructor( data:ContainerData<TOKEN> ) {
		this.iriResolver = data.iriResolver;
		this.targetToken = data.targetToken;

		if( new.target === Container ) Object.freeze( this );
	}

}