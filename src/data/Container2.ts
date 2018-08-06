import { TokenNode } from "../tokens/TokenNode";

import { IRIResolver2 } from "./IRIResolver2";


/**
 * @todo
 */
export interface ContainerData<TOKEN extends TokenNode> {
	iriResolver:IRIResolver2;

	targetToken:TOKEN;
}


/**
 * @todo
 */
export class Container2<TOKEN extends TokenNode> implements ContainerData<TOKEN> {
	readonly iriResolver:IRIResolver2;

	readonly targetToken:TOKEN;

	constructor( { iriResolver, targetToken }:ContainerData<TOKEN> ) {
		this.iriResolver = iriResolver;

		this.targetToken = targetToken;
	}

}
