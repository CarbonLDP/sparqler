import { Pattern } from "./Pattern";
import {
	TriplesPattern,
	IRIResolver
} from "../Patterns";

function getPattern():string {
	return `${ this } ${ this._triplesData.join( ";\n\t" ) }`;
}

export abstract class TriplesSubject extends Pattern<TriplesPattern> {

	constructor( resolver:IRIResolver ) {
		super( resolver );
		this.interfaces.pattern = {
			getPattern: getPattern.bind( this ),
		};
	}

}

export default TriplesSubject;