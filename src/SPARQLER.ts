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
	FinishSelectClause,
	FinishSelect,
} from "./Clauses";
import {
	GraphPattern,
	IRIResolver,
} from "./Patterns";
import * as IRIUtils from "./Utils/IRI";
import * as PatternsUtils from "./Utils/Patterns";
import { PatternBuilder } from "./PatternBuilder";
import {
	Token,
	TokenFormat,
} from "./Tokens/Token";
import { Identifier } from "./Tokens/Identifier";
import { StringLiteral } from "./Tokens/StringLiteral";
import { RightSymbol } from "./Tokens/RightSymbol";
import { NumberLiteral } from "./Tokens/NumberLiteral";
import {
	OPEN_IRI,
	CLOSE_IRI,
	VAR_SYMBOL,
	PREFIX_SYMBOL,
	EMPTY_SEPARATOR,
	OPEN_MULTI_BLOCK,
	CLOSE_MULTI_BLOCK,
	OPEN_MULTI_LIST,
	OPEN_MULTI_BN,
	CLOSE_MULTI_LIST,
	CLOSE_MULTI_BN,
	SAME_SUBJECT_SEPARATOR,
	SAME_PROPERTY_SEPARATOR,
	TRIPLE_SEPARATOR,
} from "./Patterns/Tokens";
import { NewLineSymbol } from "./Tokens/NewLineSymbol";

export interface PrefixInfo {
	iri:string;
	used:boolean;
}

export class SPARQLER implements QueryClause,
                                 FromClause<FinishClause>,
                                 SelectClause,
                                 WhereClause<FinishClause>,
                                 GroupClause<FinishClause>,
                                 HavingClause<FinishClause>,
                                 OrderClause<FinishClause>,
                                 LimitOffsetClause<FinishClause>,
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
		fromClause:FromClause<FinishClause>;
		whereClause:WhereClause<FinishClause>;
		havingClause:HavingClause<FinishClause>;
		groupClause:GroupClause<FinishClause>;
		orderClause:OrderClause<FinishClause>;
		finishClause:FinishClause;
		limitClause:LimitClause<FinishClause>;
		offsetClause:OffsetClause<FinishClause>;
		finishSelect?:FinishSelect;
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

	select( ...variables:string[] ):WhereClause<FinishSelectClause> & FromClause<FinishSelectClause> {
		if( variables.length === 0 ) throw new Error( "IllegalArgumentError: Need to provide al least one variable." );

		this._selects = [ new Identifier( "SELECT" ) ];
		variables.forEach( variable => this._selects.push( VAR_SYMBOL, new StringLiteral( variable ) ) );

		Object.assign( this.interfaces.finishClause, this.interfaces.finishSelect );
		return Object.assign( {}, this.interfaces.whereClause, this.interfaces.fromClause );
	}

	selectAll():WhereClause<FinishSelectClause> & FromClause<FinishSelectClause> {
		this._selects = [ new Identifier( "SELECT" ), new RightSymbol( "*" ) ];

		Object.assign( this.interfaces.finishClause, this.interfaces.finishSelect );
		return Object.assign( {}, this.interfaces.whereClause, this.interfaces.fromClause );
	}

	from( iri:string ):WhereClause<FinishSelectClause> {
		this._from = [ new Identifier( "FROM" ), ...this._resolveIRI( iri ) ];
		return this.interfaces.whereClause;
	}

	fromNamed( iri:string ):WhereClause<FinishSelectClause> {
		this._from = [ new Identifier( "FROM" ), new Identifier( "NAMED" ), ...this._resolveIRI( iri ) ];
		return this.interfaces.whereClause;
	}

	where( patternFunction:( builder:PatternBuilder ) => GraphPattern ):SolutionModifier<FinishClause> & FinishClause;
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern[ ] ):SolutionModifier<FinishClause> & FinishClause;
	where( patternFunction ):SolutionModifier<FinishClause> & FinishClause {
		let result:GraphPattern | GraphPattern[] = patternFunction( new PatternBuilder( this ) );
		this._where = [ new Identifier( "WHERE" ), ...PatternsUtils.getBlockTokens( result as GraphPattern[] ) ];

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
	groupBy( rawCondition:string ):HavingClause<FinishClause> & OrderClause<FinishClause> & LimitOffsetClause<FinishClause> & FinishClause {
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
	having( rawCondition:string ):OrderClause<FinishClause> & LimitOffsetClause<FinishClause> & FinishClause {
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
	orderBy( rawCondition:string ):LimitOffsetClause<FinishClause> & FinishClause {
		this._order = [ new Identifier( "ORDER" ), new Identifier( "BY" ), new StringLiteral( rawCondition ) ];
		return Object.assign(
			<any> {},
			this.interfaces.limitClause,
			this.interfaces.offsetClause,
			this.interfaces.finishClause,
		);
	}

	limit( limit:number ):OffsetClause<FinishClause> & FinishClause {
		this._limit = [ new Identifier( "LIMIT" ), new NumberLiteral( limit ) ];

		if( this._offset )
			return <any> this.interfaces.finishClause;
		return Object.assign( {}, this.interfaces.offsetClause, this.interfaces.finishClause );
	}

	offset( offset:number ):LimitClause<FinishClause> & FinishClause {
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
		let tokens:Token[] = [];

		// Add base
		if( this._base )
			tokens.push( new Identifier( "BASE" ), OPEN_IRI, new StringLiteral( this._base ), CLOSE_IRI );

		// Add used prefixes
		this._prefixes.forEach( ( prefixInfo:PrefixInfo, prefix:string ) => {
			if( prefixInfo.used || format === TokenFormat.PRETTY )
				tokens.push( new Identifier( "PREFIX" ), new StringLiteral( prefix + ":" ), OPEN_IRI, new StringLiteral( prefixInfo.iri ), CLOSE_IRI );
		} );

		// Add select clause
		if( this._selects )
			tokens.push( ...this._selects );

		// Add from clause
		if( this._from )
			tokens.push( ...this._from );

		// Add where clause
		if( this._where )
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
		if( format === TokenFormat.COMPACT ) {
			return tokens.reduce( ( res, token, index ) => {
				let nextToken:Token = tokens[ index + 1 ];
				if( nextToken === EMPTY_SEPARATOR ) nextToken = tokens[ index + 2 ];
				return res + token.getTokenValue( format, nextToken );
			}, "" );

		} else if( format === TokenFormat.PRETTY ) {
			let stack:{ token:Token, indentation:number, subject:number, property:number, spaces:number }[] = [];
			let actual:{ token:Token, indentation:number, subject:number, property:number, spaces:number } = {
				token: null,
				indentation: 0,
				subject: 0,
				property: 0,
				spaces: 0
			};

			return tokens.reduce( ( res, token, index ) => {
				let nextToken:Token = tokens[ index + 1 ];
				let tokenString:string = token.getTokenValue( format, nextToken );

				// Record spaces occupied by t¡he tokens
				if( actual.spaces === 0 ) {
					actual.subject += tokenString.length;
					if( tokenString.endsWith( " " ) ) actual.spaces ++;
				} else if( actual.spaces === 1 ) {
					actual.property += tokenString.length;
					if( tokenString.endsWith( " " ) ) actual.spaces ++;
				}

				// Check if a new block of lines
				if( [ OPEN_MULTI_BLOCK as Token, OPEN_MULTI_BN, OPEN_MULTI_LIST ].indexOf( token ) !== - 1 ) {

					// Record a new state for a block of triples
					stack.push( actual );
					actual = {
						token: token,
						indentation: actual.indentation + 4,
						subject: 0,
						property: 0,
						spaces: token === OPEN_MULTI_BLOCK ? 0 : token === OPEN_MULTI_BN ? 1 : 2,
					};

				} else if( [ CLOSE_MULTI_LIST as Token ].indexOf( token ) !== - 1 ) {
					if( ! ( nextToken instanceof NewLineSymbol ) ) {

						// Obtain parent state
						let parent = actual;
						while( [ OPEN_MULTI_BLOCK as Token, OPEN_MULTI_BN, OPEN_MULTI_LIST ].indexOf( parent.token ) === - 1 )
							parent = stack.pop();
						stack.push( parent );

						// Record a new state for properties of a collection
						actual = {
							token: token,
							indentation: parent.indentation + 4,
							subject: 0,
							property: 0,
							spaces: 1
						};
					}

				} else if( [ SAME_SUBJECT_SEPARATOR as Token, SAME_PROPERTY_SEPARATOR, CLOSE_MULTI_LIST ].indexOf( token ) !== - 1 ) {

					// Obtain parent state
					let parent = actual;
					while( [ OPEN_MULTI_BLOCK as Token, OPEN_MULTI_BN, OPEN_MULTI_LIST, CLOSE_MULTI_LIST, CLOSE_MULTI_BN ].indexOf( parent.token ) === - 1 )
						parent = stack.pop();
					stack.push( parent );

					// Record a new state for same subject properties
					if( token === SAME_SUBJECT_SEPARATOR ) {
						actual = {
							token: token,
							indentation: parent.indentation + actual.subject,
							subject: actual.subject,
							property: 0,
							spaces: 1
						};

						// Record a new state for a list of objects of a property
					} else if( token === SAME_PROPERTY_SEPARATOR ) {
						actual = {
							token: token,
							indentation: parent.indentation + actual.subject + actual.property,
							subject: actual.subject,
							property: actual.property,
							spaces: 2
						};
					}

					// Returns still a block state
				} else if( token === TRIPLE_SEPARATOR ) {
					while( actual.token !== OPEN_MULTI_BLOCK ) actual = stack.pop();
					actual.spaces = 0;
					actual.subject = 0;
					actual.property = 0;
				}

				if( nextToken === CLOSE_MULTI_BLOCK ) {
					while( actual.token !== OPEN_MULTI_BLOCK ) actual = stack.pop();
					actual = stack.pop();
				} else if( nextToken === CLOSE_MULTI_BN ) {
					while( actual.token !== OPEN_MULTI_BN ) actual = stack.pop();
					actual = stack.pop();
				} else if( nextToken === CLOSE_MULTI_LIST ) {
					while( actual.token !== OPEN_MULTI_LIST ) actual = stack.pop();
					actual = stack.pop();
				}

				if( tokenString.endsWith( "\n" ) ) {
					tokenString = tokenString + " ".repeat( actual.indentation );
				}

				return res + tokenString;
			}, "" );
		}
	}

	/**
	 * Returns a compact SPARQL query string.
	 * @returns {string}
	 */
	toCompactString():string {
		return this.constructQuery( TokenFormat.COMPACT );
	}

	toString():string {
		return this.toCompactString();
	}

	/**
	 * Returns a pretty SPARQL query string.
	 * @returns {string}
	 */
	toPrettyString():string {
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
				toCompactString: this.toCompactString.bind( this ),
				toPrettyString: this.toPrettyString.bind( this ),
			},
		};
	}

	_resolveIRI( iri:string, vocab:boolean = false ):Token[] {
		let tokens:Token[];

		if( IRIUtils.isPrefixed( iri ) ) {
			let parts:string[] = IRIUtils.getPrefixedParts( iri );

			let prefixInfo:PrefixInfo = this._prefixes.get( parts[ 0 ] );
			if( prefixInfo === void 0 ) throw new Error( "IllegalArgumentError: The used prefix has not been declared" );

			tokens = [ new StringLiteral( parts[ 0 ] ), PREFIX_SYMBOL, new StringLiteral( parts[ 1 ] ) ];
			prefixInfo.used = true;
		} else {
			tokens = IRIUtils.resolve( iri, vocab ? this._vocab : void 0 );
		}

		return tokens;
	}

}

export default SPARQLER;
