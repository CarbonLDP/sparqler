import * as hljs from "highlight.js";

export function highlight( code:string, lang?:string ) {
	code = code.replace( /(&#47;)/g, "/" );
	const res:hljs.IHighlightResultBase = ! lang ?
		hljs.highlightAuto( code ) :
		hljs.highlight( lang, code );
	return res.value;
}
