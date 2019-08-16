import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";
import { FunctionExpressionsBuilder } from "./FunctionExpressionsBuilder";
import { OperationExpressionsBuilder } from "./OperationExpressionsBuilder";


/**
 * Builder with the methods that helps you to expressions.
 *
 * See https://www.w3.org/TR/sparql11-query/#expressions for
 * more information.
 */
interface ExpressionsBuilder extends FunctionExpressionsBuilder, OperationExpressionsBuilder {
}


/**
 * Constant with the utils for {@link ExpressionsBuilder} objects.
 */
export const ExpressionsBuilder:{
	/**
	 * Factory function that allows to crete a {@link ExpressionsBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link ExpressionsBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link ExpressionsBuilder} statement.
	 *
	 * @return The {@link ExpressionsBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & ExpressionsBuilder;
} = {
	createFrom: Factory.createFrom(
		FunctionExpressionsBuilder.createFrom,
		OperationExpressionsBuilder.createFrom,
	),
};