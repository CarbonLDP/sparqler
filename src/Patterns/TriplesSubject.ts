import { TriplesPattern } from "./TriplesPattern";
import {
	GraphPattern,
	IRIResolver
} from "../Patterns";

function getPattern():string {
	return `${ this } ${ this._triplesData.join( ";\n\t" ) }`;
}

export abstract class TriplesSubject extends TriplesPattern<GraphPattern> {

	constructor( resolver:IRIResolver ) {
		super( resolver );
		this.interfaces.graphPattern = {
			getPattern: getPattern.bind( this ),
		};
	}

}

export default TriplesSubject;