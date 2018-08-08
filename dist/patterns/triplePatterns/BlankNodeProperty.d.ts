import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { TripleToken } from "../../tokens/TripleToken";
import { Pattern } from "../Pattern";
import { TriplePatternHas } from "./TriplePatternHas";
export interface BlankNodeProperty extends TriplePatternHas<BlankNodePropertyToken>, Pattern<TripleToken<BlankNodePropertyToken>> {
}
