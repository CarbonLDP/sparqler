import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { IRIResolver2 } from "../data/IRIResolver2";

import { TokenNode } from "../tokens/TokenNode";

import { SubSelectPattern } from "./clausePatterns/SubSelectPattern";
import { NotTriplePatternBuilder } from "./notTriplePatterns/NotTriplePatternBuilder";
import { TriplePatternBuilder } from "./triplePatterns/TriplePatternBuilder";


/**
 * @todo
 */
export interface PatternBuilder2 extends TriplePatternBuilder, NotTriplePatternBuilder, SubSelectPattern {
}


/**
 * @todo
 */
export const PatternBuilder2 = {
	create( iriResolver:IRIResolver2 ):PatternBuilder2 {
		const container:Container<TokenNode> = new Container( {
			iriResolver,
			targetToken: { token: "none" },
		} );

		return PatternBuilder2
			.createFrom( container, {} );
	},

	createFrom<C extends Container<TokenNode>, O extends object>( container:C, object:O ):O & PatternBuilder2 {
		return Factory.createFrom(
			TriplePatternBuilder.createFrom,
			NotTriplePatternBuilder.createFrom,
			SubSelectPattern.createFrom
		)( container, object );
	},
};