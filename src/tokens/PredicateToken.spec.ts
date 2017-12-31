import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";

import * as Module from "./PredicateToken";
import { PredicateToken } from "./PredicateToken";

import { PrefixedNameToken } from "./PrefixedNameToken";
import { VariableToken } from "./VariableToken";

describe( "Module PredicateToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "PredicateToken", ():void => {

		it( "should exists", ():void => {
			expect( PredicateToken ).toBeDefined();
			expect( PredicateToken ).toEqual( jasmine.any( Function ) );
		} );

		it( "should accept and store IRI predicates", ():void => {
			const predicate:IRIToken = new IRIToken( "http://example.com/" );
			const token:PredicateToken = new PredicateToken( predicate );

			expect( token ).toBeDefined();
			expect( token.predicate ).toBe( predicate );
		} );

		it( "should accept and store prefixedName predicates", ():void => {
			const predicate:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			const token:PredicateToken = new PredicateToken( predicate );

			expect( token ).toBeDefined();
			expect( token.predicate ).toBe( predicate );
		} );

		it( "should accept and store `a` predicates", ():void => {
			const token:PredicateToken = new PredicateToken( "a" );

			expect( token ).toBeDefined();
			expect( token.predicate ).toBe( "a" );
		} );

		it( "should initialize objects tokens", ():void => {
			const iriPredicate:IRIToken = new IRIToken( "http://example.com/" );
			expect( new PredicateToken( iriPredicate ).objects ).toEqual( [] );

			const prefixedPredicate:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			expect( new PredicateToken( prefixedPredicate ).objects ).toEqual( [] );

			expect( new PredicateToken( "a" ).objects ).toEqual( [] );
		} );

		it( "should assign the `predicate` as token name", ():void => {
			const iriPredicate:IRIToken = new IRIToken( "http://example.com/" );
			expect( new PredicateToken( iriPredicate ).token ).toBe( "predicate" );

			const prefixedPredicate:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			expect( new PredicateToken( prefixedPredicate ).token ).toBe( "predicate" );

			expect( new PredicateToken( "a" ).token ).toBe( "predicate" );
		} );

		describe( "PredicateToken.addObject", ():void => {

			it( "should exists", ():void => {
				expect( PredicateToken.prototype.addObject ).toBeDefined();
				expect( PredicateToken.prototype.addObject ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add the objects provided", ():void => {
				const token:PredicateToken = new PredicateToken( "a" );

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
				const token:PredicateToken = new PredicateToken( "a" );
				const variable:VariableToken = new VariableToken( "variable" );

				const returned:PredicateToken = token.addObject( variable );
				expect( returned ).toBe( token );
			} );

		} );

		describe( "PredicateToken.toString", ():void => {

			it( "should override toString method", ():void => {
				expect( PredicateToken.prototype.toString ).toBeDefined();
				expect( PredicateToken.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return a single predicate - object", ():void => {
				const helper = ( predicate:VariableToken | IRIToken | "a", object:any, string:string ) => {
					const token:PredicateToken = new PredicateToken( predicate ).addObject( object );
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
					const token:PredicateToken = new PredicateToken( predicate );
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
