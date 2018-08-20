import { BlankNodeToken } from "./BlankNodeToken";
import { CollectionToken } from "./CollectionToken";
import { IRIRefToken } from "./IRIRefToken";
import { LiteralToken } from "./LiteralToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { VariableToken } from "./VariableToken";


describe( "CollectionToken", ():void => {

	it( "should exists", ():void => {
		expect( CollectionToken ).toBeDefined();
		expect( CollectionToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "CollectionToken.constructor", ():void => {

		it( "should exists", ():void => {
			const token:CollectionToken = new CollectionToken();
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( CollectionToken ) );
		} );

		it( "should initialize objects", ():void => {
			const token:CollectionToken = new CollectionToken();
			expect( token.objects ).toEqual( [] );
		} );

	} );

	describe( "Collection.addObject", () => {

		it( "should exists", () => {
			const token:CollectionToken = new CollectionToken();

			expect( token.addObject ).toBeDefined();
			expect( token.addObject ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add single object", () => {
			const token:CollectionToken = new CollectionToken();
			token.addObject( new IRIRefToken( "resource/" ) );

			expect( token.objects ).toContain( new IRIRefToken( "resource/" ) );
		} );

		it( "should add multiple object", () => {
			const token:CollectionToken = new CollectionToken();
			token.addObject( new IRIRefToken( "resource/" ), new LiteralToken( "value" ) );

			expect( token.objects ).toContain( new IRIRefToken( "resource/" ) );
			expect( token.objects ).toContain( new LiteralToken( "value" ) );
		} );

		it( "should return self", () => {
			const token:CollectionToken = new CollectionToken();
			const returned:CollectionToken = token.addObject();

			expect( returned ).toBe( token );
		} );

	} );

	describe( "CollectionToken.toString", ():void => {

		it( "should override default", ():void => {
			expect( CollectionToken.prototype.toString ).toBeDefined();
			expect( CollectionToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should print empty collection", ():void => {
			const token:CollectionToken = new CollectionToken();
			expect( token.toString() ).toBe( "()" );
		} );

		it( "should print non-empty collection", ():void => {
			const token:CollectionToken = new CollectionToken();

			token.objects.push( new VariableToken( "variable" ) );
			expect( token.toString() ).toBe( `( ?variable )` );

			token.objects.push( new IRIRefToken( "http://example.com/" ) );
			expect( token.toString() ).toBe( `( ?variable <http://example.com/> )` );

			token.objects.push( new PrefixedNameToken( "ex:resource" ) );
			expect( token.toString() ).toBe( `( ?variable <http://example.com/> ex:resource )` );

			token.objects.push( new BlankNodeToken( "_:label" ) );
			expect( token.toString() ).toBe( `( ?variable <http://example.com/> ex:resource _:label )` );

			token.objects.push( new LiteralToken( "literal" ) );
			expect( token.toString() ).toBe( `( ?variable <http://example.com/> ex:resource _:label "literal" )` );

			const subCollection:CollectionToken = new CollectionToken();
			subCollection.objects.push( ...token.objects );
			token.objects.push( subCollection );
			expect( token.toString() ).toBe( `( ?variable <http://example.com/> ex:resource _:label "literal" ( ?variable <http://example.com/> ex:resource _:label "literal" ) )` );
		} );

	} );

} );
