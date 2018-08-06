/**
 * @todo
 */
import { Container2 } from "../data/Container2";
import { TokenNode } from "../tokens/TokenNode";


/**
 * @todo
 */
export interface FinishClause {
	toCompactString():string;

	toPrettyString():string;

	toString():string;
}


export const FinishClause = {
	createFrom<O extends object>( container:Container2<TokenNode>, object:O ):O & FinishClause {
		return Object.assign( object, {
			toCompactString: () => container.targetToken.toString(),
			toPrettyString: () => container.targetToken.toString(),
			toString: () => container.targetToken.toString(),
		} );
	}
};