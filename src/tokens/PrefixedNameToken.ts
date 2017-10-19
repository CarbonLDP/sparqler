import { isPrefixed } from "sparqler/iri/utils";
import { TokenNode } from "./TokenNode";

const NAMESPACE_REGEX:RegExp = /^([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?$/;
const NORMALIZE_REGEX:RegExp = /([_~.\-!$&'|()*+,;=/?#@%])/g;

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
		this.localName = localName.replace( NORMALIZE_REGEX, "\\$1" );
	}

	toString():string {
		return `${ this.namespace }:${ this.localName }`;
	}
}
