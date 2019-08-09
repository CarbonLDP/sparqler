import { Container } from "../../data/Container";

import { isAbsolute } from "../../iri/utils";

import { ExpressionListToken } from "../../tokens/ExpressionListToken";
import { ExpressionToken } from "../../tokens/ExpressionToken";
import { FunctionToken } from "../../tokens/FunctionToken";
import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { IRIToken } from "../../tokens/IRIToken";
import { VariableToken } from "../../tokens/VariableToken";

import { Pattern } from "../Pattern";
import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { Resource } from "../triplePatterns/Resource";
import { Variable } from "../triplePatterns/Variable";

import { convertValue } from "../utils";

import { Expression } from "./Expression";
import { FunctionExpression } from "./FunctionExpression";


/**
 * Const enum with the names of every function
 */
const enum Functions {
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


/**
 * Builder for function expressions.
 */
export interface FunctionExpressionsBuilder {
	/**
	 * Creates an {@link Expression} that returns true if {@param variable}
	 * is bound to a value.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-bound}
	 * for more information.
	 *
	 * @param variable - Variable to evaluate if it's associated to a value.
	 */
	bound( variable:Variable | string ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that evaluates {@param condition} and then
	 * returns the {@param consequent} value if the condition is true,
	 * otherwise it returns {@param alternative}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-if}
	 * for more information.
	 *
	 * @param condition - Expression to evaluate for its effective boolean value.
	 * @param consequent - Expression to return its value when the condition is evaluated to `true`.
	 * @param alternative - Expression to returns its value when the condition is evaluated to `false.`
	 */
	if( condition:Expression | SupportedNativeTypes, consequent:Expression | SupportedNativeTypes, alternative:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the value of the first expression
	 * from the {@param expressions} list that evaluates without error.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-coalesce}
	 * for more information.
	 *
	 * @param expressions - Expressions to be evaluated for the non-raising error one.
	 */
	coalesce( ...expressions:(Expression | SupportedNativeTypes)[] ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param patterns}
	 * matches the data set, or `false` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-filter-exists}
	 * for more information.
	 *
	 * @param patterns - Patterns to evaluate if matches the data set.
	 */
	exists( patterns:Pattern[] ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns `true` if {@param patterns}
	 * matches the data set, or `false` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-filter-exists}
	 * for more information.
	 *
	 * @param patterns - Patterns to evaluate if matches the data set.
	 */
	exists( ...patterns:Pattern[] ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns `false` if {@param patterns}
	 * matches the data set, or `true` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-filter-exists}
	 * for more information.
	 *
	 * @param patterns - Patterns to evaluate if not matches the data set.
	 */
	notExists( patterns:Pattern[] ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns `false` if {@param patterns}
	 * matches the data set, or `true` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-filter-exists}
	 * for more information.
	 *
	 * @param patterns - Patterns to evaluate if not matches the data set.
	 */
	notExists( ...patterns:Pattern[] ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term1} and
	 * {@param term2} are the same RDF term, or `false` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-sameTerm}
	 * for more information.
	 *
	 * @param term1 - Expression to evaluate its value against {@param term2}.
	 * @param term2 - Expression to evaluate its value against {@param term1}.
	 */
	sameTerm( term1:Expression | SupportedNativeTypes, term2:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * an IRI. Returns `false` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-isIRI}
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isIRI( term:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * an URI. Returns `false` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-isIRI}
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isURI( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * a blank node. Returns `false` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-isBlank}
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isBlank( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * a literal. Returns `false` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-isLiteral}
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isLiteral( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * a numeric value. Returns `false` otherwise.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-isNumeric}
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isNumeric( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the string representation of
	 * {@param term}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-str}
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	str( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the language tag of
	 * {@param literal}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-lang}
	 * for more information.
	 *
	 * @param literal - Expression to evaluate its value lang.
	 */
	lang( literal:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the datatype IRI of
	 * {@param literal}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-datatype}
	 * for more information.
	 *
	 * @param literal - Expression to evaluate its value lang.
	 */
	datatype( literal:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that constructs an IRI by resolving
	 * {@param argument}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-iri}
	 * for more information.
	 *
	 * @param argument - Expression to construct an IRI with its value.
	 */
	iri( argument:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that constructs a URI by resolving
	 * {@param argument}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-iri}
	 * for more information.
	 *
	 * @param argument - Expression to construct a URI with its value.
	 */
	uri( argument:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that constructs a blank node that is
	 * distinct from all blank nodes in the data set.
	 * If {@param literal} is provided, it will be used as base for the blank
	 * node label.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-bnode}
	 * for more information.
	 *
	 * @param literal - Optional expression to use its value for the blank node creation.
	 */
	bnode( literal?:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that constructs an RDF literal with
	 * {@param lexicalForm} and {@param dataType} specified.
	 * node label.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-strdt}
	 * for more information.
	 *
	 * @param lexicalForm - Expresion with a string value to use as the lexical form of the literal.
	 * @param dataType - Expresion with an IRI value to use as the datatype of the literal.
	 */
	strDT( lexicalForm:Expression | SupportedNativeTypes, dataType:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that constructs an RDF literal with the
	 * {@param lexicalForm} and {@param languageTag} specified.
	 * node label.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-strlang}
	 * for more information.
	 *
	 * @param lexicalForm - Expresion with a string value to use as the lexical form of the literal.
	 * @param languageTag - Expresion with a string value to use as the language tag of the literal.
	 */
	strLang( lexicalForm:Expression | SupportedNativeTypes, languageTag:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns an IRI from the
	 * {@link https://www.ietf.org/rfc/rfc4122.txt UUID URN scheme}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-uuid}
	 * for more information.
	 */
	uuid():FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns a string with an UUID.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-struuid}
	 * for more information.
	 */
	strUUID():FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the number of characters
	 * of the {@param str} expression value.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-strlen}
	 * for more information.
	 *
	 * @param str - Expression to count the characters of its string value.
	 */
	strLen( str:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns a the portion of the
	 * {@param source} value beginning at the position indicated by the value of
	 * {@param starting} and counting fot the number of characters indicated by
	 * the value of {@param length} if provided, otherwise it {@param length}
	 * will be considered infinite.
	 *
	 * The index of the first character of a string is 1.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-substr}
	 * for more information.
	 *
	 * @param source Expression with the string value to extract the portion from.
	 * @param starting Expression with the index from where to start the portion to take.
	 * @param length Expression with the number of characters of the portion to take.
	 */
	substr( source:Expression | SupportedNativeTypes, starting:Expression | SupportedNativeTypes, length?:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the {@param str} value
	 * converted to uppercase.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-ucase}
	 * for more information.
	 *
	 * @param str Expression with the string value to convert.
	 */
	uCase( str:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the {@param str} value
	 * converted to lowercase.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-lcase}
	 * for more information.
	 *
	 * @param str Expression with the string value to convert.
	 */
	lCase( str:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the `true` of the value of
	 * {@param arg1} starts with the value of {@param arg2}, otherwise it
	 * returns `false`.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-strstarts}
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check it starts with {@param arg2}.
	 * @param arg2 Expression with the string value to check it's the start of {@param arg1}.
	 */
	strStarts( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the `true` of the value of
	 * {@param arg1} ends with the value of {@param arg2}, otherwise it
	 * returns `false`.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-strends}
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check it ends with {@param arg2}.
	 * @param arg2 Expression with the string value to check it's the end of {@param arg1}.
	 */
	strEnds( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the `true` of the value of
	 * {@param arg1} contains the value of {@param arg2} as a substring,
	 * otherwise it returns `false`.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-strends}
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check it contains {@param arg2}.
	 * @param arg2 Expression with the string value to check it's contained by {@param arg1}.
	 */
	contains( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the part the {@param arg1}
	 * value that precedes the first occurrence of {@param arg2} value.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-strends}
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check and return the preceded part.
	 * @param arg2 Expression with the string value to check where it appears in {@param arg1}.
	 */
	strBefore( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the part the {@param arg1}
	 * value that follows the first occurrence of {@param arg2} value.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-strafter}
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check and return the followed part.
	 * @param arg2 Expression with the string value to check where it appears in {@param arg1}.
	 */
	strAfter( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns a literal with the encoded
	 * special characters that the value of the {@param literal} provided may have.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-encode}
	 * for more information.
	 *
	 * @param literal Expression with the string value to encode.
	 */
	encodeForUri( literal:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the concatenation of the
	 * string values of the {@param literals} provided.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-concat}
	 * for more information.
	 *
	 * @param literals Expressions with the string values to concatenate.
	 */
	concat( ...literals:(Expression | SupportedNativeTypes)[] ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param languageTag}
	 * value matches {@param languageRange} as defined in
	 * {@link https://www.ietf.org/rfc/rfc4647.txt Matching of Language}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-langMatches}
	 * for more information.
	 *
	 * @param languageTag Expressions with the language tag to be checked.
	 * @param languageRange Expression with the language range that {@param languageTag} will be checked against.
	 */
	langMatches( languageTag:Expression | SupportedNativeTypes, languageRange:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param text}
	 * value matches {@param pattern} regular expression, applying the
	 * {@param flags} rules if defined.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-regex}
	 * for more information.
	 *
	 * @param text Expressions with string value to be checked.
	 * @param pattern Expression with the regular expression used as the matcher.
	 * @param flags Optional expression with the matching rules to be applied.
	 */
	regex( text:Expression | SupportedNativeTypes, pattern:Expression | SupportedNativeTypes, flags?:Expression | SupportedNativeTypes ):FunctionExpression;
	regex( text:Expression | SupportedNativeTypes, pattern:RegExp ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns a string produced by the
	 * {@param text} value by replacing each non-overlapping occurrence of
	 * the {@param pattern} regular expression with the {@param replacement}
	 * string, applying the {@param flags} rules if defined.
	 *
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-replace}
	 * for more information.
	 *
	 * @param text Expressions with string value to replace with the respective replacement.
	 * @param pattern Expression with the regular expression used as the matcher.
	 * @param replacement Expression with the string or pattern to use as the replacement.
	 * @param flags Optional expression with the matching rules to be applied.
	 */
	replace( text:Expression | SupportedNativeTypes, pattern:Expression | SupportedNativeTypes, replacement:Expression | SupportedNativeTypes, flags?:Expression | SupportedNativeTypes ):FunctionExpression;
	replace( text:Expression | SupportedNativeTypes, pattern:RegExp, replacement:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the absolute value of
	 * {@param term}.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-abs}
	 * for more information.
	 *
	 * @param term Expressions with the numeric value to get its absolute value.
	 */
	abs( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the number with no fractional
	 * part that is closest to the {@param term} value.
	 * If there are two such numbers, then the one that is closest to positive
	 * infinity is returned.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-round}
	 * for more information.
	 *
	 * @param term Expressions with the numeric value to get its round value.
	 */
	round( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the closest to negative infinity
	 * number with no fractional part that is closest to the {@param term} value.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-ceil}
	 * for more information.
	 *
	 * @param term Expressions with the numeric value to get its ceil value.
	 */
	ceil( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the closest to positive infinity
	 * number with no fractional part that is closest to the {@param term} value.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-floor}
	 * for more information.
	 *
	 * @param term Expressions with the numeric value to get its floor value.
	 */
	floor( term:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns a pseudo-random number
	 * between 0 (inclusive) and 1.0e0 (exclusive).
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#idp2130040}
	 * for more information.
	 */
	rand():FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns a `xsd:dateType` value for
	 * the current query execution.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-now}
	 * for more information.
	 */
	now():FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the year part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-year}
	 * for more information.
	 */
	year( dateTime:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the month part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-month}
	 * for more information.
	 */
	month( dateTime:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the day part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-day}
	 * for more information.
	 */
	day( dateTime:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the hours part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-hours}
	 * for more information.
	 */
	hours( dateTime:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the minutes part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-minutes}
	 * for more information.
	 */
	minutes( dateTime:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the seconds part of the
	 * {@param dateTime} value as a decimal.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-seconds}
	 * for more information.
	 */
	seconds( dateTime:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the timezone part of the
	 * {@param dateTime} value as an `xsd:dayTimeDuration`.
	 *
	 * Beware that using a Date object will generate a literal in ISO 8601
	 * format with the `Z` timezone.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-timezone}
	 * for more information.
	 */
	timezone( dateTime:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the timezone part of the
	 * {@param dateTime} value as a string.
	 *
	 * Beware that using a Date object will generate a literal in ISO 8601
	 * format with the `Z` timezone.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-tz}
	 * for more information.
	 */
	tz( dateTime:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the MD5 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-md5}
	 * for more information.
	 */
	md5( literal:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the SHA1 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-sha1}
	 * for more information.
	 */
	sha1( literal:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the SHA256 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-sha256}
	 * for more information.
	 */
	sha256( literal:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the SHA384 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-sha384}
	 * for more information.
	 */
	sha384( literal:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the SHA512 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#func-sha512}
	 * for more information.
	 */
	sha512( literal:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that executes a function
	 * declared by a custom IRI.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#ririOrFunction}
	 * for more information.
	 */
	custom( resource:Resource | string, ...args:(Expression | SupportedNativeTypes)[] ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that executes a function
	 * declared by a custom IRI reducing to only distinct arguments.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#ririOrFunction}
	 * for more information.
	 */
	customDistinct( resource:Resource | string, ...args:(Expression | SupportedNativeTypes)[] ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that counts the number of times
	 * the given expression has a solution over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggCount}
	 * for more information.
	 *
	 * @param expression - Expression to be counted
	 */
	count( expression:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that counts the number of times
	 * the given expression has a bound for every distinct sequence over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggCount}
	 * for more information.
	 *
	 * @param expression - Expression to be counted
	 */
	countDistinct( expression:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that counts the number of solutions
	 * over the group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggCount}
	 * for more information.
	 */
	countAll():FunctionExpression;
	/**
	 * Creates an {@link Expression} that counts the number of distinct
	 * solution sequences over the group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggCount}
	 * for more information.
	 */
	countAllDistinct():FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the value of the sum
	 * of the given expression's values over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggSum}
	 * for more information.
	 *
	 * @param expression - Expression of the values to be summed.
	 */
	sum( expression:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns the value of the sum
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggSum}
	 * for more information.
	 *
	 * @param expression - Expression of the values to be summed.
	 */
	sumDistinct( expression:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the average value
	 * of the given expression's values over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggAvg}
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its average.
	 */
	avg( expression:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns the average value
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggAvg}
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its average.
	 */
	avgDistinct( expression:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the minimum value
	 * of the given expression's values over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggMin}
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its minimum.
	 */
	min( expression:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns the minimum value
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggMin}
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its minimum.
	 */
	minDistinct( expression:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the maximum value
	 * of the given expression's values over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggMax}
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its maximum.
	 */
	max( expression:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns the maximum value
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggMax}
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its maximum.
	 */
	maxDistinct( expression:Expression | SupportedNativeTypes ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns the string concatenation
	 * of the given expression's values over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggGroupConcat}
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its maximum.
	 * @param separator - Optional separator character used in the concatenation, where by default its a space.
	 */
	groupConcat( expression:Expression | SupportedNativeTypes, separator?:string ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns the string concatenation
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggGroupConcat}
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its maximum.
	 * @param separator - Optional separator character used in the concatenation, where by default its a space.
	 */
	groupConcatDistinct( expression:Expression | SupportedNativeTypes, separator?:string ):FunctionExpression;

	/**
	 * Creates an {@link Expression} that returns an arbitrary value
	 * from the given expression's values over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggSample}
	 * for more information.
	 *
	 * @param expression - Expression of the values from where to select the value.
	 */
	sample( expression:Expression | SupportedNativeTypes ):FunctionExpression;
	/**
	 * Creates an {@link Expression} that returns an arbitrary value
	 * from the given expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link https://www.w3.org/TR/sparql11-query/#defn_aggSample}
	 * for more information.
	 *
	 * @param expression - Expression of the values from where to select the value.
	 */
	sampleDistinct( expression:Expression | SupportedNativeTypes ):FunctionExpression;
}


// Static transformers
type Transformer = ( value:any ) => ExpressionToken;

const literalTransformer = convertValue;

const variableTransformer = ( variable:string ) => new VariableToken( variable );


// Expressions implementation

function _getExpression( container:Container<undefined>, name:Functions | IRIToken, listOrPatterns:ExpressionListToken | GroupPatternToken ):FunctionExpression {
	const targetToken = new FunctionToken( name, listOrPatterns );

	const newContainer = new Container( {
		...container,
		targetToken,
	} );

	return Expression.createFrom( newContainer, {} )
}

function _getExpressionTokens( expressions?:(Expression | SupportedNativeTypes | undefined)[], limit?:number, transformer?:Transformer ):ExpressionToken[] | undefined {
	if( expressions === undefined ) return;

	return expressions
		.slice( 0, limit )
		.filter( _ => _ !== undefined )
		.map( arg => {
			if( typeof arg === "object" ) {
				if( "token" in arg )
					return arg;

				if( "getExpression" in arg )
					return arg.getExpression();
			}

			if( transformer )
				return transformer( arg );

			throw new Error( "Invalid argument provided to the function." );
		} );
}

function _getExpressionList( { expressions, transformer, limit, distinct, separator }:{
	expressions?:(Expression | SupportedNativeTypes | undefined)[];
	transformer?:Transformer;
	limit?:number;
	distinct?:boolean;
	separator?:string;
} ) {
	const listTokens = _getExpressionTokens( expressions, limit, transformer );
	return new ExpressionListToken( listTokens, distinct, separator );
}


function getPatternExpressionFn( container:Container<undefined>, name:Functions ) {
	return ( firstPattern?:Pattern | Pattern[], ...restPatterns:Pattern[] ) => {
		const patterns = Array.isArray( firstPattern ) ? firstPattern
			: !firstPattern ? [] : [ firstPattern, ...restPatterns ];

		const patternTokens = patterns.map( _ => _.getPattern() );

		const groupPatternToken = new GroupPatternToken()
			.addPattern( ...patternTokens );

		return _getExpression( container, name, groupPatternToken );
	}
}

function getNamedExpressionFn( container:Container<undefined>, name:Functions, limit?:number, transformer?:Transformer, distinct?:boolean ) {
	return ( ...expressions:(Expression | SupportedNativeTypes | undefined)[] ) => {
		const list = _getExpressionList( { expressions, transformer, limit, distinct } );
		return _getExpression( container, name, list );
	}
}

function getIRIExpressionFn( container:Container<undefined>, transformer:Transformer, distinct?:boolean ) {
	return ( resource:Resource | string, ...expressions:(Expression | SupportedNativeTypes)[] ) => {
		const iri = typeof resource === "string"
			? container.iriResolver.resolve( resource )
			: resource.getSubject();

		const list = _getExpressionList( { expressions, transformer, distinct } );
		return _getExpression( container, iri, list );
	}
}

function getRegexExpressionFn( container:Container<undefined>, name:Functions, limit:number, transformer?:Transformer ) {
	return ( ...rawExpressions:(Expression | SupportedNativeTypes | RegExp | undefined)[] ) => {
		let flags:string | undefined;
		const expressions:(Expression | SupportedNativeTypes | undefined)[] = rawExpressions
			.map( value => {
				if( !(value instanceof RegExp) ) return value;

				flags = value.flags;
				return value.source;
			} );

		if( flags ) expressions.push( flags );

		const list = _getExpressionList( { expressions, transformer, limit } );
		return _getExpression( container, name, list );
	}
}

function getAllAggregatorFn( container:Container<undefined>, name:Functions, distinct?:boolean ) {
	return () => {
		const list = _getExpressionList( { distinct } );
		return _getExpression( container, name, list );
	}
}

function getSeparatorAggregatorFn( container:Container<undefined>, name:Functions, transformer?:Transformer, distinct?:boolean ) {
	return ( expression:Expression | SupportedNativeTypes, separator?:string ) => {
		const list = _getExpressionList( { expressions: [ expression ], transformer, distinct, separator } );
		return _getExpression( container, name, list );
	}
}

/**
 * Constant with the utils for {@link FunctionExpressionsBuilder} objects.
 */
export const FunctionExpressionsBuilder:{
	/**
	 * Factory function that allows to crete a {@link FunctionExpressionsBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link FunctionExpressionsBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link FunctionExpressionsBuilder} statement.
	 *
	 * @return The {@link FunctionExpressionsBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & FunctionExpressionsBuilder;
} = {
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & FunctionExpressionsBuilder {
		const iriTransformer = ( iri:string ):IRIToken => container.iriResolver.resolve( iri );
		const generalTransformer = ( value:SupportedNativeTypes ):ExpressionToken => typeof value === "string" && isAbsolute( value )
			? iriTransformer( value ) : literalTransformer( value );

		return Object.assign( object, {
			bound: getNamedExpressionFn( container, Functions.BOUND, 1, variableTransformer ),
			if: getNamedExpressionFn( container, Functions.IF, 3, generalTransformer ),
			coalesce: getNamedExpressionFn( container, Functions.COALESCE, undefined, generalTransformer ),
			exists: getPatternExpressionFn( container, Functions.EXISTS ),
			notExists: getPatternExpressionFn( container, Functions.NOT_EXISTS ),
			sameTerm: getNamedExpressionFn( container, Functions.SAME_TERM, 2, generalTransformer ),
			isIRI: getNamedExpressionFn( container, Functions.IS_IRI, 1, generalTransformer ),
			isURI: getNamedExpressionFn( container, Functions.IS_URI, 1, generalTransformer ),
			isBlank: getNamedExpressionFn( container, Functions.IS_BLANK, 1, generalTransformer ),
			isLiteral: getNamedExpressionFn( container, Functions.IS_LITERAL, 1, generalTransformer ),
			isNumeric: getNamedExpressionFn( container, Functions.IS_NUMERIC, 1, generalTransformer ),
			str: getNamedExpressionFn( container, Functions.STR, 1, generalTransformer ),
			lang: getNamedExpressionFn( container, Functions.LANG, 1, generalTransformer ),
			datatype: getNamedExpressionFn( container, Functions.DATATYPE, 1, generalTransformer ),
			iri: getNamedExpressionFn( container, Functions.IRI, 1, generalTransformer ),
			uri: getNamedExpressionFn( container, Functions.URI, 1, generalTransformer ),
			bnode: getNamedExpressionFn( container, Functions.BNODE, 1, generalTransformer ),
			strDT: getNamedExpressionFn( container, Functions.STR_DT, 2, generalTransformer ),
			strLang: getNamedExpressionFn( container, Functions.STR_LANG, 2, generalTransformer ),
			uuid: getNamedExpressionFn( container, Functions.UUID, 0 ),
			strUUID: getNamedExpressionFn( container, Functions.STR_UUID, 0 ),
			strLen: getNamedExpressionFn( container, Functions.STRLEN, 1, generalTransformer ),
			substr: getNamedExpressionFn( container, Functions.SUBSTR, 3, generalTransformer ),
			uCase: getNamedExpressionFn( container, Functions.UCASE, 1, generalTransformer ),
			lCase: getNamedExpressionFn( container, Functions.LCASE, 1, generalTransformer ),
			strStarts: getNamedExpressionFn( container, Functions.STR_STARTS, 2, generalTransformer ),
			strEnds: getNamedExpressionFn( container, Functions.STR_ENDS, 2, generalTransformer ),
			contains: getNamedExpressionFn( container, Functions.CONTAINS, 2, generalTransformer ),
			strBefore: getNamedExpressionFn( container, Functions.STR_BEFORE, 2, generalTransformer ),
			strAfter: getNamedExpressionFn( container, Functions.STR_AFTER, 2, generalTransformer ),
			encodeForUri: getNamedExpressionFn( container, Functions.ENCODE_FOR_URI, 1, generalTransformer ),
			concat: getNamedExpressionFn( container, Functions.CONCAT, undefined, generalTransformer ),
			langMatches: getNamedExpressionFn( container, Functions.LANG_MATCHES, 2, generalTransformer ),
			regex: getRegexExpressionFn( container, Functions.REGEX, 3, generalTransformer ),
			replace: getRegexExpressionFn( container, Functions.REPLACE, 4, generalTransformer ),
			abs: getNamedExpressionFn( container, Functions.ABS, 1, generalTransformer ),
			round: getNamedExpressionFn( container, Functions.ROUND, 1, generalTransformer ),
			ceil: getNamedExpressionFn( container, Functions.CEIL, 1, generalTransformer ),
			floor: getNamedExpressionFn( container, Functions.FLOOR, 1, generalTransformer ),
			rand: getNamedExpressionFn( container, Functions.RAND, 0 ),
			now: getNamedExpressionFn( container, Functions.NOW, 0 ),
			year: getNamedExpressionFn( container, Functions.YEAR, 1, generalTransformer ),
			month: getNamedExpressionFn( container, Functions.MONTH, 1, generalTransformer ),
			day: getNamedExpressionFn( container, Functions.DAY, 1, generalTransformer ),
			hours: getNamedExpressionFn( container, Functions.HOURS, 1, generalTransformer ),
			minutes: getNamedExpressionFn( container, Functions.MINUTES, 1, generalTransformer ),
			seconds: getNamedExpressionFn( container, Functions.SECONDS, 1, generalTransformer ),
			timezone: getNamedExpressionFn( container, Functions.TIMEZONE, 1, generalTransformer ),
			tz: getNamedExpressionFn( container, Functions.TZ, 1, generalTransformer ),
			md5: getNamedExpressionFn( container, Functions.MD5, 1, generalTransformer ),
			sha1: getNamedExpressionFn( container, Functions.SHA1, 1, generalTransformer ),
			sha256: getNamedExpressionFn( container, Functions.SHA256, 1, generalTransformer ),
			sha384: getNamedExpressionFn( container, Functions.SHA384, 1, generalTransformer ),
			sha512: getNamedExpressionFn( container, Functions.SHA512, 1, generalTransformer ),
			custom: getIRIExpressionFn( container, generalTransformer ),
			customDistinct: getIRIExpressionFn( container, generalTransformer, true ),
			count: getNamedExpressionFn( container, Functions.COUNT, 1, generalTransformer ),
			countDistinct: getNamedExpressionFn( container, Functions.COUNT, 1, generalTransformer, true ),
			countAll: getAllAggregatorFn( container, Functions.COUNT ),
			countAllDistinct: getAllAggregatorFn( container, Functions.COUNT, true ),
			sum: getNamedExpressionFn( container, Functions.SUM, 1, generalTransformer ),
			sumDistinct: getNamedExpressionFn( container, Functions.SUM, 1, generalTransformer, true ),
			avg: getNamedExpressionFn( container, Functions.AVG, 1, generalTransformer ),
			avgDistinct: getNamedExpressionFn( container, Functions.AVG, 1, generalTransformer, true ),
			min: getNamedExpressionFn( container, Functions.MIN, 1, generalTransformer ),
			minDistinct: getNamedExpressionFn( container, Functions.MIN, 1, generalTransformer, true ),
			max: getNamedExpressionFn( container, Functions.MAX, 1, generalTransformer ),
			maxDistinct: getNamedExpressionFn( container, Functions.MAX, 1, generalTransformer, true ),
			groupConcat: getSeparatorAggregatorFn( container, Functions.GROUP_CONCAT, generalTransformer ),
			groupConcatDistinct: getSeparatorAggregatorFn( container, Functions.GROUP_CONCAT, generalTransformer, true ),
			sample: getNamedExpressionFn( container, Functions.SAMPLE, 1, generalTransformer ),
			sampleDistinct: getNamedExpressionFn( container, Functions.SAMPLE, 1, generalTransformer, true ),
		} )
	},
};
