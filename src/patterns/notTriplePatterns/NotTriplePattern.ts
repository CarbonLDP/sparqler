import { Container2 } from "../../data/Container2";

import { NotTripleToken } from "../../tokens/NotTripleToken";

import { Pattern } from "../Pattern";


/**
 * @todo
 */
export interface NotTriplePattern<T extends NotTripleToken = NotTripleToken> extends Pattern<T> {
	getPattern():T;
}


/**
 * @todo
 */
export const NotTriplePattern:{
	createFrom<T extends NotTripleToken, C extends Container2<T>, O extends object>( container:C, object:O ):O & NotTriplePattern<T>;
} = {
	createFrom: Pattern.createFrom,
};
