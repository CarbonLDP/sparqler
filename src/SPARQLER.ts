import {
	Container,
	FinishClause,
	QueryClause,
} from "sparqler/clauses";
import { queryDecorator } from "sparqler/clauses/decorators";

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
