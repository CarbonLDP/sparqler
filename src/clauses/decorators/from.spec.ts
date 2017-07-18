import {
	Container,
	FromClause,
	WhereClause,
} from "sparqler/clauses";
import * as ContainerModule from "sparqler/clauses/Container";
import { fromDecorator, } from "sparqler/clauses/decorators";
import { IRIResolver } from "sparqler/iri";
import {
	CLOSE_IRI,
	FROM,
	NAMED,
	OPEN_IRI,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";

describe( "fromDecorator", ():void => {

	it( "should exists", ():void => {
		expect( fromDecorator ).toBeDefined();
		expect( fromDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a FromClause", ():void => {
		const container:Container = new Container();
		const fromClause:FromClause = fromDecorator( container, {} );

		expect( fromClause ).toEqual( {
			// Self methods
			from: jasmine.any( Function ),
			fromNamed: jasmine.any( Function ),

			// Where methods
			where: jasmine.any( Function ),
		} );

		expect( fromClause.from.name ).toBe( "bound from" );
		expect( fromClause.fromNamed.name ).toBe( "bound fromNamed" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const fromClause:FromClause & MyObject = fromDecorator( container, myObject );

		expect( fromClause ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			from: jasmine.any( Function ),
			fromNamed: jasmine.any( Function ),

			where: jasmine.any( Function ),
		} );

		// Maintains the object reference
		expect( fromClause as MyObject ).toEqual( myObject );
	} );

	it( "should return a FromClause object", ():void => {
		const container:Container = new Container();
		const fromClause:FromClause = fromDecorator( container, {} );

		const groupFinishClause:WhereClause = fromClause.from( "resource/" );
		expect( groupFinishClause ).toEqual( {
			where: jasmine.any( Function ),
		} );
	} );


	describe( "FromClause", ():void => {

		it( "should not change content of current container", ():void => {
			const container:Container = new Container();

			const originalTokensReference:Token[] = container._tokens;
			const tokensCopy:Token[] = [].concat( container._tokens );

			const fromClause:FromClause = fromDecorator( container, {} );

			fromClause.from( "resource/" );
			expect( container._tokens ).toEqual( tokensCopy );
			expect( container._tokens ).toBe( originalTokensReference );

			fromClause.fromNamed( "resource/" );
			expect( container._tokens ).toEqual( tokensCopy );
			expect( container._tokens ).toBe( originalTokensReference );
		} );

		describe( "from", ():void => {

			it( "should construct base `from` tokens", ():void => {
				const container:Container = new Container();
				const fromClause:FromClause = fromDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				fromClause.from( "resource/" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					FROM,
					OPEN_IRI, new StringLiteral( "resource/" ), CLOSE_IRI,
				] );
			} );

			it( "should resolve IRIs provided", ():void => {
				// Extend IRIResolver to be able to spy on it
				const mockIRIResolver:IRIResolver = new class extends IRIResolver {};
				const container:Container = new Container( null, null, mockIRIResolver );

				const fromClause:FromClause = fromDecorator( container, {} );

				const spy:jasmine.Spy = spyOn( container._iriResolver, "resolve" );

				fromClause.from( "resource/" );
				expect( spy ).toHaveBeenCalledWith( "resource/" );

				fromClause.from( "ex:resource" );
				expect( spy ).toHaveBeenCalledWith( "ex:resource" );
			} );

		} );

		describe( "fromNamed", ():void => {

			it( "should construct base `fromNamed` tokens", ():void => {
				const container:Container = new Container();
				const fromClause:FromClause = fromDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				fromClause.fromNamed( "resource/" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					FROM, NAMED,
					OPEN_IRI, new StringLiteral( "resource/" ), CLOSE_IRI,
				] );
			} );

			it( "should resolve IRIs provided", ():void => {
				// Extend IRIResolver to be able to spy on it
				const mockIRIResolver:IRIResolver = new class extends IRIResolver {};
				const container:Container = new Container( null, null, mockIRIResolver );

				const fromClause:FromClause = fromDecorator( container, {} );

				const spy:jasmine.Spy = spyOn( container._iriResolver, "resolve" );

				fromClause.fromNamed( "resource/" );
				expect( spy ).toHaveBeenCalledWith( "resource/" );

				fromClause.fromNamed( "ex:resource" );
				expect( spy ).toHaveBeenCalledWith( "ex:resource" );
			} );

		} );

	} );

} );
