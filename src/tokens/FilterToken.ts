import { TokenNode } from "sparqler/tokens/TokenNode";

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
