import {
	IRIResolver,
	MultipleValuesPattern,
	MultipleValuesPatternMore,
	SingleValuesPattern,
	SingleValuesPatternMore,
	SupportedNativeTypes,
	Undefined,
} from "sparqler/patterns";
import { NotTriplesPattern } from "sparqler/patterns/notTriples";
import {
	CLOSE_MULTI_BLOCK,
	CLOSE_SINGLE_BLOCK,
	CLOSE_SINGLE_LIST,
	OPEN_MULTI_BLOCK,
	OPEN_SINGLE_BLOCK,
	OPEN_SINGLE_LIST,
	VALUES,
} from "sparqler/patterns/tokens";
import {
	Literal,
	Resource,
	Variable,
} from "sparqler/patterns/triples";
import { Token } from "sparqler/tokens";
import { serialize } from "sparqler/utils/ObjectPattern";

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
			this.patternTokens.push( ...serialize( values[ 0 ] ) );
		} else {
			this.patternTokens.push( OPEN_SINGLE_LIST );
			values.forEach( value => {
				return this.patternTokens.push( ...serialize( value ) );
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
			},
		};
	}

}

export default ValuesPattern;