import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { TripleToken } from "../../tokens/TripleToken";
import { Pattern } from "../Pattern";
import { TripleSubject } from "./TripleSubject";
export interface BlankNodeProperty extends TripleSubject<BlankNodePropertyToken>, Pattern<TripleToken<BlankNodePropertyToken>> {
}
