import { Container } from "../../../core/containers/Container";
import { _transformNatives } from "../../../core/transformers";

import { IRIToken } from "../../../tokens/IRIToken";
import { RDFLiteralToken } from "../../../tokens/RDFLiteralToken";
import { VariableToken } from "../../../tokens/VariableToken";

import { Literal } from "../Literal";
import { RDFLiteral } from "../RDFLiteral";
import { Resource } from "../Resource";
import { Variable } from "../Variable";


export function getResourceFn( container:Container<undefined> ) {
	return ( iri:string ):Resource => {
		const targetToken:IRIToken = container.iriResolver.resolve( iri );
		const newContainer = new Container( { ...container, targetToken } );

		return Resource.createFrom( newContainer, {} );
	}
}

export function getVarFn( container:Container<undefined> ) {
	return ( name:string ):Variable => {
		const targetToken:VariableToken = new VariableToken( name );
		const newContainer = new Container( { ...container, targetToken } );

		return Variable.createFrom( newContainer, {} );
	}
}

export function getLiteralFn( container:Container<undefined> ) {
	return ( value:string | number | boolean | Date ) => {
		const targetToken = typeof value === "string"
			? new RDFLiteralToken( value )
			: _transformNatives( value );

		const newContainer = new Container( { ...container, targetToken } );

		const factory = targetToken instanceof RDFLiteralToken
			? RDFLiteral.createFrom
			: Literal.createFrom;

		return factory( newContainer, {} ) as RDFLiteral;
	}
}