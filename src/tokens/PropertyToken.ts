import { ObjectToken } from "./ObjectToken";
import { TokenNode } from "./TokenNode";
import { VariableOrIRIToken } from "./VariableOrIRIToken";


export class PropertyToken implements TokenNode {
	readonly token:"property" = "property";

	readonly verb:VariableOrIRIToken | "a";
	readonly objects:ObjectToken[];

	constructor( verb:VariableOrIRIToken | "a" ) {
		this.verb = verb;
		this.objects = [];
	}


	addObject( ...object:ObjectToken[] ):this {
		this.objects.push( ...object );
		return this;
	}


	toString():string {
		return `${ this.verb } ${ this.objects.join( ", " ) }`;
	}
}
