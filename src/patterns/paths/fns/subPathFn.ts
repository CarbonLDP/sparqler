import { PathToken } from "../../../tokens/PathToken";
import { SharedSubPathToken } from "../../../tokens/SharedSubPathToken";
import { SubPathInNegatedToken } from "../../../tokens/SubPathInNegatedToken";
import { SubPathToken } from "../../../tokens/SubPathToken";

import { Resource } from "../../triplePatterns/Resource";

import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";

import { Path } from "../Path";
import { getPropertyToken } from "../utils";


type TargetToken<T extends PathToken = PathToken> = SubPathToken<T> & SubPathInNegatedToken;

export type SubPathFn<T extends PathToken = PathToken> = ( path?:Resource | "a" | string | Path<PathToken> ) =>
	FluentPath<SubPathToken<T>> & FluentPath<SubPathInNegatedToken>;

export function getSubPathFn<T extends PathToken>( container:FluentPathContainer<undefined | PathToken> ):SubPathFn<T> {
	return ( path?:Resource | "a" | string | Path<PathToken> ) => {
		const pathToken:PathToken | undefined = container.targetToken
			// Is in FluentPath
			? container.targetToken
			// Is in PathBuilder
			: path === void 0 ? path
				: getPropertyToken( container, path );


		const targetToken:TargetToken<T> = new SharedSubPathToken( pathToken ) as TargetToken<T>;

		const newContainer:FluentPathContainer<TargetToken<T>> = new FluentPathContainer( {
			...container,
			targetToken,
		} );

		return container.fluentPathFactory( newContainer, {} );
	};
}
