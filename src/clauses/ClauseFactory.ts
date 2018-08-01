import { Container2 } from "./Container2";


export interface ClauseFactory<CONTAINER extends Container2<any>, CLAUSE extends object> extends Function {
	<OBJECT extends object>( container:CONTAINER, object:OBJECT ):OBJECT & CLAUSE;
}

export const ClauseFactory:{
	createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object>( clauseFactory1:ClauseFactory<CONTAINER, CLAUSE1> ):ClauseFactory<CONTAINER, CLAUSE1>;
	createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object, CLAUSE2 extends object>( clauseFactory1:ClauseFactory<CONTAINER, CLAUSE1>, clauseFactory2:ClauseFactory<CONTAINER, CLAUSE2> ):ClauseFactory<CONTAINER, CLAUSE1 & CLAUSE2>;
	createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object, CLAUSE2 extends object, CLAUSE3 extends object>( clauseFactory1:ClauseFactory<CONTAINER, CLAUSE1>, clauseFactory2:ClauseFactory<CONTAINER, CLAUSE2>, clauseFactory3:ClauseFactory<CONTAINER, CLAUSE3> ):ClauseFactory<CONTAINER, CLAUSE1 & CLAUSE2 & CLAUSE3>;
} = {
	createFrom( ...clauseFactories:ClauseFactory<any, any>[] ):ClauseFactory<any, any> {
		return <W extends object>( container:Container2<any>, object:W ):W & any => {
			return clauseFactories
				.reduce( ( target, factoryFn ) => factoryFn( container, target ), object );
		};
	}
};
