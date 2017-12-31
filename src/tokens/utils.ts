import { PatternToken } from "./";

export const joinPatterns = ( patterns:PatternToken[] ):string => {
	return patterns
		.map( pattern => {
			if( pattern.token === "select" ) return `{ ${ pattern } }`;
			return pattern;
		} )
		.join( ". " )
		;
};
