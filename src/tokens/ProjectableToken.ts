import { AssigmentToken } from "./AssigmentToken";
import { VariableToken } from "./VariableToken";


/**
 * Alias for all the projectable tokens for a SELECT
 */
export type ProjectableToken = VariableToken | AssigmentToken;
