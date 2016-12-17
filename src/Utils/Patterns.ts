import { GraphPattern } from "../Patterns";
import { Token } from "../Tokens/Token";
import {
	TRIPLE_SEPARATOR,
	OPEN_MULTI_BLOCK,
	CLOSE_MULTI_BLOCK,
	OPEN_SINGLE_BLOCK,
	CLOSE_SINGLE_BLOCK
} from "../Patterns/Tokens";
import { Identifier } from "../Tokens/Identifier";

export function getBlockTokens( pattern:GraphPattern ):Token[];
export function getBlockTokens( patterns:GraphPattern[] ):Token[];
export function getBlockTokens( patterns ):Token[] {
	let tokens:Token[] = getTokens( patterns );

	let openToken:Token = OPEN_SINGLE_BLOCK;
	let closeToken:Token = CLOSE_SINGLE_BLOCK;
	if( isMultiLine( tokens ) ) {
		openToken = OPEN_MULTI_BLOCK;
		closeToken = CLOSE_MULTI_BLOCK;
	}

	return [ openToken, ...tokens, closeToken ];
}


export function getTokens( pattern:GraphPattern ):Token[];
export function getTokens( patterns:GraphPattern[] ):Token[];
export function getTokens( patterns ):Token[] {
	patterns = Array.isArray( patterns ) ? patterns : [ patterns ];

	let triplesTokens:Token[] = [];
	let lastToken:Token = void 0;

	patterns.forEach( ( graphPattern, index ) => {
		let tokens:Token[] = graphPattern.getPattern();

		if( lastToken === TRIPLE_SEPARATOR && ( tokens[ 0 ] instanceof Identifier || tokens[ 0 ] === OPEN_MULTI_BLOCK ) ) triplesTokens.pop();

		triplesTokens.push( ...tokens );

		lastToken = tokens[ tokens.length - 1 ];
		if( index < patterns.length - 1 && lastToken !== CLOSE_MULTI_BLOCK ) {
			lastToken = TRIPLE_SEPARATOR;
			triplesTokens.push( TRIPLE_SEPARATOR );
		}
	} );

	return triplesTokens;
}

export function isMultiLine( tokens:Token[] ):boolean {
	return tokens.find( token => [ ".", ";", "," ].indexOf( token[ "value" ] ) !== - 1 ) !== void 0;
}