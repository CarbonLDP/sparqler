import { FinishClause } from "./clauses/FinishClause";
import { Container } from "./data/Container";
import { Factory } from "./data/Factory";
import { QueryToken } from "./tokens/QueryToken";
export declare type FinishFactory<T extends FinishClause> = Factory<Container<QueryToken>, T>;
