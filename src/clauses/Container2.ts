import { ClauseFactory } from "sparqler/clauses/ClauseFactory";
import { FinishClause } from "sparqler/clauses/FinishClause";
import { SubFinishClause } from "sparqler/clauses/interfaces";
import { IRIResolver2 } from "sparqler/iri/IRIResolver2";
import { TokenNode } from "sparqler/tokens";


export interface ContainerData<TOKEN extends TokenNode> {
	iriResolver:IRIResolver2;

	targetToken:TOKEN;
}

export class Container2<TOKEN extends TokenNode> implements ContainerData<TOKEN> {
	readonly iriResolver:IRIResolver2;

	readonly targetToken:TOKEN;

	constructor( { iriResolver, targetToken }:ContainerData<TOKEN> ) {
		this.iriResolver = iriResolver;

		this.targetToken = targetToken;
	}

}
