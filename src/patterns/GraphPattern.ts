import { Container2 } from "../clauses/Container2";

import { PatternToken } from "../tokens/PatternToken";


/**
 * @todo
 */
export interface GraphPattern<T extends PatternToken = PatternToken> {
	getPattern():T;
}


/**
 * @todo
 */
export const GraphPattern = {
	createFrom<T extends PatternToken, C extends Container2<T>, O extends object>( container:C, object:O ):O & GraphPattern<T> {
		return Object.assign( object, {
			getPattern: () => container.targetToken,
		} );
	},
};
