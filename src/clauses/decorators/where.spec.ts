import Container from "sparqler/clauses/Container";
import {
	GroupClause,
	SubFinishClause,
	SubWhereClause,
} from "sparqler/clauses/interfaces";
import * as ContainerModule from "sparqler/clauses/Container";
import {
	subFinishDecorator,
	subWhereDecorator,
} from "sparqler/clauses/decorators";
import {
	CLOSE_MULTI_BLOCK,
	CLOSE_SINGLE_BLOCK,
	GRAPH_PATTERN_SEPARATOR,
	OPEN_MULTI_BLOCK,
	OPEN_SINGLE_BLOCK,
	WHERE,
} from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens";

describe( "subWhereDecorator", ():void => {

	it( "should exists", ():void => {
		expect( subWhereDecorator ).toBeDefined();
		expect( subWhereDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a SubWhereClause", ():void => {
		const container:Container<SubFinishClause> = new Container<SubFinishClause>( subFinishDecorator );
		const whereClause:SubWhereClause = subWhereDecorator( container, {} );

		expect( whereClause ).toEqual( {
			// Self methods
			where: jasmine.any( Function ),
		} );

		expect( whereClause.where.name ).toBe( "bound subWhere" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container<SubFinishClause> = new Container<SubFinishClause>( subFinishDecorator );

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const whereClause:SubWhereClause & MyObject = subWhereDecorator( container, myObject );

		expect( whereClause ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			where: jasmine.any( Function ),
		} );

		// Maintains the object reference
		expect( whereClause as MyObject ).toEqual( myObject );
	} );

	describe( "SubWhereClause", ():void => {

		it( "should not change content of current container", ():void => {
			const container:Container<SubFinishClause> = new Container( subFinishDecorator );

			const originalTokensReference:Token[] = container._tokens;
			const tokensCopy:Token[] = [].concat( container._tokens );

			const whereClause:SubWhereClause = subWhereDecorator( container, {} );

			whereClause.where( [] );
			expect( container._tokens ).toEqual( tokensCopy );
			expect( container._tokens ).toBe( originalTokensReference );

			whereClause.where( [] );
			expect( container._tokens ).toEqual( tokensCopy );
			expect( container._tokens ).toBe( originalTokensReference );
		} );

		describe( "SubWhereClause.where", ():void => {

			it( "should return a GroupClause & GraphPattern object", ():void => {
				const container:Container<SubFinishClause> = new Container( subFinishDecorator );
				const whereClause:SubWhereClause = subWhereDecorator( container, {} );

				const groupGraphClause:GroupClause<SubFinishClause> & SubFinishClause = whereClause.where( [] );
				expect( groupGraphClause ).toEqual( {
					groupBy: jasmine.any( Function ),

					having: jasmine.any( Function ),

					orderBy: jasmine.any( Function ),

					limit: jasmine.any( Function ),
					offset: jasmine.any( Function ),

					values: jasmine.any( Function ),

					getPattern: jasmine.any( Function ),
				} );
			} );

			it( "should construct `where` tokens", ():void => {
				const container:Container<SubFinishClause> = new Container( subFinishDecorator );
				const whereClause:SubWhereClause = subWhereDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				whereClause.where( [] );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					WHERE,
					OPEN_SINGLE_BLOCK,
					CLOSE_SINGLE_BLOCK,
				] );
			} );

			it( "should accept single pattern from the pattern function", ():void => {
				const container:Container<SubFinishClause> = new Container( subFinishDecorator );
				const whereClause:SubWhereClause = subWhereDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				class MockToken extends Token {
					// noinspection JSMethodCanBeStatic
					protected getPrettySeparator():string {
						throw new Error( "Method not implemented." );
					}

					// noinspection JSMethodCanBeStatic
					protected getCompactSeparator():string {
						throw new Error( "Method not implemented." );
					}
				}

				whereClause.where( {
					getPattern: () => [ new MockToken( "token-1" ), new MockToken( "token-2" ) ],
				} );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					WHERE,
					OPEN_SINGLE_BLOCK,
					new MockToken( "token-1" ), new MockToken( "token-2" ),
					CLOSE_SINGLE_BLOCK,
				] );
			} );

			it( "should accept multiple patterns from the pattern function", ():void => {
				const container:Container<SubFinishClause> = new Container( subFinishDecorator );
				const whereClause:SubWhereClause = subWhereDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				class MockToken extends Token {
					// noinspection JSMethodCanBeStatic
					protected getPrettySeparator():string {
						throw new Error( "Method not implemented." );
					}

					// noinspection JSMethodCanBeStatic
					protected getCompactSeparator():string {
						throw new Error( "Method not implemented." );
					}
				}

				whereClause.where( [
					{ getPattern: () => [ new MockToken( "token-1.1" ), new MockToken( "token-1.2" ) ] },
					{ getPattern: () => [ new MockToken( "token-2.1" ), new MockToken( "token-2.2" ) ] },
					{ getPattern: () => [ new MockToken( "token-3.1" ), new MockToken( "token-3.2" ) ] },
				] );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					WHERE,
					OPEN_MULTI_BLOCK,
					new MockToken( "token-1.1" ), new MockToken( "token-1.2" ), GRAPH_PATTERN_SEPARATOR,
					new MockToken( "token-2.1" ), new MockToken( "token-2.2" ), GRAPH_PATTERN_SEPARATOR,
					new MockToken( "token-3.1" ), new MockToken( "token-3.2" ),
					CLOSE_MULTI_BLOCK,
				] );
			} );

		} );

	} );

} );
