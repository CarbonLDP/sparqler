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


/**
 * @todo
 */
export const FinishClause = {
	createFrom<O extends object>( container:Container2<TokenNode>, object:O ):O & FinishClause {
		const toPrettyString:FinishClause[ "toPrettyString" ] = () =>
			container.targetToken.toString( 0 );

		return Object.assign( object, {
			toCompactString: () => container.targetToken.toString(),
			toPrettyString: toPrettyString,
			toString: toPrettyString,
		} );
	}
};