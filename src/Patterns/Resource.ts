import { TriplesSubject } from "./TriplesSubject";
import { IRIResolver } from "../Patterns";

export class Resource extends TriplesSubject {

	protected _subject:string;

	constructor( resolver:IRIResolver, iri:string ){
		super( resolver );
		this._subject = resolver._resolveIRI( iri );
	}

}

export default Resource;
