import { Container } from "../data/Container";
import { Factory } from "../data/Factory";

import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";

import { FinishClause } from "./FinishClause";
import { LimitClause } from "./LimitClause";
import { OffsetClause } from "./OffsetClause";
import { ValuesClause } from "./ValuesClause";


/**
 * Interface that specify union of the LIMIT and OFFSET statements.
 * Its specified in a form one can use `limit` and `offset` in
 * this order or viceversa, but not be able to repeat the `limit`
 * or `offset` methods.
 *
 * Example:
 *  - Correct:
 *  ```typescript
 *      import { LimitOffsetClause } from "sparqler/clauses";
 *      let query:LimitOffsetClause;
 *
 *      query
 *          .limit( &#47;*...*&#47; )
 *          .offset( &#47;*...*&#47; )
 *      ;
 *
 *      query
 *          .offset( &#47;*...*&#47; )
 *          .limit( &#47;*...*&#47; )
 *      ;
 *
 *      query
 *          .limit( &#47;*...*&#47; )
 *      ;
 * ```
 *
 *  - Incorrect:
 *  ```typescript
 *      import { LimitOffsetClause } from "sparqler/Clauses";
 *      let query:LimitOffsetClause;
 *
 *      query
 *          .limit( &#47;*...*&#47; )
 *          .limit( &#47;*...*&#47; ) // Not possible
 *          .offset( &#47;*...*&#47; )
 *      ;
 *
 *      query
 *          .offset( &#47;*...*&#47; )
 *          .limit( &#47;*...*&#47; )
 *          .offset( &#47;*...*&#47; ) // Not possible
 *      ;
 * ```
 */
export interface LimitOffsetClause<T extends FinishClause> extends LimitClause<OffsetClause<ValuesClause<T> & T> & ValuesClause<T> & T>,
                                                                   OffsetClause<LimitClause<ValuesClause<T> & T> & ValuesClause<T> & T>,
                                                                   ValuesClause<T> {}


function _getLimitFactory<CONTAINER extends Container<any>, T extends FinishClause>( valuesFactory:Factory<CONTAINER, ValuesClause<T> & T> ):Factory<CONTAINER, LimitClause<OffsetClause<ValuesClause<T> & T> & ValuesClause<T> & T>> {
	const offsetValuesFactory:Factory<CONTAINER, OffsetClause<ValuesClause<T> & T>> = OffsetClause
		.createFrom.bind( null, valuesFactory );

	return ( container1, object1 ) => LimitClause
		.createFrom( Factory.createFrom( offsetValuesFactory, valuesFactory ), container1, object1 );
}

function _getOffsetFactory<CONTAINER extends Container<any>, T extends FinishClause>( valuesFactory:Factory<CONTAINER, ValuesClause<T> & T> ):Factory<CONTAINER, OffsetClause<LimitClause<ValuesClause<T> & T> & ValuesClause<T> & T>> {
	const limitValuesFactory:Factory<CONTAINER, LimitClause<ValuesClause<T> & T>> = LimitClause
		.createFrom.bind( null, valuesFactory );

	return ( container1, object1 ) => OffsetClause
		.createFrom( Factory.createFrom( valuesFactory, limitValuesFactory ), container1, object1 );
}


/**
 * Constant with the utils for {@link LimitOffsetClause} objects.
 */
export const LimitOffsetClause:{
	/**
	 * Factory function that allows to crete a {@link LimitOffsetClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link LimitOffsetClause} statement.
	 * @param container The related container with the data for the
	 * {@link LimitOffsetClause} statement.
	 * @param object The base base from where to create the
	 * {@link LimitOffsetClause} statement.
	 *
	 * @return The {@link LimitOffsetClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & LimitOffsetClause<T>;
} = {
	createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & LimitOffsetClause<T> {
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
