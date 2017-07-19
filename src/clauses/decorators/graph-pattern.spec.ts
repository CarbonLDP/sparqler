import { Container } from "sparqler/clauses";
import { graphPatternDecorator } from "sparqler/clauses/decorators";
import { GraphPattern } from "sparqler/patterns";
import { Token } from "sparqler/tokens";

describe( "graphPatternDecorator", ():void => {

	it( "should exists", ():void => {
		expect( graphPatternDecorator ).toBeDefined();
		expect( graphPatternDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a GraphPattern object", ():void => {
		const container:Container<GraphPattern> = new Container<GraphPattern>( graphPatternDecorator );
		const graphPattern:GraphPattern = graphPatternDecorator( container, {} );

		expect( graphPattern ).toEqual( {
			getPattern: jasmine.any( Function ),
		} );

		expect( graphPattern.getPattern.name ).toBe( "bound getPattern" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container<GraphPattern> = new Container<GraphPattern>( graphPatternDecorator );

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };
		const graphPattern:GraphPattern & MyObject = graphPatternDecorator( container, myObject );

		expect( graphPattern ).toEqual( {
			// Original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// Decorated methods
			getPattern: jasmine.any( Function ),
		} );
	} );

	describe( "GraphPattern", ():void => {

		describe( "getPattern", ():void => {

			it( "should not change content of current container", ():void => {
				const container:Container<GraphPattern> = new Container<GraphPattern>( graphPatternDecorator );

				const originalTokensReference:Token[] = container._tokens;
				const tokensCopy:Token[] = [].concat( container._tokens );

				const graphPattern:GraphPattern = graphPatternDecorator( container, {} );
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

				const container:Container<GraphPattern> = new class extends Container<GraphPattern> {
					// noinspection JSMismatchedCollectionQueryUpdate
					readonly _tokens:Token[];

					constructor() {
						super( graphPatternDecorator );
						this._tokens = [ new MockToken( "token-1" ), new MockToken( "token-2" ) ];
					}
				};

				const graphPattern:GraphPattern = graphPatternDecorator( container, {} );

				expect( graphPattern.getPattern() ).toEqual( [
					new MockToken( "token-1" ),
					new MockToken( "token-2" ),
				] );
				expect( graphPattern.getPattern() ).not.toBe( container._tokens );
			} );

		} );

	} );


} );
