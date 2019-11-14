import { Container } from "../../core/containers/Container";
import { cloneElement } from "../../core/containers/utils";

import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { UnionPatternToken } from "../../tokens/UnionPatternToken";

import { Pattern } from "../Pattern";

import { NotTriplePattern } from "./NotTriplePattern";
import { UnionPattern } from "./UnionPattern";


/**
 * Wrapper for easier usage of SPARQL group patterns.
 */
export interface GroupPattern extends NotTriplePattern<GroupPatternToken> {
	union( patterns:Pattern | Pattern[] ):UnionPattern;
}


/**
 * Function that creates a generic {@link GroupPattern.union} function.
 *
 * @param container The container with the query data for the statement.
 *
 * @private
 */
function getUnionFn( container:Container<GroupPatternToken> ):GroupPattern[ "union" ] {
	return patterns => {
		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		const newGroupToken:GroupPatternToken = new GroupPatternToken();
		newGroupToken.patterns.push( ...patterns.map( x => x._getPattern() ) );

		const targetToken:UnionPatternToken = new UnionPatternToken();
		targetToken.groupPatterns.push( container.targetToken, newGroupToken );

		const newContainer = cloneElement( container, { targetToken } );
		return UnionPattern.createFrom( newContainer, {} );
	}
}


/**
 * Constant with utils for {@link GroupPattern} objects.
 */
export const GroupPattern:{
	/**
	 * Factory function that allows to crete a {@link GroupPattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link GroupPattern} statement.
	 * @param object The base base from where to create the
	 * {@link GroupPattern} statement.
	 *
	 * @return The {@link GroupPattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<GroupPatternToken>, O extends object>( container:C, object:O ):GroupPattern;
} = {
	createFrom<C extends Container<GroupPatternToken>, O extends object>( container:C, object:O ):GroupPattern {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			union: getUnionFn( container ),
		} ) );
	}
};
