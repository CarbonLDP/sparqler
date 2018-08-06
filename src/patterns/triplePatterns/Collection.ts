import { CollectionToken } from "../../tokens/CollectionToken";
import { TripleToken } from "../../tokens/TripleToken";

import { Pattern } from "../Pattern";
import { TriplePatternHas } from "./TriplePatternHas";


/**
 * @todo
 */
export interface Collection extends TriplePatternHas<CollectionToken>, Pattern<TripleToken<CollectionToken>> {
}
