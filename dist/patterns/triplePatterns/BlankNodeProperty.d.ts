import { BlankNodePropretyToken } from "../../tokens/BlankNodePropretyToken";
import { TripleToken } from "../../tokens/TripleToken";
import { Pattern } from "../Pattern";
import { TriplePatternHas } from "./TriplePatternHas";
export interface BlankNodeProperty extends TriplePatternHas<BlankNodePropretyToken>, Pattern<TripleToken<BlankNodePropretyToken>> {
}
