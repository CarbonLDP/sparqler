import { TripleNodeToken } from "./TripleNodeToken";
import { VariableOrTermToken } from "./VariableOrTermToken";


/**
 * Alias for the tokens that that can be used as an object.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rObject}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rObjectPath}
 */
export type ObjectToken = VariableOrTermToken | TripleNodeToken;
