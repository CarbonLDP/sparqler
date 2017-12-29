import { isPrefixed } from "sparqler/iri/utils";
import { TokenNode } from "./TokenNode";

const NAMESPACE_REGEX:RegExp = /^([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?$/;

export class PrefixedNameToken implements TokenNode {
	readonly token:"prefixedName" = "prefixedName";
	readonly namespace:string;
	readonly localName:string;

	constructor( prefixedName:string );
	constructor( namespace:string, localName:string );
	constructor( prefixedOrNamespace:string, localName?:string ) {
		let namespace:string = prefixedOrNamespace;
		if( localName === void 0 ) {
			if( ! isPrefixed( prefixedOrNamespace ) ) throw new Error( "Invalid prefixed name." );
			[ namespace, localName ] = prefixedOrNamespace.split( /:(.*)/ );
		}

		if( ! NAMESPACE_REGEX.test( namespace ) ) throw new Error( "Invalid prefixed namespace." );
		this.namespace = namespace;

		const [ , ln1, ln2, ln3 ] = localName.split( /^(.)(?:(.*)?(.))?$/ );

		let preSanitation:string = "";
		if( ln1 ) preSanitation += ln1.replace( /([\-.])/g, "\\$1" );
		if( ln2 ) preSanitation += ln2;
		if( ln2 ) preSanitation += ln3.replace( /([.])/g, "\\$1" );

		this.localName = preSanitation.replace( /([~!$&'|()*+,;=/?#@%])/g, "\\$1" );
	}

	toString():string {
		return `${ this.namespace }:${ this.localName }`;
	}
}
