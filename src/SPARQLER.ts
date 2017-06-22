import {
	FinishClause,
	QueryClause,
} from "sparqler/clauses/interfaces";
import { queryDecorator } from "sparqler/clauses/builders/query";
import { Container } from "sparqler/clauses/data-container";

export interface FinishDecorator<T extends FinishClause> extends Function {
	<W extends object>( base:Container<T>, object:W ):T & W;
}

export interface SPARQLER<T extends FinishClause = FinishClause> extends QueryClause<T> {}
export class SPARQLER<T extends FinishClause = FinishClause> {

	constructor( finishDecorator?:FinishDecorator<T> ) {
		const container:Container<T> = new Container<T>( finishDecorator );
		return queryDecorator<T, {}>( container, {} );
	}

}

export default SPARQLER;
