import { PatternToken } from "sparqler/tokens/index";

export const joinPatterns = ( patterns:PatternToken[] ):string => {
	let buffer:string = "";

	for( const pattern of patterns ) {
		if( buffer ) buffer += ". ";
		buffer += pattern.token === "select" ? `{ ${ pattern } }` : pattern;
	}

	return buffer;
};
