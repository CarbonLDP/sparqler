import { FinishClause } from "sparqler/clauses/FinishClause";
import { GroupToken } from "../tokens/GroupToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { HavingClause } from "./HavingClause";
import { SubFinishClause } from "./interfaces";
import { cloneSolutionModifierContainer } from "./SolutionModifierClause";


export interface GroupClause<T extends FinishClause | SubFinishClause> extends HavingClause<T> {
	/**
	 * Set a condition to be divide the solutions returned by the query
	 * into one or more groups.
	 *
	 * @param rawCondition Raw condition to be applied to the solutions grouping.
	 * @returns Object with the methods to keep constructing the query.
	 */
	// TODO: create group condition expressions
	groupBy( rawCondition:string ):HavingClause<T> & T;
}


/**
 * @todo
 */
function getGroupByFn<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause>( genericFactory:ClauseFactory<C, T>, container:C ):GroupClause<T>[ "groupBy" ] {
	return ( rawCondition:string ) => {
		const token:GroupToken = new GroupToken( rawCondition );
		const newContainer = cloneSolutionModifierContainer( container, token );

		const havingClause:HavingClause<T> = HavingClause.createFrom( genericFactory, newContainer, {} );
		return genericFactory( newContainer, havingClause );
	}
}


/**
 * @todo
 */
export const GroupClause = {
	createFrom<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause, O extends object>( genericFactory:ClauseFactory<typeof container, T>, container:C, object:O ):O & GroupClause<T> {
		return HavingClause.createFrom( genericFactory, container, Object.assign( object, {
			groupBy: getGroupByFn( genericFactory, container ),
		} ) );
	},
};
