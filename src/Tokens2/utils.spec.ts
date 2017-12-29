import { PatternToken } from "sparqler/tokens";
import { PredicateToken } from "sparqler/tokens/PredicateToken";
import { SelectToken } from "sparqler/tokens/SelectToken";
import { SubjectToken } from "sparqler/tokens/SubjectToken";
import { VariableToken } from "sparqler/tokens/VariableToken";

import * as Module from "./utils";
import { joinPatterns } from "./utils";

describe( "Module utils", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "joinPatterns", ():void => {

		it( "should exists", ():void => {
			expect( joinPatterns ).toBeDefined();
			expect( joinPatterns ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return empty string when empty patterns", ():void => {
			const joined:string = joinPatterns( [] );
			expect( joined ).toBe( "" );
		} );

		it( "should join triples with `.` except last", ():void => {
			const patterns:PatternToken[] = [
				new SubjectToken( new VariableToken( "s1" ) )
					.addPredicate( new PredicateToken( new VariableToken( "p1" ) )
						.addObject( new VariableToken( "o1" ) ),
					)
				,
				new SubjectToken( new VariableToken( "s2" ) )
					.addPredicate( new PredicateToken( new VariableToken( "p2" ) )
						.addObject( new VariableToken( "o2" ) ),
					)
				,
				new SubjectToken( new VariableToken( "s3" ) )
					.addPredicate( new PredicateToken( new VariableToken( "p3" ) )
						.addObject( new VariableToken( "o3" ) ),
					)
				,
			];

			const joined:string = joinPatterns( patterns );
			expect( joined ).toBe( "" +
				"?s1 ?p1 ?o1. " +
				"?s2 ?p2 ?o2. " +
				"?s3 ?p3 ?o3" +
				"",
			);
		} );

		it( "should join sub-select with a block", ():void => {
			const patterns:PatternToken[] = [
				new SelectToken(),
			];

			const joined:string = joinPatterns( patterns );
			expect( joined ).toBe( `{ ${ patterns[ 0 ] } }` );
		} );

	} );

} );
