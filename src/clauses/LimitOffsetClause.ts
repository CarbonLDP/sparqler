import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";

import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { FinishClause } from "./FinishClause";
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


function _getLimitFactory<CONTAINER extends Container2<any>, T extends FinishClause | SubFinishClause>( valuesFactory:Factory<CONTAINER, ValuesClause<T> & T> ):Factory<CONTAINER, LimitClause<OffsetClause<ValuesClause<T> & T> & ValuesClause<T> & T>> {
	const offsetValuesFactory:Factory<CONTAINER, OffsetClause<ValuesClause<T> & T>> = OffsetClause
		.createFrom.bind( null, valuesFactory );

	return ( container1, object1 ) => LimitClause
		.createFrom( Factory.createFrom( offsetValuesFactory, valuesFactory ), container1, object1 );
}

function _getOffsetFactory<CONTAINER extends Container2<any>, T extends FinishClause | SubFinishClause>( valuesFactory:Factory<CONTAINER, ValuesClause<T> & T> ):Factory<CONTAINER, OffsetClause<LimitClause<ValuesClause<T> & T> & ValuesClause<T> & T>> {
	const limitValuesFactory:Factory<CONTAINER, LimitClause<ValuesClause<T> & T>> = LimitClause
		.createFrom.bind( null, valuesFactory );

	return ( container1, object1 ) => OffsetClause
		.createFrom( Factory.createFrom( valuesFactory, limitValuesFactory ), container1, object1 );
}

/**
 * @todo
 */
export const LimitOffsetClause = {
	createFrom<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & LimitOffsetClause<T> {
		const valuesFactory:Factory<C, ValuesClause<T>> = ValuesClause
			.createFrom.bind( null, genericFactory );

		const genericAndValuesFactory = Factory.createFrom( genericFactory, valuesFactory );

		return Factory.createFrom(
			_getLimitFactory<C, T>( genericAndValuesFactory ),
			_getOffsetFactory<C, T>( genericAndValuesFactory ),
			valuesFactory
		)( container, object );
	},
};
