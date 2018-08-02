import { Container2 } from "../clauses/Container2";

import { IRIToken } from "../tokens/IRIToken";
import { LiteralToken } from "../tokens/LiteralToken";
import { PrefixedNameToken } from "../tokens/PrefixedNameToken";
import { SubjectToken } from "../tokens/SubjectToken";
import { TermToken } from "../tokens/TermToken";
import { TokenNode } from "../tokens/TokenNode";
import { TripleToken } from "../tokens/TripleToken";
import { VariableToken } from "../tokens/VariableToken";

import { TriplePatternHas } from "./TriplePatternHas";
import { Literal } from "./triplePatterns/Literal";
import { RDFLiteral } from "./triplePatterns/RDFLiteral";
import { Resource } from "./triplePatterns/Resource";
import { Variable } from "./triplePatterns/Variable";


/**
 * @todo
 */
export interface TriplePatternBuilder {
	resource( iri:string ):Resource;

	var( name:string ):Variable;

	literal( value:string ):RDFLiteral;
	literal( value:number | boolean ):Literal;

	// TODO: Add Collection
	/*collection( ...values:(SupportedNativeTypes | Resource | Variable | Literal | Collection)[] ):Collection;*/

	/**
	 * With this form, there is no current way to form the pattern:
	 *  [ ?var1 "ex:some-1" "Object" ] "ex:some-2" ?object.
	 *
	 * Should add method for this cases??
	 *    blankNode().has( "ex:prop-1", "someone" )
	 *      .asTripleSubject()
	 *      .has( "ex:prop-2", "another-one" )
	 *  */
	// TODO: Add BlankNode
	/*blankNode():BlankNode;*/
}


function _getPatternContainer<T extends VariableToken | TermToken>( container:Container2<TokenNode>, token:T ):Container2<TripleToken<T>> {
	return new Container2( {
		iriResolver: container.iriResolver,
		targetToken: new SubjectToken( token ),
	} );
}

function _getPattern<C extends Container2<TokenNode>, T extends VariableToken | TermToken>( container:C, token:T ):TriplePatternHas<T> {
	const patternContainer = _getPatternContainer( container, token );
	return TriplePatternHas.createFrom( patternContainer, {} );
}

function getResourceFn<C extends Container2<TokenNode>>( container:C ):TriplePatternBuilder[ "resource" ] {
	return iri => {
		const token:IRIToken | PrefixedNameToken = container.iriResolver.resolve( iri );
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

/**
 * @todo
 */
export const TriplePatternBuilder = {
	createFrom<C extends Container2<TokenNode>, O extends object>( container:C, object:O ):O & TriplePatternBuilder {
		return Object.assign( object, {
			resource: getResourceFn( container ),
			var: getVarFn( container ),
			literal: getLiteralFn( container ),
		} );
	},
};
