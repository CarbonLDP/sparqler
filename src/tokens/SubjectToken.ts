import { PropertyToken } from "./PropertyToken";
import { TokenNode } from "./TokenNode";
import { TripleNodeToken } from "./TripleNodeToken";
import { VariableOrTermToken } from "./VariableOrTermToken";


export class SubjectToken<T extends VariableOrTermToken | TripleNodeToken = VariableOrTermToken | TripleNodeToken> implements TokenNode {
	readonly token:"subject" = "subject";

	readonly subject:T;
	readonly properties:PropertyToken[];

	constructor( subject:T ) {
		this.subject = subject;
		this.properties = [];
	}


	addPredicate( predicate:PropertyToken ):this {
		this.properties.push( predicate );
		return this;
	}


	toString():string {
		let query:string = `${ this.subject }`;

		if( this.properties.length )
			query += ` ${ this.properties.join( "; " ) }`;

		return query;
	}
}
