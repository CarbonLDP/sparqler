import { TriplesSubject } from "./TriplesSubject";
import { IRIResolver } from "../Patterns";

export class Variable extends TriplesSubject {

	_subject:string;

	constructor( resolver:IRIResolver, name:string ){
		super( resolver );
		this._subject = `?${ name }`;
	}

}

export default Variable;
