import { PathInNegatedToken } from "../../tokens/PathInNegatedToken";
import { PathToken } from "../../tokens/PathToken";
import { SharedSubPathToken } from "../../tokens/SharedSubPathToken";
import { SubPathInNegatedToken } from "../../tokens/SubPathInNegatedToken";
import { SubPathToken } from "../../tokens/SubPathToken";

import { Resource } from "../../patterns/triplePatterns/Resource";
import { DeniableFluentPath } from "../DeniableFluentPath";

import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";

import { Path } from "../Path";
import { getPropertyToken } from "../utils";
import { _isPathInNegatedToken } from "./utils";


type TargetToken<T extends PathToken = PathToken> = SubPathToken<T> & SubPathInNegatedToken;

function _canBeNegated( token:PathToken | undefined ):boolean {
	return ! token
		|| _isPathInNegatedToken( token )
		|| (token.token === "pathAlternative" && token.paths.every( _isPathInNegatedToken ))
		;
}


export type SubPathFn<T extends PathToken = PathToken> = ( path?:Resource | "a" | string | Path<PathToken> ) =>
	(T extends PathInNegatedToken ? DeniableFluentPath<SubPathToken<T>> : FluentPath<SubPathToken<T>>) & DeniableFluentPath<SubPathInNegatedToken>;

export function getSubPathFn<T extends PathToken>( container:FluentPathContainer<undefined | PathToken> ):SubPathFn<T> {
	return ( path?:Resource | "a" | string | Path<PathToken> ) => {
		const token:PathToken | undefined = container.targetToken
			// Is in FluentPath
			? container.targetToken
			// Is in PathBuilder
			: path === void 0 ? path
				: getPropertyToken( container, path );


		const targetToken:TargetToken<T> = new SharedSubPathToken( token ) as TargetToken<T>;

		const newContainer:FluentPathContainer<TargetToken<T>> = new FluentPathContainer( {
			...container,
			targetToken,
		} );


		if( _canBeNegated( token ) )
			return container.deniableFluentPathFactory( newContainer, {} );

		return container.fluentPathFactory( newContainer, {} ) as any;
	};
}
