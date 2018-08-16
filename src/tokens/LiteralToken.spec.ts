import { LiteralToken } from "./LiteralToken";


describe( "LiteralToken", ():void => {

	it( "should exists", ():void => {
		expect( LiteralToken ).toBeDefined();
		expect( LiteralToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "LiteralToken.constructor", () => {

		it( "should be instantiable", ():void => {
			const token = new LiteralToken( "literal" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( LiteralToken ) );
		} );

		it( "should store number value", ():void => {
			const helper = ( value:number ) => {
				const token = new LiteralToken( value );
				expect( token.value ).toEqual( value );
			};

			helper( 0 );
			helper( 1 );
			helper( 10.01 );
		} );

		it( "should store boolean value", ():void => {
			const helper = ( value:boolean ) => {
				const token = new LiteralToken( value );
				expect( token.value ).toEqual( value );
			};

			helper( true );
			helper( false );
		} );

		it( "should parse string value", ():void => {
			const helper = ( value:string ) => {
				const token = new LiteralToken( value );
				expect( token.value ).toEqual( value );
			};

			helper( "" );
			helper( "string" );
			helper( "a bit larger string" );
		} );

		it( "should assign the `literal` as token name", ():void => {
			const helper = ( tag:string | boolean | number ) => {
				const token = new LiteralToken( tag );
				expect( token.token ).toBe( "literal" );
			};

			helper( "string" );
			helper( 1 );
			helper( 1.5 );
			helper( true );
		} );

	} );

	describe( "LiteralToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:LiteralToken = new LiteralToken( "" );

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the number literal", ():void => {
			const helper = ( value:number ) => {
				const token = new LiteralToken( value );
				return token.toString();
			};
			expect( helper( 1 ) ).toBe( "1" );
			expect( helper( 10.01 ) ).toBe( "10.01" );
		} );

		it( "should return the boolean literal", ():void => {
			const helper = ( value:boolean ) => {
				const token = new LiteralToken( value );
				return token.toString();
			};
			expect( helper( true ) ).toBe( "true" );
			expect( helper( false ) ).toBe( "false" );
		} );

		it( "should return the string literal", ():void => {
			const helper = ( value:string ) => {
				const token = new LiteralToken( value );
				return token.toString();
			};
			expect( helper( "" ) ).toBe( `""` );
			expect( helper( "string" ) ).toBe( `"string"` );
			expect( helper( "a bit larger string" ) ).toBe( `"a bit larger string"` );
		} );

	} );

} );
