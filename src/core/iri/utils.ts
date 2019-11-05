export function isAbsolute( iri:string ):boolean {
	return iri.indexOf( ":" ) !== -1;
}

export function hasProtocol( iri:string ):boolean {
	return iri.indexOf( "://" ) !== -1;
}

export function isRelative( iri:string ):boolean {
	return !isAbsolute( iri );
}

export function isIRI( iri:string ):boolean {
	return hasProtocol( iri ) || !isAbsolute( iri );
}


export function isBNodeLabel( label:string ):boolean {
	return /^_:/.test( label );
}


export function isPrefixed( iri:string ):boolean {
	return /^(?!_:)[^]*?:/.test( iri ) && !hasProtocol( iri );
}
