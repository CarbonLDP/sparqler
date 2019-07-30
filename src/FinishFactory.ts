import { FinishClause } from "./clauses/FinishClause";

import { Container } from "./data/Container";
import { Factory } from "./data/Factory";

import { QueryToken } from "./tokens/QueryToken";


/**
 * Alias for the finish factory function for the specified finish clause.
 *
 * The factory will receive the {@link Container} with the final token
 * data ({@link QueryToken}) of the constructed query.
 *
 * The factory function must return the extended {@link FinishClause}.
 * The build it factory {@link FinishClause#createFrom `FinishClause.createFrom`} is recommended
 * to be used internally so the expected behaviour applies with added
 * custom functionality for the custom factory.
 */
 // TODO: Fix link syntax
export type FinishFactory<T extends FinishClause> = Factory<Container<QueryToken>, T>;
