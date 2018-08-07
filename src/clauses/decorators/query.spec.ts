import Container from "sparqler/clauses/Container";
import {
	QueryClause,
} from "sparqler/clauses/interfaces";
import * as ContainerModule from "sparqler/clauses/Container";
import { queryDecorator } from "sparqler/clauses/decorators";
import { IRIResolver } from "sparqler/iri";
import {
	BASE,
	CLOSE_IRI,
	OPEN_IRI,
	PREFIX,
	PREFIX_SYMBOL,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";

describe( "queryDecorator", ():void => {

	it( "should exists", ():void => {
		expect( queryDecorator ).toBeDefined();
		expect( queryDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a QueryClause object", ():void => {
		const container:Container = new Container();
		const queryClause:QueryClause = queryDecorator( container, {} );

		expect( queryClause ).toEqual( {
			// Self methods
			base: jasmine.any( Function ),
			vocab: jasmine.any( Function ),
			prefix: jasmine.any( Function ),

			// Inherited methods
			select: jasmine.any( Function ),
			selectDistinct: jasmine.any( Function ),
			selectReduced: jasmine.any( Function ),
			selectAll: jasmine.any( Function ),
			selectAllDistinct: jasmine.any( Function ),
			selectAllReduced: jasmine.any( Function ),
		} );

		expect( queryClause.base.name ).toBe( "bound base" );
		expect( queryClause.vocab.name ).toBe( "bound vocab" );
		expect( queryClause.prefix.name ).toBe( "bound prefix" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const queryClause:QueryClause & MyObject = queryDecorator( container, myObject );

		expect( queryClause ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			base: jasmine.any( Function ),
			vocab: jasmine.any( Function ),
			prefix: jasmine.any( Function ),

			select: jasmine.any( Function ),
			selectDistinct: jasmine.any( Function ),
			selectReduced: jasmine.any( Function ),
			selectAll: jasmine.any( Function ),
			selectAllDistinct: jasmine.any( Function ),
			selectAllReduced: jasmine.any( Function ),
		} );

		// Maintains the object reference
		expect( queryClause as MyObject ).toEqual( myObject );
	} );

	describe( "QueryClause", ():void => {

		describe( "base", ():void => {

			it( "should return a QueryClause object", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				const returnedObject:QueryClause = queryClause.base( "http://example.com/base/" );
				expect( returnedObject ).toEqual( {
					base: jasmine.any( Function ),
					vocab: jasmine.any( Function ),
					prefix: jasmine.any( Function ),

					select: jasmine.any( Function ),
					selectDistinct: jasmine.any( Function ),
					selectReduced: jasmine.any( Function ),
					selectAll: jasmine.any( Function ),
					selectAllDistinct: jasmine.any( Function ),
					selectAllReduced: jasmine.any( Function ),
				} );
			} );

			it( "should not mutate current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const queryClause:QueryClause = queryDecorator( container, {} );

				queryClause.base( "http://example.com/base/" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				queryClause.base( "http://example.com/another-base/" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should construct `base` tokens", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				queryClause.base( "http://example.com/base/" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					BASE,
					OPEN_IRI, new StringLiteral( "http://example.com/base/" ), CLOSE_IRI,
				] );

				queryClause.base( "http://example.com/another-base/" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					BASE,
					OPEN_IRI, new StringLiteral( "http://example.com/another-base/" ), CLOSE_IRI,
				] );
			} );

		} );

		describe( "vocab", ():void => {

			it( "should return a QueryClause object", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				const returnedObject:QueryClause = queryClause.vocab( "http://example.com/vocab#" );
				expect( returnedObject ).toEqual( {
					base: jasmine.any( Function ),
					vocab: jasmine.any( Function ),
					prefix: jasmine.any( Function ),

					select: jasmine.any( Function ),
					selectDistinct: jasmine.any( Function ),
					selectReduced: jasmine.any( Function ),
					selectAll: jasmine.any( Function ),
					selectAllDistinct: jasmine.any( Function ),
					selectAllReduced: jasmine.any( Function ),
				} );
			} );

			it( "should not mutate current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const originalIRIResolver:IRIResolver = container._iriResolver;
				const iriResolverCopy:IRIResolver = new IRIResolver( container._iriResolver );

				const queryClause:QueryClause = queryDecorator( container, {} );

				queryClause.vocab( "http://example.com/vocab#" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				expect( container._iriResolver ).toEqual( iriResolverCopy );
				expect( container._iriResolver ).toBe( originalIRIResolver );

				queryClause.vocab( "http://example.com/another-vocab#" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				expect( container._iriResolver ).toEqual( iriResolverCopy );
				expect( container._iriResolver ).toBe( originalIRIResolver );
			} );

			it( "should store the vocab in the IRIResolver", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				queryClause.vocab( "http://example.com/vocab#" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._iriResolver._vocab ).toBe( "http://example.com/vocab#" );

				queryClause.vocab( "http://example.com/another-vocab#" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._iriResolver._vocab ).toBe( "http://example.com/another-vocab#" );
			} );

			it( "should not create new tokens", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				queryClause.vocab( "http://example.com/vocab#" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [] );

				queryClause.vocab( "http://example.com/another-vocab#" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [] );
			} );

		} );

		describe( "prefix", ():void => {

			it( "should return a QueryClause object", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				const returnedObject:QueryClause = queryClause.prefix( "ex", "http://example.com/prefix#" );
				expect( returnedObject ).toEqual( {
					base: jasmine.any( Function ),
					vocab: jasmine.any( Function ),
					prefix: jasmine.any( Function ),

					select: jasmine.any( Function ),
					selectDistinct: jasmine.any( Function ),
					selectReduced: jasmine.any( Function ),
					selectAll: jasmine.any( Function ),
					selectAllDistinct: jasmine.any( Function ),
					selectAllReduced: jasmine.any( Function ),
				} );
			} );

			it( "should not mutate current container", ():void => {
				const container:Container = new Container();

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const originalIRIResolver:IRIResolver = container._iriResolver;
				const iriResolverCopy:IRIResolver = new IRIResolver( container._iriResolver );

				const queryClause:QueryClause = queryDecorator( container, {} );

				queryClause.prefix( "ex", "http://example.com/prefix#" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				expect( container._iriResolver ).toEqual( iriResolverCopy );
				expect( container._iriResolver ).toBe( originalIRIResolver );

				queryClause.prefix( "ex2", "http://example.com/another-prefix#" );
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				expect( container._iriResolver ).toEqual( iriResolverCopy );
				expect( container._iriResolver ).toBe( originalIRIResolver );
			} );

			it( "should store prefix in IRIResolver", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				queryClause.prefix( "ex", "http://example.com/prefix#" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._iriResolver._prefixes ).toEqual( new Map( [
					[ "ex", false ],
				] ) );

				queryClause.prefix( "ex2", "http://example.com/another-prefix#" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._iriResolver._prefixes ).toEqual( new Map( [
					[ "ex2", false ],
				] ) );

				queryClause
					.prefix( "ex", "http://example.com/prefix#" )
					.prefix( "ex2", "http://example.com/another-prefix#" );
				expect( spy ).toHaveBeenCalledTimes( 4 );
				expect( newContainer._iriResolver._prefixes ).toEqual( new Map( [
					[ "ex", false ],
					[ "ex2", false ],
				] ) );
			} );

			it( "should replace existing prefix in IRIResolver", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				queryClause.prefix( "ex", "http://example.com/prefix#" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._iriResolver._prefixes ).toEqual( new Map( [
					[ "ex", false ],
				] ) );

				queryClause.prefix( "ex", "http://example.com/another-prefix#" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._iriResolver._prefixes ).toEqual( new Map( [
					[ "ex", false ],
				] ) );
			} );

			it( "should construct `prefix` tokens", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				queryClause.prefix( "ex", "http://example.com/prefix#" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					PREFIX,
					new StringLiteral( "ex" ), PREFIX_SYMBOL,
					OPEN_IRI, new StringLiteral( "http://example.com/prefix#" ), CLOSE_IRI,
				] );

				queryClause.prefix( "ex2", "http://example.com/another-prefix#" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					PREFIX,
					new StringLiteral( "ex2" ), PREFIX_SYMBOL,
					OPEN_IRI, new StringLiteral( "http://example.com/another-prefix#" ), CLOSE_IRI,
				] );
			} );

			it( "should replace existing prefix in tokens", ():void => {
				const container:Container = new Container();
				const queryClause:QueryClause = queryDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				queryClause
					.prefix( "ex", "http://example.com/prefix#" )
					.prefix( "ex", "http://example.com/another-prefix#" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					PREFIX,
					new StringLiteral( "ex" ), PREFIX_SYMBOL,
					OPEN_IRI, new StringLiteral( "http://example.com/another-prefix#" ), CLOSE_IRI,
				] );
			} );

		} );

	} );

} );
