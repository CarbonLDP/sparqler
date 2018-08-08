import { Container } from "sparqler/data/Container";
import { TokenNode } from "sparqler/tokens";
import { SubSelectToken } from "sparqler/tokens/SubSelectToken";
import { VariableToken } from "sparqler/tokens/VariableToken";
import { SubWherePattern } from "./SubWherePattern";


/**
 * @todo
 */
export interface SubSelectPattern {
	select( ...variables:string[] ):SubWherePattern;
	selectDistinct( ...variables:string[] ):SubWherePattern;
	selectReduced( ...variables:string[] ):SubWherePattern;
	selectAll():SubWherePattern;
	selectAllDistinct():SubWherePattern;
	selectAllReduced():SubWherePattern;
}


/**
 * @todo
 */
function getSelectFn<C extends Container<TokenNode>>( container:C, modifier?:"DISTINCT" | "REDUCED" ):SubSelectPattern[ "select" ] {
	return ( ...variables:string[] ) => {
		const targetToken:SubSelectToken = new SubSelectToken( modifier );
		if( variables.length ) targetToken.addVariable( ...variables.map( x => new VariableToken( x ) ) );

		const newContainer = new Container( {
			iriResolver: container.iriResolver,
			targetToken
		} );
		return SubWherePattern.createFrom( newContainer, {} );
	};
}


/**
 * @todo
 */
export const SubSelectPattern = {
	createFrom<C extends Container<TokenNode>, O extends object>( container:C, object:O ):O & SubSelectPattern {
		return Object.assign( object, {
			select: getSelectFn( container ),
			selectDistinct: getSelectFn( container, "DISTINCT" ),
			selectReduced: getSelectFn( container, "REDUCED" ),
			selectAll: () => getSelectFn( container )(),
			selectAllDistinct: () => getSelectFn( container, "DISTINCT" )(),
			selectAllReduced: () => getSelectFn( container, "REDUCED" )(),
		} );
	},
};
