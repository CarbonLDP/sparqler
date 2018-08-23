import { PathInSequenceToken } from "./PathInSequenceToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for the sequence paths statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathSequence}
 */
export class PathSequenceToken<T extends PathInSequenceToken = PathInSequenceToken> implements TokenNode {
	readonly token:"pathSequence" = "pathSequence";
	readonly paths:T[];

	constructor() {
		this.paths = [];
	}


	addPath( path:T ):this {
		this.paths.push( path );

		return this;
	}


	toString():string {
		return this.paths
			.join( "/" );
	}
}
