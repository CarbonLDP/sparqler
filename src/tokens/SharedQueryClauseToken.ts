import { PatternToken } from "./PatternToken";
import { SolutionModifierToken } from "./SolutionModifierToken";
import { TokenNode } from "./TokenNode";
import { WhereToken } from "./WhereToken";


/**
 * Abstract class with the shared data of a query clause token
 * (SELECT, CONSTRUCT, etc.).
 */
export abstract class SharedQueryClauseToken implements TokenNode {
	abstract readonly token:string;

	readonly where:WhereToken;
	readonly modifiers:SolutionModifierToken[];

	protected constructor() {
		this.where = new WhereToken();
		this.modifiers = [];
	}


	addPattern( ...patterns:PatternToken[] ):this {
		this.where.groupPattern.patterns.push( ...patterns );
		return this;
	}

	addModifier( ...modifier:SolutionModifierToken[] ):this {
		this.modifiers.push( ...modifier );
		return this;
	}


	abstract toString( spaces?:number ):string;
}
