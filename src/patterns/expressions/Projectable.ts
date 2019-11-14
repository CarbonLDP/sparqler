import { Container } from "../../core/containers/Container";

import { ProjectableToken } from "../../tokens/ProjectableToken";


/**
 * Object that returns any kind of projectable data for a select query.
 */
export interface Projectable<T extends ProjectableToken = ProjectableToken> {
	_getProjection():T;
}


/**
 * Constant with the utils for {@link Projectable} objects.
 */
export const Projectable:{
	/**
	 * Factory function that allows to crete a {@link Projectable}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link Projectable} statement.
	 * @param object The base base from where to create the
	 * {@link Projectable} statement.
	 *
	 * @return The {@link Projectable} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends ProjectableToken, O extends object>( container:Container<T>, object:O ):O & Projectable<T>;
} = {
	createFrom<T extends ProjectableToken, O extends object>( container:Container<T>, object:O ):O & Projectable<T> {
		return Object.assign( object, {
			_getProjection: () => container.targetToken,
		} );
	}
};
