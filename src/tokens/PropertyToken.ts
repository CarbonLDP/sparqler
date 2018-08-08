import { ObjectToken } from "./ObjectToken";
import { addSpaces, getIndentation, getSeparator } from "./printing";
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


	toString( spaces?:number ):string {
		const separator:string = getSeparator( spaces );

		const verb:string = `${ this.verb }`;

		// Extra spaces until object
		const objectSpaces:number | undefined = addSpaces( spaces, verb.length + 1 );
		const objectIndent:string = getIndentation( objectSpaces );
		const objects:string = this.objects
			.map( object => {
				if( object.token === "collection" || object.token === "blankNodeProperty" )
					return object.toString( spaces );

				return object.toString( objectSpaces )
			} )
			.join( "," + separator + objectIndent );

		return verb + " " + objects;
	}
}
