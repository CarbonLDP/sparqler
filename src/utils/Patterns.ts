import { GraphPattern } from "../patterns/interfaces";
import {
	CLOSE_MULTI_BLOCK,
	CLOSE_SINGLE_BLOCK,
	GRAPH_PATTERN_SEPARATOR,
	OPEN_MULTI_BLOCK,
	OPEN_SINGLE_BLOCK,
} from "../patterns/tokens";
import {
	Identifier,
	NewLineSymbol,
	Token,
} from "../tokens";

export function getBlockTokens( patterns:GraphPattern | GraphPattern[] ):Token[] {
	let tokens:Token[] = this.getTokens( patterns );

	let openToken:Token = OPEN_SINGLE_BLOCK;
	let closeToken:Token = CLOSE_SINGLE_BLOCK;
	if( this.isMultiLine( tokens ) ) {
		openToken = OPEN_MULTI_BLOCK;
		closeToken = CLOSE_MULTI_BLOCK;
	}

	return [ openToken, ...tokens, closeToken ];
}

export function getTokens( patterns:GraphPattern | GraphPattern[] ):Token[] {
	const patternArray:GraphPattern[] = Array.isArray( patterns ) ? patterns : [ patterns ];

	let triplesTokens:Token[] = [];
	let lastToken:Token = void 0;

	patternArray.forEach( ( graphPattern, index, array ) => {
		let tokens:Token[] = graphPattern.getPattern();

		if( lastToken === GRAPH_PATTERN_SEPARATOR && ( tokens[ 0 ] instanceof Identifier || tokens[ 0 ] === OPEN_MULTI_BLOCK || tokens[ 0 ] === OPEN_SINGLE_BLOCK ) ) triplesTokens.pop();

		triplesTokens.push( ...tokens );

		lastToken = tokens[ tokens.length - 1 ];
		if( index < array.length - 1 && lastToken !== CLOSE_MULTI_BLOCK && lastToken !== CLOSE_SINGLE_BLOCK ) {
			triplesTokens.push( lastToken = GRAPH_PATTERN_SEPARATOR );
		}
	} );

	return triplesTokens;
}

export function isMultiLine( tokens:Token[] ):boolean {
	return tokens.find( token => token instanceof NewLineSymbol && [ ".", ";", ",", "" ].indexOf( token[ "value" ] ) !== - 1 ) !== void 0;
}
