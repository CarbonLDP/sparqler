import { PredicateToken } from "./PredicateToken";
import { TermToken } from "./TermToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


export class SubjectToken<T extends VariableToken | TermToken = VariableToken | TermToken> implements TokenNode {
	readonly token:"subject" = "subject";

	readonly subject:T;
	readonly predicates:PredicateToken[];

	constructor( subject:T ) {
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
