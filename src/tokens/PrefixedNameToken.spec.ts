import { PrefixedNameToken } from "./PrefixedNameToken";


describe( "PrefixedNameToken", ():void => {

	it( "should exists", ():void => {
		expect( PrefixedNameToken ).toBeDefined();
		expect( PrefixedNameToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PrefixedNameToken.constructor", () => {

		it( "should be instantiable", ():void => {
			const token = new PrefixedNameToken( "namespace", "localName" );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( PrefixedNameToken ) );
		} );

		it( "should throw error if invalid prefixed name", ():void => {
			const helper = ( prefixedName:string ) => () => new PrefixedNameToken( prefixedName );

			expect( helper( "invalid" ) ).toThrowError( "Invalid prefixed name." );
			expect( helper( "invalid.invalid" ) ).toThrowError( "Invalid prefixed name." );
			expect( helper( "http://example.com" ) ).toThrowError( "Invalid prefixed name." );
			expect( helper( "://example.com" ) ).toThrowError( "Invalid prefixed name." );
		} );

		it( "should validate namespace when complete prefixed name", ():void => {
			const helper = ( prefixedName:string ) => () => new PrefixedNameToken( prefixedName );

			expect( helper( "valid:" ) ).not.toThrowError();
			expect( helper( "valid.valid:" ) ).not.toThrowError();
			expect( helper( ":" ) ).not.toThrowError();

			expect( helper( "@invalid:localName" ) ).toThrowError( "Invalid prefixed namespace." );
			expect( helper( "_invalid:localName" ) ).toThrowError( "Invalid prefixed namespace." );
			expect( helper( "0_invalid:localName" ) ).toThrowError( "Invalid prefixed namespace." );
			expect( helper( "invalid@:localName" ) ).toThrowError( "Invalid prefixed namespace." );
			expect( helper( "invalid.:localName" ) ).toThrowError( "Invalid prefixed namespace." );
		} );

		it( "should validate namespace when specified parameter si provided", ():void => {
			const helper = ( namespace:string, localName:string ) => () => new PrefixedNameToken( namespace, localName );

			expect( helper( "valid", "" ) ).not.toThrowError();
			expect( helper( "valid.valid", "" ) ).not.toThrowError();
			expect( helper( "", "" ) ).not.toThrowError();

			expect( helper( "@invalid", "localName" ) ).toThrowError( "Invalid prefixed namespace." );
			expect( helper( "_invalid", "localName" ) ).toThrowError( "Invalid prefixed namespace." );
			expect( helper( "0_invalid", "localName" ) ).toThrowError( "Invalid prefixed namespace." );
			expect( helper( "invalid@", "localName" ) ).toThrowError( "Invalid prefixed namespace." );
			expect( helper( "invalid.", "localName" ) ).toThrowError( "Invalid prefixed namespace." );
		} );

		it( "should store the prefixed name into namespace and local name", ():void => {
			const helper = ( prefixedName:string, namespace:string, localName:string ) => {
				const token = new PrefixedNameToken( prefixedName );
				expect( token.namespace ).toBe( namespace );
				expect( token.localName ).toBe( localName );
			};

			helper( "namespace:localName", "namespace", "localName" );
			helper( "ex:type", "ex", "type" );
			helper( ":", "", "" );
		} );

		it( "should store the provided namespace and local name", ():void => {
			const helper = ( namespace:string, localName:string ) => {
				const token = new PrefixedNameToken( namespace, localName );
				expect( token.namespace ).toBe( namespace );
				expect( token.localName ).toBe( localName );
			};

			helper( "namespace", "localName" );
			helper( "", "" );
		} );

		it( "should assign the `prefixedName` as token name", ():void => {
			const helper = ( namespaceOrPrefixed:string, localName?:string ) => {
				const token = new PrefixedNameToken( namespaceOrPrefixed, localName! );
				expect( token.token ).toBe( "prefixedName" );
			};

			helper( "namespace:localName" );
			helper( "namespace", "localName" );
			helper( "", "" );
		} );

	} );

	describe( "PrefixedNameToken.toString", ():void => {

		it( "should override toString method", ():void => {
			const token:PrefixedNameToken = new PrefixedNameToken( "", "" );

			expect( token.toString ).toBeDefined();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the string as a prefixed name", ():void => {
			const helper = ( namespaceOrPrefixed:string, localName?:string ) => {
				const token = new PrefixedNameToken( namespaceOrPrefixed, localName! );
				return token.toString();
			};

			expect( helper( "namespace", "localName" ) ).toBe( "namespace:localName" );
			expect( helper( ":localName" ) ).toBe( ":localName" );

			expect( helper( "namespace:localName" ) ).toBe( "namespace:localName" );
			expect( helper( "", "localName" ) ).toBe( ":localName" );
		} );

	} );

} );
