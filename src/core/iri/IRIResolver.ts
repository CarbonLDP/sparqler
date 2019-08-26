import { isBNodeLabel, isPrefixed, isRelative } from "./utils";

import { IRIRefToken } from "../../tokens/IRIRefToken";
import { IRIToken } from "../../tokens/IRIToken";
import { PrefixedNameToken } from "../../tokens/PrefixedNameToken";


/**
 * Map type of the stored prefixes used by {@link IRIResolver}.
 */
export type PrefixMap = Map<string, boolean>;


/**
 * Class to manage the resolution of IRIs in tokens
 */
export class IRIResolver {

	/**
	 * Map to store prefixes and information of its usage
	 */
	readonly prefixes:PrefixMap;

	/**
	 * IRI to resolve relative RDF properties
	 */
	readonly vocab?:string;

	/**
	 * Creates a new empty instance of IRIResolver if no parameter is provided, but
	 * if a base IRIResolver is specified, its information will be copied to the new instance.
	 *
	 * @param base IRIResolver to copy its data from.
	 * @param vocab Absolute IRI to change the default vocab value.
	 */
	constructor( base?:IRIResolver, vocab?:string ) {
		this.prefixes = base
			? new Map( base.prefixes.entries() )
			: new Map();

		this.vocab = vocab
			? vocab
			: base && base.vocab;

		if( new.target === IRIResolver ) Object.freeze( this );
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
	resolve( relativeIRI:string, vocab?:boolean ):IRIToken {
		if( isPrefixed( relativeIRI ) )
			return this.resolvePrefixed( relativeIRI );

		if( isBNodeLabel( relativeIRI ) )
			throw new Error( `The blank node label "${ relativeIRI }" is an invalid argument.` );

		return this.resolveIRIRef( relativeIRI, vocab );
	}

	private resolveIRIRef( relativeIRI:string, vocab:boolean = false ):IRIRefToken {
		if( vocab && this.vocab && isRelative( relativeIRI ) )
			relativeIRI = this.vocab + relativeIRI;

		return new IRIRefToken( relativeIRI );
	}

	private resolvePrefixed( prefixedName:string ):PrefixedNameToken {
		let token:PrefixedNameToken = new PrefixedNameToken( prefixedName );

		const used:boolean | undefined = this.prefixes.get( token.namespace );
		if( used === void 0 ) throw new Error( `The prefix "${ token.namespace }" has not been declared.` );

		if( !used ) this.prefixes.set( token.namespace, true );
		return token;
	}
}
