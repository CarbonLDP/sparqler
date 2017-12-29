import { IRIResolver } from "sparqler/iri/IRIResolver";
import { Token } from "sparqler/tokens";
import { TriplesSubject } from "./TriplesSubject";

export class Resource extends TriplesSubject {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, iri:string ) {
		super( resolver );
		this.elementTokens = resolver.resolve( iri );
	}

}

export default Resource;
