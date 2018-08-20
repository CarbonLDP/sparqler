import { ConstructToken } from "./ConstructToken";
import { SelectToken } from "./SelectToken";


/**
 * Alias for the types of query clauses supported.
 */
export type QueryClauseToken = SelectToken | ConstructToken;
