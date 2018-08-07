import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import * as Module from "./PropertyToken";
import { PropertyToken } from "./PropertyToken";
import { VariableToken } from "./VariableToken";


describe( "Module PredicateToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "PredicateToken", ():void => {

		it( "should exists", ():void => {
			expect( PropertyToken ).toBeDefined();
			expect( PropertyToken ).toEqual( jasmine.any( Function ) );
		} );

		it( "should accept and store IRI predicates", ():void => {
			const predicate:IRIToken = new IRIToken( "http://example.com/" );
			const token:PropertyToken = new PropertyToken( predicate );

			expect( token ).toBeDefined();
			expect( token.verb ).toBe( predicate );
		} );

		it( "should accept and store prefixedName predicates", ():void => {
			const predicate:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			const token:PropertyToken = new PropertyToken( predicate );

			expect( token ).toBeDefined();
			expect( token.verb ).toBe( predicate );
		} );

		it( "should accept and store `a` predicates", ():void => {
			const token:PropertyToken = new PropertyToken( "a" );

			expect( token ).toBeDefined();
			expect( token.verb ).toBe( "a" );
		} );

		it( "should initialize objects tokens", ():void => {
			const iriPredicate:IRIToken = new IRIToken( "http://example.com/" );
			expect( new PropertyToken( iriPredicate ).objects ).toEqual( [] );

			const prefixedPredicate:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			expect( new PropertyToken( prefixedPredicate ).objects ).toEqual( [] );

			expect( new PropertyToken( "a" ).objects ).toEqual( [] );
		} );

		it( "should assign the `predicate` as token name", ():void => {
			const iriPredicate:IRIToken = new IRIToken( "http://example.com/" );
			expect( new PropertyToken( iriPredicate ).token ).toBe( "property" );

			const prefixedPredicate:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			expect( new PropertyToken( prefixedPredicate ).token ).toBe( "property" );

			expect( new PropertyToken( "a" ).token ).toBe( "property" );
		} );

		describe( "PredicateToken.addObject", ():void => {

			it( "should exists", ():void => {
				expect( PropertyToken.prototype.addObject ).toBeDefined();
				expect( PropertyToken.prototype.addObject ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add the objects provided", ():void => {
				const token:PropertyToken = new PropertyToken( "a" );

				const variable:VariableToken = new VariableToken( "variable" );
				token.addObject( variable );
				expect( token.objects ).toEqual( [ variable ] );

				const iri:IRIToken = new IRIToken( "http://example.com/" );
				token.addObject( iri );
				expect( token.objects ).toEqual( [ variable, iri ] );

				const prefixed:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
				token.addObject( prefixed );
				expect( token.objects ).toEqual( [ variable, iri, prefixed ] );
			} );

			it( "should return itself", ():void => {
				const token:PropertyToken = new PropertyToken( "a" );
				const variable:VariableToken = new VariableToken( "variable" );

				const returned:PropertyToken = token.addObject( variable );
				expect( returned ).toBe( token );
			} );

		} );

		describe( "PredicateToken.toString", ():void => {

			it( "should override toString method", ():void => {
				expect( PropertyToken.prototype.toString ).toBeDefined();
				expect( PropertyToken.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return a single predicate - object", ():void => {
				const helper = ( predicate:VariableToken | IRIToken | "a", object:any, string:string ) => {
					const token:PropertyToken = new PropertyToken( predicate ).addObject( object );
					expect( token.toString() ).toBe( string );
				};

				const variable:VariableToken = new VariableToken( "variable" );
				helper( variable, new IRIToken( "http://example.com/" ), "?variable <http://example.com/>" );
				helper( variable, new PrefixedNameToken( "ex:resource" ), "?variable ex:resource" );

				const iri:IRIToken = new IRIToken( "http://example.com/ns#property" );
				helper( iri, new LiteralToken( "literal" ), `<http://example.com/ns#property> "literal"` );

				helper( "a", new VariableToken( "type" ), `a ?type` );
			} );

			it( "should return predicate - multiple objects", ():void => {
				const helper = ( predicate:VariableToken | IRIToken | "a", objects:any[], string:string ) => {
					const token:PropertyToken = new PropertyToken( predicate );
					for( const object of objects ) token.addObject( object );
					expect( token.toString() ).toBe( string );
				};

				const variable:VariableToken = new VariableToken( "variable" );
				const objects1 = [ new IRIToken( "http://example.com/" ), new PrefixedNameToken( "ex:resource" ) ];
				helper( variable, objects1, "?variable <http://example.com/>, ex:resource" );

				const objects2 = [ new LiteralToken( "literal" ), new LiteralToken( 10.01 ), new LiteralToken( true ) ];
				const iri:IRIToken = new IRIToken( "http://example.com/ns#property" );
				helper( iri, objects2, `<http://example.com/ns#property> "literal", 10.01, true` );
			} );

		} );

	} );

} );
