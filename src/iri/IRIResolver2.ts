import { isPrefixed, isRelative, } from "sparqler/iri/utils";
import { IRIToken, PrefixedNameToken, } from "sparqler/tokens";

/**
 * Map type of the stored prefixes used by {@link IRIResolver}.
 */
export type PrefixMap = Map<string, boolean>;

/**
 * Class to manage the resolution of IRIs in tokens
 */
export class IRIResolver2 {

	/**
	 * Map to store prefixes and information of its usage
	 */
	readonly _prefixes:PrefixMap;

	/**
	 * IRI to resolve relative RDF properties
	 */
	readonly _vocab:string;

	/**
	 * Creates a new empty instance of IRIResolver if no parameter is provided, but
	 * if a base IRIResolver is specified, its information will be copied to the new instance.
	 *
	 * @param base IRIResolver to copy its data from.
	 * @param vocab Absolute IRI to change the default vocab value.
	 */
	constructor( base?:IRIResolver2, vocab?:string ) {
		this._prefixes = base
			? new Map( base._prefixes.entries() )
			: new Map();

		this._vocab = vocab ? vocab : base ? base._vocab : void 0;

		if( new.target === IRIResolver2 ) Object.freeze( this );
	}

	/**
	 * Resolves (if necessary) and creates the respective tokens if the IRI provided.
	 *
	 * If vocab parameter is to `true`, the stored vocab IRI is used to resolve relative IRIs.
	 *
	 * @param relativeIRI The relative IRI to be resolved and tokenized.
	 * @param vocab Optional parameter to specified if the relative IRIs will be resolved with the stored vocab IRI.
	 * @returns An array of tokens representing the provided IRI to be used in the SPARQL query.
	 */
	resolve( relativeIRI:string, vocab?:boolean ):IRIToken | PrefixedNameToken {
		if( isPrefixed( relativeIRI ) )
			return this.resolvePrefixed( relativeIRI );

		return this.resolveIRI( relativeIRI, vocab );
	}

	resolveIRI( relativeIRI:string, vocab:boolean = false ):IRIToken {
		if( vocab && this._vocab && isRelative( relativeIRI ) )
			relativeIRI = this._vocab + relativeIRI;

		return new IRIToken( relativeIRI );
	}

	resolvePrefixed( prefixedName:string ):PrefixedNameToken {
		let token:PrefixedNameToken = new PrefixedNameToken( prefixedName );

		const used:boolean = this._prefixes.get( token.namespace );
		if( used === void 0 ) throw new Error( `The prefix "${ token.namespace }" has not been declared.` );

		if( ! used ) this._prefixes.set( token.namespace, true );
		return token;
	}
}
