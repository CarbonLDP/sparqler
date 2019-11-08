import { Container } from "../../core/containers/Container";

import { AdditiveOperationToken } from "../../tokens/AdditiveOperationToken";
import { AssigmentToken } from "../../tokens/AssigmentToken";
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

import { Variable } from "../triplePatterns/Variable";

import { getAsFn } from "./fns/asFn";

import { Functions, getBaseFunctionFn, getRegexFunctionFn, getSeparatorFunctionFn } from "./fns/functionFn";
import { getBinaryOperationFn, getInclusionFn, getUnaryOperationFn } from "./fns/operationFn";
import { Projectable } from "./Projectable";


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
	 * See {@link FunctionExpressionsBuilder#if `FunctionExpressionsBuilder.if`}  for the complete version of this method.
	 *
	 * @param consequent - Expression to return its value when the self value is evaluated to `true`.
	 * @param alternative - Expression to returns its value when the self value is evaluated to `false.`
	 */
	//TODO: Fix Link Syntax
	if( consequent:Expression | SupportedNativeTypes, alternative:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the value of the first expression
	 * from the {@param expressions} list  and the self value that evaluates without error.
	 *
	 * See {@link FunctionExpressionsBuilder#coalesce `FunctionExpressionsBuilder.coalesce`}  for the complete version of this method.
	 *
	 * @param expressions - Extra expressions to be evaluated for the non-raising error one.
	 */
	//TODO: Fix Link Syntax
	coalesce( ...expressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value and
	 * {@param term} are the same RDF term, or `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder#sameTerm `FunctionExpressionsBuilder.sameTerm`}  for the complete version of this method.
	 *
	 * @param term - Expression to evaluate its value against the self value.
	 */
	//TODO: Fix Link Syntax
	sameTerm( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * an IRI. Returns `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder#isIRI `FunctionExpressionsBuilder.isIRI`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	isIRI():Expression;
	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * an URI. Returns `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder#isURI `FunctionExpressionsBuilder.isURI`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	isURI():Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * a blank node. Returns `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder#isBlank `FunctionExpressionsBuilder.isBlank`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	isBlank():Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * a literal. Returns `false` otherwise.
	 *
	 *
	 * See {@link FunctionExpressionsBuilder#isLiteral `FunctionExpressionsBuilder.isLiteral`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	isLiteral():Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self value is
	 * a numeric value. Returns `false` otherwise.
	 *
	 * See {@link FunctionExpressionsBuilder#isNumeric `FunctionExpressionsBuilder.isNumeric`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	isNumeric():Expression;

	/**
	 * Creates an {@link Expression} that returns the string representation of
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder#str `FunctionExpressionsBuilder.str`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	str():Expression;

	/**
	 * Creates an {@link Expression} that returns the language tag of
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder#lang `FunctionExpressionsBuilder.lang`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	lang():Expression;

	/**
	 * Creates an {@link Expression} that returns the datatype IRI of
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder#datatype `FunctionExpressionsBuilder.datatype`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	datatype():Expression;

	/**
	 * Creates an {@link Expression} that constructs an IRI by resolving
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder#iri `FunctionExpressionsBuilder.iri`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	iri():Expression;
	/**
	 * Creates an {@link Expression} that constructs a URI by resolving
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder#uri `FunctionExpressionsBuilder.uri`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	uri():Expression;

	/**
	 * Creates an {@link Expression} that constructs a blank node using
	 * the self value as base for the blank node label.
	 *
	 * See {@link FunctionExpressionsBuilder#bnode `FunctionExpressionsBuilder.bnode`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	bnode():Expression;

	/**
	 * Creates an {@link Expression} that constructs an RDF literal with
	 * the self lexical value and {@param dataType} specified.
	 *
	 * See {@link FunctionExpressionsBuilder#strDT `FunctionExpressionsBuilder.strDT`}  for the complete version of this method.
	 *
	 * @param dataType - Expresion with an IRI value to use as the datatype of the literal.
	 */
	//TODO: Fix Link Syntax
	strDT( dataType:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that constructs an RDF literal with the
	 * self lexical value and {@param languageTag} specified.
	 *
	 * See {@link FunctionExpressionsBuilder#strLang `FunctionExpressionsBuilder.strLang`}  for the complete version of this method.
	 *
	 * @param languageTag - Expresion with a string value to use as the language tag of the literal.
	 */
	//TODO: Fix Link Syntax
	strLang( languageTag:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the number of characters
	 * of the self value.
	 *
	 * See {@link FunctionExpressionsBuilder#strLen `FunctionExpressionsBuilder.strLen`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
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
	 * See {@link FunctionExpressionsBuilder#substr `FunctionExpressionsBuilder.substr`}  for the complete version of this method.
	 *
	 * @param starting Expression with the index from where to start the portion to take.
	 * @param length Expression with the number of characters of the portion to take.
	 */
	//TODO: Fix Link Syntax
	substr( starting:Expression | SupportedNativeTypes, length?:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the self value
	 * converted to uppercase.
	 *
	 * See {@link FunctionExpressionsBuilder#uCase `FunctionExpressionsBuilder.uCase`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	uCase():Expression;

	/**
	 * Creates an {@link Expression} that returns the self value
	 * converted to lowercase.
	 *
	 * See {@link FunctionExpressionsBuilder#lCase `FunctionExpressionsBuilder.lCase`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	lCase():Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` if the self value
	 * starts with the value of {@param arg}, otherwise it
	 * returns `false`.
	 *
	 * See {@link FunctionExpressionsBuilder#strStarts `FunctionExpressionsBuilder.strStarts`}  for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check it's the start of the self value.
	 */
	//TODO: Fix Link Syntax
	strStarts( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` if the self value
	 * ends with the value of {@param arg}, otherwise it returns `false`.
	 *
	 * See {@link FunctionExpressionsBuilder#strEnds `FunctionExpressionsBuilder.strEnds`}  for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check it's the end of the self value.
	 */
	//TODO: Fix Link Syntax
	strEnds( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` if the self value
	 * contains the value of {@param arg} as a substring, otherwise it returns `false`.
	 *
	 * See {@link FunctionExpressionsBuilder#contains `FunctionExpressionsBuilder.contains`}  for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check it's contained by the self value.
	 */
	//TODO: Fix Link Syntax
	contains( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the part the self
	 * value that precedes the first occurrence of {@param arg} value.
	 *
	 * See {@link FunctionExpressionsBuilder#strBefore `FunctionExpressionsBuilder.strBefore`}  for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check where it appears in the self value.
	 */
	//TODO: Fix Link Syntax
	strBefore( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the part the self
	 * value that follows the first occurrence of {@param arg} value.
	 *
	 * See {@link FunctionExpressionsBuilder#strAfter `FunctionExpressionsBuilder.strAfter`}  for the complete version of this method.
	 *
	 * @param arg Expression with the string value to check where it appears in the self value.
	 */
	//TODO: Fix Link Syntax
	strAfter( arg:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns a literal with the encoded
	 * special characters that the self value provided may have.
	 *
	 * See {@link FunctionExpressionsBuilder#encodeForUri `FunctionExpressionsBuilder.encodeForUri`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	encodeForUri():Expression;

	/**
	 * Creates an {@link Expression} that returns the concatenation of the
	 * self value with the string values of the {@param literals} provided.
	 *
	 * See {@link FunctionExpressionsBuilder#concat `FunctionExpressionsBuilder.concat`}  for the complete version of this method.
	 *
	 * @param literals Expressions with the string values to concatenate to the self value.
	 */
	//TODO: Fix Link Syntax
	concat( ...literals:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if the self lang tag value
	 * value matches {@param languageRange} as defined in [Matching of Language](https://www.ietf.org/rfc/rfc4647.txt)}.
	 *
	 * See {@link FunctionExpressionsBuilder#langMatches `FunctionExpressionsBuilder.langMatches`}  for the complete version of this method.
	 *
	 * @param languageRange Expression with the language range that the self lang tag value will be checked against.
	 */
	//TODO: Fix Link Syntax
	langMatches( languageRange:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if self text value
	 * value matches the {@param pattern} regular expression, applying the
	 * {@param flags} rules if defined.
	 *
	 * See {@link FunctionExpressionsBuilder#regex `FunctionExpressionsBuilder.regex`}  for the complete version of this method.
	 *
	 * @param pattern Expression with the regular expression used as the matcher.
	 * @param flags Optional expression with the matching rules to be applied.
	 */
	//TODO: Fix Link Syntax
	regex( pattern:Expression | SupportedNativeTypes, flags?:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns `true` if self text value
	 * value matches the {@param pattern} regular expression.
	 *
	 * See {@link FunctionExpressionsBuilder#regex `FunctionExpressionsBuilder.regex`}  for the complete version of this method.
	 *
	 * @param pattern RegExp used as the matcher.
	 */
	//TODO: Fix Link Syntax
	regex( pattern:RegExp ):Expression;

	/**
	 * Creates an {@link Expression} that returns a string produced by the
	 * self text value by replacing each non-overlapping occurrence of
	 * the {@param pattern} regular expression with the {@param replacement}
	 * string, applying the {@param flags} rules if defined.
	 *
	 * See {@link FunctionExpressionsBuilder#replace `FunctionExpressionsBuilder.replace`}  for the complete version of this method.
	 *
	 * @param pattern Expression with the regular expression used as the matcher.
	 * @param replacement Expression with the string or pattern to use as the replacement.
	 * @param flags Optional expression with the matching rules to be applied.
	 */
	//TODO: Fix Link Syntax
	replace( pattern:Expression | SupportedNativeTypes, replacement:Expression | SupportedNativeTypes, flags?:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns a string produced by the
	 * self text value by replacing each non-overlapping occurrence of
	 * the {@param pattern} regular expression with the {@param replacement}
	 * string.
	 *
	 * See {@link FunctionExpressionsBuilder#replace `FunctionExpressionsBuilder.replace`}  for the complete version of this method.
	 *
	 * @param pattern RegExp used as the matcher.
	 * @param replacement Expression with the string or pattern to use as the replacement.
	 */
	//TODO: Fix Link Syntax
	replace( pattern:RegExp, replacement:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the absolute value of
	 * the self value.
	 *
	 * See {@link FunctionExpressionsBuilder#abs `FunctionExpressionsBuilder.abs`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	abs():Expression;

	/**
	 * Creates an {@link Expression} that returns the number with no fractional
	 * part that is closest to the self value.
	 * If there are two such numbers, then the one that is closest to positive
	 * infinity is returned.
	 *
	 * See {@link FunctionExpressionsBuilder#round `FunctionExpressionsBuilder.round`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	round():Expression;

	/**
	 * Creates an {@link Expression} that returns the closest to negative infinity
	 * number with no fractional part that is closest to the elf value.
	 *
	 * See {@link FunctionExpressionsBuilder#ceil `FunctionExpressionsBuilder.ceil`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	ceil():Expression;

	/**
	 * Creates an {@link Expression} that returns the closest to positive infinity
	 * number with no fractional part that is closest to the self value.
	 *
	 * See {@link FunctionExpressionsBuilder#replace `FunctionExpressionsBuilder.replace`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	floor():Expression;

	/**
	 * Creates an {@link Expression} that returns the year part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder#year `FunctionExpressionsBuilder.year`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	year():Expression;

	/**
	 * Creates an {@link Expression} that returns the month part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder#month `FunctionExpressionsBuilder.month`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	month():Expression;

	/**
	 * Creates an {@link Expression} that returns the day part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder#day `FunctionExpressionsBuilder.day`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	day():Expression;

	/**
	 * Creates an {@link Expression} that returns the hours part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder#hours `FunctionExpressionsBuilder.hours`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	hours():Expression;

	/**
	 * Creates an {@link Expression} that returns the minutes part of the
	 * self value as an integer.
	 *
	 * See {@link FunctionExpressionsBuilder#minutes `FunctionExpressionsBuilder.minutes`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	minutes():Expression;

	/**
	 * Creates an {@link Expression} that returns the seconds part of the
	 * self value as a decimal.
	 *
	 * See {@link FunctionExpressionsBuilder#seconds `FunctionExpressionsBuilder.seconds`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	seconds():Expression;

	/**
	 * Creates an {@link Expression} that returns the timezone part of the
	 * self value as an `xsd:dayTimeDuration`.
	 *
	 * Beware that using a Date object will generate a literal in ISO 8601
	 * format with the `Z` timezone.
	 *
	 * See {@link FunctionExpressionsBuilder#timezone `FunctionExpressionsBuilder.timezone`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	timezone():Expression;

	/**
	 * Creates an {@link Expression} that returns the timezone part of the
	 * self value as a string.
	 *
	 * Beware that using a Date object will generate a literal in ISO 8601
	 * format with the `Z` timezone.
	 *
	 * See {@link FunctionExpressionsBuilder#tz `FunctionExpressionsBuilder.tz`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	tz():Expression;

	/**
	 * Creates an {@link Expression} that returns the MD5 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder#md5 `FunctionExpressionsBuilder.md5`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	md5():Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA1 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder#sha1 `FunctionExpressionsBuilder.sha1`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	sha1():Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA256 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder#sha256 `FunctionExpressionsBuilder.sha256`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	sha256():Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA384 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder#sha384 `FunctionExpressionsBuilder.sha384`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	sha384():Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA512 checksum, calculated
	 * on the UTF-8 representation of the self string value.
	 *
	 * See {@link FunctionExpressionsBuilder#sha512 `FunctionExpressionsBuilder.sha512`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	sha512():Expression;

	/**
	 * Creates an {@link Expression} that counts the number of times
	 * the self expression has a solution over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#count `FunctionExpressionsBuilder.count`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	count():Expression;
	/**
	 * Creates an {@link Expression} that counts the number of times
	 * the self expression has a bound for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#count `FunctionExpressionsBuilder.count`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	countDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the value of the sum
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#sum `FunctionExpressionsBuilder.sum`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	sum():Expression;
	/**
	 * Creates an {@link Expression} that returns the value of the sum
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#sumDistinct `FunctionExpressionsBuilder.sumDistinct`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	sumDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the average value
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#avg `FunctionExpressionsBuilder.avg`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	avg():Expression;
	/**
	 * Creates an {@link Expression} that returns the average value
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#avgDistinct `FunctionExpressionsBuilder.avgDistinct`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	avgDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the minimum value
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#min `FunctionExpressionsBuilder.min`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	min():Expression;
	/**
	 * Creates an {@link Expression} that returns the minimum value
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#minDistinct `FunctionExpressionsBuilder.minDistinct`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	minDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the maximum value
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#max `FunctionExpressionsBuilder.max`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	max():Expression;
	/**
	 * Creates an {@link Expression} that returns the maximum value
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#maxDistinct `FunctionExpressionsBuilder.maxDistinct`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	maxDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the string concatenation
	 * of the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#groupConcat `FunctionExpressionsBuilder.groupConcat`}  for the complete version of this method.
	 *
	 * @param separator - Optional separator character used in the concatenation, where by default its a space.
	 */
	//TODO: Fix Link Syntax
	groupConcat( separator?:string ):Expression;
	/**
	 * Creates an {@link Expression} that returns the string concatenation
	 * of the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#groupConcatDistinct `FunctionExpressionsBuilder.groupConcatDistinct`}  for the complete version of this method.
	 *
	 * @param separator - Optional separator character used in the concatenation, where by default its a space.
	 */
	//TODO: Fix Link Syntax
	groupConcatDistinct( separator?:string ):Expression;

	/**
	 * Creates an {@link Expression} that returns an arbitrary value
	 * from the self expression's values over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#sample `FunctionExpressionsBuilder.sample`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	sample():Expression;
	/**
	 * Creates an {@link Expression} that returns an arbitrary value
	 * from the self expression's values for every distinct sequence over the solution group.
	 *
	 * See {@link FunctionExpressionsBuilder#sampleDistinct `FunctionExpressionsBuilder.sampleDistinct`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	sampleDistinct():Expression;

	/**
	 * Creates an operation {@link Expression} that returns logical ORs
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder#or `OperationExpressionsBuilder.or`}  for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct a logical OR with the previous expression.
	 */
	//TODO: Fix Link Syntax
	or( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns logical ANDs
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder#and `OperationExpressionsBuilder.and`}  for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct a logical AND with the previous expression.
	 */
	//TODO: Fix Link Syntax
	and( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value and {@param rightExpression} are the same RDF term.
	 *
	 * See {@link OperationExpressionsBuilder#equals `OperationExpressionsBuilder.equals`}  for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	//TODO: Fix Link Syntax
	equals( rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value and {@param rightExpression} are NOT the same RDF term.
	 *
	 * See {@link OperationExpressionsBuilder#notEquals `OperationExpressionsBuilder.notEquals`}  for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	//TODO: Fix Link Syntax
	notEquals( rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value is less than the {@param rightExpression}.
	 *
	 * See {@link OperationExpressionsBuilder#lt `OperationExpressionsBuilder.lt`}  for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	//TODO: Fix Link Syntax
	lt( rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value is less or equal than the {@param rightExpression}.
	 *
	 * See {@link OperationExpressionsBuilder#lte `OperationExpressionsBuilder.lte`}  for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	//TODO: Fix Link Syntax
	lte( rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value is greater than the {@param rightExpression}.
	 *
	 * See {@link OperationExpressionsBuilder#gt `OperationExpressionsBuilder.gt`}  for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	//TODO: Fix Link Syntax
	gt( rightExpression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns `true` if
	 * the self value is greater or equal than the {@param rightExpression}.
	 *
	 * See {@link OperationExpressionsBuilder#gte `OperationExpressionsBuilder.gte`}  for the complete version of this method.
	 *
	 * @param rightExpression - Right expression to be compared against the self value.
	 */
	//TODO: Fix Link Syntax
	gte( rightExpression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns true whether
	 * the self value is equal to any of the {@param rightExpressions} values.
	 *
	 * See {@link OperationExpressionsBuilder#in `OperationExpressionsBuilder.in`}  for the complete version of this method.
	 *
	 * @param rightExpressions - Expressions to compare its values against the self value.
	 */
	//TODO: Fix Link Syntax
	in( ...rightExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns true whether
	 * the self value is NOT equal to any of the {@param rightExpressions} values.
	 *
	 * See {@link OperationExpressionsBuilder#notIn `OperationExpressionsBuilder.notIn`}  for the complete version of this method.
	 *
	 * @param rightExpressions - Expressions to compare its values against the self value.
	 */
	//TODO: Fix Link Syntax
	notIn( ...rightExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns the arithmetic sum
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder#add `OperationExpressionsBuilder.add`}  for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct an arithmetic sum with the previous expression.
	 */
	//TODO: Fix Link Syntax
	add( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns the arithmetic difference
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder#subtract `OperationExpressionsBuilder.subtract`}  for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct an arithmetic difference with the previous expression.
	 */
	//TODO: Fix Link Syntax
	subtract( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns the arithmetic product
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder#multiply `OperationExpressionsBuilder.multiply`}  for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct an arithmetic product with the previous expression.
	 */
	//TODO: Fix Link Syntax
	multiply( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an operation {@link Expression} that returns the arithmetic quotient
	 * between the self value and every {@param restExpressions}.
	 *
	 * See {@link OperationExpressionsBuilder#divide `OperationExpressionsBuilder.divide`}  for the complete version of this method.
	 *
	 * @param restExpressions - Expressions to construct an arithmetic quotient with the previous expression.
	 */
	//TODO: Fix Link Syntax
	divide( ...restExpressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an operation {@link Expression} that returns true
	 * if the effective boolean value of the self value is false.
	 *
	 * See {@link OperationExpressionsBuilder#not `OperationExpressionsBuilder.not`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	not():Expression;
	/**
	 * Creates an operation {@link Expression} that returns the numeric
	 * self value with its sing unchanged.
	 *
	 * See {@link OperationExpressionsBuilder#plus `OperationExpressionsBuilder.plus`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	plus():Expression;
	/**
	 * Creates an operation {@link Expression} that returns the numeric
	 * self value with its sing reversed.
	 *
	 * See {@link OperationExpressionsBuilder#minus `OperationExpressionsBuilder.minus`}  for the complete version of this method.
	 */
	//TODO: Fix Link Syntax
	minus():Expression;


	/**
	 * Creates an assigment to a variable from the current expression.
	 *
	 * @param variable Name or variable where the expression value will be assigned.
	 */
	as( variable:string | Variable ):Projectable<AssigmentToken>;

	/**
	 * Returns the {@link ExpressionToken} of the expression.
	 */
	_getExpression():T;
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
			if: getBaseFunctionFn( Expression.createFrom, container, Functions.IF, 3 ),
			coalesce: getBaseFunctionFn( Expression.createFrom, container, Functions.COALESCE, undefined ),
			sameTerm: getBaseFunctionFn( Expression.createFrom, container, Functions.SAME_TERM, 2 ),
			isIRI: getBaseFunctionFn( Expression.createFrom, container, Functions.IS_IRI, 1 ),
			isURI: getBaseFunctionFn( Expression.createFrom, container, Functions.IS_URI, 1 ),
			isBlank: getBaseFunctionFn( Expression.createFrom, container, Functions.IS_BLANK, 1 ),
			isLiteral: getBaseFunctionFn( Expression.createFrom, container, Functions.IS_LITERAL, 1 ),
			isNumeric: getBaseFunctionFn( Expression.createFrom, container, Functions.IS_NUMERIC, 1 ),
			str: getBaseFunctionFn( Expression.createFrom, container, Functions.STR, 1 ),
			lang: getBaseFunctionFn( Expression.createFrom, container, Functions.LANG, 1 ),
			datatype: getBaseFunctionFn( Expression.createFrom, container, Functions.DATATYPE, 1 ),
			iri: getBaseFunctionFn( Expression.createFrom, container, Functions.IRI, 1 ),
			uri: getBaseFunctionFn( Expression.createFrom, container, Functions.URI, 1 ),
			bnode: getBaseFunctionFn( Expression.createFrom, container, Functions.BNODE, 1 ),
			strDT: getBaseFunctionFn( Expression.createFrom, container, Functions.STR_DT, 2 ),
			strLang: getBaseFunctionFn( Expression.createFrom, container, Functions.STR_LANG, 2 ),
			strLen: getBaseFunctionFn( Expression.createFrom, container, Functions.STRLEN, 1 ),
			substr: getBaseFunctionFn( Expression.createFrom, container, Functions.SUBSTR, 3 ),
			uCase: getBaseFunctionFn( Expression.createFrom, container, Functions.UCASE, 1 ),
			lCase: getBaseFunctionFn( Expression.createFrom, container, Functions.LCASE, 1 ),
			strStarts: getBaseFunctionFn( Expression.createFrom, container, Functions.STR_STARTS, 2 ),
			strEnds: getBaseFunctionFn( Expression.createFrom, container, Functions.STR_ENDS, 2 ),
			contains: getBaseFunctionFn( Expression.createFrom, container, Functions.CONTAINS, 2 ),
			strBefore: getBaseFunctionFn( Expression.createFrom, container, Functions.STR_BEFORE, 2 ),
			strAfter: getBaseFunctionFn( Expression.createFrom, container, Functions.STR_AFTER, 2 ),
			encodeForUri: getBaseFunctionFn( Expression.createFrom, container, Functions.ENCODE_FOR_URI, 1 ),
			concat: getBaseFunctionFn( Expression.createFrom, container, Functions.CONCAT, undefined ),
			langMatches: getBaseFunctionFn( Expression.createFrom, container, Functions.LANG_MATCHES, 2 ),
			regex: getRegexFunctionFn( Expression.createFrom, container, Functions.REGEX, 3 ),
			replace: getRegexFunctionFn( Expression.createFrom, container, Functions.REPLACE, 4 ),
			abs: getBaseFunctionFn( Expression.createFrom, container, Functions.ABS, 1 ),
			round: getBaseFunctionFn( Expression.createFrom, container, Functions.ROUND, 1 ),
			ceil: getBaseFunctionFn( Expression.createFrom, container, Functions.CEIL, 1 ),
			floor: getBaseFunctionFn( Expression.createFrom, container, Functions.FLOOR, 1 ),
			year: getBaseFunctionFn( Expression.createFrom, container, Functions.YEAR, 1 ),
			month: getBaseFunctionFn( Expression.createFrom, container, Functions.MONTH, 1 ),
			day: getBaseFunctionFn( Expression.createFrom, container, Functions.DAY, 1 ),
			hours: getBaseFunctionFn( Expression.createFrom, container, Functions.HOURS, 1 ),
			minutes: getBaseFunctionFn( Expression.createFrom, container, Functions.MINUTES, 1 ),
			seconds: getBaseFunctionFn( Expression.createFrom, container, Functions.SECONDS, 1 ),
			timezone: getBaseFunctionFn( Expression.createFrom, container, Functions.TIMEZONE, 1 ),
			tz: getBaseFunctionFn( Expression.createFrom, container, Functions.TZ, 1 ),
			md5: getBaseFunctionFn( Expression.createFrom, container, Functions.MD5, 1 ),
			sha1: getBaseFunctionFn( Expression.createFrom, container, Functions.SHA1, 1 ),
			sha256: getBaseFunctionFn( Expression.createFrom, container, Functions.SHA256, 1 ),
			sha384: getBaseFunctionFn( Expression.createFrom, container, Functions.SHA384, 1 ),
			sha512: getBaseFunctionFn( Expression.createFrom, container, Functions.SHA512, 1 ),
			count: getBaseFunctionFn( Expression.createFrom, container, Functions.COUNT, 1 ),
			countDistinct: getBaseFunctionFn( Expression.createFrom, container, Functions.COUNT, 1, true ),
			sum: getBaseFunctionFn( Expression.createFrom, container, Functions.SUM, 1 ),
			sumDistinct: getBaseFunctionFn( Expression.createFrom, container, Functions.SUM, 1, true ),
			avg: getBaseFunctionFn( Expression.createFrom, container, Functions.AVG, 1 ),
			avgDistinct: getBaseFunctionFn( Expression.createFrom, container, Functions.AVG, 1, true ),
			min: getBaseFunctionFn( Expression.createFrom, container, Functions.MIN, 1 ),
			minDistinct: getBaseFunctionFn( Expression.createFrom, container, Functions.MIN, 1, true ),
			max: getBaseFunctionFn( Expression.createFrom, container, Functions.MAX, 1 ),
			maxDistinct: getBaseFunctionFn( Expression.createFrom, container, Functions.MAX, 1, true ),
			groupConcat: getSeparatorFunctionFn( Expression.createFrom, container, Functions.GROUP_CONCAT ),
			groupConcatDistinct: getSeparatorFunctionFn( Expression.createFrom, container, Functions.GROUP_CONCAT, true ),
			sample: getBaseFunctionFn( Expression.createFrom, container, Functions.SAMPLE, 1 ),
			sampleDistinct: getBaseFunctionFn( Expression.createFrom, container, Functions.SAMPLE, 1, true ),

			// Operations
			or: getBinaryOperationFn( Expression.createFrom, container, ConditionalOrOperationToken, ConditionalAndExpressionToken.is, "||" ),
			and: getBinaryOperationFn( Expression.createFrom, container, ConditionalAndOperationToken, RelationalExpressionToken.is, "&&" ),
			equals: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, "=", true ),
			notEquals: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, "!=", true ),
			lt: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, "<", true ),
			lte: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, "<=", true ),
			gt: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, ">", true ),
			gte: getBinaryOperationFn( Expression.createFrom, container, RelationalOperationToken, NumericExpressionToken.is, ">=", true ),
			in: getInclusionFn( Expression.createFrom, container, "IN" ),
			notIn: getInclusionFn( Expression.createFrom, container, "NOT IN" ),
			add: getBinaryOperationFn( Expression.createFrom, container, AdditiveOperationToken, MultiplicativeExpressionToken.is, "+" ),
			subtract: getBinaryOperationFn( Expression.createFrom, container, AdditiveOperationToken, MultiplicativeExpressionToken.is, "-" ),
			multiply: getBinaryOperationFn( Expression.createFrom, container, MultiplicativeOperationToken, UnaryExpressionToken.is, "*" ),
			divide: getBinaryOperationFn( Expression.createFrom, container, MultiplicativeOperationToken, UnaryExpressionToken.is, "/" ),
			not: getUnaryOperationFn( Expression.createFrom, container, "!" ),
			plus: getUnaryOperationFn( Expression.createFrom, container, "+" ),
			minus: getUnaryOperationFn( Expression.createFrom, container, "-" ),

			// Projection
			as: getAsFn( container ),

			// Self
			_getExpression: () => container.targetToken,
		} );
	}
};
