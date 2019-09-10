import { IRIRefToken } from "./IRIRefToken";
import { IRIToken } from "./IRIToken";
import { PrefixedNameToken } from "./PrefixedNameToken";


describe( "IRIToken", () => {

	it( "should exist", () => {
		expect( IRIToken ).toBeDefined();
		expect( IRIToken ).toEqual( jasmine.any( Object ) );
	} );


	describe( "IRIToken.is", () => {

		it( "should exist", () => {
			expect( IRIToken.is ).toBeDefined();
			expect( IRIToken.is ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when IRIRefToken", () => {
			const returned = IRIToken.is( new IRIRefToken( "foo" ) );
			expect( returned ).toBe( true );
		} );

		it( "should return true when PrefixedNameToken", () => {
			const returned = IRIToken.is( new PrefixedNameToken( "ex", "foo" ) );
			expect( returned ).toBe( true );
		} );

	} );

	describe( "IRIToken.create", () => {

		it( "should exist", () => {
			expect( IRIToken.create ).toBeDefined();
			expect( IRIToken.create ).toEqual( jasmine.any( Function ) );
		} );


		it( "should create an IRIRefToken", () => {
			const returned = IRIToken.create( "foo" );
			expect( returned ).toEqual( jasmine.any( IRIRefToken ) );
		} );

		it( "should create a PrefixedNameToken", () => {
			const returned = IRIToken.create( "ex:foo" );
			expect( returned ).toEqual( jasmine.any( PrefixedNameToken ) );
		} );

	} );

} );
