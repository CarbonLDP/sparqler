import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathInNegatedToken } from "../../tokens/PathInNegatedToken";
import { PathNegatedToken } from "../../tokens/PathNegatedToken";
import { SubPathInNegatedToken } from "../../tokens/SubPathInNegatedToken";

import { FluentPath } from "./FluentPath";
import { FluentPathContainer } from "./FluentPathContainer";

import { getNegatedFn } from "./fns/negatedFn";


/**
 * The interface that add a function to negate the current path.
 *
 * This is a different interface, since the only special paths can
 * be negated.
 */
export interface DeniableFluentPath<T extends PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> extends FluentPath<T> {
	negated():FluentPath<PathNegatedToken>
}


/**
 * Constant with the utils for {@link DeniableFluentPath} objects.
 */
export const DeniableFluentPath:{
	/**
	 * Factory function that allows to crete a {@link DeniableFluentPath}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link DeniableFluentPath} statement.
	 * @param object The base base from where to create the
	 * {@link DeniableFluentPath} statement.
	 *
	 * @return The {@link DeniableFluentPath} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>, O extends object>( container:FluentPathContainer<T>, object:O ):O & DeniableFluentPath<T>;
} = {
	createFrom<T extends PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>, O extends object>( container:FluentPathContainer<T>, object:O ):O & DeniableFluentPath<T> {
		return FluentPath.createFrom( container, Object.assign( object, {
			negated: getNegatedFn( container ),
		} ) );
	},
};