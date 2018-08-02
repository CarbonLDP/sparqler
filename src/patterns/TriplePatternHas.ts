import { Container2 } from "../clauses/Container2";
import { cloneElement } from "../clauses/utils";

import { PredicateToken } from "../tokens/PredicateToken";
import { TermToken } from "../tokens/TermToken";
import { TripleToken } from "../tokens/TripleToken";
import { VariableOrIRI } from "../tokens/VariableOrIRI";
import { VariableToken } from "../tokens/VariableToken";

import { SupportedNativeTypes } from "./SupportedNativeTypes";
import { TriplePattern } from "./TriplePattern";
import { Literal } from "./triplePatterns/Literal";
import { Resource } from "./triplePatterns/Resource";
import { Variable } from "./triplePatterns/Variable";
import { convertValue } from "./utils";


/**
 * @todo
 */
export interface TriplePatternHas<T extends VariableToken | TermToken> extends TriplePattern<T> {
	// TODO: Add Collection
	has( property:string | Variable | Resource, object:SupportedNativeTypes | Resource | Variable | Literal ):TriplePatternAnd<T>;
	has( property:string | Variable | Resource, objects:(SupportedNativeTypes | Resource | Variable | Literal)[] ):TriplePatternAnd<T>;
}

/**
 * @todo
 */
export interface TriplePatternAnd<T extends VariableToken | TermToken> extends TriplePattern<T> {
	// TODO: Add Collection
	and( property:string | Variable | Resource, object:SupportedNativeTypes | Resource | Variable | Literal ):TriplePatternAnd<T>;
	and( property:string | Variable | Resource, objects:(SupportedNativeTypes | Resource | Variable | Literal)[] ):TriplePatternAnd<T>;
}


type Objects = SupportedNativeTypes | Resource | Variable | Literal;
const PATH_OPERATORS:string[] = [ "|", "/", "^", "?", "*", "+", "!", "(", ")" ];

// TODO: Remove `a` and Implement Path tokens
function _resolvePath( container:Container2<TripleToken>, propertyPath:string ):"a" {
	propertyPath
		.split( /(<.*?>)/ )
		.reduce( ( array:string[], part:string ) => {
			// Is an IRI
			if( part.startsWith( "<" ) ) {
				array.push( part );
			}

			// Everything else
			else {
				array.push( ...part.split( /([|/^?*+!()])/ ) )
			}

			return array;
		}, [] )
		.forEach( ( part:string ) => {
			if( ! part ) return;

			// Operators
			if( PATH_OPERATORS.indexOf( part ) !== - 1 ) {
			}

			// "a" keyword
			else if( part === "a" ) {
			}

			// IRI or prefix
			else {
				// Remove IRI tags
				if( part.startsWith( "<" ) && part.endsWith( ">" ) ) part = part.slice( 1, - 1 );

				// Register prefix it prefixed
				container.iriResolver.resolve( part, true );
			}
		} );

	return propertyPath as "a";
}

/**
 * @todo
 */
function getHasFn<T extends VariableToken | TermToken, C extends Container2<TripleToken<T>>>( container:C ):TriplePatternHas<T>[ "has" ] {
	return ( property:string | Variable | Resource, objects:Objects | Objects[] ) => {
		const token:VariableOrIRI | "a" = (typeof property === "string")
			? _resolvePath( container, property )
			: property.getSubject();

		const predicate = new PredicateToken( token );

		objects = Array.isArray( objects ) ? objects : [ objects ];
		predicate.addObject( ...objects.map( convertValue ) );

		const predicates = container.targetToken.predicates.concat( predicate );
		const targetToken = cloneElement( container.targetToken, { predicates } );

		const newContainer = cloneElement( container, { targetToken } as Partial<C> );
		return TriplePatternAnd.createFrom<T, C, {}>( newContainer, {} );
	};
}


/**
 * @todo
 */
export const TriplePatternHas = {
	createFrom<T extends VariableToken | TermToken, C extends Container2<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePatternHas<T> {
		return TriplePattern.createFrom( container, Object.assign( object, {
			has: getHasFn<T, C>( container ),
		} ) );
	}
};

/**
 * @todo
 */
export const TriplePatternAnd = {
	createFrom<T extends VariableToken | TermToken, C extends Container2<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePatternAnd<T> {
		return TriplePattern.createFrom( container, Object.assign( object, {
			and: getHasFn<T, C>( container ),
		} ) );
	}
};