import { Container } from "../../core/containers/Container";

import { SupportedNativeTypes } from "../../SupportedNativeTypes";

import { BlankNode } from "./BlankNode";
import { BlankNodeBuilder } from "./BlankNodeBuilder";
import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { getLiteralFn, getResourceFn, getVarFn } from "./fns/graphTermFn";
import { getBlankNodeFn, getCollectionFn } from "./fns/triplesNodeFn";
import { Literal } from "./Literal";
import { RDFLiteral } from "./RDFLiteral";
import { Resource } from "./Resource";
import { Variable } from "./Variable";


/**
 * Builder for triples based elements.
 */
export interface TriplePatternsBuilder {
	/**
	 * Create a {@link Resource} from the IRI or prefixed name
	 * specified.
	 * @param iri The IRI or prefixed name to create the
	 * {@link Resource} from.
	 */
	resource( iri:string ):Resource;

	/**
	 * Crete a {@link Variable} from the name specified.
	 * @param name The name of the {@link Variable} to be created.
	 */
	var( name:string ):Variable;

	/**
	 * Create a {@link RDFLiteral} from the string specified.
	 * @param value The string value of the {@link RDFLiteral}.
	 */
	literal( value:string | Date ):RDFLiteral;
	/**
	 * Create a {@link Literal} from the value specified.
	 * @param value The value of the {@link Literal}.
	 */
	literal( value:string | number | boolean | Date ):Literal;

	/**
	 * Create a {@link Collection} from all the values provided.
	 * @param values The values to be added to the collection.
	 */
	collection( ...values:(SupportedNativeTypes | Resource | BlankNode | Variable | Literal | Collection | BlankNodeProperty)[] ):Collection;

	/**
	 * Create a {@link BlankNode} reference from the label specified.
	 * @param label The optional label of the {@link BlankNode} to be
	 * created.
	 */
	blankNode( label?:string ):BlankNode;
	/**
	 * Create a {@link BlankNodeProperty} from the properties
	 * added in the `selfBuilder` of the {@param builderFn} specified.
	 * @param builderFn The function that will receive a `selfBuilder`
	 * parameter to add the properties of the blank node to match.
	 * This builder as s similar API of a triple pattern, i.e. the
	 * `has` and `and` methods.
	 */
	blankNode( builderFn:( selfBuilder:BlankNodeBuilder ) => any ):BlankNodeProperty;
}


/**
 * Constant with the utils for {@link TriplePatternsBuilder} objects.
 */
export const TriplePatternsBuilder:{
	/**
	 * Factory function that allows to crete a {@link TriplePatternsBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link TriplePatternsBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link TriplePatternsBuilder} statement.
	 *
	 * @return The {@link TriplePatternsBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & TriplePatternsBuilder;
} = {
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & TriplePatternsBuilder {
		return Object.assign( object, {
			resource: getResourceFn( container ),
			var: getVarFn( container ),
			literal: getLiteralFn( container ),
			collection: getCollectionFn( container ),
			blankNode: getBlankNodeFn( container ),
		} );
	},
};
