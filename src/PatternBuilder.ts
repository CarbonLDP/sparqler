import {
	GraphPattern,
	TriplesPatternBuilder,
	NotTriplesPatternBuilder,
	SupportedNativeTypes,
	SingleValuesPattern,
	MultipleValuesPattern,
	IRIResolver,
	TriplesNodePattern
} from "./Patterns";
import {
	RDFLiteral,
	NumericLiteral,
	BooleanLiteral,
	Literal
} from "./TriplesPatterns/Literals";
import { Resource } from "./TriplesPatterns/Resource";
import { Variable } from "./TriplesPatterns/Variable";
import { BlankNode } from "./TriplesPatterns/BlankNode";
import { Collection } from "./TriplesPatterns/Collection";
import { NotTriplesPattern } from "./NotTriplesPatterns/NotTriplesPattern";
import { Token } from "./Tokens/Token";
import {
	GRAPH,
	OPTIONAL,
	UNION,
	MINUS,
	SERVICE,
	SILENT,
	BIND,
	AS,
	OPEN_SINGLE_LIST,
	CLOSE_SINGLE_LIST,
	FILTER,
} from "./Patterns/Tokens";
import * as Utils from "./Utils/Patterns";
import { ValuesPattern } from "./NotTriplesPatterns/ValuesPattern";
import { StringLiteral } from "./Tokens/StringLiteral";

export type Undefined = "UNDEF";
export class PatternBuilder implements TriplesPatternBuilder,
                                       NotTriplesPatternBuilder {

	public static get undefined():Undefined { return "UNDEF" };

	public get undefined():Undefined { return PatternBuilder.undefined };

	private resolver:IRIResolver;

	constructor( resolver:IRIResolver ) {
		this.resolver = resolver;
	}

	resource( iri:string ):Resource {
		return new Resource( this.resolver, iri );
	}

	var( name:string ):Variable {
		return new Variable( this.resolver, name );
	}

	literal( value:string ):RDFLiteral;
	literal( value:number ):NumericLiteral;
	literal( value:boolean ):BooleanLiteral;
	literal( value ):any {
		if( typeof value === "string" || value instanceof String )
			return new RDFLiteral( this.resolver, value as string );

		if( typeof value === "number" || value instanceof Number )
			return new NumericLiteral( this.resolver, value as number );

		if( typeof value === "boolean" || value instanceof Boolean )
			return new BooleanLiteral( this.resolver, value as boolean );

		throw new Error( "InvalidArgumentError: No valid value of a literal was provided." );
	}

	collection( ...values:(SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ):Collection {
		if( values.length === 0 ) throw Error( "InvalidArgumentError: The collection needs at least one value." );
		return new Collection( this.resolver, values );
	}

	blankNode():BlankNode {
		return new BlankNode( this.resolver );
	}

	graph( iri:string, pattern:GraphPattern ):NotTriplesPattern;
	graph( iri:string, patterns:GraphPattern[] ):NotTriplesPattern;
	graph( variable:Variable, pattern:GraphPattern ):NotTriplesPattern;
	graph( variable:Variable, patterns:GraphPattern[] ):NotTriplesPattern;
	graph( iriOrVariable, patterns ):NotTriplesPattern {
		let graph:Token[] = ( typeof iriOrVariable === "string" )
			? this.resolver._resolveIRI( iriOrVariable )
			: iriOrVariable.getSelfTokens();

		let patternTokens:Token[] = Utils.getBlockTokens( patterns );
		return new NotTriplesPattern( [ GRAPH, ...graph, ...patternTokens ] );
	}

	optional( pattern:GraphPattern ):NotTriplesPattern;
	optional( patterns:GraphPattern[] ):NotTriplesPattern;
	optional( patterns ):NotTriplesPattern {
		let patternTokens:Token[] = Utils.getBlockTokens( patterns );

		return new NotTriplesPattern( [ OPTIONAL, ...patternTokens ] );
	}

	union( pattern1:GraphPattern, pattern2:GraphPattern ):NotTriplesPattern;
	union( pattern1:GraphPattern, patterns2:GraphPattern[] ):NotTriplesPattern;
	union( patterns1:GraphPattern[], pattern2:GraphPattern ):NotTriplesPattern;
	union( patterns1:GraphPattern[], patterns2:GraphPattern[] ):NotTriplesPattern;
	union( patterns1, patterns2 ):NotTriplesPattern {
		let leftPatternTokens:Token[] = Utils.getBlockTokens( patterns1 );
		let rightPatternTokens:Token[] = Utils.getBlockTokens( patterns2 );

		return new NotTriplesPattern( [ ...leftPatternTokens, UNION, ...rightPatternTokens ] );
	}

	minus( pattern:GraphPattern ):NotTriplesPattern;
	minus( firstPattern:GraphPattern, ...restPatterns:GraphPattern[] ):NotTriplesPattern;
	minus( ...patterns:GraphPattern[] ):NotTriplesPattern {
		let patternTokens:Token[] = Utils.getBlockTokens( patterns );

		return new NotTriplesPattern( [ MINUS, ...patternTokens ] );
	}

	values( variable:Variable ):SingleValuesPattern;
	values( ...variables:Variable[] ):MultipleValuesPattern;
	values( ...variables:Variable[] ):SingleValuesPattern | MultipleValuesPattern {
		return new ValuesPattern( this.resolver, variables );
	}


	// Expressions

	service( resource:string | Resource | Variable, patterns:GraphPattern | GraphPattern[] ):NotTriplesPattern {
		const serviceTokens:Token[] = typeof resource === "string" ?
			this.resolver._resolveIRI( resource ) :
			resource.getSelfTokens();

		const patternTokens:Token[] = Utils.getBlockTokens( patterns );
		return new NotTriplesPattern( [ SERVICE, ...serviceTokens, ...patternTokens ] );
	}

	serviceSilent( resource:string | Resource | Variable, patterns:GraphPattern | GraphPattern[] ):NotTriplesPattern {
		const serviceTokens:Token[] = typeof resource === "string" ?
			this.resolver._resolveIRI( resource ) :
			resource.getSelfTokens();

		const patternTokens:Token[] = Utils.getBlockTokens( patterns );
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

}

export default PatternBuilder;