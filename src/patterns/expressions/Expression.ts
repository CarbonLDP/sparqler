import { Container } from "../../data/Container";

import { AdditiveOperationToken } from "../../tokens/AdditiveOperationToken";
import { ConditionalAndExpressionToken } from "../../tokens/ConditionalAndExpressionToken";
import { ConditionalAndOperationToken } from "../../tokens/ConditionalAndOperationToken";
import { ConditionalOrOperationToken } from "../../tokens/ConditionalOrOperationToken";
import { ExpressionToken } from "../../tokens/ExpressionToken";
import { MultiplicativeExpressionToken } from "../../tokens/MultiplicativeExpressionToken";
import { MultiplicativeOperationToken } from "../../tokens/MultiplicativeOperationToken";
import { NumericExpressionToken } from "../../tokens/NumericExpressionToken";
import { RelationalExpressionToken } from "../../tokens/RelationalExpressionToken";
import { RelationalOperationToken } from "../../tokens/RelationalOperationToken";
import { UnaryExpressionToken } from "../../tokens/UnaryExpressionToken";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { Functions, getBaseFunctionFn, getRegexFunctionFn, getSeparatorFunctionFn } from "./fns/functionFn";
import { getBinaryOperationFn, getInclusionFn, getUnaryOperationFn } from "./fns/operationFn";


/**
 * Object that contains an SPARQL expression.
 *
 * This object also has access to create deriving expressions,
 * using its self value
 */
export interface Expression<T extends ExpressionToken = ExpressionToken> {
	/**
	 * Creates an {@link Expression} that evaluates the self value as a condition and then
	 * returns the {@param consequent} value if the condition is true,
	 * otherwise it returns {@param alternative}.
	 *
	 * See {@link FunctionExpressionsBuilder.if} for the complete version of this method.
	 *
	 * @param consequent - Expression to return its value when the self value is evaluated to `true`.
	 * @param alternative - Expression to returns its value when the self value is evaluated to `false.`
	 */
	if( consequent:Expression | SupportedNativeTypes, alternative:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the value of the first expression
	 * from the {@param expressions} list  and the self value that evaluates without error.
	 *
	 * See {@link FunctionExpressionsBuilder.coalesce} for the complete version of this method.
	 *
	 * @param expressions - Extra expressions to be evaluated for the non-raising error one.
	 */
	coalesce( ...expressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value and
	 * {@param term} are the same RDF term, or `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder.sameTerm} for the complete version of this method.
	 *
	 * @param term - Expression to evaluate its value against the self value.
	 */
	sameTerm( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * an IRI. Returns `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder.isIRI} for the complete version of this method.
	 */
	isIRI():Expression;
	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * an URI. Returns `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder.isURI} for the complete version of this method.
	 */
	isURI():Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * a blank node. Returns `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder.isBlank} for the complete version of this method.
	 */
	isBlank():Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * a literal. Returns `false` otherwise.
	 *
	 *
	 * See {@link FunctionExpressionsBuilder.isLiteral} for the complete version of this method.
	 */
	isLiteral():Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * a numeric value. Returns `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder.isNumeric} for the complete version of this method.
	 */
	isNumeric():Expression;

	/**
	 * Creates an {@link Expression} that returns the string representation of
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder.str} for the complete version of this method.
	 */
	str():Expression;

	/**
	 * Creates an {@link Expression} that returns the language tag of
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder.lang} for the complete version of this method.
	 */
	lang():Expression;

	/**
	 * Creates an {@link Expression} that returns the datatype IRI of
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder.datatype} for the complete version of this method.
	 */
	datatype():Expression;

	/**
	 * Creates an {@link Expression} that constructs an IRI by resolving
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder.iri} for the complete version of this method.
	 */
	iri():Expression;
	/**
	 * Creates an {@link Expression} that constructs a URI by resolving
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder.uri} for the complete version of this method.
	 */
	uri():Expression;

	/**
	 * Creates an {@link Expression} that constructs a blank node using
	 * the self value as base for the blank node label.
	 *
	 * See {@link FunctionExpressionsBuilder.bnode} for the complete version of this method.
	 */
	bnode():Expression;

	/**
	 * Creates an {@link Expression} that constructs an RDF literal with
	 * the self lexical value and {@param dataType} specified.
	 *
	 * See {@link FunctionExpressionsBuilder.strDT} for the complete version of this method.
	 *
	 * @param dataType - Expresion with an IRI value to use as the datatype of the literal.
	 */
	strDT( dataType:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that constructs an RDF literal with the
	 * self lexical value and {@param languageTag} specified.
	 *
	 * See {@link FunctionExpressionsBuilder.strLang} for the complete version of this method.
	 *
	 * @param languageTag - Expresion with a string value to use as the language tag of the literal.
	 */
	strLang( languageTag:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the number of characters
	 * of the self value.
	 *
	 * See {@link FunctionExpressionsBuilder.strLen} for the complete version of this method.
	 */
	strLen():Expression;

	/**
	 * Creates an {@link Expression} that returns a the portion of the
	 * self value value beginning at the position indicated by the value of
	 * {@param starting} and counting fot the number of characters indicated by
	 * the value of {@param length} if provided, otherwise it {@param length}
	 * will be considered infinite.
	 *
	 * The index of the first character of a string is 1.
	 *
	 * See {@link FunctionExpressionsBuilder.substr} for the complete version of this method.
	 *
	 * @param starting Expression with the index from where to start the portion to take.
	 * @param length Expression with the number of characters of the portion to take.
	 */
	substr( starting:Expression | SupportedNativeTypes, length?:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the self value
	 * converted to uppercase.
	 *
	 * See {@link FunctionExpressionsBuilder.uCase} for the complete version of this method.
	 */
	uCase():Expression;

	/**
	 * Creates an {@link Expression} that returns the self value
	 * converted to lowercase.
	 *
	 * See {@link FunctionExpressionsBuilder.lCase} for the complete version of this method.
	 */
	lCase():Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` if the self value
	 * starts with the value of {@param arg}, otherwise it
	 * returns `false`.
	 *
	 * See {@link FunctionExpressionsBuilder.strStarts} for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check it's the start of the self value.
	 */
	strStarts( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` if the self value
	 * ends with the value of {@param arg}, otherwise it returns `false`.
	 *
	 * See {@link FunctionExpressionsBuilder.strEnds} for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check it's the end of the self value.
	 */
	strEnds( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` if the self value
	 * contains the value of {@param arg} as a substring, otherwise it returns `false`.
	 *
	 * See {@link FunctionExpressionsBuilder.contains} for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check it's contained by the self value.
	 */
	contains( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the part the self
	 * value that precedes the first occurrence of {@param arg} value.
	 *
	 * See {@link FunctionExpressionsBuilder.strBefore} for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check where it appears in the self value.
	 */
	strBefore( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the part the self
	 * value that follows the first occurrence of {@param arg} value.
	 *
	 * See {@link FunctionExpressionsBuilder.strAfter} for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check where it appears in the self value.
	 */
	strAfter( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns a literal with the encoded
	 * special characters that the self value provided may have.
	 *
	 * See {@link FunctionExpressionsBuilder.encodeForUri} for the complete version of this method.
	 */
	encodeForUri():Expression;

	/**
	 * Creates an {@link Expression} that returns the concatenation of the
	 * self value with the string values of the {@param literals} provided.
	 *
	 * See {@link FunctionExpressionsBuilder.concat} for the complete version of this method.
	 *
	 * @param literals Expressions with the string values to concatenate to the self value.
	 */
	concat( ...literals:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self lang tag value
	 * value matches {@param languageRange} as defined in
	 * {@link https://www.ietf.org/rfc/rfc4647.txt Matching of Language}.
	 *
	 * See {@link FunctionExpressionsBuilder.langMatches} for the complete version of this method.
	 *
	 * @param languageRange Expression with the language range that the self lang tag value will be checked against.
	 */
	langMatches( languageRange:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if self text value
	 * value matches the {@param pattern} regular expression, applying the
	 * {@param flags} rules if defined.
	 *
	 * See {@link FunctionExpressionsBuilder.regex} for the complete version of this method.
	 *
	 * @param pattern Expression with the regular expression used as the matcher.
	 * @param flags Optional expression with the matching rules to be applied.
	 */
	regex( pattern:Expression | SupportedNativeTypes, flags?:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns `true` if self text value
	 * value matches the {@param pattern} regular expression.
	 *
	 * See {@link FunctionExpressionsBuilder.regex} for the complete version of this method.
	 *
	 * @param pattern RegExp used as the matcher.
	 */
	regex( pattern:RegExp ):Expression;

	/**
	 * Creates an {@link Expression} that returns a string produced by the
	 * self text value by replacing each non-overlapping occurrence of
	 * the {@param pattern} regular expression with the {@param replacement}
	 * string, applying the {@param flags} rules if defined.
	 *
	 * See {@link FunctionExpressionsBuilder.replace} for the complete version of this method.
	 *
	 * @param pattern Expression with the regular expression used as the matcher.
	 * @param replacement Expression with the string or pattern to use as the replacement.
	 * @param flags Optional expression with the matching rules to be applied.
	 */
	replace( pattern:Expression | SupportedNativeTypes, replacement:Expression | SupportedNativeTypes, flags?:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns a string produced by the
	 * self text value by replacing each non-overlapping occurrence of
	 * the {@param pattern} regular expression with the {@param replacement}
	 * string.
	 *
	 * See {@link FunctionExpressionsBuilder.replace} for the complete version of this method.
	 *
	 * @param pattern RegExp used as the matcher.
	 * @param replacement Expression with the string or pattern to use as the replacement.
	 */
	replace( pattern:RegExp, replacement:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the absolute value of
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder.abs} for the complete version of this method.
	 */
	abs():Expression;

	/**
	 * Creates an {@link Expression} that returns the number with no fractional
	 * part that is closest to the self value.
	 * If there are two such numbers, then the one that is closest to positive
	 * infinity is returned.
	 *
	 * See {@link FunctionExpressionsBuilder.round} for the complete version of this method.
	 */
	round():Expression;

	/**
	 * Creates an {@link Expression} that returns the closest to negative infinity
	 * number with no fractional part that is closest to the elf value.
	 *
	 * See {@link FunctionExpressionsBuilder.ceil} for the complete version of this method.
	 */
	ceil():Expression;

	/**
	 * Creates an {@link Expression} that returns the closest to positive infinity
	 * number with no fractional part that is closest to the self value.
	 *
	 * See {@link FunctionExpressionsBuilder.replace} for the complete version of this method.
	 */
	floor():Expression;

	/**
	 * Creates an {@link Expression} that returns the year part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder.year} for the complete version of this method.
	 */
	year():Expression;

	/**
	 * Creates an {@link Expression} that returns the month part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder.month} for the complete version of this method.
	 */
	month():Expression;

	/**
	 * Creates an {@link Expression} that returns the day part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder.day} for the complete version of this method.
	 */
	day():Expression;

	/**
	 * Creates an {@link Expression} that returns the hours part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder.hours} for the complete version of this method.
	 */
	hours():Expression;

	/**
	 * Creates an {@link Expression} that returns the minutes part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder.minutes} for the complete version of this method.
	 */
	minutes():Expression;

	/**
	 * Creates an {@link Expression} that returns the seconds part of the
	 * self value as a decimal.
	 *
	 * See {@link FunctionExpressionsBuilder.seconds} for the complete version of this method.
	 */
	seconds():Expression;

	/**
	 * Creates an {@link Expression} that returns the timezone part of the
	 * self value as an `xsd:dayTimeDuration`.
	 *
	 * Beware that using a Date object will generate a literal in ISO 8601
	 * format with the `Z` timezone.
	 *
	 * See {@link FunctionExpressionsBuilder.timezone} for the complete version of this method.
	 */
	timezone():Expression;

	/**
	 * Creates an {@link Expression} that returns the timezone part of the
	 * self value as a string.
	 *
	 * Beware that using a Date object will generate a literal in ISO 8601
	 * format with the `Z` timezone.
	 *
	 * See {@link FunctionExpressionsBuilder.tz} for the complete version of this method.
	 */
	tz():Expression;

	/**
	 * Creates an {@link Expression} that returns the MD5 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder.md5} for the complete version of this method.
	 */
	md5():Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA1 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder.sha1} for the complete version of this method.
	 */
	sha1():Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA256 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder.sha256} for the complete version of this method.
	 */
	sha256():Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA384 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder.sha384} for the complete version of this method.
	 */
	sha384():Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA512 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder.sha512} for the complete version of this method.
	 */
	sha512():Expression;

	/**
	 * Creates an {@link Expression} that counts the number of times
	 * the self expression has a solution over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.count} for the complete version of this method.
	 */
	count():Expression;
	/**
	 * Creates an {@link Expression} that counts the number of times
	 * the self expression has a bound for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.count} for the complete version of this method.
	 */
	countDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the value of the sum
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.sum} for the complete version of this method.
	 */
	sum():Expression;
	/**
	 * Creates an {@link Expression} that returns the value of the sum
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.sumDistinct} for the complete version of this method.
	 */
	sumDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the average value
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.avg} for the complete version of this method.
	 */
	avg():Expression;
	/**
	 * Creates an {@link Expression} that returns the average value
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.avgDistinct} for the complete version of this method.
	 */
	avgDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the minimum value
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.min} for the complete version of this method.
	 */
	min():Expression;
	/**
	 * Creates an {@link Expression} that returns the minimum value
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.minDistinct} for the complete version of this method.
	 */
	minDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the maximum value
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.max} for the complete version of this method.
	 */
	max():Expression;
	/**
	 * Creates an {@link Expression} that returns the maximum value
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.maxDistinct} for the complete version of this method.
	 */
	maxDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the string concatenation
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.groupConcat} for the complete version of this method.
	 *
	 * @param separator - Optional separator character used in the concatenation, where by default its a space.
	 */
	groupConcat( separator?:string ):Expression;
	/**
	 * Creates an {@link Expression} that returns the string concatenation
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.groupConcatDistinct} for the complete version of this method.
	 *
	 * @param separator - Optional separator character used in the concatenation, where by default its a space.
	 */
	groupConcatDistinct( separator?:string ):Expression;

	/**
	 * Creates an {@link Expression} that returns an arbitrary value
	 * from the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.sample} for the complete version of this method.
	 */
	sample():Expression;
	/**
	 * Creates an {@link Expression} that returns an arbitrary value
	 * from the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder.sampleDistinct} for the complete version of this method.
	 */
	sampleDistinct():Expression;

	/**
	 * Creates an operation {@link Expression} that returns logical ORs
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder.or} for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct a logical OR with the previous expression.
	 */
	or( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns logical ANDs
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder.and} for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct a logical AND with the previous expression.
	 */
	and( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value and {@param rightExpression} are the same RDF term.
	 *
	 * See {@link OperationExpressionsBuilder.equals} for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	equals( rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value and {@param rightExpression} are NOT the same RDF term.
	 *
	 * See {@link OperationExpressionsBuilder.notEquals} for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	notEquals( rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value is less than the {@param rightExpression}.
	 *
	 * See {@link OperationExpressionsBuilder.lt} for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	lt( rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value is less or equal than the {@param rightExpression}.
	 *
	 * See {@link OperationExpressionsBuilder.lte} for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	lte( rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value is greater than the {@param rightExpression}.
	 *
	 * See {@link OperationExpressionsBuilder.gt} for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	gt( rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value is greater or equal than the {@param rightExpression}.
	 *
	 * See {@link OperationExpressionsBuilder.gte} for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	gte( rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns true whether
	 * the self value is equal to any of the {@param rightExpressions} values.
	 *
	 * See {@link OperationExpressionsBuilder.in} for the complete version of this method.
	 *
	 * @param rightExpressions - Expressions to compare its values against the self value.
	 */
	in( ...rightExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns true whether
	 * the self value is NOT equal to any of the {@param rightExpressions} values.
	 *
	 * See {@link OperationExpressionsBuilder.notIn} for the complete version of this method.
	 *
	 * @param rightExpressions - Expressions to compare its values against the self value.
	 */
	notIn( ...rightExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns the arithmetic sum
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder.add} for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct an arithmetic sum with the previous expression.
	 */
	add( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns the arithmetic difference
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder.subtract} for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct an arithmetic difference with the previous expression.
	 */
	subtract( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns the arithmetic product
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder.multiply} for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct an arithmetic product with the previous expression.
	 */
	multiply( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns the arithmetic quotient
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder.divide} for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct an arithmetic quotient with the previous expression.
	 */
	divide( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns true
	 * if the effective boolean value of the self value is false.
	 *
	 * See {@link OperationExpressionsBuilder.not} for the complete version of this method.
	 */
	not():Expression;
	/**
	 * Creates an operation {@link Expression} that returns the numeric
	 * self value with its sing unchanged.
	 *
	 * See {@link OperationExpressionsBuilder.plus} for the complete version of this method.
	 */
	plus():Expression;
	/**
	 * Creates an operation {@link Expression} that returns the numeric
	 * self value with its sing reversed.
	 *
	 * See {@link OperationExpressionsBuilder.minus} for the complete version of this method.
	 */
	minus():Expression;


	/**
	 * Returns the {@link ExpressionToken} of the expression.
	 */
	getExpression():T;
}

/**
 * Constant with the utils for {@link Expression} objects.
 */
export const Expression:{
	/**
	 * Factory function that allows to crete a {@link Expression}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Expression} statement.
	 *
	 * @return The {@link Expression} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends ExpressionToken, C extends Container<T>, O extends object>( container:C, object:O ):O & Expression<T>;
} = {
	createFrom<T extends ExpressionToken, C extends Container<T>, O extends object>( container:C, object:O ):O & Expression<T> {
		return Object.assign( object, {
			// Functions
			if: getBaseFunctionFn( container, Functions.IF, 3 ),
			coalesce: getBaseFunctionFn( container, Functions.COALESCE, undefined ),
			sameTerm: getBaseFunctionFn( container, Functions.SAME_TERM, 2 ),
			isIRI: getBaseFunctionFn( container, Functions.IS_IRI, 1 ),
			isURI: getBaseFunctionFn( container, Functions.IS_URI, 1 ),
			isBlank: getBaseFunctionFn( container, Functions.IS_BLANK, 1 ),
			isLiteral: getBaseFunctionFn( container, Functions.IS_LITERAL, 1 ),
			isNumeric: getBaseFunctionFn( container, Functions.IS_NUMERIC, 1 ),
			str: getBaseFunctionFn( container, Functions.STR, 1 ),
			lang: getBaseFunctionFn( container, Functions.LANG, 1 ),
			datatype: getBaseFunctionFn( container, Functions.DATATYPE, 1 ),
			iri: getBaseFunctionFn( container, Functions.IRI, 1 ),
			uri: getBaseFunctionFn( container, Functions.URI, 1 ),
			bnode: getBaseFunctionFn( container, Functions.BNODE, 1 ),
			strDT: getBaseFunctionFn( container, Functions.STR_DT, 2 ),
			strLang: getBaseFunctionFn( container, Functions.STR_LANG, 2 ),
			strLen: getBaseFunctionFn( container, Functions.STRLEN, 1 ),
			substr: getBaseFunctionFn( container, Functions.SUBSTR, 3 ),
			uCase: getBaseFunctionFn( container, Functions.UCASE, 1 ),
			lCase: getBaseFunctionFn( container, Functions.LCASE, 1 ),
			strStarts: getBaseFunctionFn( container, Functions.STR_STARTS, 2 ),
			strEnds: getBaseFunctionFn( container, Functions.STR_ENDS, 2 ),
			contains: getBaseFunctionFn( container, Functions.CONTAINS, 2 ),
			strBefore: getBaseFunctionFn( container, Functions.STR_BEFORE, 2 ),
			strAfter: getBaseFunctionFn( container, Functions.STR_AFTER, 2 ),
			encodeForUri: getBaseFunctionFn( container, Functions.ENCODE_FOR_URI, 1 ),
			concat: getBaseFunctionFn( container, Functions.CONCAT, undefined ),
			langMatches: getBaseFunctionFn( container, Functions.LANG_MATCHES, 2 ),
			regex: getRegexFunctionFn( container, Functions.REGEX, 3 ),
			replace: getRegexFunctionFn( container, Functions.REPLACE, 4 ),
			abs: getBaseFunctionFn( container, Functions.ABS, 1 ),
			round: getBaseFunctionFn( container, Functions.ROUND, 1 ),
			ceil: getBaseFunctionFn( container, Functions.CEIL, 1 ),
			floor: getBaseFunctionFn( container, Functions.FLOOR, 1 ),
			year: getBaseFunctionFn( container, Functions.YEAR, 1 ),
			month: getBaseFunctionFn( container, Functions.MONTH, 1 ),
			day: getBaseFunctionFn( container, Functions.DAY, 1 ),
			hours: getBaseFunctionFn( container, Functions.HOURS, 1 ),
			minutes: getBaseFunctionFn( container, Functions.MINUTES, 1 ),
			seconds: getBaseFunctionFn( container, Functions.SECONDS, 1 ),
			timezone: getBaseFunctionFn( container, Functions.TIMEZONE, 1 ),
			tz: getBaseFunctionFn( container, Functions.TZ, 1 ),
			md5: getBaseFunctionFn( container, Functions.MD5, 1 ),
			sha1: getBaseFunctionFn( container, Functions.SHA1, 1 ),
			sha256: getBaseFunctionFn( container, Functions.SHA256, 1 ),
			sha384: getBaseFunctionFn( container, Functions.SHA384, 1 ),
			sha512: getBaseFunctionFn( container, Functions.SHA512, 1 ),
			count: getBaseFunctionFn( container, Functions.COUNT, 1 ),
			countDistinct: getBaseFunctionFn( container, Functions.COUNT, 1, true ),
			sum: getBaseFunctionFn( container, Functions.SUM, 1 ),
			sumDistinct: getBaseFunctionFn( container, Functions.SUM, 1, true ),
			avg: getBaseFunctionFn( container, Functions.AVG, 1 ),
			avgDistinct: getBaseFunctionFn( container, Functions.AVG, 1, true ),
			min: getBaseFunctionFn( container, Functions.MIN, 1 ),
			minDistinct: getBaseFunctionFn( container, Functions.MIN, 1, true ),
			max: getBaseFunctionFn( container, Functions.MAX, 1 ),
			maxDistinct: getBaseFunctionFn( container, Functions.MAX, 1, true ),
			groupConcat: getSeparatorFunctionFn( container, Functions.GROUP_CONCAT ),
			groupConcatDistinct: getSeparatorFunctionFn( container, Functions.GROUP_CONCAT, true ),
			sample: getBaseFunctionFn( container, Functions.SAMPLE, 1 ),
			sampleDistinct: getBaseFunctionFn( container, Functions.SAMPLE, 1, true ),
			// Operations
			or: getBinaryOperationFn( container, ConditionalOrOperationToken, ConditionalAndExpressionToken.is, "||" ),
			and: getBinaryOperationFn( container, ConditionalAndOperationToken, RelationalExpressionToken.is, "&&" ),
			equals: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, "=", true ),
			notEquals: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, "!=", true ),
			lt: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, "<", true ),
			lte: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, "<=", true ),
			gt: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, ">", true ),
			gte: getBinaryOperationFn( container, RelationalOperationToken, NumericExpressionToken.is, ">=", true ),
			in: getInclusionFn( container, "IN" ),
			notIn: getInclusionFn( container, "NOT IN" ),
			add: getBinaryOperationFn( container, AdditiveOperationToken, MultiplicativeExpressionToken.is, "+" ),
			subtract: getBinaryOperationFn( container, AdditiveOperationToken, MultiplicativeExpressionToken.is, "-" ),
			multiply: getBinaryOperationFn( container, MultiplicativeOperationToken, UnaryExpressionToken.is, "*" ),
			divide: getBinaryOperationFn( container, MultiplicativeOperationToken, UnaryExpressionToken.is, "/" ),
			not: getUnaryOperationFn( container, "!" ),
			plus: getUnaryOperationFn( container, "+" ),
			minus: getUnaryOperationFn( container, "-" ),
			// Self
			getExpression: () => container.targetToken,
		} );
	}
};