import { cloneElement } from "../../../core/containers/utils";

import { PathInSequenceToken } from "../../../tokens/PathInSequenceToken";
import { PathSequenceToken } from "../../../tokens/PathSequenceToken";
import { PathToken } from "../../../tokens/PathToken";

import { Resource } from "../../triplePatterns/Resource";

import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";
import { Path } from "../Path";
import { getPropertyToken } from "../utils";

import { _getTokenWrapper } from "./utils";


type TargetParams = Resource | "a" | string | Path<PathToken>;

const _getInSequenceToken = _getTokenWrapper<PathInSequenceToken>( "pathAlternative", "pathSequence" );


export type SequenceFn = ( ...paths:((Resource | "a" | string | Path<PathToken>) | (Resource | "a" | string | Path<PathToken>)[])[] )
	=> FluentPath<PathSequenceToken>;

export function getSequenceFn( container:FluentPathContainer<undefined | PathToken> ):SequenceFn {
	return ( ...paths:(TargetParams | TargetParams[])[] ):any => {
		const tokensParams:PathToken[] = paths
			.reduce<TargetParams[]>( ( array, paths ) => array.concat( paths ), [] )
			.map( path => getPropertyToken( container, path ) );

		// [In FluentPath] Add to process when not sequence
		if( container.targetToken && !(container.targetToken instanceof PathSequenceToken) )
			tokensParams.unshift( container.targetToken );

		const processedTokens:PathInSequenceToken[] = tokensParams
			.map( _getInSequenceToken );

		// [In FluentPath] Extends if path alternative, not process needed
		if( container.targetToken instanceof PathSequenceToken )
			processedTokens.unshift( ...container.targetToken.paths );


		const targetToken:PathSequenceToken = new PathSequenceToken();
		targetToken.paths.push( ...processedTokens );

		const newContainer:FluentPathContainer<PathSequenceToken> = cloneElement( container, { targetToken } );

		return container.fluentPathFactory( newContainer, {} );
	}
}