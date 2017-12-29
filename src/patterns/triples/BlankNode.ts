import { TriplesNodePattern } from "sparqler/patterns";
import {
	CLOSE_MULTI_BN,
	CLOSE_SINGLE_BN,
	OPEN_MULTI_BN,
	OPEN_SINGLE_BN,
	SAME_PROPERTY_SEPARATOR,
	SAME_SUBJECT_SEPARATOR,
} from "sparqler/patterns/tokens";
import { TriplesPattern } from "./TriplesPattern";
import { Token } from "sparqler/tokens";

export class BlankNode extends TriplesPattern<TriplesNodePattern> {

	protected elementTokens:Token[];

	getSelfTokens():Token[] {
		if( ! this.patternTokens.find( token => token === SAME_SUBJECT_SEPARATOR || token === SAME_PROPERTY_SEPARATOR ) )
			return [ OPEN_SINGLE_BN, ...this.patternTokens, CLOSE_SINGLE_BN ];

		return [ OPEN_MULTI_BN, ...this.patternTokens, CLOSE_MULTI_BN ];
	}

	protected init():void {
		super.init();
		this.interfaces.graphPattern = {
			getPattern: () => this.getSelfTokens(),
			getSelfTokens: () => this.getSelfTokens(),
		};
	}

}

export default BlankNode;
