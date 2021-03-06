import { Container } from "../containers/Container";


/**
 * Interface that describes the factory functions. A specific type
 * of function that are used to create the instances of the objects
 * related to external data stored in a {@link Container}.
 */
export interface Factory<CONTAINER extends Container<any>, TARGET extends object> extends Function {
	/**
	 * The function signature of the factory.
	 *
	 * @param container The related container with the stored data for
	 * the factory.
	 * @param object The base object from where to create the target
	 * object.
	 *
	 * @return The provided object with the elements of the target
	 * object to be created.
	 */<OBJECT extends object>( container:CONTAINER, object:OBJECT ):OBJECT & TARGET;
}


/**
 * Constant with the utils functions for {@link Factory} objects.
 */
export const Factory:{
	/**
	 * Creates a new factory function that applies the factory function provided.
	 *
	 * @param factory The factory function to be applied.
	 */
	createFrom<CONTAINER extends Container<any>, TARGET extends object>( factory:Factory<CONTAINER, TARGET> ):Factory<CONTAINER, TARGET>;
	/**
	 * Creates a new factory function that applies the two factory
	 * functions provided.
	 *
	 * @param factory1 The fist factory function to be applied.
	 * @param factory2 The second factory function to be applied.
	 */
	createFrom<CONTAINER extends Container<any>, TARGET1 extends object, TARGET2 extends object>( factory1:Factory<CONTAINER, TARGET1>, factory2:Factory<CONTAINER, TARGET2> ):Factory<CONTAINER, TARGET1 & TARGET2>;
	/**
	 * Creates a new factory function that applies the three factory
	 * functions provided.
	 *
	 * @param factory1 The first factory function to be applied.
	 * @param factory2 The second factory function to be applied.
	 * @param factory3 The third factory function to be applied.
	 */
	createFrom<CONTAINER extends Container<any>, TARGET1 extends object, TARGET2 extends object, TARGET3 extends object>( factory1:Factory<CONTAINER, TARGET1>, factory2:Factory<CONTAINER, TARGET2>, factory3:Factory<CONTAINER, TARGET3> ):Factory<CONTAINER, TARGET1 & TARGET2 & TARGET3>;
	/**
	 * Creates a new factory function that applies the four factory
	 * functions provided.
	 *
	 * @param factory1 The first factory function to be applied.
	 * @param factory2 The second factory function to be applied.
	 * @param factory3 The third factory function to be applied.
	 * @param factory4 The fourth factory function to be applied.
	 */
	createFrom<CONTAINER extends Container<any>, TARGET1 extends object, TARGET2 extends object, TARGET3 extends object, TARGET4 extends object>( factory1:Factory<CONTAINER, TARGET1>, factory2:Factory<CONTAINER, TARGET2>, factory3:Factory<CONTAINER, TARGET3>, factory4:Factory<CONTAINER, TARGET4> ):Factory<CONTAINER, TARGET1 & TARGET2 & TARGET3 & TARGET4>;
	/**
	 * Created a new factory function that applies the five factory
	 * functions provided.
	 *
	 * @param factory1 The first factory function to be applied.
	 * @param factory2 The second factory function to be applied.
	 * @param factory3 The third factory function to be applied.
	 * @param factory4 The fourth factory function to be applied.
	 * @param factory5 The fifth factory function to be applied.
	 */
	createFrom<CONTAINER extends Container<any>, TARGET1 extends object, TARGET2 extends object, TARGET3 extends object, TARGET4 extends object, TARGET5 extends object>( factory1:Factory<CONTAINER, TARGET1>, factory2:Factory<CONTAINER, TARGET2>, factory3:Factory<CONTAINER, TARGET3>, factory4:Factory<CONTAINER, TARGET4>, factory5:Factory<CONTAINER, TARGET5> ):Factory<CONTAINER, TARGET1 & TARGET2 & TARGET3 & TARGET4 & TARGET5>;
	/**
	 * Created a new factory function that applies the six factory
	 * functions provided.
	 *
	 * @param factory1 The first factory function to be applied.
	 * @param factory2 The second factory function to be applied.
	 * @param factory3 The third factory function to be applied.
	 * @param factory4 The fourth factory function to be applied.
	 * @param factory5 The fifth factory function to be applied.
	 * @param factory6 The sixth factory function to be applied.
	 */
	createFrom<CONTAINER extends Container<any>, TARGET1 extends object, TARGET2 extends object, TARGET3 extends object, TARGET4 extends object, TARGET5 extends object, TARGET6 extends object>( factory1:Factory<CONTAINER, TARGET1>, factory2:Factory<CONTAINER, TARGET2>, factory3:Factory<CONTAINER, TARGET3>, factory4:Factory<CONTAINER, TARGET4>, factory5:Factory<CONTAINER, TARGET5>, factory6:Factory<CONTAINER, TARGET6> ):Factory<CONTAINER, TARGET1 & TARGET2 & TARGET3 & TARGET4 & TARGET5 & TARGET6>;
} = {
	createFrom( ...factories:Factory<any, any>[] ):Factory<any, any> {
		return <W extends object>( container:Container<any>, object:W ):W & any => {
			return factories
				.reduce( ( target, factoryFn ) => factoryFn( container, target ), object );
		};
	}
};
