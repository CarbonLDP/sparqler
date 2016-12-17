import { NotTriplesPattern } from "./NotTriplesPattern";
import {
	SingleValuesPattern,
	supportedNativeTypes,
	SingleValuesPatternMore,
	IRIResolver,
	MultipleValuesPattern,
	MultipleValuesPatternMore,
} from "../Patterns";
import { Resource } from "../TriplesPatterns/Resource";
import { Literal } from "../TriplesPatterns/Literals";
import { Undefined } from "../PatternBuilder";
import {
	VALUES,
	OPEN_SINGLE_LIST,
	CLOSE_SINGLE_LIST,
	OPEN_SINGLE_BLOCK,
	CLOSE_SINGLE_BLOCK,
	OPEN_MULTI_BLOCK,
	CLOSE_MULTI_BLOCK
} from "../Patterns/Tokens";
import { Variable } from "../TriplesPatterns/Variable";
import * as ObjectPattern from "../Utils/ObjectPattern";
import { Token } from "../Tokens/Token";

export class ValuesPattern extends NotTriplesPattern implements SingleValuesPattern, MultipleValuesPattern {

	private resolver;
	private isSingle:boolean;

	protected interfaces:{
		addPattern:( SingleValuesPatternMore | MultipleValuesPatternMore ) & NotTriplesPattern;
	};

	constructor( resolver:IRIResolver, variables:Variable[] ) {
		super( [ VALUES ] );
		this.init();

		this.resolver = resolver;
		this.isSingle = variables.length === 1;

		if( this.isSingle ) {
			this.patternTokens.push( ...variables[ 0 ].getSelfTokens(), OPEN_SINGLE_BLOCK );
		} else {
			this.patternTokens.push( OPEN_SINGLE_LIST );
			variables.forEach( variable => this.patternTokens.push( ...variable.getSelfTokens() ) );
			this.patternTokens.push( CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK );
		}
	}

	has( value:supportedNativeTypes ):SingleValuesPatternMore & NotTriplesPattern;
	has( value:Resource ):SingleValuesPatternMore & NotTriplesPattern;
	has( value:Literal ):SingleValuesPatternMore & NotTriplesPattern;
	has( value:Undefined ):SingleValuesPatternMore & NotTriplesPattern;
	has( ...values:( supportedNativeTypes | Resource | Literal | Undefined )[] ):MultipleValuesPatternMore & NotTriplesPattern;
	has( ...values ):( SingleValuesPatternMore | MultipleValuesPatternMore ) & NotTriplesPattern {
		if( this.isSingle ) {
			this.patternTokens.push( ...ObjectPattern.serialize( values[ 0 ] ) );
		} else {
			this.patternTokens.push( OPEN_SINGLE_LIST );
			values.forEach( value => {
				return this.patternTokens.push( ...ObjectPattern.serialize( value ) )
			} );
			this.patternTokens.push( CLOSE_SINGLE_LIST );
		}
		return this.interfaces.addPattern;
	}

	getPattern():Token[] {
		if( this.isSingle ) {
			this.patternTokens.push( CLOSE_SINGLE_BLOCK );
		} else {
			this.patternTokens.push( CLOSE_MULTI_BLOCK );
		}

		return this.patternTokens;
	}

	private init():void {
		this.interfaces = <any> {
			addPattern: {
				and: this.has.bind( this  ),
				getPattern: () => this.getPattern(),
			}
		};
	}

}

export default ValuesPattern;