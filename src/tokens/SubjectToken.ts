import { addSpaces, getIndentation, getSeparator, INDENTATION_SPACES } from "./printing";
import { PropertyToken } from "./PropertyToken";
import { TokenNode } from "./TokenNode";
import { TripleNodeToken } from "./TripleNodeToken";
import { VariableOrTermToken } from "./VariableOrTermToken";


/**
 * The token for defining a triple subject statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rTriplesSameSubject}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rTriplesSameSubjectPath}
 */
export class SubjectToken<T extends VariableOrTermToken | TripleNodeToken = VariableOrTermToken | TripleNodeToken> implements TokenNode {
	readonly token:"subject" = "subject";

	readonly subject:T;
	readonly properties:PropertyToken[];

	constructor( subject:T ) {
		this.subject = subject;
		this.properties = [];
	}


	addProperty( property:PropertyToken ):this {
		this.properties.push( property );
		return this;
	}


	toString( spaces?:number ):string {
		let query:string = this.subject.toString( spaces );

		let separator:string = ! this.properties.length ? ""
			: (this.subject.token === "collection" || this.subject.token === "blankNodeProperty")
			&& query.includes( "\n" ) ? "\n"
				: " ";

		const subSpaces:number | undefined = separator === " " ?
			addSpaces( spaces, query.length + 1 ) :
			addSpaces( spaces, INDENTATION_SPACES );

		const subIndent:string = getIndentation( subSpaces );
		const properties:string = this.properties
			.map( property => property.toString( subSpaces ) )
			.join( ";" + getSeparator( spaces ) + subIndent );

		if( separator === "\n" ) separator += subIndent;
		return query + separator + properties;
	}
}
