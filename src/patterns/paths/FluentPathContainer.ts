import { Container, ContainerData } from "../../data/Container";

import { PathToken } from "../../tokens/PathToken";

import { FluentPath } from "./FluentPath";


/**
 * Interface that describe the necessary data for the creation
 * of a {@link FluentPathContainer}.
 */
export interface FluentPathContainerData<T extends PathToken | undefined> extends ContainerData<T> {
	fluentPathFactory:<W extends PathToken, O extends object>( container:FluentPathContainer<W>, object:O ) => O & FluentPath<W>;
}


/**
 * Extension of the {@link Container} class that adds the factory
 * for construct FluentPath.
 *
 * The factory is provided from the container to avoid circular
 * dependency when imported directly in the fluent functions of the
 * paths builder and objects.
 */
export class FluentPathContainer<T extends PathToken | undefined> extends Container<T> implements FluentPathContainerData<T> {

	readonly fluentPathFactory:<W extends PathToken, O extends object>( container:FluentPathContainer<W>, object:O ) => O & FluentPath<W>;

	constructor( data:FluentPathContainerData<T> ) {
		super( data );

		this.fluentPathFactory = data.fluentPathFactory;

		Object.freeze( this );
	}
}
