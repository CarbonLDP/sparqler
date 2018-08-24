import { Container } from "../../data/Container";

import { IRIToken } from "../../tokens/IRIToken";
import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathEltToken } from "../../tokens/PathEltToken";
import { PathInAlternativeToken } from "../../tokens/PathInAlternativeToken";
import { PathInNegatedToken } from "../../tokens/PathInNegatedToken";
import { PathInSequenceToken } from "../../tokens/PathInSequenceToken";
import { PathInverseToken } from "../../tokens/PathInverseToken";
import { PathModToken } from "../../tokens/PathModToken";
import { PathNegatedToken } from "../../tokens/PathNegatedToken";
import { PathPrimaryToken } from "../../tokens/PathPrimaryToken";
import { PathSequenceToken } from "../../tokens/PathSequenceToken";
import { PathToken } from "../../tokens/PathToken";
import { SharedSubPathToken } from "../../tokens/SharedSubPathToken";
import { SubPathInNegatedToken } from "../../tokens/SubPathInNegatedToken";
import { SubPathToken } from "../../tokens/SubPathToken";

import { Resource } from "../triplePatterns/Resource";

import { Path } from "./Path";
import { getPropertyToken, parseProperty } from "./utils";


/**
 * Builder with the methods that helps you to construct any path.
 *
 * See {@link https://www.w3.org/TR/sparql11-query/#propertypaths} for
 * more information.
 */
export interface PathBuilder {
	/**
	 * Wraps the property provided as a path object.
	 * @param property The property to be wrapped.
	 */
	path( property:Resource | "a" | string ):Path<IRIToken | "a">;

	/**
	 * Create a sub-path from a property or path.
	 * @param path the path to be added as in the sub-path.
	 */
	subPath( path?:Resource | "a" | string | Path<PathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> ):Path<SubPathInNegatedToken>;
	subPath( path:Path ):Path<SubPathToken<PathToken>>;


	/**
	 * Create a alternative path from the paths.
	 * @param paths The paths to be added as alternate options.
	 */
	alternatives( ...paths:((Resource | "a" | string | Path<PathInNegatedToken>) | (Resource | "a" | string | Path<PathInNegatedToken>)[])[] ):Path<PathAlternativeToken<PathInNegatedToken>>;
	alternatives( ...paths:((Resource | "a" | string | Path<PathToken>) | (Resource | "a" | string | Path<PathToken>)[])[] ):Path<PathAlternativeToken>;

	/**
	 * Create a sequence path from the paths.
	 * @param paths The paths to be added as path sequence.
	 */
	sequences( ...paths:((Resource | "a" | string | Path<PathToken>) | (Resource | "a" | string | Path<PathToken>)[])[] ):Path<PathSequenceToken>;


	/**
	 * Create an inverse path from another one.
	 * @param path The path to be inverted.
	 */
	inverse( path:Resource | "a" | string | Path<IRIToken | "a"> ):Path<PathInverseToken<IRIToken | "a">>;
	inverse( path:Resource | "a" | string | Path<PathToken> ):Path<PathInverseToken>;

	/**
	 * Create an negated path from the another one.
	 * @param path The path to be negated.
	 */
	negated( path:Resource | "a" | string | Path<PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> ):Path<PathNegatedToken>;


	/**
	 * Set the path to be matched one or zero times.
	 * i.e. the `?` mod.
	 *
	 * @param path The path to add the mod.
	 */
	oneOrNone( path:Resource | "a" | string | Path<PathToken> ):Path<PathModToken>;

	/**
	 * Set the path to be matched zero or more times.
	 * i.e. the `*` mod.
	 *
	 * @param path The path to add the mod.
	 */
	zeroOrMore( path:Resource | "a" | string | Path<PathToken> ):Path<PathModToken>;

	/**
	 * Set the path to be matched one or more times.
	 * i.e. the `+` mod.
	 *
	 * @param path The path to add the mod.
	 */
	onceOrMore( path:Resource | "a" | string | Path<PathToken> ):Path<PathModToken>;
}


function getPathFn( container:Container<undefined> ):PathBuilder[ "path" ] {
	return property => parseProperty( container, property );
}

function getSubPathFn( container:Container<undefined> ):PathBuilder[ "subPath" ] {
	return ( path?:Resource | "a" | string | Path<PathToken> ):any => {
		const pathToken:IRIToken | "a" | PathToken | undefined = path !== void 0
			? getPropertyToken( container, path )
			: path;

		const targetToken:SharedSubPathToken<PathToken | undefined> = new SharedSubPathToken( pathToken );

		const newContainer:Container<SharedSubPathToken<PathToken | undefined>> = new Container( {
			iriResolver: container.iriResolver,
			targetToken,
		} );
		return Path.createFrom( newContainer, {} );
	}
}


function _getTokenWrapper<T extends PathToken>( ...symbols:string[] ):( token:PathToken ) => T {
	return ( token:PathToken ):any => {
		if( token === "a" ) return token;

		if( symbols.indexOf( token.token ) !== - 1 )
			return new SharedSubPathToken( token );

		return token;
	}
}


const _getInAlternativeToken = _getTokenWrapper<PathInAlternativeToken>( "pathAlternative" );

function getAlternativeFn( container:Container<undefined> ):PathBuilder[ "alternatives" ] {
	return ( ...paths:((Path<PathToken> | Resource | "a" | string) | (Path<PathToken> | Resource | "a" | string)[])[] ):any => {
		const targetToken:PathAlternativeToken = new PathAlternativeToken();
		const addInAlternativeToken = ( path:Path<PathToken> | Resource | "a" | string ) => {
			const token:PathToken = getPropertyToken( container, path );
			const inAlternativeToken:PathInAlternativeToken = _getInAlternativeToken( token );

			targetToken.paths.push( inAlternativeToken );
		};

		paths.forEach( paths => {
			if( Array.isArray( paths ) )
				return paths.forEach( addInAlternativeToken );
			addInAlternativeToken( paths );
		} );

		const newContainer:Container<PathAlternativeToken> = new Container( {
			iriResolver: container.iriResolver,
			targetToken,
		} );
		return Path.createFrom( newContainer, {} );
	}
}


const _getInSequenceToken = _getTokenWrapper<PathInSequenceToken>( "pathAlternative", "pathSequence" );

function getSequenceFn( container:Container<undefined> ):PathBuilder[ "sequences" ] {
	return ( ...paths:((Path<PathToken> | Resource | "a" | string) | (Path<PathToken> | Resource | "a" | string)[])[] ):any => {
		const targetToken:PathSequenceToken = new PathSequenceToken();
		const addInSequenceToken = ( path:Path<PathToken> | Resource | "a" | string ) => {
			const token:PathToken = getPropertyToken( container, path );
			const inSequenceToken:PathInSequenceToken = _getInSequenceToken( token );

			targetToken.paths.push( inSequenceToken );
		};

		paths.forEach( paths => {
			if( Array.isArray( paths ) )
				return paths.forEach( addInSequenceToken );
			addInSequenceToken( paths );
		} );

		const newContainer:Container<PathSequenceToken> = new Container( {
			iriResolver: container.iriResolver,
			targetToken,
		} );
		return Path.createFrom( newContainer, {} );
	}
}


const _getInInverseToken = _getTokenWrapper<PathEltToken>( "pathAlternative", "pathSequence", "pathInverse" );

function getInverseFn( container:Container<undefined> ):PathBuilder[ "inverse" ] {
	return ( path:Path<PathToken> | Resource | "a" | string ):any => {
		const token:PathToken = getPropertyToken( container, path );
		const inInverseToken:PathEltToken = _getInInverseToken( token );

		const targetToken:PathInverseToken = new PathInverseToken( inInverseToken );

		const newContainer:Container<PathInverseToken> = new Container( {
			iriResolver: container.iriResolver,
			targetToken,
		} );
		return Path.createFrom( newContainer, {} );
	}
}


const _getInNegatedToken = _getTokenWrapper<PathInNegatedToken | SubPathInNegatedToken>( "pathAlternative" );

function getNegatedFn( container:Container<undefined> ):PathBuilder[ "negated" ] {
	return ( path:Path<PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> | Resource | "a" | string ):any => {
		const token:PathToken = getPropertyToken( container, path );
		const inNegatedToken:PathInNegatedToken | SubPathInNegatedToken = _getInNegatedToken( token );

		const targetToken:PathNegatedToken = new PathNegatedToken( inNegatedToken );

		const newContainer:Container<PathNegatedToken> = new Container( {
			iriResolver: container.iriResolver,
			targetToken,
		} );
		return Path.createFrom( newContainer, {} );
	}
}


const _getInModToken = _getTokenWrapper<PathPrimaryToken>( "pathAlternative", "pathSequence", "pathInverse", "pathMod" );

function getModFn( container:Container<undefined>, mod:"?" | "*" | "+" ):PathBuilder[ "oneOrNone" ] {
	return ( path:Path<PathToken> | Resource | "a" | string ) => {
		const token = getPropertyToken( container, path );
		const inModToken:PathPrimaryToken = _getInModToken( token );
		const targetToken:PathModToken = new PathModToken( inModToken, mod );

		const newContainer:Container<PathModToken> = new Container( {
			iriResolver: container.iriResolver,
			targetToken,
		} );
		return Path.createFrom( newContainer, {} );
	};
}


/**
 * Constant with the utils for {@link PathBuilder} objects.
 */
export const PathBuilder:{
	/**
	 * Factory function that allows to crete a {@link PathBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link PathBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link PathBuilder} statement.
	 *
	 * @return The {@link PathBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & PathBuilder;
} = {
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & PathBuilder {
		return Object.assign( object, {
			path: getPathFn( container ),
			subPath: getSubPathFn( container ),

			alternatives: getAlternativeFn( container ),
			sequences: getSequenceFn( container ),

			inverse: getInverseFn( container ),
			negated: getNegatedFn( container ),

			oneOrNone: getModFn( container, "?" ),
			zeroOrMore: getModFn( container, "*" ),
			onceOrMore: getModFn( container, "+" ),
		} );
	}
};
