import { Container } from "./clauses/Container";
import { queryDecorator } from "./clauses/decorators";
import {
	FinishClause,
	FromClause,
	QueryClause,
} from "./clauses/interfaces";

export interface FinishDecorator<T> extends Function {
	<W extends object>( container:Container<T & FinishClause>, object:W ):T & W & FinishClause;
}

export class SPARQLER<T extends FinishClause = FinishClause> implements QueryClause<T> {

	/**
	 * @docs-private
	 */
	base:( iri:string ) => QueryClause<T>;
	/**
	 * @docs-private
	 */
	vocab:( iri:string ) => QueryClause<T>;
	/**
	 * @docs-private
	 */
	prefix:( name:string, iri:string ) => QueryClause<T>;
	/**
	 * @docs-private
	 */
	select:( ...variables:string[] ) => FromClause<T>;
	/**
	 * @docs-private
	 */
	selectDistinct:( ...variables:string[] ) => FromClause<T>;
	/**
	 * @docs-private
	 */
	selectReduced:( ...variables:string[] ) => FromClause<T>;
	/**
	 * @docs-private
	 */
	selectAll:() => FromClause<T>;
	/**
	 * @docs-private
	 */
	selectAllDistinct:() => FromClause<T>;
	/**
	 * @docs-private
	 */
	selectAllReduced:() => FromClause<T>;

	constructor( finishDecorator?:FinishDecorator<T> ) {
		const container:Container<T> = new Container<T>( finishDecorator );
		return queryDecorator<T, {}>( container, this );
	}

}

export default SPARQLER;
