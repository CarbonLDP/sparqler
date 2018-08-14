import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { TripleToken } from "../../tokens/TripleToken";

import { Pattern } from "../Pattern";
import { TriplePatternHas } from "./TriplePatternHas";


/**
 * Wrapper for easier usage of SPARQL BlankNode Property List as
 * objects and for declaring triple patterns as its subject.
 */
export interface BlankNodeProperty extends TriplePatternHas<BlankNodePropertyToken>, Pattern<TripleToken<BlankNodePropertyToken>> {}
