import { ExpressionListToken } from "./ExpressionListToken";
import { ExpressionToken } from "./ExpressionToken";
import { IRIRefToken } from "./IRIRefToken";
import { LiteralToken } from "./LiteralToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { VariableToken } from "./VariableToken";


describe( "ExpressionListToken", ():void => {

	it( "should exists", ():void => {
		expect( ExpressionListToken ).toBeDefined();
		expect( ExpressionListToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "ExpressionListToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [] );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( ExpressionListToken ) );
		} );

		it( "should initialize expressions array", ():void => {
			const array:ExpressionToken[] = [];
			const token:ExpressionListToken = new ExpressionListToken( array );
			expect( token.expressions ).toBe( array );
		} );

		it( "should initialize distinct with false when no provided", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [] );
			expect( token.distinct ).toBe( false );
		} );

		it( "should initialize distinct with false when provided", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [], false );
			expect( token.distinct ).toBe( false );
		} );

		it( "should initialize distinct with true when provided", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [], true );
			expect( token.distinct ).toBe( true );
		} );

		it( "should initialize separator when provided", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [], undefined, ", " );
			expect( token.separator ).toBe( ", " );
		} );

	} );

	describe( "ExpressionListToken.toString", ():void => {

		it( "should override default", ():void => {
			expect( ExpressionListToken.prototype.toString ).toBeDefined();
			expect( ExpressionListToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should print NIL when no expressions", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [] );
			expect( token.toString() ).toBe( "()" );
		} );

		it( "should print NIL when no expressions and distinct set", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [], true );
			expect( token.toString() ).toBe( "()" );
		} );

		it( "should compact print the list when provided", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [] );

			token.expressions!.push( new VariableToken( "variable" ) );
			expect( token.toString() ).toBe( `(?variable)` );

			token.expressions!.push( new IRIRefToken( "http://example.com/" ) );
			expect( token.toString() ).toBe( `(?variable,<http://example.com/>)` );

			token.expressions!.push( new PrefixedNameToken( "ex:resource" ) );
			expect( token.toString() ).toBe( `(?variable,<http://example.com/>,ex:resource)` );

			token.expressions!.push( new LiteralToken( "literal" ) );
			expect( token.toString() ).toBe( `(?variable,<http://example.com/>,ex:resource,"literal")` );
		} );

		it( "should pretty print the list when provided", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [] );

			token.expressions!.push( new VariableToken( "variable" ) );
			expect( token.toString( 0 ) ).toBe( `( ?variable )` );

			token.expressions!.push( new IRIRefToken( "http://example.com/" ) );
			expect( token.toString( 0 ) ).toBe( `( ?variable, <http://example.com/> )` );

			token.expressions!.push( new PrefixedNameToken( "ex:resource" ) );
			expect( token.toString( 0 ) ).toBe( `( ?variable, <http://example.com/>, ex:resource )` );

			token.expressions!.push( new LiteralToken( "literal" ) );
			expect( token.toString( 0 ) ).toBe( `( ?variable, <http://example.com/>, ex:resource, "literal" )` );
		} );

		it( "should compact print the list when provided and distinct set", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [], true );

			token.expressions!.push( new VariableToken( "variable" ) );
			expect( token.toString() ).toBe( `(DISTINCT ?variable)` );

			token.expressions!.push( new IRIRefToken( "http://example.com/" ) );
			expect( token.toString() ).toBe( `(DISTINCT ?variable,<http://example.com/>)` );

			token.expressions!.push( new PrefixedNameToken( "ex:resource" ) );
			expect( token.toString() ).toBe( `(DISTINCT ?variable,<http://example.com/>,ex:resource)` );

			token.expressions!.push( new LiteralToken( "literal" ) );
			expect( token.toString() ).toBe( `(DISTINCT ?variable,<http://example.com/>,ex:resource,"literal")` );
		} );

		it( "should pretty print the list when provided and distinct set", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [], true );

			token.expressions!.push( new VariableToken( "variable" ) );
			expect( token.toString( 0 ) ).toBe( `( DISTINCT ?variable )` );

			token.expressions!.push( new IRIRefToken( "http://example.com/" ) );
			expect( token.toString( 0 ) ).toBe( `( DISTINCT ?variable, <http://example.com/> )` );

			token.expressions!.push( new PrefixedNameToken( "ex:resource" ) );
			expect( token.toString( 0 ) ).toBe( `( DISTINCT ?variable, <http://example.com/>, ex:resource )` );

			token.expressions!.push( new LiteralToken( "literal" ) );
			expect( token.toString( 0 ) ).toBe( `( DISTINCT ?variable, <http://example.com/>, ex:resource, "literal" )` );
		} );


		it( "should compact print ALL when no expressions", ():void => {
			const token:ExpressionListToken = new ExpressionListToken();

			expect( token.toString() ).toBe( `(*)` );
		} );

		it( "should pretty print ALL when no expressions", ():void => {
			const token:ExpressionListToken = new ExpressionListToken();

			expect( token.toString( 0 ) ).toBe( `( * )` );
		} );

		it( "should compact print ALL when no expressions and distinct", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( undefined, true );

			expect( token.toString() ).toBe( `(DISTINCT *)` );
		} );

		it( "should pretty print ALL when no expressions and distinct", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( undefined, true );

			expect( token.toString( 0 ) ).toBe( `( DISTINCT * )` );
		} );


		it( "should compact print the list with separator", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [ new VariableToken( "variable" ) ], undefined, "," );
			expect( token.toString() ).toBe( `(?variable; SEPARATOR=",")` );
		} );

		it( "should pretty print the list with separator", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [ new VariableToken( "variable" ) ], undefined, "," );
			expect( token.toString( 0 ) ).toBe( `( ?variable; SEPARATOR="," )` );
		} );

		it( "should compact print the list with distinct and separator", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [ new VariableToken( "variable" ) ], true, "," );
			expect( token.toString() ).toBe( `(DISTINCT ?variable; SEPARATOR=",")` );
		} );

		it( "should pretty print the list with distinct and separator", ():void => {
			const token:ExpressionListToken = new ExpressionListToken( [ new VariableToken( "variable" ) ], true, "," );
			expect( token.toString( 0 ) ).toBe( `( DISTINCT ?variable; SEPARATOR="," )` );
		} );

	} );

} );

