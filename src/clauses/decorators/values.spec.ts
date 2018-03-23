import {
	Container,
	FinishClause,
	SubFinishClause,
	ValuesClause,
} from "sparqler/clauses";
import * as ContainerModule from "sparqler/clauses/Container";
import { subFinishDecorator } from "sparqler/clauses/decorators";
import { valuesDecorator } from "sparqler/clauses/decorators/values";
import { IRIResolver } from "sparqler/iri";
import {
	CLOSE_MULTI_BLOCK,
	CLOSE_SINGLE_BLOCK,
	CLOSE_SINGLE_LIST,
	OPEN_MULTI_BLOCK,
	OPEN_SINGLE_BLOCK,
	OPEN_SINGLE_LIST,
	VALUES,
	VAR_SYMBOL,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";
import * as SerializeModule from "sparqler/utils/ObjectPattern";

describe( "valuesDecorator", ():void => {

	it( "should exists", ():void => {
		expect( valuesDecorator ).toBeDefined();
		expect( valuesDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a ValuesClause object", ():void => {
		const container:Container = new Container();
		const valuesClause:ValuesClause = valuesDecorator( container, {} );

		expect( valuesClause ).toBeDefined();
		expect( valuesClause ).toEqual( {
			values: jasmine.any( Function ),
		} );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const valuesClause:ValuesClause & MyObject = valuesDecorator( container, myObject );

		expect( valuesClause ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			values: jasmine.any( Function ),
		} );

		// Maintains the object reference
		expect( valuesClause as MyObject ).toEqual( myObject );
	} );

	describe( "ValuesObject", ():void => {

		describe( "ValuesClause.values", ():void => {

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

			beforeEach( () => {
				spyOn( SerializeModule, "serialize" ).and.callFake( ( value ) => {
					if( typeof value === "object" && "getSelfTokens" in value ) return [ new MockToken( "self-tokens-" + value.constructor.name ) ];
					return [ new MockToken( value + "" ) ];
				} );
			} );

			it( "should not change content of current container", ():void => {
				const container:Container = new Container();
				container._iriResolver._prefixes.set( "ex", false );

				const originalTokens:Token[] = container._tokens;
				const copyTokens:Token[] = [].concat( container._tokens );

				const originalIRIResolver:IRIResolver = container._iriResolver;
				const copyIRIResolver:IRIResolver = new IRIResolver( container._iriResolver );

				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				valuesClause.values( [], [] );
				expect( container._tokens ).toEqual( copyTokens );
				expect( originalTokens ).toBe( container._tokens );
				expect( container._iriResolver ).toEqual( copyIRIResolver );
				expect( originalIRIResolver ).toBe( container._iriResolver );

				valuesClause.values( "var1", _ => _.resource( "ex:resource" ) );
				expect( container._tokens ).toEqual( copyTokens );
				expect( originalTokens ).toBe( container._tokens );
				expect( container._iriResolver ).toEqual( copyIRIResolver );
				expect( originalIRIResolver ).toBe( container._iriResolver );
			} );

			it( "should return a FinishClause object", ():void => {
				const container:Container<FinishClause> = new Container<FinishClause>();
				const valuesClauses:ValuesClause<FinishClause> = valuesDecorator( container, {} );

				const finishClause:FinishClause = valuesClauses.values( [], [] );
				expect( finishClause ).toBeDefined();
				expect( finishClause ).toEqual( {
					toCompactString: jasmine.any( Function ),
					toPrettyString: jasmine.any( Function ),
					toString: jasmine.any( Function ),
				} );
			} );

			it( "should return a SubFinishClause object", ():void => {
				const container:Container<SubFinishClause> = new Container<SubFinishClause>( subFinishDecorator );
				const valuesClauses:ValuesClause<SubFinishClause> = valuesDecorator( container, {} );

				const subFinishClause:SubFinishClause = valuesClauses.values( [], [] );
				expect( subFinishClause ).toBeDefined();
				expect( subFinishClause ).toEqual( {
					getPattern: jasmine.any( Function ),
				} );
			} );

			it( "should create tokens for an empty variable and empty value", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( [], [] );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					VALUES, OPEN_SINGLE_LIST, CLOSE_SINGLE_LIST,
					OPEN_MULTI_BLOCK, OPEN_SINGLE_LIST, CLOSE_SINGLE_LIST, CLOSE_MULTI_BLOCK,
				] );
			} );

			it( "should create tokens for a single variable and empty value", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( "var1", [] );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK, CLOSE_SINGLE_BLOCK,
				] );
			} );

			it( "should create tokens for a single variable and single value", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( "var1", "value" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK, new MockToken( "value" ), CLOSE_SINGLE_BLOCK,
				] );

				valuesClause.values( "var1", 20 );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK, new MockToken( "20" ), CLOSE_SINGLE_BLOCK,
				] );
			} );

			it( "should create tokens for a single variable and multiple values", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( "var1", [ "value", 20, true ] );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK, new MockToken( "value" ), new MockToken( "20" ), new MockToken( "true" ), CLOSE_SINGLE_BLOCK,
				] );
			} );

			it( "should create tokens for a single variable and empty value from builder", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					if( args.length > 0 && args[  0 ] === subFinishDecorator ) return new Container( arg1, arg2, ...args );
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( "var1", _ => [] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK, CLOSE_SINGLE_BLOCK,
				] );
			} );

			it( "should create tokens for a single variable and single value from builder", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					if( args.length > 0 && args[  0 ] === subFinishDecorator ) return new Container( arg1, arg2, ...args );
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( "var1", _ => "value" );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK, new MockToken( "value" ), CLOSE_SINGLE_BLOCK,
				] );

				valuesClause.values( "var1", _ => _.resource( "resource/" ) );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 4 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK, new MockToken( "self-tokens-Resource" ), CLOSE_SINGLE_BLOCK,
				] );

				valuesClause.values( "var1", _ => _.literal( "literal" ) );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 6 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK, new MockToken( "self-tokens-RDFLiteral" ), CLOSE_SINGLE_BLOCK,
				] );
			} );

			it( "should create tokens for a single variable and multiple values from builder", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					if( args.length > 0 && args[  0 ] === subFinishDecorator ) return new Container( arg1, arg2, ...args );
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( "var1", _ => [
					"value",
					20,
					true,
					_.resource( "resource/" ),
					_.literal( "literal" ),
				] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					OPEN_SINGLE_BLOCK,
					new MockToken( "value" ),
					new MockToken( "20" ),
					new MockToken( "true" ),
					new MockToken( "self-tokens-Resource" ),
					new MockToken( "self-tokens-RDFLiteral" ),
					CLOSE_SINGLE_BLOCK,
				] );
			} );

			it( "should create tokens for multiple variables and empty value", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( [ "var1" ], [] );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );

				valuesClause.values( [ "var1", "var2" ], [ [] ] );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), VAR_SYMBOL, new StringLiteral( "var2" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );
			} );

			it( "should create tokens for multiple variables and single value", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( [ "var1" ], [ "value" ] );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, new MockToken( "value" ), CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );

				valuesClause.values( [ "var1", "var2" ], [ "value", 20 ] );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), VAR_SYMBOL, new StringLiteral( "var2" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, new MockToken( "value" ), new MockToken( "20" ), CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );
			} );

			it( "should create tokens for multiple variables and multiple values", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( [ "var1" ], [ [ "value" ], [ 20 ], [ true ] ] );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, new MockToken( "value" ), CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST, new MockToken( "20" ), CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST, new MockToken( "true" ), CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );

				valuesClause.values( [ "var1", "var2" ], [ [ "value1", 10, true ], [ "value2", 20, false ], [ "value3", 30, false ] ] );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), VAR_SYMBOL, new StringLiteral( "var2" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, new MockToken( "value1" ), new MockToken( "10" ), new MockToken( "true" ), CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST, new MockToken( "value2" ), new MockToken( "20" ), new MockToken( "false" ), CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST, new MockToken( "value3" ), new MockToken( "30" ), new MockToken( "false" ), CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );
			} );

			it( "should create tokens for multiple variables and empty value from builder", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					if( args.length > 0 && args[  0 ] === subFinishDecorator ) return new Container( arg1, arg2, ...args );
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( [ "var1" ], _ => [] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );

				valuesClause.values( [ "var1", "var2" ], _ => [ [] ] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 4 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), VAR_SYMBOL, new StringLiteral( "var2" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );
			} );

			it( "should create tokens for multiple variables and single value from builder", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					if( args.length > 0 && args[  0 ] === subFinishDecorator ) return new Container( arg1, arg2, ...args );
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( [ "var1" ], _ => [ "value" ] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, new MockToken( "value" ), CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );

				valuesClause.values( [ "var1" ], _ => [ _.resource( "resource/" ) ] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 4 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, new MockToken( "self-tokens-Resource" ), CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );

				valuesClause.values( [ "var1" ], _ => [ [ _.literal( "literal" ) ] ] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 6 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST, new MockToken( "self-tokens-RDFLiteral" ), CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );
			} );

			it( "should create tokens for multiple variables and multiple values from builder", ():void => {
				const container:Container = new Container();
				const valuesClause:ValuesClause = valuesDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					if( args.length > 0 && args[  0 ] === subFinishDecorator ) return new Container( arg1, arg2, ...args );
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				valuesClause.values( [ "var1" ], _ => [
					[ "value" ],
					[ 20 ],
					[ true ],
					[ _.resource( "resource/" ) ],
					[ _.literal( "literal" ) ],
				] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST, VAR_SYMBOL, new StringLiteral( "var1" ), CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST,
					new MockToken( "value" ),
					CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST,
					new MockToken( "20" ),
					CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST,
					new MockToken( "true" ),
					CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST,
					new MockToken( "self-tokens-Resource" ),
					CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST,
					new MockToken( "self-tokens-RDFLiteral" ),
					CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );

				valuesClause.values( [ "var1", "var2", "var3" ], _ => [
					[ "value1", "value2", "value3" ],
					[ 10, 20, 30 ],
					[ true, true, false ],
					[ _.resource( "resource1/" ), _.resource( "resource2/" ), _.resource( "resource3/" ) ],
					[ _.literal( "literal1" ), _.literal( "literal2" ), _.literal( "literal3" ) ],
				] );
				// Pattern builder creation add a call to the spy
				expect( spy ).toHaveBeenCalledTimes( 4 );
				expect( newContainer._tokens ).toEqual( [
					VALUES,
					OPEN_SINGLE_LIST,
					VAR_SYMBOL, new StringLiteral( "var1" ),
					VAR_SYMBOL, new StringLiteral( "var2" ),
					VAR_SYMBOL, new StringLiteral( "var3" ),
					CLOSE_SINGLE_LIST,

					OPEN_MULTI_BLOCK,
					OPEN_SINGLE_LIST,
					new MockToken( "value1" ),
					new MockToken( "value2" ),
					new MockToken( "value3" ),
					CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST,
					new MockToken( "10" ),
					new MockToken( "20" ),
					new MockToken( "30" ),
					CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST,
					new MockToken( "true" ),
					new MockToken( "true" ),
					new MockToken( "false" ),
					CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST,
					new MockToken( "self-tokens-Resource" ),
					new MockToken( "self-tokens-Resource" ),
					new MockToken( "self-tokens-Resource" ),
					CLOSE_SINGLE_LIST,
					OPEN_SINGLE_LIST,
					new MockToken( "self-tokens-RDFLiteral" ),
					new MockToken( "self-tokens-RDFLiteral" ),
					new MockToken( "self-tokens-RDFLiteral" ),
					CLOSE_SINGLE_LIST,
					CLOSE_MULTI_BLOCK,
				] );
			} );

		} );

	} );

} );
