import { Container2 } from "sparqler/data/Container2";
import { cloneElement } from "sparqler/data/utils";
import { SubSelectToken } from "sparqler/tokens/SubSelectToken";
import { WhereToken } from "sparqler/tokens/WhereToken";
import { GroupClause } from "../../clauses/GroupClause";
import { Pattern } from "../Pattern";
import { FinishClausePattern } from "./FinishClausePattern";


/**
 * @todo
 */
export interface SubWherePattern {
	where( patterns:Pattern | Pattern[] ):GroupClause<FinishClausePattern> & FinishClausePattern;
}


/**
 * @todo
 */
function getWhereFn( container:Container2<SubSelectToken> ):SubWherePattern[ "where" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const where:WhereToken = new WhereToken();
		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		where.groupPattern.patterns.push( ...patterns.map( x => x.getPattern() ) );

		const targetToken:SubSelectToken = cloneElement( container.targetToken, { where } );
		const newContainer = cloneElement( container, { targetToken } );

		const groupClause:GroupClause<FinishClausePattern> = GroupClause.createFrom( FinishClausePattern.createFrom, newContainer, {} );
		return FinishClausePattern.createFrom( newContainer, groupClause );
	};
}


/**
 * @todo
 */
export const SubWherePattern = {
	createFrom<C extends Container2<SubSelectToken>, O extends object>( container:C, object:O ):O & SubWherePattern {
		return Object.assign( object, {
			where: getWhereFn( container ),
		} );
	},
};