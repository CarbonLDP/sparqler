import { Container } from "../data/Container";

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
	createFrom<T extends PatternToken, C extends Container<T>, O extends object>( container:C, object:O ):O & Pattern<T> {
		return Object.assign( object, {
			getPattern: () => container.targetToken,
		} );
	},
};
