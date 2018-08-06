import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";
import { VariableOrIRIToken } from "./VariableOrIRIToken";


/**
 * @todo
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


	toString():string {
		let query:string = `SERVICE `;

		if( this.modifier ) query += `SILENT `;

		query += `${ this.resource } ${ this.groupPattern }`;

		return query;
	}
}
