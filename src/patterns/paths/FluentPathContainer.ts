import { Container, ContainerData } from "../../data/Container";

import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathInNegatedToken } from "../../tokens/PathInNegatedToken";
import { PathToken } from "../../tokens/PathToken";
import { SubPathInNegatedToken } from "../../tokens/SubPathInNegatedToken";

import { DeniableFluentPath } from "./DeniableFluentPath";
import { FluentPath } from "./FluentPath";


/**
 * Interface that describe the necessary data for the creation
 * of a {@link FluentPathContainer}.
 */
export interface FluentPathContainerData<T extends PathToken | undefined> extends ContainerData<T> {
	/**
	 * @see FluentPathContainer.fluentPathFactory
	 */
	fluentPathFactory:<W extends PathToken, O extends object>( container:FluentPathContainer<W>, object:O ) => O & FluentPath<W>;

	/**
	 * @see FluentPathContainer.deniableFluentPathFactory
	 */
	deniableFluentPathFactory:<W extends PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>, O extends object>( container:FluentPathContainer<W>, object:O ) => O & DeniableFluentPath<W>;
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
	readonly deniableFluentPathFactory:<W extends PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>, O extends object>( container:FluentPathContainer<W>, object:O ) => O & DeniableFluentPath<W>;

	constructor( data:FluentPathContainerData<T> ) {
		super( data );

		this.fluentPathFactory = data.fluentPathFactory;
		this.deniableFluentPathFactory = data.deniableFluentPathFactory;

		if( new.target === FluentPathContainer ) Object.freeze( this );
	}
}
