import { Container } from "../../data/Container";
import { cloneElement } from "../../data/utils";
import { IRIToken } from "../../tokens/IRIToken";

import { LanguageToken } from "../../tokens/LanguageToken";
import { RDFLiteralToken } from "../../tokens/RDFLiteralToken";

import { XSD } from "../../utils/XSD";

import { Literal } from "./Literal";


/**
 * Wrapper for easier usage of SPARQL RDLiterals as objects and for
 * declaring triple patterns as its subject.
 */
export interface RDFLiteral extends Literal {
	/**
	 * Add an specific type to the RDFLiteral.
	 *
	 * Relative types of the XMLSchema ({@link https://www.w3.org/2001/XMLSchema-datatypes})
	 * can be provided and resolved internally.
	 *
	 * @param type The IRI type to be added.
	 */
	withType( type:string ):Literal;

	/**
	 * Add an specific language tag to the RDFLiteral.
	 *
	 * @param language The language tag to be added.
	 */
	withLanguage( language:string ):Literal;
}


function getWithTypeFn<C extends Container<RDFLiteralToken>>( container:C ):RDFLiteral[ "withType" ] {
	return type => {
		if( type in XSD ) type = XSD[ type as keyof typeof XSD ];

		const iriType = container.iriResolver.resolve( type, true );
		const targetToken:RDFLiteralToken = cloneElement<"type", RDFLiteralToken, { type: IRIToken }>( container.targetToken, { type: iriType } );
		// const newContainer:C = cloneElement<C, "targetToken", { targetToken:RDFLiteralToken }>( container, { targetToken } );
		const newContainer:C = cloneElement( container, { targetToken } );

		return Literal.createFrom( newContainer, {} );
	}
}

function getWithLanguageFn<C extends Container<RDFLiteralToken>>( container:C ):RDFLiteral[ "withLanguage" ] {
	return language => {
		const langToken = new LanguageToken( language );
		const targetToken = cloneElement( container.targetToken, { language: langToken } );
		const newContainer:C = cloneElement( container, { targetToken } );

		return Literal.createFrom( newContainer, {} );
	}
}


/**
 * Constant with utils for {@link RDFLiteral} objects.
 */
export const RDFLiteral:{
	/**
	 * Factory function that allows to crete a {@link TripleSubject}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link TripleSubject} statement.
	 * @param object The base base from where to create the
	 * {@link TripleSubject} statement.
	 *
	 * @return The {@link TripleSubject} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<RDFLiteralToken>, O extends object>( container:C, object:O ):O & RDFLiteral;
} = {
	createFrom<C extends Container<RDFLiteralToken>, O extends object>( container:C, object:O ):O & RDFLiteral {
		return Literal.createFrom( container, Object.assign( object, {
			withType: getWithTypeFn( container ),
			withLanguage: getWithLanguageFn( container ),
		} ) );
	},
};
