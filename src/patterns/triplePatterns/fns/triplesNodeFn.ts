import { Container } from "../../../core/containers/Container";
import { Factory } from "../../../core/factories/Factory";

import { SupportedNativeTypes } from "../../../SupportedNativeTypes";

import { BlankNodePropertyToken } from "../../../tokens/BlankNodePropertyToken";
import { BlankNodeToken } from "../../../tokens/BlankNodeToken";
import { CollectionToken } from "../../../tokens/CollectionToken";
import { TripleNodeToken } from "../../../tokens/TripleNodeToken";

import { Pattern } from "../../Pattern";

import { BlankNode } from "../BlankNode";
import { BlankNodeBuilder } from "../BlankNodeBuilder";
import { BlankNodeProperty } from "../BlankNodeProperty";
import { Collection } from "../Collection";
import { Literal } from "../Literal";
import { Resource } from "../Resource";
import { TripleSubject } from "../TripleSubject";
import { Variable } from "../Variable";

import { _subjectTransformerFn } from "./utils";


function _getNodeSubject<T extends TripleNodeToken>( container:Container<undefined>, targetToken:T ):TripleSubject<T> & Pattern<T> {
	const newContainer = new Container( { ...container, targetToken } );
	return Factory.createFrom<typeof newContainer, TripleSubject<T>, Pattern<T>>(
		TripleSubject.createFrom,
		Pattern.createFrom,
	)( newContainer, {} );
}


function _getBlankNode( container:Container<undefined>, label?:string ):BlankNode {
	if( label && !label.startsWith( "_:" ) )
		label = "_:" + label;

	const targetToken:BlankNodeToken = new BlankNodeToken( label );
	const newContainer = new Container( { ...container, targetToken } );
	return TripleSubject.createFrom( newContainer, {} );
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

export function getBlankNodeFn( container:Container<undefined> ) {
	return ( labelOrBuilderFn?:string | (( selfBuilder:BlankNodeBuilder ) => any) ):any => {
		if( typeof labelOrBuilderFn === "function" )
			return _getBlankNodeProperty( container, labelOrBuilderFn );

		return _getBlankNode( container, labelOrBuilderFn );
	};
}

export function getCollectionFn( container:Container<undefined> ) {
	return ( ...values:(SupportedNativeTypes | Resource | BlankNode | Variable | Literal | Collection | BlankNodeProperty)[] ) => {
		const token:CollectionToken = new CollectionToken()
			.addObject( ...values.map( _subjectTransformerFn( container ) ) );

		return _getNodeSubject( container, token );
	}
}