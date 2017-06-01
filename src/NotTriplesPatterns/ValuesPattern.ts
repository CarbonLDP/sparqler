import { NotTriplesPattern } from "./NotTriplesPattern";
import {
	SingleValuesPattern,
	SupportedNativeTypes,
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
	private length:number;

	protected interfaces:{
		addPattern:SingleValuesPatternMore | MultipleValuesPatternMore;
	};

	constructor( resolver:IRIResolver, variables:Variable[] ) {
		super( [ VALUES ] );
		this.init();

		this.resolver = resolver;
		this.length = variables.length;

		if( this.length === 1 ) {
			this.patternTokens.push( ...variables[ 0 ].getSelfTokens(), OPEN_SINGLE_BLOCK );
		} else {
			this.patternTokens.push( OPEN_SINGLE_LIST );
			variables.forEach( variable => this.patternTokens.push( ...variable.getSelfTokens() ) );
			this.patternTokens.push( CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK );
		}
	}

	has( value:SupportedNativeTypes ):SingleValuesPatternMore;
	has( value:Resource ):SingleValuesPatternMore;
	has( value:Literal ):SingleValuesPatternMore;
	has( value:Undefined ):SingleValuesPatternMore;
	has( ...values:( SupportedNativeTypes | Resource | Literal | Undefined )[] ):MultipleValuesPatternMore;
	has( ...values ):( SingleValuesPatternMore | MultipleValuesPatternMore ) {
		if( this.length !== values.length ) throw new Error( "InvalidArgumentError: The number of variables and values are different." );

		if( this.length === 1 ) {
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
		if( this.length === 1 ) {
			this.patternTokens.push( CLOSE_SINGLE_BLOCK );
		} else {
			this.patternTokens.push( CLOSE_MULTI_BLOCK );
		}

		return this.patternTokens;
	}

	private init():void {
		this.interfaces = <any> {
			addPattern: {
				and: this.has.bind( this ),
				getPattern: () => this.getPattern(),
			}
		};
	}

}

export default ValuesPattern;