import Container from "sparqler/clauses/Container";
import {
	OrderClause,
} from "sparqler/clauses/interfaces";
import * as ContainerModule from "sparqler/clauses/Container";
import { orderDecorator } from "sparqler/clauses/decorators";
import {
	Identifier,
	StringLiteral,
	Token,
} from "sparqler/tokens";

describe( "orderDecorator", ():void => {

	it( "should exists", ():void => {
		expect( orderDecorator ).toBeDefined();
		expect( orderDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create an OrderClause", ():void => {
		const container:Container = new Container();
		const orderClause:OrderClause = orderDecorator( container, {} );

		expect( orderClause ).toEqual( {
			// Self methods
			orderBy: jasmine.any( Function ),

			// Inherited methods
			limit: jasmine.any( Function ),
			offset: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		expect( orderClause.orderBy.name ).toBe( "bound orderBy" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const orderClause:OrderClause & MyObject = orderDecorator( container, myObject );

		expect( orderClause ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			orderBy: jasmine.any( Function ),

			limit: jasmine.any( Function ),
			offset: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		// Maintains the object reference
		expect( orderClause as MyObject ).toBe( myObject );
	} );

	describe( "OrderClause", ():void => {

		it( "should not change content of current container", ():void => {
			const container:Container = new Container();

			const tokensCopy:Token[] = [].concat( container._tokens );

			const orderClause:OrderClause = orderDecorator( container, {} );

			orderClause.orderBy( "?a" );
			expect( container._tokens ).toEqual( tokensCopy );
			orderClause.orderBy( "DESC( ?a )" );
			expect( container._tokens ).toEqual( tokensCopy );
		} );

		describe( "orderBy", ():void => {

			it( "should construct order tokens", ():void => {
				const container:Container = new Container();
				const orderClause:OrderClause = orderDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( arg1, arg2, ...args ) => {
					return newContainer = new Container( arg1, arg2, ...args );
				} );

				orderClause.orderBy( "?a" );
				expect( spy ).toHaveBeenCalled();
				expect( newContainer._tokens ).toEqual( [
					new Identifier( "ORDER" ), new Identifier( "BY" ),
					new StringLiteral( "?a" ),
				] );

				orderClause.orderBy( "DESC( ?a )" );
				expect( spy ).toHaveBeenCalled();
				expect( newContainer._tokens ).toEqual( [
					new Identifier( "ORDER" ), new Identifier( "BY" ),
					new StringLiteral( "DESC( ?a )" ),
				] );
			} );

		} );

	} );

} );
