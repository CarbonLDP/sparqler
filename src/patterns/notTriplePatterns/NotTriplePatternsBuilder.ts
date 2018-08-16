import { Container } from "../../data/Container";

import { BindToken } from "../../tokens/BindToken";
import { FilterToken } from "../../tokens/FilterToken";
import { GraphToken } from "../../tokens/GraphToken";
import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { MinusPatternToken } from "../../tokens/MinusPatternToken";
import { NotTripleToken } from "../../tokens/NotTripleToken";
import { OptionalToken } from "../../tokens/OptionalToken";
import { ServicePatternToken } from "../../tokens/ServicePatternToken";
import { UnionPatternToken } from "../../tokens/UnionPatternToken";
import { ValuesToken } from "../../tokens/ValuesToken";
import { VariableToken } from "../../tokens/VariableToken";

import { Pattern } from "../Pattern";
import { Resource } from "../triplePatterns/Resource";
import { Variable } from "../triplePatterns/Variable";
import { Undefined } from "../Undefined";

import { BindPattern } from "./BindPattern";
import { FilterPattern } from "./FilterPattern";
import { GraphPattern } from "./GraphPattern";
import { GroupPattern } from "./GroupPattern";
import { MinusPattern } from "./MinusPattern";
import { MultipleValuesPattern } from "./MultipleValuesPattern";
import { NotTriplePattern } from "./NotTriplePattern";
import { OptionalPattern } from "./OptionalPattern";
import { ServicePattern } from "./ServicePattern";
import { SingleValuesPattern } from "./SingleValuesPattern";
import { UnionPattern } from "./UnionPattern";


/**
 * Builder for non triple based patterns.
 */
export interface NotTriplePatternsBuilder {
	/**
	 * Property por a quickly access to the `"UNDEF"` keyword.
	 */
	undefined:Undefined;

	/**
	 * Creates a {@link GraphPattern} for the target named graph
	 * specified by {@param iri}, having the patterns specified.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#accessByLabel}
	 * for more information.
	 *
	 * @param iri The target graph to have the patterns.
	 * @param patterns The patterns to match for the target graph.
	 */
	graph( iri:string | Resource | Variable, patterns:Pattern | Pattern[] ):GraphPattern;

	/**
	 * Creates a {@link GroupPattern} for the patterns specified,
	 * where will group the patterns in a new pattern.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#GroupPatterns}
	 * for more information.
	 *
	 * @param patterns The patterns to be enclosed in a group.
	 */
	group( patterns:Pattern | Pattern[] ):GroupPattern;

	/**
	 * Creates a {@link UnionPattern} for the patterns specified,
	 * where will group the pattern to be used as an alternative
	 * matching for another group declared by the subsequents
	 * {@link UnionPattern.and} methods.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#alternatives}
	 * for more information.
	 *
	 * @param patterns The patterns to be enclosed in a group.
	 */
	union( patterns:Pattern | Pattern[] ):UnionPattern;

	/**
	 * Creates an {@link OptionalPattern} for the patterns specified,
	 * which will be considered as optional to match and retrieve.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#optionals}
	 * for more information.
	 *
	 * @param patterns The patterns to be enclosed in a optional
	 * group.
	 */
	optional( patterns:Pattern | Pattern[] ):OptionalPattern;

	/**
	 * Creates a {@link MinusPattern} for the patterns specified
	 * which will be excluded from the query.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#neg-minus}
	 * for more information.
	 *
	 * @param patterns The patterns to be enclosed in a minus
	 * group.
	 */
	minus( patterns:Pattern | Pattern[] ):MinusPattern;

	/**
	 * Creates a {@link ServicePattern} for the target resource
	 * service and the patterns specified.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-federated-query/}
	 * for more information.
	 *
	 * @param resource The service where to execute the federated
	 * query.
	 * @param patterns The patterns of the target service.
	 */
	service( resource:string | Resource | Variable, patterns:Pattern | Pattern[] ):ServicePattern;
	/**
	 * Creates a silent {@link ServicePattern} for the target resource
	 * service and the patterns specified.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-federated-query/}
	 * for more information.
	 *
	 * @param resource The service where to execute the federated
	 * query.
	 * @param patterns The patterns of the target service.
	 */
	serviceSilent( resource:string | Resource | Variable, patterns:Pattern | Pattern[] ):ServicePattern;


	/**
	 * Create a {@link FilterPattern} for the raw constraint.
	 *
	 * This is used to exclude values or entire patterns.
	 * See {@link https://www.w3.org/TR/sparql11-query/#termConstraint
     * and {@link https://www.w3.org/TR/sparql11-query/#negation} to
	 * know more.
	 *
	 * @param rawConstraint The RAW constraint to filter.
	 */
	filter( rawConstraint:string ):FilterPattern;

	/**
	 * Created a {@link BindPattern} for the raw expression
	 * into the variable specified.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#bind}
	 * for more information.
	 *
	 * @param rawExpression The RAW expression to assign.
	 * @param variable The variable to be assigned.
	 */
	// TODO: Add expression support for this patterns
	bind( rawExpression:string, variable:string | Variable ):BindPattern;

	/**
	 * Create a {@link SingleValuesPattern} for the variable
	 * specified.
	 *
	 * This is used to assign data to an specific variable.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#inline-data}
	 * for more information.
	 *
	 * @param variable The variable to assign data.
	 */
	values( variable:Variable ):SingleValuesPattern;
	/**
	 * Create a {@link MultipleValuesPattern} for the variables
	 * specified.
	 *
	 * This is used to assign data to multiple variables.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#inline-data}
	 * for more information.
	 *
	 * @param variables The variables to assign data.
	 */
	values( ...variables:Variable[] ):MultipleValuesPattern;
}


function _getPatternContainer<T extends NotTripleToken>( container:Container<undefined>, targetToken:T ):Container<T> {
	return new Container( {
		iriResolver: container.iriResolver,
		targetToken,
	} )
}

function _getPattern<T extends NotTripleToken>( container:Container<undefined>, token:T ):NotTriplePattern<T> {
	const patternContainer = _getPatternContainer( container, token );
	return NotTriplePattern.createFrom( patternContainer, {} );
}


function getGraphFn( container:Container<undefined> ):NotTriplePatternsBuilder[ "graph" ] {
	return ( iriOrVariable:string | Resource | Variable, patterns:Pattern | Pattern[] ) => {
		const varOrIRI = typeof iriOrVariable === "string" ?
			container.iriResolver.resolve( iriOrVariable ) :
			iriOrVariable.getSubject();

		const token:GraphToken = new GraphToken( varOrIRI );

		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		token.addPattern( ...patterns.map( x => x.getPattern() ) );

		return _getPattern( container, token );
	}
}

function getGroupFn( container:Container<undefined> ):NotTriplePatternsBuilder[ "group" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const token:GroupPatternToken = new GroupPatternToken();

		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		token.patterns.push( ...patterns.map( x => x.getPattern() ) );

		const patternContainer = _getPatternContainer( container, token );
		return GroupPattern.createFrom( patternContainer, {} );
	}
}

function getUnionFn( container:Container<undefined> ):NotTriplePatternsBuilder[ "union" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const token:UnionPatternToken = new UnionPatternToken();

		const patternContainer = _getPatternContainer( container, token );
		const unionPattern:UnionPattern = UnionPattern
			.createFrom( patternContainer, {} );

		return unionPattern.and( patterns );
	}
}

function getOptionalFn( container:Container<undefined> ):NotTriplePatternsBuilder[ "optional" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const token:OptionalToken = new OptionalToken();

		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		token.addPattern( ...patterns.map( x => x.getPattern() ) );

		return _getPattern( container, token );
	}
}

function getMinusFn( container:Container<undefined> ):NotTriplePatternsBuilder[ "minus" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];

		const token:MinusPatternToken = new MinusPatternToken();
		token.groupPattern.patterns
			.push( ...patterns.map( x => x.getPattern() ) );

		return _getPattern( container, token );
	}
}

function getServiceFn( container:Container<undefined>, modifier?:"SILENT" ):NotTriplePatternsBuilder[ "service" ] {
	return ( resource:string | Resource | Variable, patterns:Pattern | Pattern[] ) => {
		const varOrIRI = typeof resource === "string" ?
			container.iriResolver.resolve( resource ) :
			resource.getSubject();

		const token:ServicePatternToken = new ServicePatternToken( varOrIRI, modifier );

		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		token.groupPattern.patterns
			.push( ...patterns.map( x => x.getPattern() ) );

		return _getPattern( container, token );
	}
}


function getFilterFn( container:Container<undefined> ):NotTriplePatternsBuilder[ "filter" ] {
	return ( rawConstraint:string ) => {
		const token:FilterToken = new FilterToken( rawConstraint );

		return _getPattern( container, token );
	}
}

function getBindFn( container:Container<undefined> ):NotTriplePatternsBuilder[ "bind" ] {
	return ( rawExpression:string, variable:string | Variable ) => {
		const parsedVar = typeof variable === "string" ?
			new VariableToken( variable ) :
			variable.getSubject();

		const token:BindToken = new BindToken( rawExpression, parsedVar );

		return _getPattern( container, token );
	}
}

function getValuesFn( container:Container<undefined> ):NotTriplePatternsBuilder[ "values" ] {
	return ( ...variables:Variable[] ) => {
		const token:ValuesToken = new ValuesToken();
		token.variables.push( ...variables.map( x => x.getSubject() ) );

		const patternContainer = _getPatternContainer( container, token );

		if( variables.length === 1 )
			return SingleValuesPattern
				.createFrom( patternContainer, {} );

		return MultipleValuesPattern
			.createFrom( patternContainer, {} );
	}
}


/**
 * Constant with the utils for {@link NotTriplePatternsBuilder} objects.
 */
export const NotTriplePatternsBuilder:{
	/**
	 * Factory function that allows to crete a {@link NotTriplePatternsBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link NotTriplePatternsBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link NotTriplePatternsBuilder} statement.
	 *
	 * @return The {@link NotTriplePatternsBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & NotTriplePatternsBuilder;
} = {
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & NotTriplePatternsBuilder {
		return Object.assign( object, {
			undefined: "UNDEF" as "UNDEF",

			graph: getGraphFn( container ),
			group: getGroupFn( container ),
			union: getUnionFn( container ),
			optional: getOptionalFn( container ),
			minus: getMinusFn( container ),
			service: getServiceFn( container ),
			serviceSilent: getServiceFn( container, "SILENT" ),

			filter: getFilterFn( container ),
			bind: getBindFn( container ),
			values: getValuesFn( container ),
		} )
	},
};