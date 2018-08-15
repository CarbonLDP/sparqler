export function isAbsolute( iri:string ):boolean {
	return iri.indexOf( ":" ) !== - 1;
}

export function hasProtocol( iri:string ):boolean {
	return iri.indexOf( "://" ) !== - 1;
}

export function isRelative( iri:string ):boolean {
	return ! isAbsolute( iri );
}

export function isIRI( iri:string ):boolean {
	return hasProtocol( iri ) || ! isAbsolute( iri );
}

const bNodeRegex:RegExp = /^_:/;

export function isBNodeLabel( label:string ):boolean {
	return bNodeRegex.test( label );
}

const prefixRegex:RegExp = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
const softPrefixRegex:RegExp = /^(?!_:)[^]*?:/;
const prefixNormalizeRegex:RegExp = /([_~.\-!$&'|()*+,;=/?#@%])/g;

export function isPrefixed( iri:string ):boolean {
	return softPrefixRegex.test( iri ) && ! hasProtocol( iri );
}

export function getPrefixedParts( iri:string ):[ string, string ] | null {
	let parts:RegExpExecArray | null = prefixRegex.exec( iri );
	if( parts === null || hasProtocol( iri ) ) return null;

	let prefix:string = parts[ 1 ] || "";
	let local:string = iri.substr( prefix.length + 1 ).replace( prefixNormalizeRegex, "\\$1" );

	return [
		prefix,
		local,
	];
}
