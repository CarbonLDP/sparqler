import Container from "sparqler/clauses/Container";
import {
	FinishClause,
	SubFinishClause,
} from "sparqler/clauses/interfaces";
import * as ContainerModule from "sparqler/clauses/Container";
import { subFinishDecorator } from "sparqler/clauses/decorators";
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

xdescribe( "valuesDecorator", ():void => {

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

			it( "should create tokens for multiple variables and multiple values from builder", ():void => {
				const valuesClause:any = {}

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
