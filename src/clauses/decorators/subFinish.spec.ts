import Container from "sparqler/clauses/Container";
import {
	SubFinishClause,
} from "sparqler/clauses/interfaces";
import { subFinishDecorator } from "sparqler/clauses/decorators";
import {
	CLOSE_MULTI_BLOCK,
	OPEN_MULTI_BLOCK,
} from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens";

describe( "subFinishDecorator", ():void => {

	it( "should exists", ():void => {
		expect( subFinishDecorator ).toBeDefined();
		expect( subFinishDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a SubFinishClause object", ():void => {
		const container:Container<SubFinishClause> = new Container<SubFinishClause>( subFinishDecorator );
		const graphPattern:SubFinishClause = subFinishDecorator( container, {} );

		expect( graphPattern ).toEqual( {
			getPattern: jasmine.any( Function ),
		} );

		expect( graphPattern.getPattern.name ).toBe( "bound getPattern" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container<SubFinishClause> = new Container<SubFinishClause>( subFinishDecorator );

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const graphPattern:SubFinishClause & MyObject = subFinishDecorator( container, myObject );

		expect( graphPattern ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			getPattern: jasmine.any( Function ),
		} );
	} );

	describe( "SubFinishClause", ():void => {

		describe( "SubFinishClause.getPattern", ():void => {

			it( "should not change content of current container", ():void => {
				const container:Container<SubFinishClause> = new Container<SubFinishClause>( subFinishDecorator );

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const graphPattern:SubFinishClause = subFinishDecorator( container, {} );
				graphPattern.getPattern();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );

				graphPattern.getPattern();
				expect( container._tokens ).toEqual( tokensCopy );
				expect( container._tokens ).toBe( originalTokensReference );
			} );

			it( "should return a copy of the container tokens", ():void => {
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

				const container:Container<SubFinishClause> = new class extends Container<SubFinishClause> {
					// noinspection JSMismatchedCollectionQueryUpdate
					readonly _tokens:Token[];

					constructor() {
						super( subFinishDecorator );
						this._tokens = [ new MockToken( "token-1" ), new MockToken( "token-2" ) ];
					}
				};

				const graphPattern:SubFinishClause = subFinishDecorator( container, {} );

				expect( graphPattern.getPattern() ).toEqual( [
					OPEN_MULTI_BLOCK,
					new MockToken( "token-1" ),
					new MockToken( "token-2" ),
					CLOSE_MULTI_BLOCK,
				] );
				expect( graphPattern.getPattern() ).not.toBe( container._tokens );
			} );

		} );

	} );


} );
