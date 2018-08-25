import { IRIToken } from "../../../tokens/IRIToken";
import { PathEltToken } from "../../../tokens/PathEltToken";
import { PathInverseToken } from "../../../tokens/PathInverseToken";
import { PathToken } from "../../../tokens/PathToken";

import { Resource } from "../../triplePatterns/Resource";

import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";
import { Path } from "../Path";
import { getPropertyToken } from "../utils";

import { _getTokenWrapper } from "./utils";


type TargetToken = PathInverseToken<IRIToken | "a"> & PathInverseToken;

type TargetParams = Resource | "a" | string | Path<PathToken>;

const _getInInverseToken = _getTokenWrapper<PathEltToken>( "pathAlternative", "pathSequence", "pathInverse" );


export type InverseFn = ( path?:Resource | "a" | string | Path<PathToken> )
	=> FluentPath<PathInverseToken<IRIToken | "a">> & FluentPath<PathInverseToken>;

export function getInverseFn( container:FluentPathContainer<undefined | PathToken> ):InverseFn {
	return ( path?:TargetParams ) => {
		const token:PathToken = container.targetToken
			// In FluentPath
			? container.targetToken
			// In PathBuilder
			: getPropertyToken( container, path! );

		const inInverseToken:PathEltToken = _getInInverseToken( token );
		const targetToken:TargetToken = new PathInverseToken( inInverseToken ) as TargetToken;

		const newContainer:FluentPathContainer<TargetToken> = new FluentPathContainer( {
			...container,
			targetToken,
		} );

		return container.fluentPathFactory( newContainer, {} );
	}
}