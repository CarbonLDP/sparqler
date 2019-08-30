import { Container } from "../../core/containers/Container";
import { cloneElement } from "../../core/containers/utils";

import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { UnionPatternToken } from "../../tokens/UnionPatternToken";

import { Pattern } from "../Pattern";
import { NotTriplePattern } from "./NotTriplePattern";


/**
 * Wrapper for easier usage of SPARQL UNION patterns.
 */
export interface UnionPattern extends NotTriplePattern<UnionPatternToken> {
	and( patterns:Pattern | Pattern[] ):UnionPattern;
}

/**
 * Function that creates a generic {@link UnionPattern.and} function.
 *
 * @param container The container with the query data for the statement.
 *
 * @private
 */
function getAndFn( container:Container<UnionPatternToken> ):UnionPattern[ "and" ] {
	return patterns => {
		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		const newGroupToken:GroupPatternToken = new GroupPatternToken();
		newGroupToken.patterns.push( ...patterns.map( x => x.getPattern() ) );

		const groupPatterns = container.targetToken.groupPatterns.concat( newGroupToken );
		const targetToken:UnionPatternToken = cloneElement( container.targetToken, { groupPatterns } );

		const newContainer:Container<UnionPatternToken> = cloneElement( container, { targetToken } );
		return UnionPattern.createFrom( newContainer, {} );
	}
}


/**
 * Constant with utils for {@link UnionPattern} objects.
 */
export const UnionPattern:{
	/**
	 * Factory function that allows to crete a {@link UnionPattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link UnionPattern} statement.
	 * @param object The base base from where to create the
	 * {@link UnionPattern} statement.
	 *
	 * @return The {@link UnionPattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<UnionPatternToken>, O extends object>( container:C, object:O ):UnionPattern;
} = {
	createFrom<C extends Container<UnionPatternToken>, O extends object>( container:C, object:O ):UnionPattern {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			and: getAndFn( container ),
		} ) );
	},
};