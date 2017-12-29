import { TermToken } from "sparqler/tokens";
import { PredicateToken } from "sparqler/tokens/PredicateToken";
import { TokenNode } from "sparqler/tokens/TokenNode";
import { VariableToken } from "sparqler/tokens/VariableToken";

export class SubjectToken implements TokenNode {
	readonly token:"subject" = "subject";
	readonly subject:VariableToken | TermToken;
	readonly predicates:PredicateToken[];

	constructor( subject:VariableToken | TermToken ) {
		this.subject = subject;
		this.predicates = [];
	}

	addPredicate( predicate:PredicateToken ):this {
		this.predicates.push( predicate );
		return this;
	}

	toString():string {
		return `${ this.subject } ${ this.predicates.join( "; " ) }`;
	}
}
