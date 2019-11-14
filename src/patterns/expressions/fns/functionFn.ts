import { Container } from "../../../core/containers/Container";
import { cloneElement } from "../../../core/containers/utils";
import { Factory } from "../../../core/factories/Factory";

import { ExpressionListToken } from "../../../tokens/ExpressionListToken";
import { ExpressionToken } from "../../../tokens/ExpressionToken";
import { FunctionToken } from "../../../tokens/FunctionToken";
import { GroupPatternToken } from "../../../tokens/GroupPatternToken";
import { IRIToken } from "../../../tokens/IRIToken";
import { VariableToken } from "../../../tokens/VariableToken";

import { Pattern } from "../../Pattern";
import { Resource } from "../../triplePatterns/Resource";
import { Variable } from "../../triplePatterns/Variable";
import { Expression } from "../Expression";

import { _expressionTransformerFn, SupportedTypes } from "./utils";


/**
 * Const enum with the names of every function
 */
export const enum Functions {
	STR = "STR",
	LANG = "LANG",
	LANG_MATCHES = "LANGMATCHES",
	DATATYPE = "DATATYPE",
	BOUND = "BOUND",
	IRI = "IRI",
	URI = "URI",
	BNODE = "BNODE",
	RAND = "RAND",
	ABS = "ABS",
	CEIL = "CEIL",
	FLOOR = "FLOOR",
	ROUND = "ROUND",
	CONCAT = "CONCAT",
	SUBSTR = "SUBSTR",
	STRLEN = "STRLEN",
	REPLACE = "REPLACE",
	UCASE = "UCASE",
	LCASE = "LCASE",
	ENCODE_FOR_URI = "ENCODE_FOR_URI",
	CONTAINS = "CONTAINS",
	STR_STARTS = "STRSTARTS",
	STR_ENDS = "STRENDS",
	STR_BEFORE = "STRBEFORE",
	STR_AFTER = "STRAFTER",
	YEAR = "YEAR",
	MONTH = "MONTH",
	DAY = "DAY",
	HOURS = "HOURS",
	MINUTES = "MINUTES",
	SECONDS = "SECONDS",
	TIMEZONE = "TIMEZONE",
	TZ = "TZ",
	NOW = "NOW",
	UUID = "UUID",
	STR_UUID = "STRUUID",
	MD5 = "MD5",
	SHA1 = "SHA1",
	SHA256 = "SHA256",
	SHA384 = "SHA384",
	SHA512 = "SHA512",
	COALESCE = "COALESCE",
	IF = "IF",
	STR_LANG = "STRLANG",
	STR_DT = "STRDT",
	SAME_TERM = "sameTerm",
	IS_IRI = "isIRI",
	IS_URI = "isURI",
	IS_BLANK = "isBLANK",
	IS_LITERAL = "isLITERAL",
	IS_NUMERIC = "isNUMERIC",
	REGEX = "REGEX",
	EXISTS = "EXISTS ",
	NOT_EXISTS = "NOT EXISTS ",
	COUNT = "COUNT",
	SUM = "SUM",
	MIN = "MIN",
	MAX = "MAX",
	AVG = "AVG",
	SAMPLE = "SAMPLE",
	GROUP_CONCAT = "GROUP_CONCAT",
}


function _getExpression(
	factory:Factory<Container<ExpressionToken>, Expression>,
	container:Container<any>,
	name:Functions | IRIToken,
	listOrPatterns:ExpressionListToken | GroupPatternToken
):Expression {
	const targetToken = new FunctionToken( name, listOrPatterns );

	const newContainer:Container<ExpressionToken> =
		cloneElement( container, { targetToken } );

	return factory( newContainer, {} )
}

// Special Pattern Function Generator

export function getPatternFunctionFn(
	factory:Factory<Container<ExpressionToken>, Expression>,
	container:Container<undefined>,
	name:Functions,
) {
	return ( firstPattern?:Pattern | Pattern[], ...restPatterns:Pattern[] ) => {
		const patterns = Array.isArray( firstPattern ) ? firstPattern
			: !firstPattern ? [] : [ firstPattern, ...restPatterns ];

		const patternTokens = patterns.map( _ => _._getPattern() );

		const groupPatternToken = new GroupPatternToken()
			.addPattern( ...patternTokens );

		return _getExpression( factory, container, name, groupPatternToken );
	}
}


// Base Function Generator

export function getBaseFunctionFn(
	factory:Factory<Container<ExpressionToken>, Expression>,
	container:Container<ExpressionToken | undefined>,
	name:Functions | IRIToken,
	// Set a limit of expressions, or no data if `null`
	limit?:number | null,
	distinct?:boolean,
	separator?:string,
) {
	return ( ...expressions:(SupportedTypes | undefined)[] ) => {
		// Add container token as first expression
		if( container.targetToken )
			expressions.unshift( container.targetToken );

		// Select expressions and convert them if necessary
		const listTokens = limit === null ? undefined
			: expressions
				.slice( 0, limit )
				.filter( ( _ ):_ is SupportedTypes => _ !== undefined )
				.map( _expressionTransformerFn( container ) );

		const list = new ExpressionListToken( listTokens, distinct, separator );
		return _getExpression( factory, container, name, list );
	}
}


// Specialized Function Generators

export function getVariableFunctionFn(
	factory:Factory<Container<ExpressionToken>, Expression>,
	container:Container<ExpressionToken | undefined>,
	name:Functions | IRIToken,
) {
	return ( variable:Variable | VariableToken | string ) => {
		if( typeof variable === "string" ) variable = new VariableToken( variable );
		return getBaseFunctionFn( factory, container, name, undefined )( variable )
	}
}

export function getCustomFunctionFn(
	factory:Factory<Container<ExpressionToken>, Expression>,
	container:Container<undefined>,
	distinct?:boolean,
) {
	return ( resource:Resource | string, ...expressions:SupportedTypes[] ) => {
		const iri = typeof resource === "string"
			? container.iriResolver.resolve( resource )
			: resource._getSubject();

		return getBaseFunctionFn( factory, container, iri, undefined, distinct )( ...expressions );
	}
}

export function getRegexFunctionFn(
	factory:Factory<Container<ExpressionToken>, Expression>,
	container:Container<ExpressionToken | undefined>,
	name:Functions,
	limit:number,
) {
	return ( ...rawExpressions:(SupportedTypes | RegExp | undefined)[] ) => {
		let flags:string | undefined;
		const expressions:(SupportedTypes | undefined)[] = rawExpressions
			.map( value => {
				if( !(value instanceof RegExp) ) return value;

				flags = value.flags;
				return value.source;
			} );

		if( flags ) expressions.push( flags );

		return getBaseFunctionFn( factory, container, name, limit )( ...expressions );
	}
}


export function getSeparatorFunctionFn(
	factory:Factory<Container<ExpressionToken>, Expression>,
	container:Container<ExpressionToken | undefined>,
	name:Functions,
	distinct?:boolean,
) {
	return ( expression?:SupportedTypes | string, separator?:string ) => {
		// If self function, then separator is the first argument
		if( container.targetToken )
			separator = expression as string;

		return getBaseFunctionFn( factory, container, name, 1, distinct, separator )( expression );
	}
}
