import { QueryToken } from "../tokens/QueryToken";
import { SolutionModifierToken } from "../tokens/SolutionModifierToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { Container2 } from "./Container2";
export declare function cloneSolutionModifierContainer<C extends Container2<QueryToken | SubSelectToken>>(container: C, token: SolutionModifierToken): C;
