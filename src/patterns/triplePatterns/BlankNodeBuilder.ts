import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";

import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";

import { PropertyBuilder } from "./PropertyBuilder";


/**
 * Builder for construct a inline blank node property list.
 */
export interface BlankNodeBuilder extends PropertyBuilder<{}> {}


/**
 * Factory that only returns the same object provided.
 */
const emptyGenericFactory:Factory<any, {}> = ( container, object ) => object;


/**
 * Constant with utils for {@link BlankNodeBuilder}
 */
export const BlankNodeBuilder:{
	/**
	 * Factory function that allows to crete a {@link BlankNodeBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link BlankNodeBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link BlankNodeBuilder} statement.
	 *
	 * @return The {@link BlankNodeBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<BlankNodePropertyToken>, O extends object>( container:C, object:O ):O & BlankNodeBuilder;
} = {
	createFrom<C extends Container<BlankNodePropertyToken>, O extends object>( container:C, object:O ):O & BlankNodeBuilder {
		return PropertyBuilder.createFrom( emptyGenericFactory, container, object );
	}
};
