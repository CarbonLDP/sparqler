import { PathToken } from "./PathToken";
import { SharedSubPathToken } from "./SharedSubPathToken";


/**
 * Token for grouping a path token inside a parenthesis.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathPrimary}
 */
export type SubPathToken<T extends PathToken> = SharedSubPathToken<T>;
