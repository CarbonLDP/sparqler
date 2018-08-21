import { ObjectToken } from "./ObjectToken";
import { PathToken } from "./PathToken";
import { addSpaces, getIndentation, getSeparator } from "./printing";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * The token for defining a property statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPropertyListNotEmpty}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPropertyListPathNotEmpty}
 */
export class PropertyToken implements TokenNode {
	readonly token:"property" = "property";

	readonly verb:VariableToken | PathToken;
	readonly objects:ObjectToken[];

	constructor( verb:VariableToken | PathToken ) {
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
