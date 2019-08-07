import { TokenNode } from "./TokenNode";


/**
 * The number of spaces to be used as indentation in the pretty print
 * mode of the tokens.
 */
export const INDENTATION_SPACES:4 = 4;


/**
 * Returns the separator of tokens depending in the spaces provided.
 *
 * If no spaces provided this means the printing mode is in compact
 * and so a blank space will be returned, otherwise a new line will
 * be the one returned.
 *
 * @param spaces The spaces of the current indentation of the tokens.
 */
export function getSeparator( spaces?:number ):string {
	if( spaces === void 0 ) return " ";
	return "\n";
}

/**
 * Get the full indentation for a token line printing.
 *
 * If no spaces is provided, this means the printing mode is in
 * compact and no indentation is needed and so a empty string will be
 * returned, even if extra spaces are also provided.
 *
 * Otherwise, a string with the sum of the spaces and the extra ones
 * as empty spaces will be returned..
 *
 * @param spaces The spaces of the current indentation of a line.
 * @param extra Extra spaces to be added in the indentation line.
 */
export function getIndentation( spaces?:number, extra?:number ):string {
	if( spaces === void 0 ) return "";

	if( extra ) spaces += extra;
	return " ".repeat( spaces );
}

/**
 * Returns the sum of the provided spaces with the extra ones.
 *
 * If spaces is undefined it means the current printing mode is
 * compact and so undefined will be returned.
 *
 * @param spaces The spaces of the current indentation of a line.
 * @param extra The extra spaces to be added in the indentation.
 */
export function addSpaces( spaces:number | undefined, extra:number ):number | undefined {
	if( spaces === void 0 ) return spaces;
	return spaces + extra;
}


/**
 * Returns the printing of a group of tokens that are contained in a
 * specific block.
 *
 * @param spaces The spaces of the current indentation.
 * @param tags The close and open tag of the token container to print.
 * @param tokensSeparator The separator betaken the tokens.
 * @param tokens The actual tokens to be printed.
 */
export function getTokenContainerString( { spaces, tags, tokensSeparator, tokens }:{
	spaces:number | undefined,
	tags:{ open:string, close:string },
	tokensSeparator?:string;
	tokens:TokenNode[],
} ):string {
	if( !tokens.length ) return tags.open + tags.close;

	const generalSeparator:string = getSeparator( spaces );

	const tokensSpaces:number | undefined = addSpaces( spaces, INDENTATION_SPACES );
	const strArrayTokens:string[] = tokens.map( ( token, index, array ) => {
		const strToken:string = token.toString( tokensSpaces );

		// No separator or last one
		if( !tokensSeparator || index === array.length - 1 ) return strToken;

		// Optional when not triple and not node triple
		if( tokensSeparator === "." && !(
			token.token === "subject" ||
			token.token === "collection" ||
			token.token === "blankNodeProperty"
		) ) return strToken;

		return strToken + tokensSeparator;
	} );


	if( strArrayTokens.length === 1 && !strArrayTokens[ 0 ].includes( "\n" ) )
		return tags.open + " " + strArrayTokens + " " + tags.close;


	const tokensIndent:string = getIndentation( tokensSpaces );
	const strTokens:string = strArrayTokens
		.map( x => tokensIndent + x )
		.join( generalSeparator );

	const indent:string = getIndentation( spaces );
	return tags.open +
		generalSeparator + strTokens + generalSeparator +
		indent + tags.close;
}
