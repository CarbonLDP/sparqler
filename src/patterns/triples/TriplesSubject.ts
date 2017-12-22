import { Token } from "../../tokens/Token";
import { GraphPattern } from "../interfaces";
import { TriplesPattern } from "./TriplesPattern";

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