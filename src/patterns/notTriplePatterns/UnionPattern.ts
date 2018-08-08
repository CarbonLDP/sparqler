import { Container } from "../../data/Container";
import { cloneElement } from "../../data/utils";

import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { UnionPatternToken } from "../../tokens/UnionPatternToken";

import { Pattern } from "../Pattern";
import { NotTriplePattern } from "./NotTriplePattern";


/**
 * @todo
 */
export interface UnionPattern extends NotTriplePattern<UnionPatternToken> {
	union( patterns:Pattern | Pattern[] ):UnionPattern;
}


function getUnionFn( container:Container<UnionPatternToken> ):UnionPattern[ "union" ] {
	return patterns => {
		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		const newGroupToken:GroupPatternToken = new GroupPatternToken();
		newGroupToken.patterns.push( ...patterns.map( x => x.getPattern() ) );


		const groupPatterns = container.targetToken.groupPatterns.concat( newGroupToken );
		const unionToken:UnionPatternToken = cloneElement( container.targetToken, { groupPatterns } );

		const newContainer = new Container( {
			iriResolver: container.iriResolver,
			targetToken: unionToken,
		} );
		return UnionPattern.createFrom( newContainer, {} );
	}
}


export const UnionPattern = {
	createFrom<C extends Container<UnionPatternToken>, O extends object>( container:C, object:O ):UnionPattern {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			union: getUnionFn( container ),
		} ) );
	},
};