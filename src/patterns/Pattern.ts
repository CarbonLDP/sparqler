import { Container2 } from "../clauses/Container2";

import { PatternToken } from "../tokens/PatternToken";


/**
 * @todo
 */
export interface Pattern<T extends PatternToken = PatternToken> {
	getPattern():T;
}


/**
 * @todo
 */
export const Pattern = {
	createFrom<T extends PatternToken, C extends Container2<T>, O extends object>( container:C, object:O ):O & Pattern<T> {
		return Object.assign( object, {
			getPattern: () => container.targetToken,
		} );
	},
};
