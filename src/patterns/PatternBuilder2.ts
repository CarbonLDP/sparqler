import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { IRIResolver } from "../data/IRIResolver";

import { TokenNode } from "../tokens/TokenNode";

import { SubSelectPattern } from "./clausePatterns/SubSelectPattern";
import { NotTriplePatternsBuilder } from "./notTriplePatterns/NotTriplePatternsBuilder";
import { TriplePatternsBuilder } from "./triplePatterns/TriplePatternsBuilder";


/**
 * @todo
 */
export interface PatternBuilder2 extends TriplePatternsBuilder, NotTriplePatternsBuilder, SubSelectPattern {
}


/**
 * @todo
 */
export const PatternBuilder2 = {
	create( iriResolver:IRIResolver ):PatternBuilder2 {
		const container:Container<undefined> = new Container( {
			iriResolver,
			targetToken: void 0,
		} );

		return PatternBuilder2
			.createFrom( container, {} );
	},

	createFrom<C extends Container<any>, O extends object>( container:C, object:O ):O & PatternBuilder2 {
		return Factory.createFrom(
			TriplePatternsBuilder.createFrom,
			NotTriplePatternsBuilder.createFrom,
			SubSelectPattern.createFrom
		)( container, object );
	},
};