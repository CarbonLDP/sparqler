import { TriplesPattern } from "./TriplesPattern";
import {
	GraphPattern
} from "../Patterns";
import { Token } from "../Tokens/Token";

export abstract class TriplesSubject extends TriplesPattern<GraphPattern> {

	protected init():void {
		super.init();
		this.interfaces.graphPattern = {
			getPattern: ():Token[] => {
				return this.getSelfTokens().concat( this.patternTokens );
			},
		};
	}

}

export default TriplesSubject;