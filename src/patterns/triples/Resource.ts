import { IRIResolver } from "sparqler/patterns";
import { Token } from "sparqler/tokens";
import { TriplesSubject } from "./TriplesSubject";

export class Resource extends TriplesSubject {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, iri:string ) {
		super( resolver );
		this.elementTokens = resolver._resolveIRI( iri );
	}

}

export default Resource;
