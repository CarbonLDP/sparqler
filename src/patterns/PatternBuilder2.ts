import { IRIResolver2 } from "sparqler/iri/IRIResolver2";
import { ClauseFactory } from "../clauses/ClauseFactory";
import { Container2 } from "../clauses/Container2";

import { TokenNode } from "../tokens/TokenNode";

import { TriplePatternBuilder } from "./TriplePatternBuilder";


/**
 * @todo
 */
export interface PatternBuilder2 extends TriplePatternBuilder {
}


/**
 * @todo
 */
export const PatternBuilder2 = {
	create( iriResolver:IRIResolver2 ):TriplePatternBuilder {
		const container:Container2<TokenNode> = new Container2( {
			iriResolver,
			targetToken: { token: "none" },
		} );

		return PatternBuilder2
			.createFrom( container, {} );
	},

	createFrom<C extends Container2<TokenNode>, O extends object>( container:C, object:O ):O & TriplePatternBuilder {
		return ClauseFactory.createFrom(
			TriplePatternBuilder.createFrom
		)( container, object );
	},
};