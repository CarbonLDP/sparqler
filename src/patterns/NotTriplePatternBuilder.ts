import { Container2 } from "../data/Container2";

import { BindToken } from "../tokens/BindToken";
import { FilterToken } from "../tokens/FilterToken";
import { GraphToken } from "../tokens/GraphToken";
import { GroupPatternToken } from "../tokens/GroupPatternToken";
import { MinusPatternToken } from "../tokens/MinusPatternToken";
import { NotTripleToken } from "../tokens/NotTripleToken";
import { OptionalToken } from "../tokens/OptionalToken";
import { ServicePatternToken } from "../tokens/ServicePatternToken";
import { TokenNode } from "../tokens/TokenNode";
import { ValuesToken } from "../tokens/ValuesToken";
import { VariableToken } from "../tokens/VariableToken";

import { BindPattern } from "./notTriplePatterns/BindPattern";
import { FilterPattern } from "./notTriplePatterns/FilterPattern";
import { GraphPattern } from "./notTriplePatterns/GraphPattern";
import { GroupPattern } from "./notTriplePatterns/GroupPattern";
import { MinusPattern } from "./notTriplePatterns/MinusPattern";
import { MultipleValuesPattern } from "./notTriplePatterns/MultipleValuesPattern";
import { NotTriplePattern } from "./notTriplePatterns/NotTriplePattern";
import { OptionalPattern } from "./notTriplePatterns/OptionalPattern";
import { ServicePattern } from "./notTriplePatterns/ServicePattern";
import { SingleValuesPattern } from "./notTriplePatterns/SingleValuesPattern";
import { Pattern } from "./Pattern";
import { Resource } from "./triplePatterns/Resource";
import { Variable } from "./triplePatterns/Variable";
import { Undefined } from "./Undefined";


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


function _getPatternContainer<T extends NotTripleToken>( container:Container2<TokenNode>, targetToken:T ):Container2<T> {
	return new Container2( {
		iriResolver: container.iriResolver,
		targetToken,
	} )
}

function _getPattern<T extends NotTripleToken>( container:Container2<TokenNode>, token:T ):NotTriplePattern<T> {
	const patternContainer = _getPatternContainer( container, token );
	return NotTriplePattern.createFrom( patternContainer, {} );
}


function getGraphFn( container:Container2<TokenNode> ):NotTriplePatternBuilder[ "graph" ] {
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

function getGroupFn( container:Container2<TokenNode> ):NotTriplePatternBuilder[ "group" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const token:GroupPatternToken = new GroupPatternToken();

		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		token.patterns.push( ...patterns.map( x => x.getPattern() ) );

		const patternContainer = _getPatternContainer( container, token );
		return GroupPattern.createFrom( patternContainer, {} );
	}
}

function getOptionalFn( container:Container2<TokenNode> ):NotTriplePatternBuilder[ "optional" ] {
	return ( patterns:Pattern | Pattern[] ) => {
		const token:OptionalToken = new OptionalToken();

		patterns = Array.isArray( patterns ) ? patterns : [ patterns ];
		token.addPattern( ...patterns.map( x => x.getPattern() ) );

		return _getPattern( container, token );
	}
}

function getMinusFn( container:Container2<TokenNode> ):NotTriplePatternBuilder[ "minus" ] {
	return ( ...patterns:Pattern[] ) => {
		const token:MinusPatternToken = new MinusPatternToken();
		token.groupPattern.patterns
			.push( ...patterns.map( x => x.getPattern() ) );

		return _getPattern( container, token );
	}
}

function getServiceFn( container:Container2<TokenNode>, modifier?:"SILENT" ):NotTriplePatternBuilder[ "service" ] {
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


function getFilterFn( container:Container2<TokenNode> ):NotTriplePatternBuilder[ "filter" ] {
	return ( rawConstraint:string ) => {
		const token:FilterToken = new FilterToken( rawConstraint );

		return _getPattern( container, token );
	}
}

function getBindFn( container:Container2<TokenNode> ):NotTriplePatternBuilder[ "bind" ] {
	return ( rawExpression:string, variable:string | Variable ) => {
		const parsedVar = typeof variable === "string" ?
			new VariableToken( variable ) :
			variable.getSubject();

		const token:BindToken = new BindToken( rawExpression, parsedVar );

		return _getPattern( container, token );
	}
}

function getValuesFn( container:Container2<TokenNode> ):NotTriplePatternBuilder[ "values" ] {
	return ( ...variables:Variable[] ) => {
		const token:ValuesToken = new ValuesToken();
		token.variables.push( ...variables.map( x => x.getSubject() ) );

		const patternContainer = _getPatternContainer( container, token );

		if( variables.length > 1 )
			return MultipleValuesPattern
				.createFrom( patternContainer, {} );

		return SingleValuesPattern
			.createFrom( patternContainer, {} );
	}
}


/**
 * @todo
 */
export const NotTriplePatternBuilder = {
	createFrom<C extends Container2<TokenNode>, O extends object>( container:C, object:O ):O & NotTriplePatternBuilder {
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