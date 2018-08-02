import { NotTripleToken } from "../tokens/NotTripleToken";

import { Pattern } from "./Pattern";


/**
 * @todo
 */
export interface NotTriplePattern extends Pattern<NotTripleToken> {
	getPattern():NotTripleToken;
}
