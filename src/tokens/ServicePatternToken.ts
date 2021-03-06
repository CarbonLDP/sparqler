import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";
import { VariableOrIRIToken } from "./VariableOrIRIToken";


/**
 * The token of the `SERVICE` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rServiceGraphPattern
 */
export class ServicePatternToken implements TokenNode {
	readonly token:"servicePattern" = "servicePattern";

	readonly modifier?:"SILENT";
	readonly resource:VariableOrIRIToken;
	readonly groupPattern:GroupPatternToken;

	constructor( resource:VariableOrIRIToken, modifier?:"SILENT" ) {
		this.modifier = modifier;
		this.resource = resource;
		this.groupPattern = new GroupPatternToken();
	}


	toString( spaces?:number ):string {
		let query:string = `SERVICE `;

		if( this.modifier ) query += `SILENT `;

		query += `${ this.resource } ${ this.groupPattern.toString( spaces ) }`;

		return query;
	}
}
