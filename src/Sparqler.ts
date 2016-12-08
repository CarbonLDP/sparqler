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
import { Variable } from "./Patterns/Variable";

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

	private _select:string;
	private _from:string;
	private _where:string;
	private _group:string;
	private _having:string;
	private _order:string;
	private _limit:string;
	private _offset:string;

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

	select( ...variables:( string | Variable )[ ] ):WhereClause & FromClause {
		if( variables.length === 0 ) throw new Error( "IllegalArgumentError: Need to provide al least one variable." );

		let selects:string[] = variables.map( variable => `?${ variable }` );
		this._select = `SELECT ${ selects.join( " " ) }\n`;

		return Object.assign( {}, this.interfaces.whereClause, this.interfaces.fromClause );
	}

	selectAll():WhereClause & FromClause {
		this._select = `SELECT *\n`;
		return Object.assign( {}, this.interfaces.whereClause, this.interfaces.fromClause );
	}

	from( iri:string ):WhereClause {
		this._from = `FROM ${ this._resolveIRI( iri ) }\n`;
		return this.interfaces.whereClause;
	}

	fromNamed( iri:string ):WhereClause {
		this._from = `FROM NAMED ${ this._resolveIRI( iri ) }\n`;
		return this.interfaces.whereClause;
	}

	where( patternFunction:( builder:PatternBuilder ) => GraphPattern ):SolutionModifier & FinishClause;
	where( patternFunction:( builder:PatternBuilder ) => GraphPattern[ ] ):SolutionModifier & FinishClause;
	where( patternFunction ):SolutionModifier & FinishClause {
		let result:GraphPattern | GraphPattern[] = patternFunction( new PatternBuilder( this ) );
		let patterns:GraphPattern[] = Array.isArray( result ) ? <GraphPattern[]> result : [ result ];

		this._where = `WHERE {\n${ patterns.map( pattern => pattern.getPattern() ).join( " .\n" )}\n}\n`;

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
		this._group = `GROUP BY ${ rawCondition }\n`;
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
		this._having = `HAVING ${ rawCondition }\n`;
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
		this._order = `ORDER BY ${ rawCondition }\n`;
		return Object.assign(
			<any> {},
			this.interfaces.limitClause,
			this.interfaces.offsetClause,
			this.interfaces.finishClause,
		);
	}

	limit( limit:number ):OffsetClause < FinishClause > & FinishClause {
		this._limit = `LIMIT ${ limit }\n`;

		if( this._offset )
			return <any> this.interfaces.finishClause;
		return Object.assign( {}, this.interfaces.offsetClause, this.interfaces.finishClause );
	}

	offset( offset:number ):LimitClause < FinishClause > & FinishClause {
		this._offset = `OFFSET ${ offset }\n`;

		if( this._limit )
			return <any> this.interfaces.finishClause;
		return Object.assign( {}, this.interfaces.limitClause, this.interfaces.finishClause );
	}

	/**
	 * Returns the SPARQL query string.
	 * @returns {string}
	 */
	toQueryString():string {
		let query = "";

		// Add base
		if( this._base )
			query += `BASE <${ this._base }>\n`;

		// Add used prefixes
		this._prefixes.forEach( ( prefixInfo:PrefixInfo, prefix:string ) => {
			if( prefixInfo.used )
				query += `PREFIX ${ prefix }: <${ prefixInfo.iri }>\n`;
		} );

		// Add select clause
		query += this._select;

		// Add from clause
		if( this._from )
			query += this._from;

		// Add where clause
		query += this._where;

		// Add solution modifiers
		if( this._order )
			query += this._order;
		if( this._having )
			query += this._having;
		if( this._group )
			query += this._group;
		if( this._limit )
			query += this._limit;
		if( this._offset )
			query += this._offset;

		return query;
	}

	toString():string {
		return this.toQueryString();
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
				toQueryString: this.toQueryString.bind( this ),
			},
		};
	}

	_resolveIRI( iri:string, vocab:boolean = false ):string {
		if( IRI.isPrefixed( iri ) ) {
			let parts:string[] = IRI.getPrefixedParts( iri );
			if( parts === null ) return;

			let prefixInfo:PrefixInfo = this._prefixes.get( parts[ 0 ] );
			if( prefixInfo === void 0 ) throw new Error( "IllegalArgumentError: The used prefix has not been declared" );

			iri = `${ parts[ 0 ] }:${ parts[ 1 ] }`;
			prefixInfo.used = true;
		} else {
			iri = IRI.resolve( iri, vocab ? this._vocab : void 0 );
		}

		return iri;
	}

}

export default QueryBuilder;
