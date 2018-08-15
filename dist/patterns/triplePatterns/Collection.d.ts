import { CollectionToken } from "../../tokens/CollectionToken";
import { TripleToken } from "../../tokens/TripleToken";
import { Pattern } from "../Pattern";
import { TripleSubject } from "./TripleSubject";
export interface Collection extends TripleSubject<CollectionToken>, Pattern<TripleToken<CollectionToken>> {
}
