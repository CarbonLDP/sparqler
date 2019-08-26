import { PathModToken } from "../../tokens/PathModToken";
import { PathPrimaryToken } from "../../tokens/PathPrimaryToken";
import { PathToken } from "../../tokens/PathToken";
import { Resource } from "../../patterns/triplePatterns/Resource";
import { FluentPath } from "../FluentPath";
import { FluentPathContainer } from "../FluentPathContainer";
import { Path } from "../Path";
import { getPropertyToken } from "../utils";
import { _getTokenWrapper } from "./utils";


type TargetParams = Path<PathToken> | Resource | "a" | string;

const _getInModToken = _getTokenWrapper<PathPrimaryToken>( "pathAlternative", "pathSequence", "pathInverse", "pathMod" );


export type ModFn = ( path?:Resource | "a" | string | Path<PathToken> ) =>
	FluentPath<PathModToken>;

export function getModFn( container:FluentPathContainer<undefined | PathToken>, mod:"?" | "*" | "+" ):ModFn {
	return ( path?:TargetParams ) => {
		const token:PathToken = container.targetToken
			? container.targetToken
			: getPropertyToken( container, path! );

		const inModToken:PathPrimaryToken = _getInModToken( token );
		const targetToken:PathModToken = new PathModToken( inModToken, mod );

		const newContainer:FluentPathContainer<PathModToken> = new FluentPathContainer( {
			...container,
			targetToken,
		} );

		return container.fluentPathFactory( newContainer, {} );
	};
}