import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";

import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { BlankNodeToken } from "../../tokens/BlankNodeToken";
import { CollectionToken } from "../../tokens/CollectionToken";
import { IRIToken } from "../../tokens/IRIToken";
import { ObjectToken } from "../../tokens/ObjectToken";
import { RDFLiteralToken } from "../../tokens/RDFLiteralToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { TripleToken } from "../../tokens/TripleToken";
import { VariableToken } from "../../tokens/VariableToken";

import { Pattern } from "../Pattern";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { convertValue } from "../utils";
import { BlankNode } from "./BlankNode";
import { BlankNodeBuilder } from "./BlankNodeBuilder";
import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { RDFLiteral } from "./RDFLiteral";
import { Resource } from "./Resource";
import { TripleSubject } from "./TripleSubject";
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


function _getPatternContainer<T extends ObjectToken>( container:Container<undefined>, token:T ):Container<TripleToken<T>> {
	return new Container( {
		iriResolver: container.iriResolver,
		targetToken: new SubjectToken( token ),
	} );
}

function _getTripleSubject<T extends ObjectToken>( container:Container<undefined>, token:T ):TripleSubject<T> {
	const patternContainer = _getPatternContainer( container, token );
	return TripleSubject.createFrom( patternContainer, {} );
}

function _getNodeSubject<T extends ObjectToken>( container:Container<undefined>, token:T ):TripleSubject<T> & Pattern<TripleToken<T>> {
	const patternContainer = _getPatternContainer( container, token );
	return Factory.createFrom<typeof patternContainer, TripleSubject<T>, Pattern<TripleToken<T>>>(
		TripleSubject.createFrom,
		Pattern.createFrom,
	)( patternContainer, {} );
}


function getResourceFn( container:Container<undefined> ):TriplePatternsBuilder[ "resource" ] {
	return iri => {
		const token:IRIToken = container.iriResolver.resolve( iri );
		return _getTripleSubject( container, token );
	}
}

function getVarFn( container:Container<undefined> ):TriplePatternsBuilder[ "var" ] {
	return name => {
		const token:VariableToken = new VariableToken( name );
		return _getTripleSubject( container, token );
	}
}

function getLiteralFn( container:Container<undefined> ):TriplePatternsBuilder[ "literal" ] {
	return ( value:string | number | boolean | Date ):any => {
		const token = typeof value === "string"
			? new RDFLiteralToken( value )
			: convertValue( value );

		if( token instanceof RDFLiteralToken ) {
			const patternContainer = _getPatternContainer( container, token );
			return RDFLiteral.createFrom( patternContainer, {} );
		}

		return _getTripleSubject( container, token );
	}
}


type Values = SupportedNativeTypes | Resource | BlankNode | Variable | Literal | Collection | BlankNodeProperty;

function getCollectionFn( container:Container<undefined> ):TriplePatternsBuilder[ "collection" ] {
	return ( ...values:Values[] ) => {
		const token:CollectionToken = new CollectionToken()
			.addObject( ...values.map( convertValue ) );
		return _getNodeSubject( container, token );
	}
}

function _getBlankNode( container:Container<undefined>, label?:string ):BlankNode {
	if( label && !label.startsWith( "_:" ) )
		label = "_:" + label;

	const token:BlankNodeToken = new BlankNodeToken( label );
	return _getTripleSubject( container, token );
}

function _getBlankNodeProperty( container:Container<undefined>, builderFn:( selfBuilder:BlankNodeBuilder ) => any ):BlankNodeProperty {
	const token:BlankNodePropertyToken = new BlankNodePropertyToken();

	const builderContainer:Container<BlankNodePropertyToken> = new Container( {
		iriResolver: container.iriResolver,
		targetToken: token,
	} );

	const builder:BlankNodeBuilder = BlankNodeBuilder.createFrom( builderContainer, {} );
	builderFn( builder );

	if( token.properties.length < 1 )
		throw new Error( "At least one property must be specified by the self builder." );

	return _getNodeSubject( container, token );
}

function getBlankNodeFn( container:Container<undefined> ):TriplePatternsBuilder[ "blankNode" ] {
	return ( labelOrBuilderFn?:string | (( selfBuilder:BlankNodeBuilder ) => any) ):any => {
		if( typeof labelOrBuilderFn === "function" )
			return _getBlankNodeProperty( container, labelOrBuilderFn );

		return _getBlankNode( container, labelOrBuilderFn );
	};
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
