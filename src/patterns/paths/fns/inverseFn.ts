import { cloneElement } from "../../../core/containers/utils";

import { Resource } from "../../triplePatterns/Resource";

import { IRIToken } from "../../../tokens/IRIToken";
import { PathEltToken } from "../../../tokens/PathEltToken";
import { PathInNegatedToken } from "../../../tokens/PathInNegatedToken";
import { PathInverseToken } from "../../../tokens/PathInverseToken";
import { PathToken } from "../../../tokens/PathToken";

import { DeniableFluentPath } from "../DeniableFluentPath";
import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";
import { Path } from "../Path";
import { getPropertyToken } from "../utils";

import { _getTokenWrapper, _isBasePrimitive } from "./utils";


type TargetToken = PathInverseToken<IRIToken | "a"> & PathInverseToken;

type TargetParams = Resource | "a" | string | Path<PathToken>;

const _getInInverseToken = _getTokenWrapper<PathEltToken>( "pathAlternative", "pathSequence", "pathInverse" );


export type InverseFn<T extends PathToken> = ( path?:Resource | "a" | string | Path<PathToken> )
	=> DeniableFluentPath<PathInverseToken<IRIToken | "a">> & (T extends PathInNegatedToken ? DeniableFluentPath<PathInverseToken<IRIToken | "a">> : FluentPath<PathInverseToken>);

export function getInverseFn<T extends PathToken>( container:FluentPathContainer<undefined | PathToken> ):InverseFn<T> {
	return ( path?:TargetParams ) => {
		const token:PathToken = container.targetToken
			// In FluentPath
			? container.targetToken
			// In PathBuilder
			: getPropertyToken( container, path! );

		const inInverseToken:PathEltToken = _getInInverseToken( token );
		const targetToken:TargetToken = new PathInverseToken( inInverseToken ) as TargetToken;

		const newContainer:FluentPathContainer<TargetToken> = cloneElement( container, { targetToken } );


		if( _isBasePrimitive( token ) )
			return container.deniableFluentPathFactory( newContainer, {} );

		return container.fluentPathFactory( newContainer, {} ) as any;
	}
}