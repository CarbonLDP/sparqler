import * as marked from "marked";
import { highlight } from "./utils/highlight";

marked.setOptions( {
	highlight,
} );

// Extends code rendering
const superCode = marked.Renderer.prototype.code;
marked.Renderer.prototype.code = function( code, language, isEscaped ):string {
	const renderedCode:string = superCode.call( this, code, language, isEscaped );
	return "<div class='example-code'>"
		+ renderedCode.replace( /class="(.+?)"/, `class="hljs $1"` )
		+ "</div>";
};