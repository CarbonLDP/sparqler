import { PathAlternativeToken } from "../../../tokens/PathAlternativeToken";
import { PathInNegatedToken } from "../../../tokens/PathInNegatedToken";
import { PathNegatedToken } from "../../../tokens/PathNegatedToken";
import { PathToken } from "../../../tokens/PathToken";
import { SubPathInNegatedToken } from "../../../tokens/SubPathInNegatedToken";

import { Resource } from "../../triplePatterns/Resource";

import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";
import { Path } from "../Path";
import { getPropertyToken } from "../utils";

import { _getTokenWrapper } from "./utils";


type TargetParams =
	| Resource
	| "a"
	| string
	| Path<PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>>
	;

const _getInNegatedToken = _getTokenWrapper<PathInNegatedToken | SubPathInNegatedToken>( "pathAlternative" );


export type NegatedFn = ( path?:Resource | "a" | string | Path<PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> ) =>
	FluentPath<PathNegatedToken>;

export function getNegatedFn( container:FluentPathContainer<undefined | PathToken> ):NegatedFn {
	return ( path?:TargetParams ) => {
		const token:PathToken = container.targetToken
			// In FluentPath
			? container.targetToken
			// In FluentPath
			: getPropertyToken( container, path! );

		const inNegatedToken:PathInNegatedToken | SubPathInNegatedToken = _getInNegatedToken( token );
		const targetToken:PathNegatedToken = new PathNegatedToken( inNegatedToken );

		const newContainer:FluentPathContainer<PathNegatedToken> = new FluentPathContainer( {
			...container,
			targetToken,
		} );

		return container.fluentPathFactory( newContainer, {} );
	}
}