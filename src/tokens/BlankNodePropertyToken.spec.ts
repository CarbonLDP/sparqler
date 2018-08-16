import { BlankNodePropertyToken } from "./BlankNodePropertyToken";
import { IRIRefToken } from "./IRIRefToken";
import { PropertyToken } from "./PropertyToken";


describe( "BlankNodePropertyToken", ():void => {

	it( "should exists", ():void => {
		expect( BlankNodePropertyToken ).toBeDefined();
		expect( BlankNodePropertyToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "BlankNodePropertyToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken();
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( BlankNodePropertyToken ) );
		} );

		it( "should initialize the properties", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken();
			expect( token.properties ).toEqual( [] );
		} );

		it( "should assign `blankNodeProperty` as token name", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken();
			expect( token.token ).toBe( "blankNodeProperty" );
		} );

	} );

	describe( "BlankNodePropertyToken.addProperty", ():void => {

		it( "should exists", () => {
			expect( BlankNodePropertyToken.prototype.addProperty ).toBeDefined();
			expect( BlankNodePropertyToken.prototype.addProperty ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add property provided", () => {
			const property:PropertyToken = new PropertyToken( "a" );

			const token:BlankNodePropertyToken = new BlankNodePropertyToken();

			token.addProperty( property );
			expect( token.properties ).toContain( property );
		} );

		it( "should return self", () => {
			const property:PropertyToken = new PropertyToken( "a" );

			const token:BlankNodePropertyToken = new BlankNodePropertyToken();

			const returned:BlankNodePropertyToken = token.addProperty( property );
			expect( returned ).toBe( token );
		} );

	} );

	describe( "BlankNodePropertyToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( BlankNodePropertyToken.prototype.toString ).toBeDefined();
			expect( BlankNodePropertyToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should override Object.toString method", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken();
			expect( token.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return anon blank node when no properties", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken();
			expect( token.toString() ).toBe( "[]" );
		} );

		it( "should return inline blank node with one property", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken()
				.addProperty( new PropertyToken( "a" )
					.addObject( new IRIRefToken( "a-type" ) ) )
			;
			expect( token.toString() ).toBe( "" +
				"[ " +
				"" + "a <a-type> " +
				"]"
			);
		} );

		it( "should return pretty inline blank node with one property", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken()
				.addProperty( new PropertyToken( "a" )
					.addObject( new IRIRefToken( "a-type" ) ) )
			;
			expect( token.toString( 0 ) ).toBe( "" +
				"[ " +
				"" + "a <a-type> " +
				"]"
			);
		} );

		it( "should return blank node with properties", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken()
				.addProperty( new PropertyToken( "a" )
					.addObject( new IRIRefToken( "a-type" ) ) )
				.addProperty( new PropertyToken( "a" )
					.addObject( new IRIRefToken( "another-type" ) ) )
			;
			expect( token.toString() ).toBe( "" +
				"[ " +
				"" + "a <a-type>; " +
				"" + "a <another-type> " +
				"]"
			);
		} );

		it( "should return pretty blank node with properties", ():void => {
			const token:BlankNodePropertyToken = new BlankNodePropertyToken()
				.addProperty( new PropertyToken( "a" )
					.addObject( new IRIRefToken( "a-type" ) ) )
				.addProperty( new PropertyToken( "a" )
					.addObject( new IRIRefToken( "another-type" ) ) )
			;
			expect( token.toString( 0 ) ).toBe( "" +
				"[\n" +
				"    a <a-type>;\n" +
				"    a <another-type>\n" +
				"]"
			);
		} );

	} );

} );
