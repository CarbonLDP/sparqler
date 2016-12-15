import { Token } from "../Tokens/Token";
import {
	OPEN_MULTI_LIST,
	CLOSE_MULTI_LIST,
	OPEN_SINGLE_LIST,
	CLOSE_SINGLE_LIST,
	EMPTY_SEPARATOR
} from "../Tokens";
import { TriplesPattern } from "./TriplesPattern";
import {
	TriplesNodePattern,
	IRIResolver,
	supportedNativeTypes
} from "../Patterns";
import { Resource } from "./Resource";
import { Variable } from "./Variable";
import { Literal } from "./Literals";
import * as PatternObject from "../Utils/PatternObject";

export class Collection extends TriplesPattern<TriplesNodePattern> implements TriplesNodePattern {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, values:(supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ) {
		super( resolver );

		if( values.length === 1 ) {
			this.elementTokens = [ OPEN_SINGLE_LIST ];
		} else {
			this.elementTokens = [ OPEN_MULTI_LIST ];
		}

		values.forEach( ( value, index ) => {
			this.elementTokens.push( ...PatternObject.serialize( value as supportedNativeTypes ) );
			if( index < values.length - 1 ) this.elementTokens.push( EMPTY_SEPARATOR );
		} );

		if( values.length === 1 ) {
			this.elementTokens.push( CLOSE_SINGLE_LIST );
		} else {
			this.elementTokens.push( CLOSE_MULTI_LIST );
		}
	}

	getPattern():Token[] {
		return this.elementTokens.concat( this.patternTokens );
	}

	protected init():void {
		super.init();
		this.interfaces.graphPattern = {
			getPattern: () => this.getPattern(),
			getSelfTokens: () => this.elementTokens,
		};
	}

}

export default Collection;
