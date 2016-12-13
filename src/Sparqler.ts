import {
	QueryClause,
	FromClause,
	SelectClause,
	WhereClause,
	SolutionModifier,
	GroupClause,
	HavingClause,
	OrderClause,
	LimitOffsetClause,
	LimitClause,
	OffsetClause,
	FinishClause,
} from "./Clauses";
import {
	GraphPattern,
	IRIResolver,
} from "./Patterns";
import * as IRI from "./Utils/IRI";
import { PatternBuilder } from "./PatternBuilder";
import {
	Token,
	TokenFormat
} from "./Tokens/Token";
import { Identifier } from "./Tokens/Identifier";
import { StringLiteral } from "./Tokens/StringLiteral";
import { RightSymbol } from "./Tokens/RightSymbol";
import { Operator } from "./Tokens/Operator";
import { NumberLiteral } from "./Tokens/NumberLiteral";
import {
	OPEN_IRI,
	CLOSE_IRI,
	END_TRIPLE,
	OPEN_BLOCK,
	CLOSE_BLOCK,
	END_LIST_TRIPLE,
	VAR_SYMBOL,
	PREFIX_SYMBOL
} from "./Tokens";

interface PrefixInfo {
	iri:string;
	used:boolean;
}

export class QueryBuilder implements QueryClause,
                                     FromClause,
                                     SelectClause,
                                     WhereClause,
                                     GroupClause,
                                     HavingClause,
                                     OrderClause,
                                     LimitOffsetClause,
                                     FinishClause,
                                     IRIResolver {

	private _base:string;
	private _vocab:string;
	private _prefixes:Map<string, PrefixInfo>;

	private _selects:Token[];
	private _from:Token[];
	private _where:Token[];
	private _group:Token[];
	private _having:Token[];
	private _order:Token[];
	private _limit:Token[];
	private _offset:Token[];

	private interfaces:{
		queryClause:QueryClause;
		fromClause:FromClause;
		whereClause:WhereClause;
		havingClause:HavingClause;
		groupClause:GroupClause;
		orderClause:OrderClause;
		finishClause:FinishClause;
		limitClause:LimitClause<FinishClause>;
		offsetClause:OffsetClause<FinishClause>;
	};

	constructor() {
		this._prefixes = new Map<string, PrefixInfo>();

		this.initInterfaces();
	}

	// Clauses related implementations

	base( iri:string ):QueryClause {
		this._base = iri;
		return this.interfaces.queryClause;
	}

	vocab( iri:string ):QueryClause {
		this._vocab = iri;
		return this.interfaces.queryClause;
	}

	prefix( name:string, iri:string ):QueryClause {
		this._prefixes.set( name, {
			iri: iri,
			used: false,
		} );
		return this.interfaces.queryClause;
	}

	select( ...variables:string[] ):WhereClause & FromClause {
		if( variables.length === 0 ) throw new Error( "IllegalArgumentError: Need to provide al least one variable." );

		this._selects = [ new Identifier( "SELECT" ) ];
		variables.forEach( variable => this._selects.push( VAR_SYMBOL, new StringLiteral( variable ) ) );

		return Object.assign( {}, this.interfaces.whereClause, this.interfaces.fromClause );
	}

	selectAll():WhereClause & FromClause {
		this._selects = [ new Identifier( "SELECT" ), new RightSymbol( "*" ) ];
		return Object.assign( {}, this.interfaces.whereClause, this.interfaces.fromClause );
	}

	from( iri:string ):WhereClause {
		this._from = [ new Identifier( "FROM" ), ...this._resolveIRI( iri ) ];
		return this.interfaces.whereClause;
	}

	fromNamed( iri:string ):WhereClause {
		this._from = [ new Identifier( "FROM" ), new Identifier( "NAMED" ), ...this._resolveIRI( iri ) ];
		return this.interfaces.whereClause;
	}

	where( patternFunction:( builder:PatternBuilder ) => GraphPattern ):SolutionModifier & FinishClause;
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern[ ] ):SolutionModifier & FinishClause;
	where( patternFunction ):SolutionModifier & FinishClause {
		let result:GraphPattern | GraphPattern[] = patternFunction( new PatternBuilder( this ) );
		let patterns:GraphPattern[] = Array.isArray( result ) ? <GraphPattern[]> result : [ result ];

		this._where = [ new Identifier( "WHERE" ), OPEN_BLOCK ];
		patterns.forEach( ( pattern, index ) => {
			this._where.push( ...pattern.getPattern() );
			if( index < patterns.length - 1 ) this._where.push( END_TRIPLE );
			else this._where.push( END_LIST_TRIPLE );
		} );
		this._where.push( CLOSE_BLOCK );

		return Object.assign(
			{},
			this.interfaces.groupClause,
			this.interfaces.havingClause,
			this.interfaces.orderClause,
			this.interfaces.limitClause,
			this.interfaces.offsetClause,
			this.interfaces.finishClause,
		);
	}

// TODO: Implement group condition
	groupBy( rawCondition:string ):HavingClause & OrderClause & LimitOffsetClause & FinishClause {
		this._group = [ new Identifier( "GROUP" ), new Identifier( "BY" ), new StringLiteral( rawCondition ) ];
		return Object.assign(
			{},
			this.interfaces.havingClause,
			this.interfaces.orderClause,
			this.interfaces.limitClause,
			this.interfaces.offsetClause,
			this.interfaces.finishClause,
		);
	}

// TODO: Implement having condition
	having( rawCondition:string ):OrderClause & LimitOffsetClause & FinishClause {
		this._having = [ new Identifier( "HAVING" ), new StringLiteral( rawCondition ) ];
		return Object.assign(
			{},
			this.interfaces.orderClause,
			this.interfaces.limitClause,
			this.interfaces.offsetClause,
			this.interfaces.finishClause,
		);
	}

// TODO: Implement order condition
	orderBy( rawCondition:string ):LimitOffsetClause & FinishClause {
		this._order = [ new Identifier( "ORDER" ), new Identifier( "BY" ), new StringLiteral( rawCondition ) ];
		return Object.assign(
			<any> {},
			this.interfaces.limitClause,
			this.interfaces.offsetClause,
			this.interfaces.finishClause,
		);
	}

	limit( limit:number ):OffsetClause < FinishClause > & FinishClause {
		this._limit = [ new Identifier( "LIMIT" ), new NumberLiteral( limit ) ];

		if( this._offset )
			return <any> this.interfaces.finishClause;
		return Object.assign( {}, this.interfaces.offsetClause, this.interfaces.finishClause );
	}

	offset( offset:number ):LimitClause < FinishClause > & FinishClause {
		this._offset = [ new Identifier( "OFFSET" ), new NumberLiteral( offset ) ];

		if( this._limit )
			return <any> this.interfaces.finishClause;
		return Object.assign( {}, this.interfaces.limitClause, this.interfaces.finishClause );
	}

	/**
	 * Construct the SPARQL query string.
	 * @returns {string}
	 */
	private constructQuery( format:TokenFormat ):string {
		let indentation:number = 0;
		let tokens:Token[] = [];

		// Add base
		tokens.push( new Identifier( "BASE" ), OPEN_IRI, new StringLiteral( this._base ), CLOSE_IRI );

		// Add used prefixes
		this._prefixes.forEach( ( prefixInfo:PrefixInfo, prefix:string ) => {
			if( prefixInfo.used )
				tokens.push( new Identifier( "PREFIX" ), new StringLiteral( prefix + ":" ), OPEN_IRI, new StringLiteral( prefixInfo.iri ), CLOSE_IRI );
		} );

		// Add select clause
		tokens.push( ...this._selects );

		// Add from clause
		if( this._from )
			tokens.push( ...this._from );

		// Add where clause
		tokens.push( ...this._where );

		// Add solution modifiers
		if( this._order )
			tokens.push( ...this._order );
		if( this._having )
			tokens.push( ...this._having );
		if( this._group )
			tokens.push( ...this._group );
		if( this._limit )
			tokens.push( ...this._limit );
		if( this._offset )
			tokens.push( ...this._offset );

		// Transform the tokens to a string
		return tokens.reduce( ( res, token, index ) => {
			return res + token.getTokenValue( format, tokens[ index + 1 ] );
		}, "" );
	}

	/**
	 * Returns a compact SPARQL query string.
	 * @returns {string}
	 */
	getCompactSparqlQuery():string {
		return this.constructQuery( TokenFormat.COMPACT );
	}

	/**
	 * Returns a pretty SPARQL query string.
	 * @returns {string}
	 */
	getPrettySparqlQuery():string {
		return this.constructQuery( TokenFormat.PRETTY );
	}

	private initInterfaces():void {
		this.interfaces = {
			queryClause: {
				base: this.base.bind( this ),
				vocab: this.vocab.bind( this ),
				prefix: this.prefix.bind( this ),
				select: this.select.bind( this ),
				selectAll: this.selectAll.bind( this ),
			},
			fromClause: {
				from: this.from.bind( this ),
				fromNamed: this.fromNamed.bind( this ),
			},
			whereClause: {
				where: this.where.bind( this ),
			},
			groupClause: {
				groupBy: this.groupBy.bind( this ),
			},
			havingClause: {
				having: this.having.bind( this ),
			},
			orderClause: {
				orderBy: this.orderBy.bind( this ),
			},
			limitClause: {
				limit: this.limit.bind( this ),
			},
			offsetClause: {
				offset: this.offset.bind( this ),
			},
			finishClause: {
				getCompactSparqlQuery: this.getCompactSparqlQuery.bind( this ),
				getPrettySparqlQuery: this.getPrettySparqlQuery.bind( this ),
			},
		};
	}

	_resolveIRI( iri:string, vocab:boolean = false ):Token[] {
		let tokens:Token[];

		if( IRI.isPrefixed( iri ) ) {
			let parts:string[] = IRI.getPrefixedParts( iri );
			if( parts === null ) return;

			let prefixInfo:PrefixInfo = this._prefixes.get( parts[ 0 ] );
			if( prefixInfo === void 0 ) throw new Error( "IllegalArgumentError: The used prefix has not been declared" );

			tokens = [ new StringLiteral( parts[ 0 ] ), PREFIX_SYMBOL, new StringLiteral( parts[ 1 ] ) ];
			prefixInfo.used = true;
		} else {
			tokens = IRI.resolve( iri, vocab ? this._vocab : void 0 );
		}

		return tokens;
	}

}

export default QueryBuilder;
