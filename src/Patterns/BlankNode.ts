import { Token } from "../Tokens/Token";
import {
	END_SAME_SUBJECT,
	END_SAME_PROPERTY,
	CLOSE_SINGLE_BN,
	OPEN_SINGLE_BN,
	OPEN_MULTI_BN,
	CLOSE_MULTI_BN
} from "../Tokens";
import { TriplesPattern } from "./TriplesPattern";
import {
	GraphPattern,
	ElementPattern
} from "../Patterns";

export class BlankNode extends TriplesPattern<GraphPattern & ElementPattern> {

	protected elementTokens:Token[];

	getSelfTokens():Token[] {
		if( ! this.patternTokens.find( token => token === END_SAME_SUBJECT || token === END_SAME_PROPERTY ) )
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