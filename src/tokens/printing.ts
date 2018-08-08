import { TokenNode } from "./TokenNode";


export const INDENTATION_SPACES:4 = 4;


export function getSeparator( spaces?:number ) {
	if( spaces === void 0 ) return " ";
	return "\n";
}

export function getIndentation( spaces?:number, extra?:number ):string {
	if( ! spaces ) return "";

	if( extra ) spaces += extra;
	return " ".repeat( spaces );
}

export function addSpaces( spaces:number | undefined, extra:number ):number | undefined {
	if( spaces === void 0 ) return spaces;
	return spaces + extra;
}


export function getTokenContainerString( data:{
	spaces:number | undefined,
	tags:{ open:string, close:string },
	tokensSeparator?:string;
	tokens:TokenNode[],
} ):string {
	if( ! data.tokens.length ) return data.tags.open + data.tags.close;
	let separator:string = getSeparator( data.spaces );

	const tokensSpaces:number = addSpaces( data.spaces, INDENTATION_SPACES );
	const tokensSeparator:string = data.tokensSeparator ? data.tokensSeparator + separator : separator;

	const tokens:string[] = data.tokens
		.map( tokens => tokens.toString( tokensSpaces ) );

	if( tokens.length === 1 && ! tokens[ 0 ].includes( "\n" ) )
		return data.tags.open + " " + tokens[ 0 ] + " " + data.tags.close;

	const indent:string = getIndentation( data.spaces );
	const tokensIndent:string = getIndentation( tokensSpaces );
	return data.tags.open + separator +
		tokens
			.map( x => tokensIndent + x )
			.join( tokensSeparator ) + separator +
		indent + data.tags.close;
}
