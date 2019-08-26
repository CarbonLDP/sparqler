import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathInAlternativeToken } from "../../tokens/PathInAlternativeToken";
import { PathInNegatedToken } from "../../tokens/PathInNegatedToken";
import { PathToken } from "../../tokens/PathToken";

import { Resource } from "../../patterns/triplePatterns/Resource";

import { DeniableFluentPath } from "../DeniableFluentPath";
import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";
import { Path } from "../Path";
import { getPropertyToken } from "../utils";

import { _getTokenWrapper, _isPathInNegatedToken } from "./utils";


type TargetToken = PathAlternativeToken & PathAlternativeToken<PathInNegatedToken>;

type TargetParams = Resource | "a" | string | Path<PathToken>;

const _getInAlternativeToken = _getTokenWrapper<PathInAlternativeToken>( "pathAlternative" );


export type AlternativeFn<T extends PathToken> = ( ...paths:((Resource | "a" | string | Path<PathToken>) | (Resource | "a" | string | Path<PathToken>)[])[] )
	=> (T extends PathInNegatedToken ? DeniableFluentPath<PathAlternativeToken<PathInNegatedToken>> : FluentPath<PathAlternativeToken>) & DeniableFluentPath<PathAlternativeToken<PathInNegatedToken>>;

export function getAlternativeFn<T extends PathToken>( container:FluentPathContainer<undefined | PathToken> ):AlternativeFn<T> {
	return ( ...paths:(TargetParams | TargetParams[])[] ) => {
		const tokensParams:PathToken[] = paths
			.reduce<TargetParams[]>( ( array, paths ) => array.concat( paths ), [] )
			.map( path => getPropertyToken( container, path ) );

		// [In FluentPath] Add to process when not alternative
		if( container.targetToken && ! (container.targetToken instanceof PathAlternativeToken) )
			tokensParams.unshift( container.targetToken );

		const processedTokens:PathInAlternativeToken[] = tokensParams
			.map( _getInAlternativeToken );

		// [In FluentPath] Extends if path alternative, not process needed
		if( container.targetToken instanceof PathAlternativeToken )
			processedTokens.unshift( ...container.targetToken.paths );


		const targetToken:TargetToken = new PathAlternativeToken();
		targetToken.paths.push( ...processedTokens );

		const newContainer:FluentPathContainer<TargetToken> = new FluentPathContainer( {
			...container,
			targetToken,
		} );


		if( processedTokens.every( _isPathInNegatedToken ) )
			return container.deniableFluentPathFactory( newContainer, {} );

		return container.fluentPathFactory( newContainer, {} ) as any;
	}
}