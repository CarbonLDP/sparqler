import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { getIndentation, getSeparator, INDENTATION_SPACES } from "./printing";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


export class ValuesToken implements TokenNode {
	readonly token:"values" = "values";

	readonly variables:VariableToken[];
	readonly values:(IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[][];

	constructor() {
		this.variables = [];
		this.values = [];
	}


	addValues( variable:VariableToken, ...values:(IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[] ):this {
		this.variables.push( variable );
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
		if( ! this.values.length ) return "{ () }";

		if( this.values.length === 1 ) {
			const values:string = this.values[ 0 ].length ?
				this.values[ 0 ].join( " " ) :
				"()";

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
