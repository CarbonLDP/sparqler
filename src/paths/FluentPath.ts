import { Resource } from "../patterns/triplePatterns/Resource";

import { IRIToken } from "../tokens/IRIToken";
import { PathAlternativeToken } from "../tokens/PathAlternativeToken";
import { PathInNegatedToken } from "../tokens/PathInNegatedToken";
import { PathInverseToken } from "../tokens/PathInverseToken";
import { PathModToken } from "../tokens/PathModToken";
import { PathSequenceToken } from "../tokens/PathSequenceToken";
import { PathToken } from "../tokens/PathToken";
import { SubPathToken } from "../tokens/SubPathToken";

import { DeniableFluentPath } from "./DeniableFluentPath";
import { FluentPathContainer } from "./FluentPathContainer";
import { getAlternativeFn } from "./fns/alternativeFn";
import { getInverseFn } from "./fns/inverseFn";
import { getModFn } from "./fns/modFn";
import { getSequenceFn } from "./fns/sequenceFn";
import { getSubPathFn } from "./fns/subPathFn";

import { Path } from "./Path";


/**
 * The interface with the methods for constructing a path with in
 * a fluent mode.
 *
 * Example:
 * ```typescript
 * _.inverse( "ex:path1" ) // ^ex:path1
 *     .then( "ex:path2" ) // ^ex:path1 / ex:path2
 *     .onceOrMore()       // (^ex:path1 / ex:path2)+
 * ```
 */
export interface FluentPath<T extends PathToken = PathToken> extends Path<T> {
	/**
	 * Wrap the current path as a sub-path.
	 */
	subPath():T extends PathInNegatedToken ? DeniableFluentPath<SubPathToken<T>> : FluentPath<SubPathToken<T>>;


	/**
	 * Add alternative paths from the current one.
	 * @param paths The to be added as alternatives.
	 */
	or( ...paths:((Resource | "a" | string | Path<PathInNegatedToken>) | (Resource | "a" | string | Path<PathInNegatedToken>)[])[] ):T extends PathInNegatedToken ? DeniableFluentPath<PathAlternativeToken<PathInNegatedToken>> : FluentPath<PathAlternativeToken>;
	or( ...paths:((Resource | "a" | string | Path<PathToken>) | (Resource | "a" | string | Path<PathToken>)[])[] ):FluentPath<PathAlternativeToken>;

	/**
	 * Add sequence paths from the current one.
	 * @param paths The paths to be added as a sequence.
	 */
	then( ...paths:((Resource | "a" | string | Path<PathToken>) | (Resource | "a" | string | Path<PathToken>)[])[] ):FluentPath<PathSequenceToken>;


	/**
	 * Change the current path to be an inverse path.
	 */
	inverse():T extends PathInNegatedToken ? DeniableFluentPath<PathInverseToken<IRIToken | "a">> : FluentPath<PathInverseToken>;


	/**
	 * Add the one or none mod (?) into the current path.
	 */
	oneOrNone():FluentPath<PathModToken>;

	/**
	 * Add the zero or more mod (*) into the current path.
	 */
	zeroOrMore():FluentPath<PathModToken>;

	/**
	 * Add the once or more mod (+) into the current path.
	 */
	onceOrMore():FluentPath<PathModToken>;
}

/**
 * Constant with the utils for {@link FluentPath} objects.
 */
export const FluentPath:{
	/**
	 * Factory function that allows to crete a {@link FluentPath}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link FluentPath} statement.
	 * @param object The base base from where to create the
	 * {@link FluentPath} statement.
	 *
	 * @return The {@link FluentPath} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends PathToken, O extends object>( container:FluentPathContainer<T>, object:O ):O & FluentPath<T>;
} = {
	createFrom<T extends PathToken, O extends object>( container:FluentPathContainer<T>, object:O ):O & FluentPath<T> {
		return Path.createFrom( container, Object.assign( object, {
			subPath: getSubPathFn<T>( container ),

			or: getAlternativeFn<T>( container ),
			then: getSequenceFn( container ),

			inverse: getInverseFn<T>( container ),

			oneOrNone: getModFn( container, "?" ),
			zeroOrMore: getModFn( container, "*" ),
			onceOrMore: getModFn( container, "+" ),
		} ) );
	},
};
