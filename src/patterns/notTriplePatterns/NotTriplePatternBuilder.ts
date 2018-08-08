import { Container } from "../../data/Container";

import { BindToken } from "../../tokens/BindToken";
import { FilterToken } from "../../tokens/FilterToken";
import { GraphToken } from "../../tokens/GraphToken";
import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { MinusPatternToken } from "../../tokens/MinusPatternToken";
import { NotTripleToken } from "../../tokens/NotTripleToken";
import { OptionalToken } from "../../tokens/OptionalToken";
import { ServicePatternToken } from "../../tokens/ServicePatternToken";
import { TokenNode } from "../../tokens/TokenNode";
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


/**
 * @todo
 */
export interface NotTriplePatternBuilder {
	undefined:Undefined;

	graph( iri:string | Resource | Variable, pattern:Pattern ):GraphPattern;
	graph( iri:string | Resource | Variable, patterns:Pattern[] ):GraphPattern;

	group( patterns:Pattern | Pattern[] ):GroupPattern;

	optional( pattern:Pattern ):OptionalPattern;
	optional( patterns:Pattern[] ):OptionalPattern;

	minus( pattern:Pattern ):MinusPattern;
	minus( firstPattern:Pattern, ...restPatterns:Pattern[] ):MinusPattern;

	service( resource:string | Resource | Variable, patterns:Pattern | Pattern[] ):ServicePattern;
	serviceSilent( resource:string | Resource | Variable, patterns:Pattern | Pattern[] ):ServicePattern;


	filter( rawConstraint:string ):FilterPattern;

	// TODO: Add expression support for this patterns
	bind( rawExpression:string, variable:string | Variable ):BindPattern;

	values( variable:Variable ):SingleValuesPattern;
	values( ...variables:Variable[] ):MultipleValuesPattern;
}


function _getPatternContainer<T extends NotTripleToken>( container:Container<TokenNode>, targetToken:T ):Container<T> {
	return new Container( {
		iriResolver: container.iriResolver,
		targetToken,
	} )
}

function _getPattern<T extends NotTripleToken>( container:Container<TokenNode>, token:T ):NotTriplePattern<T> {
	const patternContainer = _getPatternContainer( container, token );
	return NotTriplePattern.createFrom( patternContainer, {} );
}


function getGraphFn( container:Container<TokenNode> ):NotTriplePatternBuilder[ "graph" ] {
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

function getGroupFn( container:Container<TokenNode> ):NotTriplePatternBuilder[ "group" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const token:GroupPatternToken = new GroupPatternToken();

		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		token.patterns.push( ...patterns.map( x => x.getPattern() ) );

		const patternContainer = _getPatternContainer( container, token );
		return GroupPattern.createFrom( patternContainer, {} );
	}
}

function getOptionalFn( container:Container<TokenNode> ):NotTriplePatternBuilder[ "optional" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const token:OptionalToken = new OptionalToken();

		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		token.addPattern( ...patterns.map( x => x.getPattern() ) );

		return _getPattern( container, token );
	}
}

function getMinusFn( container:Container<TokenNode> ):NotTriplePatternBuilder[ "minus" ] {
	return ( ...patterns:Pattern[] ) => {
		const token:MinusPatternToken = new MinusPatternToken();
		token.groupPattern.patterns
			.push( ...patterns.map( x => x.getPattern() ) );

		return _getPattern( container, token );
	}
}

function getServiceFn( container:Container<TokenNode>, modifier?:"SILENT" ):NotTriplePatternBuilder[ "service" ] {
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


function getFilterFn( container:Container<TokenNode> ):NotTriplePatternBuilder[ "filter" ] {
	return ( rawConstraint:string ) => {
		const token:FilterToken = new FilterToken( rawConstraint );

		return _getPattern( container, token );
	}
}

function getBindFn( container:Container<TokenNode> ):NotTriplePatternBuilder[ "bind" ] {
	return ( rawExpression:string, variable:string | Variable ) => {
		const parsedVar = typeof variable === "string" ?
			new VariableToken( variable ) :
			variable.getSubject();

		const token:BindToken = new BindToken( rawExpression, parsedVar );

		return _getPattern( container, token );
	}
}

function getValuesFn( container:Container<TokenNode> ):NotTriplePatternBuilder[ "values" ] {
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
 * @todo
 */
export const NotTriplePatternBuilder = {
	createFrom<C extends Container<TokenNode>, O extends object>( container:C, object:O ):O & NotTriplePatternBuilder {
		return Object.assign( object, {
			undefined: Undefined,

			graph: getGraphFn( container ),
			group: getGroupFn( container ),
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