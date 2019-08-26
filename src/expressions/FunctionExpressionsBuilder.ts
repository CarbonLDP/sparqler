import { Container } from "../core/containers/Container";

import { Pattern } from "../patterns/Pattern";
import { Resource } from "../patterns/triplePatterns/Resource";
import { Variable } from "../patterns/triplePatterns/Variable";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { Expression } from "./Expression";
import {
	Functions,
	getBaseFunctionFn,
	getCustomFunctionFn,
	getPatternFunctionFn,
	getRegexFunctionFn,
	getSeparatorFunctionFn,
	getVariableFunctionFn
} from "./fns/functionFn";


/**
 * Builder for function expressions.
 */
export interface FunctionExpressionsBuilder {
	/**
	 * Creates an {@link Expression} that returns true if {@param variable}
	 * is bound to a value.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-bound
	 * for more information.
	 *
	 * @param variable - Variable to evaluate if it's associated to a value.
	 */
	bound( variable:Variable | string ):Expression;

	/**
	 * Creates an {@link Expression} that evaluates {@param condition} and then
	 * returns the {@param consequent} value if the condition is true,
	 * otherwise it returns {@param alternative}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-if
	 * for more information.
	 *
	 * @param condition - Expression to evaluate for its effective boolean value.
	 * @param consequent - Expression to return its value when the condition is evaluated to `true`.
	 * @param alternative - Expression to returns its value when the condition is evaluated to `false.`
	 */
	if( condition:Expression | SupportedNativeTypes, consequent:Expression | SupportedNativeTypes, alternative:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the value of the first expression
	 * from the {@param expressions} list that evaluates without error.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-coalesce
	 * for more information.
	 *
	 * @param expressions - Expressions to be evaluated for the non-raising error one.
	 */
	coalesce( ...expressions:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param patterns}
	 * matches the data set, or `false` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-filter-exists
	 * for more information.
	 *
	 * @param patterns - Patterns to evaluate if matches the data set.
	 */
	exists( patterns:Pattern[] ):Expression;
	/**
	 * Creates an {@link Expression} that returns `true` if {@param patterns}
	 * matches the data set, or `false` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-filter-exists
	 * for more information.
	 *
	 * @param patterns - Patterns to evaluate if matches the data set.
	 */
	exists( ...patterns:Pattern[] ):Expression;
	/**
	 * Creates an {@link Expression} that returns `false` if {@param patterns}
	 * matches the data set, or `true` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-filter-exists
	 * for more information.
	 *
	 * @param patterns - Patterns to evaluate if not matches the data set.
	 */
	notExists( patterns:Pattern[] ):Expression;
	/**
	 * Creates an {@link Expression} that returns `false` if {@param patterns}
	 * matches the data set, or `true` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-filter-exists
	 * for more information.
	 *
	 * @param patterns - Patterns to evaluate if not matches the data set.
	 */
	notExists( ...patterns:Pattern[] ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term1} and
	 * {@param term2} are the same RDF term, or `false` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-sameTerm
	 * for more information.
	 *
	 * @param term1 - Expression to evaluate its value against {@param term2}.
	 * @param term2 - Expression to evaluate its value against {@param term1}.
	 */
	sameTerm( term1:Expression | SupportedNativeTypes, term2:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * an IRI. Returns `false` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-isIRI
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isIRI( term:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * an URI. Returns `false` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-isIRI
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isURI( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * a blank node. Returns `false` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-isBlank
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isBlank( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * a literal. Returns `false` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-isLiteral
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isLiteral( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param term} is
	 * a numeric value. Returns `false` otherwise.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-isNumeric
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	isNumeric( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the string representation of
	 * {@param term}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-str
	 * for more information.
	 *
	 * @param term - Expression to evaluate its value.
	 */
	str( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the language tag of
	 * {@param literal}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-lang
	 * for more information.
	 *
	 * @param literal - Expression to evaluate its value lang.
	 */
	lang( literal:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the datatype IRI of
	 * {@param literal}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-datatype
	 * for more information.
	 *
	 * @param literal - Expression to evaluate its value lang.
	 */
	datatype( literal:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that constructs an IRI by resolving
	 * {@param argument}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-iri
	 * for more information.
	 *
	 * @param argument - Expression to construct an IRI with its value.
	 */
	iri( argument:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that constructs a URI by resolving
	 * {@param argument}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-iri
	 * for more information.
	 *
	 * @param argument - Expression to construct a URI with its value.
	 */
	uri( argument:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that constructs a blank node that is
	 * distinct from all blank nodes in the data set.
	 * If {@param literal} is provided, it will be used as base for the blank
	 * node label.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-bnode
	 * for more information.
	 *
	 * @param literal - Optional expression to use its value for the blank node creation.
	 */
	bnode( literal?:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that constructs an RDF literal with
	 * {@param lexicalForm} and {@param dataType} specified.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-strdt
	 * for more information.
	 *
	 * @param lexicalForm - Expresion with a string value to use as the lexical form of the literal.
	 * @param dataType - Expresion with an IRI value to use as the datatype of the literal.
	 */
	strDT( lexicalForm:Expression | SupportedNativeTypes, dataType:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that constructs an RDF literal with the
	 * {@param lexicalForm} and {@param languageTag} specified.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-strlang
	 * for more information.
	 *
	 * @param lexicalForm - Expresion with a string value to use as the lexical form of the literal.
	 * @param languageTag - Expresion with a string value to use as the language tag of the literal.
	 */
	strLang( lexicalForm:Expression | SupportedNativeTypes, languageTag:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns an IRI from the
	 * {@link https://www.ietf.org/rfc/rfc4122.txt UUID URN scheme}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-uuid
	 * for more information.
	 */
	uuid():Expression;
	/**
	 * Creates an {@link Expression} that returns a string with an UUID.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-struuid
	 * for more information.
	 */
	strUUID():Expression;

	/**
	 * Creates an {@link Expression} that returns the number of characters
	 * of the {@param str} expression value.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-strlen
	 * for more information.
	 *
	 * @param str - Expression to count the characters of its string value.
	 */
	strLen( str:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns a the portion of the
	 * {@param source} value beginning at the position indicated by the value of
	 * {@param starting} and counting fot the number of characters indicated by
	 * the value of {@param length} if provided, otherwise it {@param length}
	 * will be considered infinite.
	 *
	 * The index of the first character of a string is 1.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-substr
	 * for more information.
	 *
	 * @param source Expression with the string value to extract the portion from.
	 * @param starting Expression with the index from where to start the portion to take.
	 * @param length Expression with the number of characters of the portion to take.
	 */
	substr( source:Expression | SupportedNativeTypes, starting:Expression | SupportedNativeTypes, length?:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the {@param str} value
	 * converted to uppercase.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-ucase
	 * for more information.
	 *
	 * @param str Expression with the string value to convert.
	 */
	uCase( str:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the {@param str} value
	 * converted to lowercase.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-lcase
	 * for more information.
	 *
	 * @param str Expression with the string value to convert.
	 */
	lCase( str:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` of the value if
	 * {@param arg1} starts with the value of {@param arg2}, otherwise it
	 * returns `false`.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-strstarts
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check it starts with {@param arg2}.
	 * @param arg2 Expression with the string value to check it's the start of {@param arg1}.
	 */
	strStarts( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` if the value of
	 * {@param arg1} ends with the value of {@param arg2}, otherwise it
	 * returns `false`.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-strends
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check it ends with {@param arg2}.
	 * @param arg2 Expression with the string value to check it's the end of {@param arg1}.
	 */
	strEnds( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the `true` if the value of
	 * {@param arg1} contains the value of {@param arg2} as a substring,
	 * otherwise it returns `false`.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-strends
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check it contains {@param arg2}.
	 * @param arg2 Expression with the string value to check it's contained by {@param arg1}.
	 */
	contains( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the part the {@param arg1}
	 * value that precedes the first occurrence of {@param arg2} value.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-strends
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check and return the preceded part.
	 * @param arg2 Expression with the string value to check where it appears in {@param arg1}.
	 */
	strBefore( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the part the {@param arg1}
	 * value that follows the first occurrence of {@param arg2} value.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-strafter
	 * for more information.
	 *
	 * @param arg1 Expression with the string value to check and return the followed part.
	 * @param arg2 Expression with the string value to check where it appears in {@param arg1}.
	 */
	strAfter( arg1:Expression | SupportedNativeTypes, arg2:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns a literal with the encoded
	 * special characters that the value of the {@param literal} provided may have.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-encode
	 * for more information.
	 *
	 * @param literal Expression with the string value to encode.
	 */
	encodeForUri( literal:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the concatenation of the
	 * string values of the {@param literals} provided.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-concat
	 * for more information.
	 *
	 * @param literals Expressions with the string values to concatenate.
	 */
	concat( ...literals:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param languageTag}
	 * value matches {@param languageRange} as defined in
	 * {@link https://www.ietf.org/rfc/rfc4647.txt Matching of Language}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-langMatches
	 * for more information.
	 *
	 * @param languageTag Expressions with the language tag to be checked.
	 * @param languageRange Expression with the language range that {@param languageTag} will be checked against.
	 */
	langMatches( languageTag:Expression | SupportedNativeTypes, languageRange:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns `true` if {@param text}
	 * value matches the {@param pattern} regular expression, applying the
	 * {@param flags} rules if defined.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-regex
	 * for more information.
	 *
	 * @param text Expressions with string value to be checked.
	 * @param pattern Expression with the regular expression used as the matcher.
	 * @param flags Optional expression with the matching rules to be applied.
	 */
	regex( text:Expression | SupportedNativeTypes, pattern:Expression | SupportedNativeTypes, flags?:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns `true` if {@param text}
	 * value matches the {@param pattern} regular expression.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-regex
	 * for more information.
	 *
	 * @param text Expressions with string value to be checked.
	 * @param pattern Regex used as the matcher.
	 */
	regex( text:Expression | SupportedNativeTypes, pattern:RegExp ):Expression;

	/**
	 * Creates an {@link Expression} that returns a string produced by the
	 * {@param text} value by replacing each non-overlapping occurrence of
	 * the {@param pattern} regular expression with the {@param replacement}
	 * string, applying the {@param flags} rules if defined.
	 *
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-replace
	 * for more information.
	 *
	 * @param text Expressions with string value to replace with the respective replacement.
	 * @param pattern Expression with the regular expression used as the matcher.
	 * @param replacement Expression with the string or pattern to use as the replacement.
	 * @param flags Optional expression with the matching rules to be applied.
	 */
	replace( text:Expression | SupportedNativeTypes, pattern:Expression | SupportedNativeTypes, replacement:Expression | SupportedNativeTypes, flags?:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns a string produced by the
	 * {@param text} value by replacing each non-overlapping occurrence of
	 * the {@param pattern} regular expression with the {@param replacement}
	 * string.
	 *
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-replace
	 * for more information.
	 *
	 * @param text Expressions with string value to replace with the respective replacement.
	 * @param pattern RegExp used as the matcher.
	 * @param replacement Expression with the string or pattern to use as the replacement.
	 */
	replace( text:Expression | SupportedNativeTypes, pattern:RegExp, replacement:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the absolute value of
	 * {@param term}.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-abs
	 * for more information.
	 *
	 * @param term Expressions with the numeric value to get its absolute value.
	 */
	abs( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the number with no fractional
	 * part that is closest to the {@param term} value.
	 * If there are two such numbers, then the one that is closest to positive
	 * infinity is returned.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-round
	 * for more information.
	 *
	 * @param term Expressions with the numeric value to get its round value.
	 */
	round( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the closest to negative infinity
	 * number with no fractional part that is closest to the {@param term} value.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-ceil
	 * for more information.
	 *
	 * @param term Expressions with the numeric value to get its ceil value.
	 */
	ceil( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the closest to positive infinity
	 * number with no fractional part that is closest to the {@param term} value.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-floor
	 * for more information.
	 *
	 * @param term Expressions with the numeric value to get its floor value.
	 */
	floor( term:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns a pseudo-random number
	 * between 0 (inclusive) and 1.0e0 (exclusive).
	 *
	 * See https://www.w3.org/TR/sparql11-query/#idp2130040
	 * for more information.
	 */
	rand():Expression;

	/**
	 * Creates an {@link Expression} that returns a `xsd:dateType` value for
	 * the current query execution.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-now
	 * for more information.
	 */
	now():Expression;

	/**
	 * Creates an {@link Expression} that returns the year part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-year
	 * for more information.
	 */
	year( dateTime:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the month part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-month
	 * for more information.
	 */
	month( dateTime:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the day part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-day
	 * for more information.
	 */
	day( dateTime:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the hours part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-hours
	 * for more information.
	 */
	hours( dateTime:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the minutes part of the
	 * {@param dateTime} value as an integer.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-minutes
	 * for more information.
	 */
	minutes( dateTime:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the seconds part of the
	 * {@param dateTime} value as a decimal.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-seconds
	 * for more information.
	 */
	seconds( dateTime:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the timezone part of the
	 * {@param dateTime} value as an `xsd:dayTimeDuration`.
	 *
	 * Beware that using a Date object will generate a literal in ISO 8601
	 * format with the `Z` timezone.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-timezone
	 * for more information.
	 */
	timezone( dateTime:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the timezone part of the
	 * {@param dateTime} value as a string.
	 *
	 * Beware that using a Date object will generate a literal in ISO 8601
	 * format with the `Z` timezone.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-tz
	 * for more information.
	 */
	tz( dateTime:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the MD5 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-md5
	 * for more information.
	 */
	md5( literal:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA1 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-sha1
	 * for more information.
	 */
	sha1( literal:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA256 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-sha256
	 * for more information.
	 */
	sha256( literal:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA384 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-sha384
	 * for more information.
	 */
	sha384( literal:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the SHA512 checksum, calculated
	 * on the UTF-8 representation of the string {@param literal} provided.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#func-sha512
	 * for more information.
	 */
	sha512( literal:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that executes a function
	 * declared by a custom IRI.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#ririOrFunction
	 * for more information.
	 */
	custom( resource:Resource | string, ...args:(Expression | SupportedNativeTypes)[] ):Expression;
	/**
	 * Creates an {@link Expression} that executes a function
	 * declared by a custom IRI reducing to only distinct arguments.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#ririOrFunction
	 * for more information.
	 */
	customDistinct( resource:Resource | string, ...args:(Expression | SupportedNativeTypes)[] ):Expression;

	/**
	 * Creates an {@link Expression} that counts the number of times
	 * the given expression has a solution over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggCount
	 * for more information.
	 *
	 * @param expression - Expression to be counted
	 */
	count( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that counts the number of times
	 * the given expression has a bound for every distinct sequence over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggCount
	 * for more information.
	 *
	 * @param expression - Expression to be counted
	 */
	countDistinct( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that counts the number of solutions
	 * over the group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggCount
	 * for more information.
	 */
	countAll():Expression;
	/**
	 * Creates an {@link Expression} that counts the number of distinct
	 * solution sequences over the group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggCount
	 * for more information.
	 */
	countAllDistinct():Expression;

	/**
	 * Creates an {@link Expression} that returns the value of the sum
	 * of the given expression's values over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggSum
	 * for more information.
	 *
	 * @param expression - Expression of the values to be summed.
	 */
	sum( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns the value of the sum
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggSum
	 * for more information.
	 *
	 * @param expression - Expression of the values to be summed.
	 */
	sumDistinct( expression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the average value
	 * of the given expression's values over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggAvg
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its average.
	 */
	avg( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns the average value
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggAvg
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its average.
	 */
	avgDistinct( expression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the minimum value
	 * of the given expression's values over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggMin
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its minimum.
	 */
	min( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns the minimum value
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggMin
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its minimum.
	 */
	minDistinct( expression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the maximum value
	 * of the given expression's values over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggMax
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its maximum.
	 */
	max( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns the maximum value
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggMax
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its maximum.
	 */
	maxDistinct( expression:Expression | SupportedNativeTypes ):Expression;

	/**
	 * Creates an {@link Expression} that returns the string concatenation
	 * of the given expression's values over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggGroupConcat
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its maximum.
	 * @param separator - Optional separator character used in the concatenation, where by default its a space.
	 */
	groupConcat( expression:Expression | SupportedNativeTypes, separator?:string ):Expression;
	/**
	 * Creates an {@link Expression} that returns the string concatenation
	 * of the given expression's values for every distinct sequence over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggGroupConcat
	 * for more information.
	 *
	 * @param expression - Expression of the values to calculate its maximum.
	 * @param separator - Optional separator character used in the concatenation, where by default its a space.
	 */
	groupConcatDistinct( expression:Expression | SupportedNativeTypes, separator?:string ):Expression;

	/**
	 * Creates an {@link Expression} that returns an arbitrary value
	 * from the given expression's values over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggSample
	 * for more information.
	 *
	 * @param expression - Expression of the values from where to select the value.
	 */
	sample( expression:Expression | SupportedNativeTypes ):Expression;
	/**
	 * Creates an {@link Expression} that returns an arbitrary value
	 * from the given expression's values for every distinct sequence over the solution group.
	 *
	 * See https://www.w3.org/TR/sparql11-query/#defn_aggSample
	 * for more information.
	 *
	 * @param expression - Expression of the values from where to select the value.
	 */
	sampleDistinct( expression:Expression | SupportedNativeTypes ):Expression;
}


// Expressions implementation


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
		return Object.assign( object, {
			bound: getVariableFunctionFn( Expression.createFrom, container, Functions.BOUND ),
			if: getBaseFunctionFn( Expression.createFrom, container, Functions.IF, 3 ),
			coalesce: getBaseFunctionFn( Expression.createFrom, container, Functions.COALESCE, undefined ),
			exists: getPatternFunctionFn( Expression.createFrom, container, Functions.EXISTS ),
			notExists: getPatternFunctionFn( Expression.createFrom, container, Functions.NOT_EXISTS ),
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
			uuid: getBaseFunctionFn( Expression.createFrom, container, Functions.UUID, 0 ),
			strUUID: getBaseFunctionFn( Expression.createFrom, container, Functions.STR_UUID, 0 ),
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
			rand: getBaseFunctionFn( Expression.createFrom, container, Functions.RAND, 0 ),
			now: getBaseFunctionFn( Expression.createFrom, container, Functions.NOW, 0 ),
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
			custom: getCustomFunctionFn( Expression.createFrom, container ),
			customDistinct: getCustomFunctionFn( Expression.createFrom, container, true ),
			count: getBaseFunctionFn( Expression.createFrom, container, Functions.COUNT, 1 ),
			countDistinct: getBaseFunctionFn( Expression.createFrom, container, Functions.COUNT, 1, true ),
			countAll: getBaseFunctionFn( Expression.createFrom, container, Functions.COUNT, null ),
			countAllDistinct: getBaseFunctionFn( Expression.createFrom, container, Functions.COUNT, null, true ),
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
		} )
	},
};
