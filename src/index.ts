import {
	FinishClause,
	QueryClause,
} from "sparqler/clauses/interfaces";
import { Container }  from "sparqler/clauses/Container";
import { queryDecorator } from "sparqler/clauses/decorators";

export interface FinishDecorator<T> extends Function {
	<W extends object>( container:Container<T & FinishClause>, object:W ):T & W & FinishClause;
}

// Comment
export interface SPARQLER<T extends FinishClause = FinishClause> extends QueryClause<T> {}
export class SPARQLER<T extends FinishClause = FinishClause> {

	constructor( finishDecorator?:FinishDecorator<T> ) {
		const container:Container<T> = new Container<T>( finishDecorator );
		return queryDecorator<T, {}>( container, this );
	}

}

export default SPARQLER;
