import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathInNegatedToken } from "../../tokens/PathInNegatedToken";
import { PathNegatedToken } from "../../tokens/PathNegatedToken";
import { SubPathInNegatedToken } from "../../tokens/SubPathInNegatedToken";

import { Resource } from "../../patterns/triplePatterns/Resource";

import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";
import { Path } from "../Path";
import { getPropertyToken } from "../utils";

import { _getTokenWrapper } from "./utils";


type ExpectedToken = PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>;

type TargetParams =
	| Resource
	| "a"
	| string
	| Path<ExpectedToken>
	;

const _getInNegatedToken = _getTokenWrapper<PathInNegatedToken | SubPathInNegatedToken>( "pathAlternative" );


export type NegatedFn = ( path?:Resource | "a" | string | Path<PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> ) =>
	FluentPath<PathNegatedToken>;

export function getNegatedFn( container:FluentPathContainer<undefined | PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>> ):NegatedFn {
	return ( path?:TargetParams ) => {
		const token:ExpectedToken = container.targetToken
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
