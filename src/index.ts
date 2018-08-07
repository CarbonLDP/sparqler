import { Container } from "sparqler/clauses/Container";
import { queryDecorator } from "sparqler/clauses/decorators";
import { FinishClause } from "sparqler/clauses/FinishClause";
import { QueryClause as QueryClause2 } from "sparqler/clauses/QueryClause";
import { QueryClause } from "sparqler/clauses/interfaces";
import { Container2 } from "sparqler/data/Container2";
import { Factory } from "sparqler/data/Factory";
import { IRIResolver2 } from "sparqler/data/IRIResolver2";
import { QueryUnitContainer } from "sparqler/data/QueryUnitContainer";
import { QueryToken } from "sparqler/tokens";


export interface FinishDecorator<T> extends Function {
	<W extends object>( container:Container<T & FinishClause>, object:W ):T & W & FinishClause;
}

export interface SPARQLER<T extends FinishClause = FinishClause> extends QueryClause<T> {}

export class SPARQLER<T extends FinishClause = FinishClause> {

	constructor( finishDecorator?:FinishDecorator<T> ) {
		const container:Container<T> = new Container<T>( finishDecorator );
		return queryDecorator<T, {}>( container, this );
	}

}

export default SPARQLER;


export type FinishFactory<T extends FinishClause> = Factory<Container2<QueryToken>, T>;

export interface SPARQLER2<SELECT extends FinishClause = FinishClause> extends QueryClause2<SELECT> {}

export class SPARQLER2<SELECT extends FinishClause = FinishClause> {
	constructor( finishSelectFactory:FinishFactory<SELECT> = FinishClause.createFrom as FinishFactory<SELECT> ) {

		const container:QueryUnitContainer<SELECT> = new QueryUnitContainer( {
			iriResolver: new IRIResolver2(),
			targetToken: new QueryToken( void 0 ),
			selectFinishClauseFactory: finishSelectFactory,
		} );

		return QueryClause2.createFrom( container, this );
	}
}
