import { PathAlternativeToken } from "./PathAlternativeToken";
import { PathInNegatedToken } from "./PathInNegatedToken";
import { SubPathToken } from "./SubPathToken";


/**
 * Token of the group accepted by {@link PathNegatedToken}.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathNegatedPropertySet}
 */
export type SubPathInNegatedToken = SubPathToken<undefined | PathInNegatedToken | PathAlternativeToken<PathInNegatedToken>>;
