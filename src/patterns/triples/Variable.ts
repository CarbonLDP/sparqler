import { IRIResolver } from "sparqler/patterns";
import { VAR_SYMBOL } from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";
import { TriplesSubject } from "./TriplesSubject";

export class Variable extends TriplesSubject {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, name:string ) {
		super( resolver );
		this.elementTokens = [ VAR_SYMBOL, new StringLiteral( name ) ];
	}

}

export default Variable;
