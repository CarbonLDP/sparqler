import { FinishClause } from "sparqler/clauses/FinishClause";
import { SubSelectToken } from "sparqler/tokens/SubSelectToken";
import { GroupPatternToken } from "../tokens/GroupPatternToken";
import { QueryToken } from "../tokens/QueryToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { SubFinishClause } from "./interfaces";
import { LimitClause } from "./LimitClause";
import { OffsetClause } from "./OffsetClause";
import { ValuesClause } from "./ValuesClause";


/**
 * This LimitOffsetClause created this way to be able to specify `limit` and `offset` in this order or viceversa,
 * but not be able to repeat `limit` or `offset` more that once.
 *
 * Example:
 *  - Correct:
 *      .limit( ... )
 *      .offset( ... )
 *      .execute();
 *
 *      .offset( ... )
 *      .limit( ... )
 *      .execute();
 *
 *      .limit( ... )
 *      .execute();
 *
 *  - Incorrect:
 *      .limit( ... )
 *      .limit( ... ) // Not possible
 *      .offset( ... )
 *
 *      .offset( ... )
 *      .limit( ... )
 *      .offset( ... ) // Not possible
 */
export interface LimitOffsetClause<T extends FinishClause | SubFinishClause> extends LimitClause<OffsetClause<ValuesClause<T> & T> & ValuesClause<T> & T>,
                                                                                     OffsetClause<LimitClause<ValuesClause<T> & T> & ValuesClause<T> & T>,
                                                                                     ValuesClause<T> {}


function _getLimitFactory<CONTAINER extends Container2<any>, T extends FinishClause | SubFinishClause>( valuesFactory:ClauseFactory<CONTAINER, ValuesClause<T> & T> ):ClauseFactory<CONTAINER, LimitClause<OffsetClause<ValuesClause<T> & T> & ValuesClause<T> & T>> {
	const offsetValuesFactory:ClauseFactory<CONTAINER, OffsetClause<ValuesClause<T> & T>> = OffsetClause
		.createFrom.bind( null, valuesFactory );

	return ( container1, object1 ) => LimitClause
		.createFrom( ClauseFactory.createFrom( offsetValuesFactory, valuesFactory ), container1, object1 );
}

function _getOffsetFactory<CONTAINER extends Container2<any>, T extends FinishClause | SubFinishClause>( valuesFactory:ClauseFactory<CONTAINER, ValuesClause<T> & T> ):ClauseFactory<CONTAINER, OffsetClause<LimitClause<ValuesClause<T> & T> & ValuesClause<T> & T>> {
	const limitValuesFactory:ClauseFactory<CONTAINER, LimitClause<ValuesClause<T> & T>> = LimitClause
		.createFrom.bind( null, valuesFactory );

	return ( container1, object1 ) => OffsetClause
		.createFrom( ClauseFactory.createFrom( valuesFactory, limitValuesFactory ), container1, object1 );
}

/**
 * @todo
 */
export const LimitOffsetClause = {
	createFrom<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause, O extends object>( genericFactory:ClauseFactory<C, T>, container:C, object:O ):O & LimitOffsetClause<T> {
		const valuesFactory:ClauseFactory<C, ValuesClause<T>> = ValuesClause
			.createFrom.bind( null, genericFactory );

		const genericAndValuesFactory = ClauseFactory.createFrom( genericFactory, valuesFactory );

		return ClauseFactory.createFrom(
			_getLimitFactory<C, T>( genericAndValuesFactory ),
			_getOffsetFactory<C, T>( genericAndValuesFactory ),
			valuesFactory
		)( container, object );
	},
};
