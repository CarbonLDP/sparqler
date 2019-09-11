import { PathInSequenceToken } from "./PathInSequenceToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for the sequence paths statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathSequence
 */
export class PathSequenceToken implements TokenNode {
	readonly token:"pathSequence" = "pathSequence";
	readonly paths:PathInSequenceToken[];

	constructor() {
		this.paths = [];
	}


	addPath( path:PathInSequenceToken ):this {
		this.paths.push( path );

		return this;
	}


	toString():string {
		return this.paths
			.join( "/" );
	}
}
