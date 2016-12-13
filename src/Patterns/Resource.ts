import { TriplesSubject } from "./TriplesSubject";
import { IRIResolver } from "../Patterns";
import { Token } from "../Tokens/Token";

export class Resource extends TriplesSubject {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, iri:string ){
		super( resolver );
		this.elementTokens = resolver._resolveIRI( iri );
	}

}

export default Resource;
