import {
	Container,
	FinishClause,
	genericDecorator,
} from "sparqler/clauses";
import {
	CLOSE_MULTI_BLOCK,
	CLOSE_MULTI_BN,
	CLOSE_MULTI_LIST,
	EMPTY_SEPARATOR,
	GRAPH_PATTERN_SEPARATOR,
	OPEN_MULTI_BLOCK,
	OPEN_MULTI_BN,
	OPEN_MULTI_LIST,
	PREFIX,
	SAME_PROPERTY_SEPARATOR,
	SAME_SUBJECT_SEPARATOR,
	WHERE,
} from "sparqler/patterns/tokens";
import {
	NewLineSymbol,
	Token,
	TokenFormat,
} from "sparqler/tokens";

/**
 * Constructs a compact SPARQL query string.
 * @returns The compact string.
 */
function toCompactString( this:Container<FinishClause> ):string {
	let ignore:number = 0;
	return this._tokens.reduce( ( res, token, index, tokens ) => {
		// Ignore tokes of unused prefixes
		if( ignore ) {
			-- ignore;
			return res;
		}

		// Optional tokens
		if( token === WHERE ) return res;

		let nextToken:Token = tokens[ index + 1 ];
		if( token === PREFIX && ! this._iriResolver._prefixes.get( nextToken[ "value" ] ) ) {
			ignore = 5;
			return res;
		}

		if( nextToken === EMPTY_SEPARATOR ) nextToken = tokens[ index + 2 ];
		return res + token.getTokenValue( TokenFormat.COMPACT, nextToken );
	}, "" );
}

/**
 * Constructs a pretty SPARQL query string.
 * @returns The pretty string.
 */
function toPrettyString( this:Container<FinishClause> ):string {
	const stack:{ token:Token, indentation:number, subject:number, property:number, spaces:number }[] = [];
	let actual:{ token:Token, indentation:number, subject:number, property:number, spaces:number } = {
		token: null,
		indentation: 0,
		subject: 0,
		property: 0,
		spaces: 0,
	};

	return this._tokens.reduce( ( res, token, index, tokens ) => {
		let nextToken:Token = tokens[ index + 1 ];
		let tokenString:string = token.getTokenValue( TokenFormat.PRETTY, nextToken );

		// Keep track of the indentation spaces
		if( actual.spaces === 0 ) {
			actual.subject += tokenString.length;
			if( tokenString.endsWith( " " ) ) actual.spaces ++;
		} else if( actual.spaces === 1 ) {
			actual.property += tokenString.length;
			if( tokenString.endsWith( " " ) ) actual.spaces ++;
		}

		// Check if a new block of lines
		if( [ OPEN_MULTI_BLOCK as Token, OPEN_MULTI_BN, OPEN_MULTI_LIST ].indexOf( token ) !== - 1 ) {

			// Record a new state for a block of triples
			stack.push( actual );
			actual = {
				token: token,
				indentation: actual.indentation + 4,
				subject: 0,
				property: 0,
				spaces: token === OPEN_MULTI_BLOCK ? 0 : token === OPEN_MULTI_BN ? 1 : 2,
			};

		} else if( [ CLOSE_MULTI_LIST as Token ].indexOf( token ) !== - 1 ) {
			if( nextToken && ! ( nextToken instanceof NewLineSymbol ) ) {

				// Obtain parent state
				let parent = actual;
				while( [ OPEN_MULTI_BLOCK as Token, OPEN_MULTI_BN, OPEN_MULTI_LIST ].indexOf( parent.token ) === - 1 )
					parent = stack.pop();
				stack.push( parent );

				// Record a new state for properties of a collection
				actual = {
					token: token,
					indentation: parent.indentation + 4,
					subject: 0,
					property: 0,
					spaces: 1,
				};
			}

		} else if( [ SAME_SUBJECT_SEPARATOR as Token, SAME_PROPERTY_SEPARATOR, CLOSE_MULTI_LIST ].indexOf( token ) !== - 1 ) {

			// Obtain parent state
			let parent = actual;
			while( [ OPEN_MULTI_BLOCK as Token, OPEN_MULTI_BN, OPEN_MULTI_LIST, CLOSE_MULTI_LIST, CLOSE_MULTI_BN ].indexOf( parent.token ) === - 1 )
				parent = stack.pop();
			stack.push( parent );

			// Record a new state for same subject properties
			if( token === SAME_SUBJECT_SEPARATOR ) {
				actual = {
					token: token,
					indentation: parent.indentation + actual.subject,
					subject: actual.subject,
					property: 0,
					spaces: 1,
				};

				// Record a new state for a list of objects of a property
			} else if( token === SAME_PROPERTY_SEPARATOR ) {
				actual = {
					token: token,
					indentation: parent.indentation + actual.subject + actual.property,
					subject: actual.subject,
					property: actual.property,
					spaces: 2,
				};
			}

			// Returns still a block state
		} else if( token === GRAPH_PATTERN_SEPARATOR ) {
			while( actual.token !== OPEN_MULTI_BLOCK ) actual = stack.pop();
			actual.spaces = 0;
			actual.subject = 0;
			actual.property = 0;
		}

		if( nextToken === CLOSE_MULTI_BLOCK ) {
			while( actual.token !== OPEN_MULTI_BLOCK ) actual = stack.pop();
			actual = stack.pop();
		} else if( nextToken === CLOSE_MULTI_BN ) {
			while( actual.token !== OPEN_MULTI_BN ) actual = stack.pop();
			actual = stack.pop();
		} else if( nextToken === CLOSE_MULTI_LIST ) {
			while( actual.token !== OPEN_MULTI_LIST ) actual = stack.pop();
			actual = stack.pop();
		}

		if( tokenString.endsWith( "\n" ) ) {
			tokenString = tokenString + " ".repeat( actual.indentation );
		}

		return res + tokenString;
	}, "" );
}

/**
 * Decorator that adds the FinishClause methods to the provided object.
 * @param container The data container where to bind the respective methods.
 * @param object The object to add the methods.
 * @returns The same object provided with the FinishClause type it to it.
 */
export function finishDecorator<W extends object>( container:Container<FinishClause>, object:W ):W & FinishClause {
	return genericDecorator( {
		toCompactString,
		toPrettyString,
		toString: toPrettyString,
	}, container, object );
}
