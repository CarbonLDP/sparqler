import { Container2 } from "../clauses/Container2";
import { TermToken } from "../tokens/TermToken";
import { TripleToken } from "../tokens/TripleToken";
import { VariableToken } from "../tokens/VariableToken";

import { Pattern } from "./Pattern";


/**
 * @todo
 */
export interface TriplePattern<T extends VariableToken | TermToken> extends Pattern<TripleToken<T>> {
	getSubject():T;
}


/**
 * @todo
 */
export const TriplePattern = {
	createFrom<T extends VariableToken | TermToken, C extends Container2<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePattern<T> {
		return Pattern.createFrom( container, Object.assign( object, {
			getSubject: () => container.targetToken.subject as T,
		} ) );
	}
};
