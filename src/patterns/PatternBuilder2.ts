import { ClauseFactory } from "../clauses/ClauseFactory";
import { Container2 } from "../clauses/Container2";

import { IRIResolver2 } from "../iri/IRIResolver2";

import { TokenNode } from "../tokens/TokenNode";

import { NotTriplePatternBuilder } from "./NotTriplePatternBuilder";
import { TriplePatternBuilder } from "./TriplePatternBuilder";


/**
 * @todo
 */
export interface PatternBuilder2 extends TriplePatternBuilder, NotTriplePatternBuilder {
}


/**
 * @todo
 */
export const PatternBuilder2 = {
	create( iriResolver:IRIResolver2 ):PatternBuilder2 {
		const container:Container2<TokenNode> = new Container2( {
			iriResolver,
			targetToken: { token: "none" },
		} );

		return PatternBuilder2
			.createFrom( container, {} );
	},

	createFrom<C extends Container2<TokenNode>, O extends object>( container:C, object:O ):O & PatternBuilder2 {
		return ClauseFactory.createFrom(
			TriplePatternBuilder.createFrom,
			NotTriplePatternBuilder.createFrom
		)( container, object );
	},
};