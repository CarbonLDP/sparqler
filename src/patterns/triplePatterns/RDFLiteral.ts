import { Container2 } from "../../data/Container2";
import { cloneElement } from "../../data/utils";

import { LiteralToken } from "../../tokens/LiteralToken";
import { SubjectToken } from "../../tokens/SubjectToken";

import * as XSD from "../../utils/XSD";

import { Literal } from "./Literal";
import { TriplePatternHas } from "./TriplePatternHas";


/**
 * @todo
 */
export interface RDFLiteral extends Literal {
	withType( type:string ):Literal;

	withLanguage( language:string ):Literal;
}


function getWithTypeFn<C extends Container2<SubjectToken<LiteralToken>>>( container:C ):RDFLiteral[ "withType" ] {
	return type => {
		if( type in XSD ) type = (XSD as any)[ type ];
		const subject = cloneElement( container.targetToken.subject )
			.setType( container.iriResolver.resolve( type ) );

		const targetToken = cloneElement( container.targetToken, { subject } );
		const newContainer = cloneElement( container, { targetToken } as Partial<C> );

		return TriplePatternHas.createFrom( newContainer, {} );
	}
}

function getWithLanguageFn<C extends Container2<SubjectToken<LiteralToken>>>( container:C ):RDFLiteral[ "withLanguage" ] {
	return language => {
		const subject = cloneElement( container.targetToken.subject )
			.setLanguage( language );

		const targetToken = cloneElement( container.targetToken, { subject } );
		const newContainer = cloneElement( container, { targetToken } as Partial<C> );

		return TriplePatternHas.createFrom( newContainer, {} );
	}
}

/**
 * @todo
 */
export const RDFLiteral = {
	createFrom<C extends Container2<SubjectToken<LiteralToken>>, O extends object>( container:C, object:O ):O & RDFLiteral {
		return TriplePatternHas.createFrom( container, Object.assign( object, {
			withType: getWithTypeFn( container ),
			withLanguage: getWithLanguageFn( container ),
		} ) );
	},
};
