import { Container } from "../../data/Container";
import { PathToken } from "../../tokens/PathToken";


/**
 * Object that contains the a property path.
 */
export interface Path<T extends PathToken> {
	getPath():T;
}


/**
 * Constant with the utils for {@link Path} objects.
 */
export const Path:{
	/**
	 * Factory function that allows to crete a {@link Path}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Path} statement.
	 * @param object The base base from where to create the
	 * {@link Path} statement.
	 *
	 * @return The {@link Path} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends PathToken, O extends object>( container:Container<T>, object:O ):O & Path<T>;
} = {
	createFrom<T extends PathToken, O extends object>( container:Container<T>, object:O ):O & Path<T> {
		return Object.assign( object, {
			getPath: () => container.targetToken,
		} );
	}
};