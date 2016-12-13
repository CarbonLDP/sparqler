import { TriplesSubject } from "./TriplesSubject";
import { IRIResolver } from "../Patterns";
import { Token } from "../Tokens/Token";
import { StringLiteral } from "../Tokens/StringLiteral";
import { VAR_SYMBOL } from "../Tokens";

export class Variable extends TriplesSubject {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, name:string ) {
		super( resolver );
		this.elementTokens = [ VAR_SYMBOL, new StringLiteral( name ) ];
	}

}

export default Variable;
