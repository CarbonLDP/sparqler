import { FinishClause } from "../../clauses/FinishClause";

import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";

import { SubSelectToken } from "../../tokens/SubSelectToken";

import { Pattern } from "../Pattern";


/**
 * @todo
 */
export interface FinishClausePattern extends Pattern<SubSelectToken>, FinishClause {
}


/**
 * @todo
 */
export const FinishClausePattern = {
	createFrom<C extends Container<SubSelectToken>, O extends object>( container:C, object:O ):O & FinishClausePattern {
		return Factory.createFrom<C, Pattern<SubSelectToken>, FinishClause>(
			Pattern.createFrom,
			FinishClause.createFrom,
		)( container, object );
	},
};
