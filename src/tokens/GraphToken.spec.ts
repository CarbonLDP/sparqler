import { GraphToken } from "./GraphToken";
import { GroupPatternToken } from "./GroupPatternToken";
import { OptionalToken } from "./OptionalToken";
import { PatternToken } from "./PatternToken";
import { PropertyToken } from "./PropertyToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";


describe( "GraphToken", ():void => {

	it( "should exists", ():void => {
		expect( GraphToken ).toBeDefined();
		expect( GraphToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "GraphToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:GraphToken = new GraphToken( new VariableToken( "graph" ) );

			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( GraphToken ) );
		} );

		it( "should assign the graph reference", ():void => {
			const graph:VariableToken = new VariableToken( "graph" );
			const token:GraphToken = new GraphToken( graph );
			expect( token.graph ).toBe( graph );
		} );

		it( "should initialize the groupPattern", ():void => {
			const token:GraphToken = new GraphToken( new VariableToken( "graph" ) );
			expect( token.groupPattern ).toEqual( jasmine.any( GroupPatternToken ) );
		} );

		it( "should assign `graph` as token name", ():void => {
			const token:GraphToken = new GraphToken( new VariableToken( "graph" ) );
			expect( token.token ).toBe( "graph" );
		} );

	} );

	describe( "GraphToken.addPattern", ():void => {

		it( "should exists", ():void => {
			expect( GraphToken.prototype.addPattern ).toBeDefined();
			expect( GraphToken.prototype.addPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add single pattern", ():void => {
			const token:GraphToken = new GraphToken( new VariableToken( "graph" ) );

			const pattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			token.addPattern( pattern );

			expect( token.groupPattern.patterns ).toEqual( [ pattern ] );
		} );

		it( "should add multiple patterns", ():void => {
			const token:GraphToken = new GraphToken( new VariableToken( "graph" ) );

			const pattern1:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			const pattern2:PatternToken = new OptionalToken();
			token.addPattern( pattern1, pattern2 );

			expect( token.groupPattern.patterns ).toEqual( [ pattern1, pattern2 ] );
		} );

		it( "should append patterns", ():void => {
			const token:GraphToken = new GraphToken( new VariableToken( "graph" ) );

			const firstPattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			token.addPattern( firstPattern );

			const newPattern:PatternToken = new OptionalToken();
			token.addPattern( newPattern );

			expect( token.groupPattern.patterns ).toEqual( [ firstPattern, newPattern ] );
		} );

		it( "should return itself", ():void => {
			const token:GraphToken = new GraphToken( new VariableToken( "graph" ) );

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

		it( "should return the SPARQL empty graph statement", ():void => {
			const graph:VariableToken = new VariableToken( "graph" );
			const token:GraphToken = new GraphToken( graph );
			expect( token.toString() ).toBe( "GRAPH ?graph {}" );
		} );

		it( "should return the pretty SPARQL empty graph statement", ():void => {
			const graph:VariableToken = new VariableToken( "graph" );
			const token:GraphToken = new GraphToken( graph );
			expect( token.toString( 0 ) ).toBe( "GRAPH ?graph {}" );
		} );

		it( "should return the SPARQL graph statement with pattern", ():void => {
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

			expect( token.toString() ).toBe( "" +
				"GRAPH ?graph { " +
				"" + "?subj1 a ?obj1. " +
				"" + "?subj1 a ?obj1 " +
				"}"
			);
		} );

		it( "should return the pretty SPARQL graph statement with pattern", ():void => {
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


			expect( token.toString( 0 ) ).toBe( "" +
				"GRAPH ?graph {\n" +
				"    ?subj1 a ?obj1.\n" +
				"    ?subj1 a ?obj1\n" +
				"}"
			);
		} );

	} );

} );
