import { PathAlternativeToken } from "./PathAlternativeToken";
import { PathInNegatedToken } from "./PathInNegatedToken";
import { SharedSubPathToken } from "./SharedSubPathToken";


/**
 * Token of the group accepted by {@link PathNegatedToken}.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathNegatedPropertySet
 */
export type SubPathInNegatedToken = SharedSubPathToken<undefined | PathInNegatedToken | PathAlternativeToken<PathInNegatedToken>>;
