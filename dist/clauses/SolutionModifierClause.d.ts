import { Container } from "../data/Container";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SolutionModifierToken } from "../tokens/SolutionModifierToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
export declare function cloneSolutionModifierContainer<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>>(container: C, token: SolutionModifierToken): C;
