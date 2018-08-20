import { GroupToken } from "./GroupToken";
import { HavingToken } from "./HavingToken";
import { LimitToken } from "./LimitToken";
import { OffsetToken } from "./OffsetToken";
import { OrderToken } from "./OrderToken";


/**
 * Alias for grouping the modifiers a query can have.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rSolutionModifier}
 */
export type SolutionModifierToken = GroupToken | HavingToken | OrderToken | LimitToken | OffsetToken;