import { TokenNode } from "./TokenNode";

export class FilterToken implements TokenNode {
	readonly token:"filter" = "filter";
	readonly constraint:string;

	constructor( constraint:string ) {
		this.constraint = constraint;
	}

	toString():string {
		return `FILTER( ${ this.constraint } )`;
	}
}
