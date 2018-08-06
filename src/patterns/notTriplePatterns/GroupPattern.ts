import { Container2 } from "../../clauses/Container2";

import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { UnionPatternToken } from "../../tokens/UnionPatternToken";

import { Pattern } from "../Pattern";
import { NotTriplePattern } from "./NotTriplePattern";
import { UnionPattern } from "./UnionPattern";


/**
 * @todo
 */
export interface GroupPattern extends NotTriplePattern<GroupPatternToken> {
	union( patterns:Pattern | Pattern[] ):UnionPattern;
}


function getUnionFn( container:Container2<GroupPatternToken> ):GroupPattern[ "union" ] {
	return patterns => {
		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		const newGroupToken:GroupPatternToken = new GroupPatternToken();
		newGroupToken.patterns.push( ...patterns.map( x => x.getPattern() ) );

		const unionToken:UnionPatternToken = new UnionPatternToken();
		unionToken.groupPatterns.push( container.targetToken, newGroupToken );


		const newContainer = new Container2( {
			iriResolver: container.iriResolver,
			targetToken: unionToken,
		} );
		return UnionPattern.createFrom( newContainer, {} );
	}
}


/**
 * @todo
 */
export const GroupPattern = {
	createFrom<C extends Container2<GroupPatternToken>, O extends object>( container:C, object:O ):GroupPattern {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			union: getUnionFn( container ),
		} ) );
	}
};