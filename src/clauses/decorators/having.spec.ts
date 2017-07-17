import {
	Container,
	HavingClause,
} from "sparqler/clauses";
import * as ContainerModule from "sparqler/clauses/Container";
import { havingDecorator } from "sparqler/clauses/decorators";
import {
	Identifier,
	StringLiteral,
	Token,
} from "sparqler/tokens";

describe( "havingDecorator", ():void => {

	it( "should exists", ():void => {
		expect( havingDecorator ).toBeDefined();
		expect( havingDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a HavingClause", ():void => {
		const container:Container = new Container();
		const havingClause:HavingClause = havingDecorator( container, {} );

		expect( havingClause ).toEqual( {
			// Self methods
			having: jasmine.any( Function ),

			// Inherit methods
			orderBy: jasmine.any( Function ),
			limit: jasmine.any( Function ),
			offset: jasmine.any( Function ),
		} );

		expect( havingClause.having.name ).toBe( "bound having" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const havingClause:HavingClause & MyObject = havingDecorator( container, myObject );

		expect( havingClause ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			having: jasmine.any( Function ),

			orderBy: jasmine.any( Function ),
			limit: jasmine.any( Function ),
			offset: jasmine.any( Function ),
		} );

		// Maintains the object reference
		expect( havingClause as MyObject ).toEqual( myObject );
	} );

	describe( "HavingClause", ():void => {

		it( "should not change content of current container", ():void => {
			const container:Container = new Container();
			const tokensCopy:Token[] = [].concat( container._tokens );

			const havingClause:HavingClause = havingDecorator( container, {} );

			havingClause.having( "( ?a )" );
			expect( container._tokens ).toEqual( tokensCopy );
			havingClause.having( "( AVG(?size) > 10 )" );
			expect( container._tokens ).toEqual( tokensCopy );
		} );

		describe( "having", ():void => {

			it( "should construct having tokens", ():void => {
				const container:Container = new Container();
				const havingClause:HavingClause = havingDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				havingClause.having( "( ?a )" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					new Identifier( "HAVING" ),
					new StringLiteral( "( ?a )" ),
				] );

				havingClause.having( "( AVG(?size) > 10 )" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					new Identifier( "HAVING" ),
					new StringLiteral( "( AVG(?size) > 10 )" ),
				] );
			} );

		} );

	} );

} );
