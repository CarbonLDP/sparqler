import { TokenNode } from "./TokenNode";


/**
 * The token of the `FILTER` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rFilter
 */
export class FilterToken implements TokenNode {
	readonly token:"filter" = "filter";
	readonly constraint:string;

	constructor( constraint:string ) {
		this.constraint = constraint;
	}

	toString( spaces?:number ):string {
		return `FILTER( ${ this.constraint } )`;
	}
}
