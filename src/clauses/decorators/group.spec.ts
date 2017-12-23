import {
	Container,
	GroupClause,
} from "../../clauses";
import {
	Identifier,
	StringLiteral,
	Token,
} from "../../tokens";
import * as ContainerModule from "../Container";

import { groupDecorator } from "./group";

describe( "groupDecorator", ():void => {

	it( "should exists", ():void => {
		expect( groupDecorator ).toBeDefined();
		expect( groupDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a GroupClause", ():void => {
		const container:Container = new Container();
		const groupClause:GroupClause = groupDecorator( container, {} );

		expect( groupClause ).toEqual( {
			// Self methods
			groupBy: jasmine.any( Function ),

			// Inherited methods
			having: jasmine.any( Function ),

			orderBy: jasmine.any( Function ),

			limit: jasmine.any( Function ),
			offset: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		expect( groupClause.groupBy.name ).toBe( "bound groupBy" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const groupClause:GroupClause & MyObject = groupDecorator( container, myObject );

		expect( groupClause ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			groupBy: jasmine.any( Function ),

			having: jasmine.any( Function ),

			orderBy: jasmine.any( Function ),

			limit: jasmine.any( Function ),
			offset: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		// Maintains the object reference
		expect( groupClause as MyObject ).toEqual( myObject );
	} );

	describe( "GroupClause", ():void => {

		it( "should not change content of current container", ():void => {
			const container:Container = new Container();
			const tokensCopy:Token[] = [].concat( container._tokens );

			const groupClause:GroupClause = groupDecorator( container, {} );

			groupClause.groupBy( "?a" );
			expect( container._tokens ).toEqual( tokensCopy );
			groupClause.groupBy( "?a ( STR( ?b ) )" );
			expect( container._tokens ).toEqual( tokensCopy );
		} );

		describe( "groupBy", ():void => {

			it( "should construct `groupBy` tokens", ():void => {
				const container:Container = new Container();
				const groupClause:GroupClause = groupDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
					return newContainer = new Container( ...args );
				} );

				groupClause.groupBy( "?a" );
				expect( spy ).toHaveBeenCalledTimes( 1 );
				expect( newContainer._tokens ).toEqual( [
					new Identifier( "GROUP" ), new Identifier( "BY" ),
					new StringLiteral( "?a" ),
				] );

				groupClause.groupBy( "?a ( STR( ?b ) )" );
				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( newContainer._tokens ).toEqual( [
					new Identifier( "GROUP" ), new Identifier( "BY" ),
					new StringLiteral( "?a ( STR( ?b ) )" ),
				] );
			} );

		} );

	} );

} );
