import { PatternToken } from "sparqler/tokens/PatternToken";
import { OptionalToken } from "sparqler/tokens/OptionalToken";
import { PropertyToken } from "sparqler/tokens/PropertyToken";
import { SubjectToken } from "sparqler/tokens/SubjectToken";
import * as Utils from "sparqler/tokens/utils";
import { VariableToken } from "sparqler/tokens/VariableToken";

import * as Module from "./GraphToken";
import { GraphToken } from "./GraphToken";

describe( "Module GraphToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "GraphToken", ():void => {

		it( "should exists", ():void => {
			expect( GraphToken ).toBeDefined();
			expect( GraphToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( "GraphToken.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const token:GraphToken = new GraphToken( null );

				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( GraphToken ) );
			} );

			it( "should assign the graph reference", ():void => {
				const graph:VariableToken = new VariableToken( "graph" );
				const token:GraphToken = new GraphToken( graph );
				expect( token.graph ).toBe( graph );
			} );

			it( "should initialize the patterns", ():void => {
				const token:GraphToken = new GraphToken( null );
				expect( token.patterns ).toEqual( [] );
			} );

			it( "should assign `graph` as token name", ():void => {
				const token:GraphToken = new GraphToken( null );
				expect( token.token ).toBe( "graph" );
			} );

		} );

		describe( "GraphToken.addPattern", ():void => {

			it( "should exists", ():void => {
				expect( GraphToken.prototype.addPattern ).toBeDefined();
				expect( GraphToken.prototype.addPattern ).toEqual( jasmine.any( Function ) );
			} );

			it( "should add single pattern", ():void => {
				const token:GraphToken = new GraphToken( null );

				const pattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				token.addPattern( pattern );

				expect( token.patterns ).toEqual( [ pattern ] );
			} );

			it( "should add multiple patterns", ():void => {
				const token:GraphToken = new GraphToken( null );

				const pattern1:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				const pattern2:PatternToken = new OptionalToken();
				token.addPattern( pattern1, pattern2 );

				expect( token.patterns ).toEqual( [ pattern1, pattern2 ] );
			} );

			it( "should append patterns", ():void => {
				const token:GraphToken = new GraphToken( null );

				const firstPattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
				token.addPattern( firstPattern );

				const newPattern:PatternToken = new OptionalToken();
				token.addPattern( newPattern );

				expect( token.patterns ).toEqual( [ firstPattern, newPattern ] );
			} );

			it( "should return itself", ():void => {
				const token:GraphToken = new GraphToken( null );

				const pattern:PatternToken = new OptionalToken();
				const returned:GraphToken = token.addPattern( pattern );

				expect( returned ).toBe( token );
			} );

		} );

		describe( "GraphToken.toString", ():void => {

			it( "should exists", ():void => {
				expect( GraphToken.prototype.toString ).toBeDefined();
				expect( GraphToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the SPARQL empty optional statement", ():void => {
				const graph:VariableToken = new VariableToken( "graph" );
				const token:GraphToken = new GraphToken( graph );
				expect( token.toString() ).toBe( "GRAPH ?graph {  }" );
			} );

			it( "should return the SPARQL optional statement using joinPatterns function", ():void => {
				const spy:jasmine.Spy = spyOn( Utils, "joinPatterns" ).and.callThrough();

				const graph:VariableToken = new VariableToken( "graph" );
				const token:GraphToken = new GraphToken( graph )
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					)
					.addPattern( new SubjectToken( new VariableToken( "subj1" ) )
						.addPredicate( new PropertyToken( "a" )
							.addObject( new VariableToken( "obj1" ) ),
						),
					)
				;

				expect( token.toString() ).toBe( "GRAPH ?graph { ?subj1 a ?obj1. ?subj1 a ?obj1 }" );
				expect( spy ).toHaveBeenCalled();
			} );

		} );

	} );

} );
