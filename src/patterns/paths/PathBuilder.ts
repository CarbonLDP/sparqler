import { IRIToken } from "../../tokens/IRIToken";
import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathInNegatedToken } from "../../tokens/PathInNegatedToken";
import { PathInverseToken } from "../../tokens/PathInverseToken";
import { PathModToken } from "../../tokens/PathModToken";
import { PathNegatedToken } from "../../tokens/PathNegatedToken";
import { PathSequenceToken } from "../../tokens/PathSequenceToken";
import { PathToken } from "../../tokens/PathToken";
import { SubPathInNegatedToken } from "../../tokens/SubPathInNegatedToken";
import { SubPathToken } from "../../tokens/SubPathToken";

import { Resource } from "../triplePatterns/Resource";

import { DeniableFluentPath } from "./DeniableFluentPath";
import { FluentPath } from "./FluentPath";

import { FluentPathContainer } from "./FluentPathContainer";
import { getAlternativeFn } from "./fns/alternativeFn";
import { getInverseFn } from "./fns/inverseFn";
import { getModFn } from "./fns/modFn";
import { getNegatedFn } from "./fns/negatedFn";
import { getSequenceFn } from "./fns/sequenceFn";
import { getSubPathFn } from "./fns/subPathFn";

import { Path } from "./Path";


/**
 * Builder with the methods that helps you to construct any path.
 *
 * See https://www.w3.org/TR/sparql11-query/#propertypaths for
 * more information.
 */
export interface PathBuilder {
	/**
	 * Create a sub-path from a property or path.
	 * @param path the path to be added as in the sub-path.
	 */
	subPath( path?:Resource | "a" | string | Path<PathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> ):DeniableFluentPath<SubPathInNegatedToken>;
	subPath( path:Path ):FluentPath<SubPathToken<PathToken>>;


	/**
	 * Create a alternative path from the paths.
	 * @param paths The paths to be added as alternate options.
	 */
	alternatives( ...paths:((Resource | "a" | string | Path<PathInNegatedToken>) | (Resource | "a" | string | Path<PathInNegatedToken>)[])[] ):DeniableFluentPath<PathAlternativeToken<PathInNegatedToken>>;
	alternatives( ...paths:((Resource | "a" | string | Path<PathToken>) | (Resource | "a" | string | Path<PathToken>)[])[] ):FluentPath<PathAlternativeToken>;

	/**
	 * Create a sequence path from the paths.
	 * @param paths The paths to be added as path sequence.
	 */
	sequences( ...paths:((Resource | "a" | string | Path<PathToken>) | (Resource | "a" | string | Path<PathToken>)[])[] ):FluentPath<PathSequenceToken>;


	/**
	 * Create an inverse path from another one.
	 * @param path The path to be inverted.
	 */
	inverse( path:Resource | "a" | string | Path<IRIToken | "a"> ):DeniableFluentPath<PathInverseToken<IRIToken | "a">>;
	inverse( path:Resource | "a" | string | Path<PathToken> ):FluentPath<PathInverseToken>;

	/**
	 * Create an negated path from the another one.
	 * @param path The path to be negated.
	 */
	negated( path:Resource | "a" | string | Path<PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> ):FluentPath<PathNegatedToken>;


	/**
	 * Set the path to be matched one or zero times.
	 * i.e. the `?` mod.
	 *
	 * @param path The path to add the mod.
	 */
	oneOrNone( path:Resource | "a" | string | Path<PathToken> ):FluentPath<PathModToken>;

	/**
	 * Set the path to be matched zero or more times.
	 * i.e. the `*` mod.
	 *
	 * @param path The path to add the mod.
	 */
	zeroOrMore( path:Resource | "a" | string | Path<PathToken> ):FluentPath<PathModToken>;

	/**
	 * Set the path to be matched one or more times.
	 * i.e. the `+` mod.
	 *
	 * @param path The path to add the mod.
	 */
	onceOrMore( path:Resource | "a" | string | Path<PathToken> ):FluentPath<PathModToken>;
}


/**
 * Constant with the utils for {@link PathBuilder} objects.
 */
export const PathBuilder:{
	/**
	 * Factory function that allows to crete a {@link PathBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link PathBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link PathBuilder} statement.
	 *
	 * @return The {@link PathBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:FluentPathContainer<undefined>, object:O ):O & PathBuilder;
} = {
	createFrom<O extends object>( container:FluentPathContainer<undefined>, object:O ):O & PathBuilder {
		return Object.assign( object, {
			subPath: getSubPathFn( container ),

			alternatives: getAlternativeFn( container ),
			sequences: getSequenceFn( container ),

			inverse: getInverseFn( container ),
			negated: getNegatedFn( container ),

			oneOrNone: getModFn( container, "?" ),
			zeroOrMore: getModFn( container, "*" ),
			onceOrMore: getModFn( container, "+" ),
		} );
	}
};
