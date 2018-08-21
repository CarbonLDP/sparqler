import { PathEltToken } from "./PathEltToken";
import { PathInverseToken } from "./PathInverseToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for the sequence paths statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathSequence}
 */
export class PathSequenceToken implements TokenNode {
	readonly token:"pathSequence" = "pathSequence";
	readonly paths:(PathEltToken | PathInverseToken)[];

	constructor() {
		this.paths = [];
	}

	toString():string {
		return this.paths
			.join( "/" );
	}
}
