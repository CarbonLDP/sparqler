import { Container } from "../clauses/Container";
import { selectDecorator } from "../clauses/decorators/select";
import { subFinishDecorator } from "../clauses/decorators/subFinish";
import {
	SubSelectClause,
	SubWhereClause,
} from "../clauses/interfaces";
import { IRIResolver } from "../iri/IRIResolver";
import { StringLiteral } from "../tokens/StringLiteral";
import { Token } from "../tokens/Token";
import { getBlockTokens } from "../utils/Patterns";
import {
	GraphPattern,
	MultipleValuesPattern,
	NotTriplesPatternBuilder,
	SingleValuesPattern,
	SupportedNativeTypes,
	TriplesNodePattern,
	TriplesPatternBuilder,
} from "./interfaces";
import { NotTriplesPattern } from "./notTriples/NotTriplesPattern";
import { ValuesPattern } from "./notTriples/ValuesPattern";
import {
	AS,
	BIND,
	CLOSE_SINGLE_LIST,
	FILTER,
	GRAPH,
	MINUS,
	OPEN_SINGLE_LIST,
	OPTIONAL,
	SERVICE,
	SILENT,
	UNION,
} from "./tokens";
import { BlankNode } from "./triples/BlankNode";
import { Collection } from "./triples/Collection";
import {
	BooleanLiteral,
	Literal,
	NumericLiteral,
	RDFLiteral,
} from "./triples/Literals";
import { Resource } from "./triples/Resource";
import { Variable } from "./triples/Variable";

export type Undefined = "UNDEF";

export class PatternBuilder implements TriplesPatternBuilder,
                                       NotTriplesPatternBuilder,
                                       SubSelectClause {

	public static get undefined():Undefined { return "UNDEF"; };

	public get undefined():Undefined { return PatternBuilder.undefined; };

	private iriResolver:IRIResolver;

	constructor( iriResolver:IRIResolver ) {
		this.iriResolver = iriResolver;
		selectDecorator( new Container( subFinishDecorator ), this );
	}

	resource( iri:string ):Resource {
		return new Resource( this.iriResolver, iri );
	}

	var( name:string ):Variable {
		return new Variable( this.iriResolver, name );
	}

	literal( value:string ):RDFLiteral;
	literal( value:number ):NumericLiteral;
	literal( value:boolean ):BooleanLiteral;
	literal( value ):any {
		if( typeof value === "string" || value instanceof String )
			return new RDFLiteral( this.iriResolver, value as string );

		if( typeof value === "number" || value instanceof Number )
			return new NumericLiteral( this.iriResolver, value as number );

		if( typeof value === "boolean" || value instanceof Boolean )
			return new BooleanLiteral( this.iriResolver, value as boolean );

		throw new Error( "No valid value of a literal was provided." );
	}

	collection( ...values:(SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ):Collection {
		if( values.length === 0 ) throw Error( "The collection needs at least one value." );
		return new Collection( this.iriResolver, values );
	}

	blankNode():BlankNode {
		return new BlankNode( this.iriResolver );
	}

	graph( iri:string, pattern:GraphPattern ):NotTriplesPattern;
	graph( iri:string, patterns:GraphPattern[] ):NotTriplesPattern;
	graph( variable:Variable, pattern:GraphPattern ):NotTriplesPattern;
	graph( variable:Variable, patterns:GraphPattern[] ):NotTriplesPattern;
	graph( iriOrVariable, patterns ):NotTriplesPattern {
		let graph:Token[] = ( typeof iriOrVariable === "string" )
			? this.iriResolver.resolve( iriOrVariable )
			: iriOrVariable.getSelfTokens();

		let patternTokens:Token[] = getBlockTokens( patterns );
		return new NotTriplesPattern( [ GRAPH, ...graph, ...patternTokens ] );
	}

	optional( pattern:GraphPattern ):NotTriplesPattern;
	optional( patterns:GraphPattern[] ):NotTriplesPattern;
	optional( patterns ):NotTriplesPattern {
		let patternTokens:Token[] = getBlockTokens( patterns );

		return new NotTriplesPattern( [ OPTIONAL, ...patternTokens ] );
	}

	union( pattern1:GraphPattern, pattern2:GraphPattern ):NotTriplesPattern;
	union( pattern1:GraphPattern, patterns2:GraphPattern[] ):NotTriplesPattern;
	union( patterns1:GraphPattern[], pattern2:GraphPattern ):NotTriplesPattern;
	union( patterns1:GraphPattern[], patterns2:GraphPattern[] ):NotTriplesPattern;
	union( patterns1, patterns2 ):NotTriplesPattern {
		let leftPatternTokens:Token[] = getBlockTokens( patterns1 );
		let rightPatternTokens:Token[] = getBlockTokens( patterns2 );

		return new NotTriplesPattern( [ ...leftPatternTokens, UNION, ...rightPatternTokens ] );
	}

	minus( pattern:GraphPattern ):NotTriplesPattern;
	minus( firstPattern:GraphPattern, ...restPatterns:GraphPattern[] ):NotTriplesPattern;
	minus( ...patterns:GraphPattern[] ):NotTriplesPattern {
		let patternTokens:Token[] = getBlockTokens( patterns );

		return new NotTriplesPattern( [ MINUS, ...patternTokens ] );
	}

	values( variable:Variable ):SingleValuesPattern;
	values( ...variables:Variable[] ):MultipleValuesPattern;
	values( ...variables:Variable[] ):SingleValuesPattern | MultipleValuesPattern {
		return new ValuesPattern( this.iriResolver, variables );
	}

	service( resource:string | Resource | Variable, patterns:GraphPattern | GraphPattern[] ):NotTriplesPattern {
		const serviceTokens:Token[] = typeof resource === "string" ?
			this.iriResolver.resolve( resource ) :
			resource.getSelfTokens();

		const patternTokens:Token[] = getBlockTokens( patterns );
		return new NotTriplesPattern( [ SERVICE, ...serviceTokens, ...patternTokens ] );
	}

	serviceSilent( resource:string | Resource | Variable, patterns:GraphPattern | GraphPattern[] ):NotTriplesPattern {
		const serviceTokens:Token[] = typeof resource === "string" ?
			this.iriResolver.resolve( resource ) :
			resource.getSelfTokens();

		const patternTokens:Token[] = getBlockTokens( patterns );
		return new NotTriplesPattern( [ SERVICE, SILENT, ...serviceTokens, ...patternTokens ] );
	}

	bind( rawExpression:string, variable:string | Variable ):NotTriplesPattern {
		variable = typeof variable === "string" ? this.var( variable ) : variable;
		const patternTokens:Token[] = [ BIND, OPEN_SINGLE_LIST, new StringLiteral( rawExpression ), AS, ...variable.getSelfTokens(), CLOSE_SINGLE_LIST ];
		return new NotTriplesPattern( patternTokens );
	}

	filter( rawConstraint:string ):NotTriplesPattern {
		return new NotTriplesPattern( [ FILTER, new StringLiteral( rawConstraint ) ] );
	}

	// SubSelect Clauses methods, decorated in constructor
	select:( ...variables:string[] ) => SubWhereClause;
	selectDistinct:( ...variables:string[] ) => SubWhereClause;
	selectReduced:( ...variables:string[] ) => SubWhereClause;
	selectAll:() => SubWhereClause;
	selectAllDistinct:() => SubWhereClause;
	selectAllReduced:() => SubWhereClause;

}

export default PatternBuilder;
