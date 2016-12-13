import { TriplesPattern } from "./TriplesPattern";
import {
	GraphPattern,
	IRIResolver
} from "../Patterns";
import { Token } from "../Tokens/Token";

function getPattern():Token[] {
	return this.getSelfTokens().concat( this.patternTokens );
}

export abstract class TriplesSubject extends TriplesPattern<GraphPattern> {

	constructor( resolver:IRIResolver ) {
		super( resolver );
		this.interfaces.graphPattern = {
			getPattern: getPattern.bind( this ) as typeof getPattern,
		};
	}

}

export default TriplesSubject;