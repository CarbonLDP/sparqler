import { Container } from "../../data/Container";

import { ObjectToken } from "../../tokens/ObjectToken";
import { TripleToken } from "../../tokens/TripleToken";


/**
 * @todo
 */
export interface TriplePattern<T extends ObjectToken> {
	getSubject():T;
}


/**
 * @todo
 */
export const TriplePattern = {
	createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePattern<T> {
		return Object.assign( object, {
			getSubject: () => container.targetToken.subject,
		} );
	}
};
