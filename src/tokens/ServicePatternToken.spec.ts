import { GroupPatternToken } from "./GroupPatternToken";
import { IRIRefToken } from "./IRIRefToken";
import { ServicePatternToken } from "./ServicePatternToken";


describe( "ServicePatternToken", ():void => {

	it( "should exists", ():void => {
		expect( ServicePatternToken ).toBeDefined();
		expect( ServicePatternToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "ServicePatternToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ) );
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( ServicePatternToken ) );
		} );

		it( "should not assign modifier if not provided", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ) );
			expect( token.modifier ).toBeUndefined();
		} );

		it( "should assign the modifier `SILENT`", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ), "SILENT" );
			expect( token.modifier ).toBe( "SILENT" );
		} );

		it( "should initialize patterns", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ) );
			expect( token.groupPattern ).toEqual( new GroupPatternToken() );
		} );

		it( "should set token as `servicePattern`", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ) );
			expect( token.token ).toEqual( "servicePattern" );
		} );

	} );

	describe( "ServicePatternToken.toString", ():void => {

		it( "should exists", ():void => {
			expect( ServicePatternToken.prototype.toString ).toBeDefined();
			expect( ServicePatternToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );

		it( "should print the base SPARQL", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ) );

			expect( token.toString() ).toEqual( "SERVICE <resource/> {}" );
		} );

		it( "should print the pretty base SPARQL", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ) );

			expect( token.toString( 0 ) ).toEqual( "SERVICE <resource/> {}" );
		} );

		it( "should print the base SPARQL with modifier `SILENT`", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ), "SILENT" );

			expect( token.toString() ).toEqual( "SERVICE SILENT <resource/> {}" );
		} );

		it( "should print the pretty base SPARQL with modifier `SILENT`", ():void => {
			const token:ServicePatternToken = new ServicePatternToken( new IRIRefToken( "resource/" ), "SILENT" );

			expect( token.toString( 0 ) ).toEqual( "SERVICE SILENT <resource/> {}" );
		} );

	} );

} );
