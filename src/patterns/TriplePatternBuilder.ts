import { Container2 } from "../data/Container2";

import { BlankNodePropretyToken } from "../tokens/BlankNodePropretyToken";
import { BlankNodeToken } from "../tokens/BlankNodeToken";
import { CollectionToken } from "../tokens/CollectionToken";
import { IRIToken } from "../tokens/IRIToken";
import { LiteralToken } from "../tokens/LiteralToken";
import { ObjectToken } from "../tokens/ObjectToken";
import { PrefixedNameToken } from "../tokens/PrefixedNameToken";
import { SubjectToken } from "../tokens/SubjectToken";
import { TokenNode } from "../tokens/TokenNode";
import { TripleToken } from "../tokens/TripleToken";
import { VariableToken } from "../tokens/VariableToken";
import { BlankNodeBuilder } from "./BlankNodeBuilder";

import { SupportedNativeTypes } from "./SupportedNativeTypes";
import { TriplePatternHas } from "./TriplePatternHas";
import { BlankNode } from "./triplePatterns/BlankNode";
import { BlankNodeProperty } from "./triplePatterns/BlankNodeProperty";
import { Collection } from "./triplePatterns/Collection";
import { Literal } from "./triplePatterns/Literal";
import { RDFLiteral } from "./triplePatterns/RDFLiteral";
import { Resource } from "./triplePatterns/Resource";
import { Variable } from "./triplePatterns/Variable";
import { convertValue } from "./utils";


/**
 * @todo
 */
export interface TriplePatternBuilder {
	resource( iri:string ):Resource;

	blankNode( label?:string ):BlankNode;

	var( name:string ):Variable;

	literal( value:string ):RDFLiteral;
	literal( value:number | boolean ):Literal;

	collection( ...values:(SupportedNativeTypes | Resource | BlankNode | Variable | Literal | Collection | BlankNodeProperty)[] ):Collection;

	blankNodeProperty( builderFn:( blankNodeBuilder:BlankNodeBuilder ) => any ):BlankNodeProperty;
}


function _getPatternContainer<T extends ObjectToken>( container:Container2<TokenNode>, token:T ):Container2<TripleToken<T>> {
	return new Container2( {
		iriResolver: container.iriResolver,
		targetToken: new SubjectToken( token ),
	} );
}

function _getPattern<C extends Container2<TokenNode>, T extends ObjectToken>( container:C, token:T ):TriplePatternHas<T> {
	const patternContainer = _getPatternContainer( container, token );
	return TriplePatternHas.createFrom( patternContainer, {} );
}

function getResourceFn<C extends Container2<TokenNode>>( container:C ):TriplePatternBuilder[ "resource" ] {
	return iri => {
		const token:IRIToken | PrefixedNameToken = container.iriResolver.resolve( iri );
		return _getPattern( container, token );
	}
}

function getBlankNodeFn<C extends Container2<TokenNode>>( container:C ):TriplePatternBuilder[ "blankNode" ] {
	return ( label?:string ) => {
		if( label && ! label.startsWith( "_:" ) )
			label = "_:" + label;

		const token:BlankNodeToken = new BlankNodeToken( label );
		return _getPattern( container, token );
	}
}

function getVarFn<C extends Container2<TokenNode>>( container:C ):TriplePatternBuilder[ "var" ] {
	return name => {
		const token:VariableToken = new VariableToken( name );
		return _getPattern( container, token );
	}
}

function getLiteralFn<C extends Container2<TokenNode>>( container:C ):TriplePatternBuilder[ "literal" ] {
	return ( value:string | number | boolean ):any => {
		const token:LiteralToken = new LiteralToken( value );

		if( typeof value === "string" )
			return _getPattern( container, token ) as Literal;

		const patternContainer = _getPatternContainer( container, token );
		return RDFLiteral.createFrom( patternContainer, {} );
	}
}


type Values = SupportedNativeTypes | Resource | BlankNode | Variable | Literal | Collection | BlankNodeProperty;

function getCollectionFn<C extends Container2<TokenNode>>( container:C ):TriplePatternBuilder[ "collection" ] {
	return ( ...values:Values[] ) => {
		const token:CollectionToken = new CollectionToken()
			.addObject( ...values.map( convertValue ) );
		return _getPattern( container, token );
	}
}

function getBlankNodePropertyFn<C extends Container2<TokenNode>>( container:C ):TriplePatternBuilder[ "blankNodeProperty" ] {
	return ( builderFn:( blankNodeBuilder:BlankNodeBuilder ) => any ) => {
		const token:BlankNodePropretyToken = new BlankNodePropretyToken();

		const newContainer:Container2<BlankNodePropretyToken> = new Container2( {
			iriResolver: container.iriResolver,
			targetToken: token,
		} );

		const builder:BlankNodeBuilder = BlankNodeBuilder.createFrom( newContainer, {} );
		builderFn( builder );

		if( token.properties.length < 1 )
			throw new Error( "At least one property must be specified with the provided BlankNodeBuilder." );

		return _getPattern( container, token );
	}
}


/**
 * @todo
 */
export const TriplePatternBuilder = {
	createFrom<C extends Container2<TokenNode>, O extends object>( container:C, object:O ):O & TriplePatternBuilder {
		return Object.assign( object, {
			resource: getResourceFn( container ),
			blankNode: getBlankNodeFn( container ),
			var: getVarFn( container ),
			literal: getLiteralFn( container ),
			collection: getCollectionFn( container ),
			blankNodeProperty: getBlankNodePropertyFn( container ),
		} );
	},
};
