import {
	Container,
	FromClause,
	SelectClause,
	SubSelect,
	WhereClause,
} from "sparqler/clauses";
import * as ContainerModule from "sparqler/clauses/Container";
import {
	graphPatternDecorator,
	selectDecorator,
	SubSelectContainer,
} from "sparqler/clauses/decorators";
import { IRIResolver } from "sparqler/iri";
import { GraphPattern } from "sparqler/patterns";
import {
	ALL,
	DISTINCT,
	REDUCED,
	SELECT,
	VAR_SYMBOL,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";

describe( "SubSelectContainer", ():void => {

	it( "should exists", ():void => {
		expect( SubSelectContainer ).toBeDefined();
		expect( SubSelectContainer ).toEqual( jasmine.any( Function ) );
	} );

	it( "should be instantiable", ():void => {
		const iriResolver:IRIResolver = new IRIResolver();
		const container:SubSelectContainer = new SubSelectContainer( iriResolver );

		expect( container ).toBeDefined();
		expect( container ).toEqual( jasmine.any( SubSelectContainer ) );
	} );

	it( "should extend Container", ():void => {
		const iriResolver:IRIResolver = new IRIResolver();
		const container:SubSelectContainer = new SubSelectContainer( iriResolver );

		expect( container ).toEqual( jasmine.any( Container ) );
	} );

	it( "should be a read only object", ():void => {
		type Writable<T extends { [x:string]:any }, K extends string> = { [P in K]: T[P] };
		const container:Writable<SubSelectContainer, keyof SubSelectContainer> & { something?:any }
			= new SubSelectContainer( new IRIResolver() );

		expect( () => container._tokens = null ).toThrowError( /read only/ );
		expect( () => container._iriResolver = null ).toThrowError( /read only/ );
		expect( () => container._finishDecorator = null ).toThrowError( /read only/ );

		expect( () => container.something = null ).toThrowError( /extensible/ );
	} );

	it( "should have graphPatternDecorator as finish decorator", ():void => {
		const iriResolver:IRIResolver = new IRIResolver();
		const container:SubSelectContainer = new SubSelectContainer( iriResolver );

		expect( container._finishDecorator ).toBe( graphPatternDecorator );
	} );

} );

describe( "selectDecorator", ():void => {

	it( "should exists", ():void => {
		expect( selectDecorator ).toBeDefined();
		expect( selectDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a SelectClause", ():void => {
		const container:Container = new Container();
		const selectClause:SelectClause = selectDecorator( container, {} );

		expect( selectClause ).toEqual( {
			// Self methods
			select: jasmine.any( Function ),
			selectDistinct: jasmine.any( Function ),
			selectReduced: jasmine.any( Function ),

			selectAll: jasmine.any( Function ),
			selectAllDistinct: jasmine.any( Function ),
			selectAllReduced: jasmine.any( Function ),
		} );

		expect( selectClause.select.name ).toBe( "bound select" );
		expect( selectClause.selectDistinct.name ).toBe( "bound selectDistinct" );
		expect( selectClause.selectReduced.name ).toBe( "bound selectReduced" );

		expect( selectClause.selectAll.name ).toBe( "bound selectAll" );
		expect( selectClause.selectAllDistinct.name ).toBe( "bound selectAllDistinct" );
		expect( selectClause.selectAllReduced.name ).toBe( "bound selectAllReduced" );
	} );

	it( "should create a SubSelect", ():void => {
		const iriResolver:IRIResolver = new IRIResolver();
		const container:SubSelectContainer = new SubSelectContainer( iriResolver );

		const subSelect:SubSelect = selectDecorator( container, {} );

		expect( subSelect ).toEqual( {
			// Self methods
			select: jasmine.any( Function ),
			selectDistinct: jasmine.any( Function ),
			selectReduced: jasmine.any( Function ),

			selectAll: jasmine.any( Function ),
			selectAllDistinct: jasmine.any( Function ),
			selectAllReduced: jasmine.any( Function ),
		} );

		expect( subSelect.select.name ).toBe( "bound select" );
		expect( subSelect.selectDistinct.name ).toBe( "bound selectDistinct" );
		expect( subSelect.selectReduced.name ).toBe( "bound selectReduced" );

		expect( subSelect.selectAll.name ).toBe( "bound selectAll" );
		expect( subSelect.selectAllDistinct.name ).toBe( "bound selectAllDistinct" );
		expect( subSelect.selectAllReduced.name ).toBe( "bound selectAllReduced" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const selectClause:SelectClause & MyObject = selectDecorator( container, myObject );

		expect( selectClause ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			select: jasmine.any( Function ),
			selectDistinct: jasmine.any( Function ),
			selectReduced: jasmine.any( Function ),

			selectAll: jasmine.any( Function ),
			selectAllDistinct: jasmine.any( Function ),
			selectAllReduced: jasmine.any( Function ),
		} );
	} );

	describe( "SelectClause", ():void => {

		describe( "select", ():void => {

			it( "should require at least one parameter", ():void => {
				const container:Container = new Container();

				const selectClause:SelectClause = selectDecorator( container, {} );
				expect( () => selectClause.select() ).toThrowError( "Need to provide al least one variable." );
			} );

			it( "should not change content of current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const selectClause:SelectClause = selectDecorator( container, {} );
				selectClause.select( "a" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.select( "a", "b" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.select( "a", "b", "c", "d" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a FromClause object", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				const fromClause:FromClause = selectClause.select( "a" );
				expect( fromClause ).toEqual( {
					from: jasmine.any( Function ),
					fromNamed: jasmine.any( Function ),

					where: jasmine.any( Function ),
				} );
			} );

			it( "should construct `select` tokens", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				selectClause.select( "a" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT,
					VAR_SYMBOL, new StringLiteral( "a" ),
				] );

				selectClause.select( "a", "b", "c" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT,
					VAR_SYMBOL, new StringLiteral( "a" ),
					VAR_SYMBOL, new StringLiteral( "b" ),
					VAR_SYMBOL, new StringLiteral( "c" ),
				] );
			} );

		} );

		describe( "selectDistinct", ():void => {

			it( "should require at least one parameter", ():void => {
				const container:Container = new Container();

				const selectClause:SelectClause = selectDecorator( container, {} );
				expect( () => selectClause.selectDistinct() ).toThrowError( "Need to provide al least one variable." );
			} );

			it( "should not change content of current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const selectClause:SelectClause = selectDecorator( container, {} );
				selectClause.selectDistinct( "a" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectDistinct( "a", "b" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectDistinct( "a", "b", "c", "d" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a FromClause object", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				const fromClause:FromClause = selectClause.selectDistinct( "a" );
				expect( fromClause ).toEqual( {
					from: jasmine.any( Function ),
					fromNamed: jasmine.any( Function ),

					where: jasmine.any( Function ),
				} );
			} );

			it( "should construct `selectDistinct` tokens", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				selectClause.selectDistinct( "a" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, DISTINCT,
					VAR_SYMBOL, new StringLiteral( "a" ),
				] );

				selectClause.selectDistinct( "a", "b", "c" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, DISTINCT,
					VAR_SYMBOL, new StringLiteral( "a" ),
					VAR_SYMBOL, new StringLiteral( "b" ),
					VAR_SYMBOL, new StringLiteral( "c" ),
				] );
			} );

		} );

		describe( "selectReduced", ():void => {

			it( "should require at least one parameter", ():void => {
				const container:Container = new Container();

				const selectClause:SelectClause = selectDecorator( container, {} );
				expect( () => selectClause.selectReduced() ).toThrowError( "Need to provide al least one variable." );
			} );

			it( "should not change content of current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const selectClause:SelectClause = selectDecorator( container, {} );
				selectClause.selectReduced( "a" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectReduced( "a", "b" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectReduced( "a", "b", "c", "d" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a FromClause object", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				const fromClause:FromClause = selectClause.selectReduced( "a" );
				expect( fromClause ).toEqual( {
					from: jasmine.any( Function ),
					fromNamed: jasmine.any( Function ),

					where: jasmine.any( Function ),
				} );
			} );

			it( "should construct `selectReduced` tokens", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				selectClause.selectReduced( "a" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, REDUCED,
					VAR_SYMBOL, new StringLiteral( "a" ),
				] );

				selectClause.selectReduced( "a", "b", "c" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, REDUCED,
					VAR_SYMBOL, new StringLiteral( "a" ),
					VAR_SYMBOL, new StringLiteral( "b" ),
					VAR_SYMBOL, new StringLiteral( "c" ),
				] );
			} );

		} );

		describe( "selectAll", ():void => {

			it( "should not change content of current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const selectClause:SelectClause = selectDecorator( container, {} );
				selectClause.selectAll();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectAll();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectAll();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a FromClause object", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				const fromClause:FromClause = selectClause.selectAll();
				expect( fromClause ).toEqual( {
					from: jasmine.any( Function ),
					fromNamed: jasmine.any( Function ),

					where: jasmine.any( Function ),
				} );
			} );

			it( "should construct `selectAll` tokens", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				selectClause.selectAll();
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT,
					ALL,
				] );

				selectClause.selectAll();
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT,
					ALL,
				] );
			} );

		} );

		describe( "selectAllDistinct", ():void => {

			it( "should not change content of current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const selectClause:SelectClause = selectDecorator( container, {} );
				selectClause.selectAllDistinct();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectAllDistinct();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectAllDistinct();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a FromClause object", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				const fromClause:FromClause = selectClause.selectAllDistinct();
				expect( fromClause ).toEqual( {
					from: jasmine.any( Function ),
					fromNamed: jasmine.any( Function ),

					where: jasmine.any( Function ),
				} );
			} );

			it( "should construct `selectAllDistinct` tokens", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				selectClause.selectAllDistinct();
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, DISTINCT,
					ALL,
				] );

				selectClause.selectAllDistinct();
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, DISTINCT,
					ALL,
				] );
			} );

		} );

		describe( "selectAllReduced", ():void => {

			it( "should not change content of current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const selectClause:SelectClause = selectDecorator( container, {} );
				selectClause.selectAllReduced();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectAllReduced();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				selectClause.selectAllReduced();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a FromClause object", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				const fromClause:FromClause = selectClause.selectAllReduced();
				expect( fromClause ).toEqual( {
					from: jasmine.any( Function ),
					fromNamed: jasmine.any( Function ),

					where: jasmine.any( Function ),
				} );
			} );

			it( "should construct `selectAllReduced` tokens", ():void => {
				const container:Container = new Container();
				const selectClause:SelectClause = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				selectClause.selectAllReduced();
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, REDUCED,
					ALL,
				] );

				selectClause.selectAllReduced();
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, REDUCED,
					ALL,
				] );
			} );

		} );

	} );

	describe( "SubSelect", ():void => {

		describe( "select", ():void => {

			it( "should require at least one parameter", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const subSelect:SubSelect = selectDecorator( container, {} );
				expect( () => subSelect.select() ).toThrowError( "Need to provide al least one variable." );
			} );

			it( "should not change content of current container", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const subSelect:SubSelect = selectDecorator( container, {} );
				subSelect.select( "a" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.select( "a", "b" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.select( "a", "b", "c", "d" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a WhereClause<GraphPattern> object", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				const whereClausePattern:WhereClause<GraphPattern> = subSelect.select( "a" );
				expect( whereClausePattern ).toEqual( {
					where: jasmine.any( Function ),
				} );

				const graphPattern:GraphPattern = whereClausePattern.where( () => [] );
				expect( graphPattern ).toEqual( jasmine.objectContaining( {
					getPattern: jasmine.any( Function ),
				} ) );
			} );

			it( "should construct `select` tokens", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				subSelect.select( "a" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT,
					VAR_SYMBOL, new StringLiteral( "a" ),
				] );

				subSelect.select( "a", "b", "c" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT,
					VAR_SYMBOL, new StringLiteral( "a" ),
					VAR_SYMBOL, new StringLiteral( "b" ),
					VAR_SYMBOL, new StringLiteral( "c" ),
				] );
			} );

		} );

		describe( "selectDistinct", ():void => {

			it( "should require at least one parameter", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const subSelect:SubSelect = selectDecorator( container, {} );
				expect( () => subSelect.selectDistinct() ).toThrowError( "Need to provide al least one variable." );
			} );

			it( "should not change content of current container", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const subSelect:SubSelect = selectDecorator( container, {} );
				subSelect.selectDistinct( "a" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectDistinct( "a", "b" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectDistinct( "a", "b", "c", "d" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a WhereClause<GraphPattern> object", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				const whereClausePattern:WhereClause<GraphPattern> = subSelect.selectDistinct( "a" );
				expect( whereClausePattern ).toEqual( {
					where: jasmine.any( Function ),
				} );

				const graphPattern:GraphPattern = whereClausePattern.where( () => [] );
				expect( graphPattern ).toEqual( jasmine.objectContaining( {
					getPattern: jasmine.any( Function ),
				} ) );
			} );

			it( "should construct `selectDistinct` tokens", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				subSelect.selectDistinct( "a" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, DISTINCT,
					VAR_SYMBOL, new StringLiteral( "a" ),
				] );

				subSelect.selectDistinct( "a", "b", "c" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, DISTINCT,
					VAR_SYMBOL, new StringLiteral( "a" ),
					VAR_SYMBOL, new StringLiteral( "b" ),
					VAR_SYMBOL, new StringLiteral( "c" ),
				] );
			} );

		} );

		describe( "selectReduced", ():void => {

			it( "should require at least one parameter", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const subSelect:SubSelect = selectDecorator( container, {} );
				expect( () => subSelect.selectReduced() ).toThrowError( "Need to provide al least one variable." );
			} );

			it( "should not change content of current container", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const subSelect:SubSelect = selectDecorator( container, {} );
				subSelect.selectReduced( "a" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectReduced( "a", "b" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectReduced( "a", "b", "c", "d" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a WhereClause<GraphPattern> object", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				const whereClausePattern:WhereClause<GraphPattern> = subSelect.selectReduced( "a" );
				expect( whereClausePattern ).toEqual( {
					where: jasmine.any( Function ),
				} );

				const graphPattern:GraphPattern = whereClausePattern.where( () => [] );
				expect( graphPattern ).toEqual( jasmine.objectContaining( {
					getPattern: jasmine.any( Function ),
				} ) );
			} );

			it( "should construct `selectReduced` tokens", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				subSelect.selectReduced( "a" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, REDUCED,
					VAR_SYMBOL, new StringLiteral( "a" ),
				] );

				subSelect.selectReduced( "a", "b", "c" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, REDUCED,
					VAR_SYMBOL, new StringLiteral( "a" ),
					VAR_SYMBOL, new StringLiteral( "b" ),
					VAR_SYMBOL, new StringLiteral( "c" ),
				] );
			} );

		} );

		describe( "selectAll", ():void => {

			it( "should not change content of current container", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const subSelect:SubSelect = selectDecorator( container, {} );
				subSelect.selectAll();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectAll();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectAll();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a WhereClause<GraphPattern> object", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				const whereClausePattern:WhereClause<GraphPattern> = subSelect.selectAll();
				expect( whereClausePattern ).toEqual( {
					where: jasmine.any( Function ),
				} );

				const graphPattern:GraphPattern = whereClausePattern.where( () => [] );
				expect( graphPattern ).toEqual( jasmine.objectContaining( {
					getPattern: jasmine.any( Function ),
				} ) );
			} );

			it( "should construct `selectAll` tokens", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				subSelect.selectAll();
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT,
					ALL,
				] );

				subSelect.selectAll();
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT,
					ALL,
				] );
			} );

		} );

		describe( "selectAllDistinct", ():void => {

			it( "should not change content of current container", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const subSelect:SubSelect = selectDecorator( container, {} );
				subSelect.selectAllDistinct();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectAllDistinct();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectAllDistinct();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a WhereClause<GraphPattern> object", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				const whereClausePattern:WhereClause<GraphPattern> = subSelect.selectAllDistinct();
				expect( whereClausePattern ).toEqual( {
					where: jasmine.any( Function ),
				} );

				const graphPattern:GraphPattern = whereClausePattern.where( () => [] );
				expect( graphPattern ).toEqual( jasmine.objectContaining( {
					getPattern: jasmine.any( Function ),
				} ) );
			} );

			it( "should construct `selectAllDistinct` tokens", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				subSelect.selectAllDistinct();
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, DISTINCT,
					ALL,
				] );

				subSelect.selectAllDistinct();
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, DISTINCT,
					ALL,
				] );
			} );

		} );

		describe( "selectAllReduced", ():void => {

			it( "should not change content of current container", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const subSelect:SubSelect = selectDecorator( container, {} );
				subSelect.selectAllReduced();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectAllReduced();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				subSelect.selectAllReduced();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a WhereClause<GraphPattern> object", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				const whereClausePattern:WhereClause<GraphPattern> = subSelect.selectAllReduced();
				expect( whereClausePattern ).toEqual( {
					where: jasmine.any( Function ),
				} );

				const graphPattern:GraphPattern = whereClausePattern.where( () => [] );
				expect( graphPattern ).toEqual( jasmine.objectContaining( {
					getPattern: jasmine.any( Function ),
				} ) );
			} );

			it( "should construct `selectAllReduced` tokens", ():void => {
				const container:SubSelectContainer = new SubSelectContainer( new IRIResolver() );
				const subSelect:SubSelect = selectDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				subSelect.selectAllReduced();
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, REDUCED,
					ALL,
				] );

				subSelect.selectAllReduced();
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					SELECT, REDUCED,
					ALL,
				] );
			} );

		} );

	} );

} );
