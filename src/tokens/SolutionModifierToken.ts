import { GroupToken } from "./GroupToken";
import { HavingToken } from "./HavingToken";
import { LimitToken } from "./LimitToken";
import { OffsetToken } from "./OffsetToken";
import { OrderToken } from "./OrderToken";


export type SolutionModifierToken = GroupToken | HavingToken | OrderToken | LimitToken | OffsetToken;