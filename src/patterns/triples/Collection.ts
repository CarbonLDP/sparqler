import { IRIResolver } from "sparqler/iri/IRIResolver";
import {
	SupportedNativeTypes,
	TriplesNodePattern,
} from "sparqler/patterns";
import {
	CLOSE_MULTI_LIST,
	CLOSE_SINGLE_LIST,
	EMPTY_SEPARATOR,
	OPEN_MULTI_LIST,
	OPEN_SINGLE_LIST,
} from "sparqler/patterns/tokens";
import {
	Literal,
	Resource,
	Variable,
} from "sparqler/patterns/triples";
import {
	NewLineSymbol,
	Token,
} from "sparqler/tokens";
import { serialize } from "sparqler/utils/ObjectPattern";
import { TriplesPattern } from "./TriplesPattern";

export class Collection extends TriplesPattern<TriplesNodePattern> implements TriplesNodePattern {

	protected elementTokens:Token[];

	constructor( resolver:IRIResolver, values:(SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ) {
		super( resolver );

		let tokens:Token[] = [];
		values.forEach( ( value, index ) => {
			tokens.push( ...serialize( value as SupportedNativeTypes ) );
			if( index < values.length - 1 ) tokens.push( EMPTY_SEPARATOR );
		} );

		let isSingle:boolean = values.length <= 1 && ! tokens.find( token => token instanceof NewLineSymbol );
		this.elementTokens = [
			isSingle ? OPEN_SINGLE_LIST : OPEN_MULTI_LIST,
			...tokens,
			isSingle ? CLOSE_SINGLE_LIST : CLOSE_MULTI_LIST,
		];
	}

	getPattern():Token[] {
		return this.getSelfTokens().concat( this.patternTokens );
	}

	protected init():void {
		super.init();
		this.interfaces.graphPattern = {
			getPattern: () => this.getPattern(),
			getSelfTokens: () => this.getSelfTokens(),
		};
	}

}

export default Collection;
