import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { getIndentation, getSeparator, INDENTATION_SPACES } from "./printing";
import { RDFLiteralToken } from "./RDFLiteralToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * The token of the `VALUES` clause or pattern statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rValuesClause}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rInlineData}
 */
export class ValuesToken implements TokenNode {
	readonly token:"values" = "values";

	readonly variables:VariableToken[];
	readonly values:(IRIToken | RDFLiteralToken | LiteralToken | "UNDEF")[][];

	constructor() {
		this.variables = [];
		this.values = [];
	}

	addVariables( ...variables:VariableToken[] ):this {
		this.variables.push( ...variables );
		return this;
	}

	addValues( ...values:(IRIToken | LiteralToken | "UNDEF")[] ):this {
		this.values.push( values );
		return this;
	}


	toString( spaces?:number ):string {
		const variables:string = this._getVariablesStr();

		const values:string = this._getValuesStr( spaces );
		return `VALUES ${ variables } ${ values }`;
	}

	private _getVariablesStr():string {
		if( ! this.variables.length ) return "()";

		const variables:string = this.variables.join( " " );
		if( this.variables.length === 1 ) return variables;

		return `( ${ variables } )`;
	}

	private _getValuesStr( spaces?:number ):string {
		if( ! this.values.length ) return "{}";

		if( this.variables.length === 1 ) {
			const values:string = this.values
				.filter( x => x.length )
				.map( x => x[ 0 ] )
				.join( " " );

			if( ! values ) return "{}";
			return "{ " + values + " }";
		}

		const subIndent:string = getIndentation( spaces, INDENTATION_SPACES );
		const separator:string = getSeparator( spaces );
		const indent:string = getIndentation( spaces );
		return "{" + separator +
			this.values
				.map( values => {
					const valuesStr:string = values.length ?
						`( ${ values.join( " " ) } )` : "()";
					return subIndent + valuesStr;
				} )
				.join( separator ) + separator +
			indent + "}";
	}
}
