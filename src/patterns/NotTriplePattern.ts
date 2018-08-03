import { NotTripleToken } from "../tokens/NotTripleToken";

import { GraphPattern } from "./GraphPattern";


/**
 * @todo
 */
export interface NotTriplePattern extends GraphPattern<NotTripleToken> {
	getPattern():NotTripleToken;
}
