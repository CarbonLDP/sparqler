import { Container } from "../../data/Container";

import { ObjectToken } from "../../tokens/ObjectToken";
import { TripleToken } from "../../tokens/TripleToken";

import { Pattern } from "../Pattern";


/**
 * Object that contains a pattern made from a triple subject.
 */
export interface TriplePattern<T extends ObjectToken = ObjectToken> extends Pattern<TripleToken<T>> {}


export const TriplePattern:{
	createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePattern<T>;
} = {
	createFrom: Pattern.createFrom,
};
