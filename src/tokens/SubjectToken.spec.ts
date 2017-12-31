import { BlankNodeToken } from "./BlankNodeToken";
import { TermToken } from "./index";
import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { PredicateToken } from "./PredicateToken";
import { PrefixedNameToken } from "./PrefixedNameToken";

import * as Module from "./SubjectToken";
import { SubjectToken } from "./SubjectToken";

import { VariableToken } from "./VariableToken";

describe( "Module SubjectToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "SubjectToken", ():void => {

		it( "should exists", ():void => {
			expect( SubjectToken ).toBeDefined();
			expect( SubjectToken ).toEqual( jasmine.any( Function ) );
		} );

		it( "should accept and store Variable subjects", ():void => {
			const subject:VariableToken = new VariableToken( "variable" );
			const token:SubjectToken = new SubjectToken( subject );

			expect( token ).toBeDefined();
			expect( token.subject ).toBe( subject );
		} );

		it( "should accept and store IRI subjects", ():void => {
			const subject:IRIToken = new IRIToken( "http://example.com/" );
			const token:SubjectToken = new SubjectToken( subject );

			expect( token ).toBeDefined();
			expect( token.subject ).toBe( subject );
		} );

		it( "should accept and store prefixedName subjects", ():void => {
			const subject:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			const token:SubjectToken = new SubjectToken( subject );

			expect( token ).toBeDefined();
			expect( token.subject ).toBe( subject );
		} );

		it( "should accept and store BlankNode subjects", ():void => {
			const subject:BlankNodeToken = new BlankNodeToken( "_:resource" );
			const token:SubjectToken = new SubjectToken( subject );

			expect( token ).toBeDefined();
			expect( token.subject ).toBe( subject );
		} );

		it( "should accept and store Literal subjects", ():void => {
			const subject:LiteralToken = new LiteralToken( "literal" );
			const token:SubjectToken = new SubjectToken( subject );

			expect( token ).toBeDefined();
			expect( token.subject ).toBe( subject );
		} );

		it( "should initialize predicate tokens", ():void => {
			const variableSubject:VariableToken = new VariableToken( "variable" );
			expect( new SubjectToken( variableSubject ).predicates ).toEqual( [] );

			const iriSubject:IRIToken = new IRIToken( "http://example.com/" );
			expect( new SubjectToken( iriSubject ).predicates ).toEqual( [] );

			const prefixedSubject:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			expect( new SubjectToken( prefixedSubject ).predicates ).toEqual( [] );
		} );

		it( "should assign the `subject` as token name", ():void => {
			const variableSubject:VariableToken = new VariableToken( "variable" );
			expect( new SubjectToken( variableSubject ).token ).toEqual( "subject" );

			const iriSubject:IRIToken = new IRIToken( "http://example.com/" );
			expect( new SubjectToken( iriSubject ).token ).toBe( "subject" );

			const prefixedSubject:PrefixedNameToken = new PrefixedNameToken( "ex:resource" );
			expect( new SubjectToken( prefixedSubject ).token ).toBe( "subject" );
		} );

		describe( "SubjectToken.addPredicate", ():void => {

			it( "should exists", ():void => {
				expect( SubjectToken.prototype.addPredicate ).toBeDefined();
				expect( SubjectToken.prototype.addPredicate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add the predicates provided", ():void => {
				const token:SubjectToken = new SubjectToken( new VariableToken( "subject" ) );

				const predicate1:PredicateToken = new PredicateToken( new VariableToken( "predicate1" ) )
					.addObject( new VariableToken( "object1" ) );
				token.addPredicate( predicate1 );
				expect( token.predicates ).toEqual( [ predicate1 ] );

				const predicate2:PredicateToken = new PredicateToken( new VariableToken( "predicate2" ) )
					.addObject( new VariableToken( "object3" ) );
				token.addPredicate( predicate2 );
				expect( token.predicates ).toEqual( [ predicate1, predicate2 ] );

				const predicate3:PredicateToken = new PredicateToken( new PrefixedNameToken( "ex:property" ) )
					.addObject( new LiteralToken( "literal" ) );
				token.addPredicate( predicate3 );
				expect( token.predicates ).toEqual( [ predicate1, predicate2, predicate3 ] );
			} );

			it( "should return itself", ():void => {
				const token:SubjectToken = new SubjectToken( new VariableToken( "subject" ) );
				const predicate:PredicateToken = new PredicateToken( new VariableToken( "predicate" ) )
					.addObject( new VariableToken( "object" ) );

				const returned:SubjectToken = token.addPredicate( predicate );
				expect( returned ).toBe( token );
			} );

		} );

		describe( "SubjectToken.toString", ():void => {

			it( "should override toString method", ():void => {
				expect( SubjectToken.prototype.toString ).toBeDefined();
				expect( SubjectToken.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return a single subject - predicate", ():void => {
				const helper = ( subject:VariableToken | TermToken, predicate:PredicateToken, string:string ) => {
					const token:SubjectToken = new SubjectToken( subject ).addPredicate( predicate );
					expect( token.toString() ).toBe( string );
				};

				const variable:VariableToken = new VariableToken( "variable" );


				const predicate1:PredicateToken = new PredicateToken( new VariableToken( "predicate1" ) )
					.addObject( new VariableToken( "object1" ) );
				helper( variable, predicate1, "?variable ?predicate1 ?object1" );

				predicate1.addObject( new VariableToken( "object2" ) );
				helper( variable, predicate1, "?variable ?predicate1 ?object1, ?object2" );


				const iri:IRIToken = new IRIToken( "http://example.com/ns#property" );

				helper( iri, predicate1, "<http://example.com/ns#property> ?predicate1 ?object1, ?object2" );

				const predicate2:PredicateToken = new PredicateToken( new PrefixedNameToken( "ex:property" ) )
					.addObject( new LiteralToken( "literal" ) );
				helper( iri, predicate2, `<http://example.com/ns#property> ex:property "literal"` );
			} );

			it( "should return subject - multiple predicates", ():void => {
				const helper = ( subject:VariableToken | TermToken, predicates:PredicateToken[], string:string ) => {
					const token:SubjectToken = new SubjectToken( subject );
					for( const predicate of predicates ) token.addPredicate( predicate );
					expect( token.toString() ).toBe( string );
				};

				const variable:VariableToken = new VariableToken( "variable" );


				const predicate1:PredicateToken = new PredicateToken( new VariableToken( "predicate1" ) )
					.addObject( new VariableToken( "object" ) );
				const predicate2:PredicateToken = new PredicateToken( new PrefixedNameToken( "ex:property" ) )
					.addObject( new LiteralToken( "literal" ) );
				helper(
					variable,
					[ predicate1, predicate2 ],
					`?variable ?predicate1 ?object; ex:property "literal"`,
				);

				predicate1.addObject( new VariableToken( "object2" ) );
				predicate2.addObject( new LiteralToken( "literal-2" ) );
				helper(
					variable,
					[ predicate1, predicate2 ],
					`?variable ?predicate1 ?object, ?object2; ex:property "literal", "literal-2"`,
				);


				const iri:IRIToken = new IRIToken( "http://example.com/ns#property" );

				helper(
					iri,
					[ predicate1, predicate2 ],
					`<http://example.com/ns#property> ?predicate1 ?object, ?object2; ex:property "literal", "literal-2"`,
				);
				const predicate3:PredicateToken = new PredicateToken( "a" )
					.addObject( new IRIToken( "http://example.con/ns#Class" ) );
				helper(
					iri,
					[ predicate1, predicate2, predicate3 ],
					`<http://example.com/ns#property> ?predicate1 ?object, ?object2; ex:property "literal", "literal-2"; a <http://example.con/ns#Class>`,
				);
			} );

		} );

	} );

} );
