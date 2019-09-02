import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { PatternBuilder } from "../patterns/PatternBuilder";

import { IRIRefToken } from "../tokens/IRIRefToken";
import { LiteralToken } from "../tokens/LiteralToken";
import { PrefixedNameToken } from "../tokens/PrefixedNameToken";
import { QueryToken } from "../tokens/QueryToken";
import { RDFLiteralToken } from "../tokens/RDFLiteralToken";
import { ValuesToken } from "../tokens/ValuesToken";
import { VariableToken } from "../tokens/VariableToken";

import { XSD } from "../utils/XSD";

import { FinishClause } from "./FinishClause";
import { ValuesClause } from "./ValuesClause";


describe( "ValuesClause", () => {

	it( "should exists", () => {
		expect( ValuesClause ).toBeDefined();
		expect( ValuesClause ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<QueryToken>;
	beforeEach( () => {
		const iriResolver:IRIResolver = new IRIResolver();
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new QueryToken( void 0 ),
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "ValuesClause.createFrom", () => {

		it( "should exists", () => {
			expect( ValuesClause.createFrom ).toBeDefined();
			expect( ValuesClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const valuesClause:ValuesClause<FinishClause> = ValuesClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( valuesClause );
		} );


		it( "should create a ValuesClause object", () => {
			const valuesClause:ValuesClause<FinishClause> = ValuesClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( valuesClause ).toEqual( {
				values: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "ValuesClause.values", () => {

		let valuesClause:ValuesClause<FinishClause>;
		beforeEach( () => {
			valuesClause = ValuesClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		describe( "When single variable", () => {

			describe( "When single value", () => {

				it( "should not mutate container token", () => {
					valuesClause.values( "var", "val" );
					expect( container.targetToken.values )
						.toBeUndefined();
				} );

				it( "should return FinishClause object", () => {
					const limitOffsetClause:FinishClause = valuesClause
						.values( "var", "val" );

					expect( limitOffsetClause ).toEqual( {
						toCompactString: jasmine.any( Function ),
						toPrettyString: jasmine.any( Function ),
						toString: jasmine.any( Function ),
						debug: jasmine.any( Function ),
					} );
				} );


				it( "should add VALUES token", () => {
					valuesClause.values( "var", "val" );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values )
						.toEqual( jasmine.any( ValuesToken ) );
				} );

				it( "should add Variable", () => {
					valuesClause.values( "var", "val" );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var" ) );
				} );

				it( "should add string value", () => {
					valuesClause.values( "var", "val" );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new LiteralToken( "val" ) ] );
				} );

				it( "should add number value", () => {
					valuesClause.values( "var", 10 );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new LiteralToken( 10 ) ] );
				} );

				it( "should add Date value", () => {
					const date:Date = new Date();
					valuesClause.values( "var", date );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ) ] );
				} );

			} );

			describe( "When multiple values", () => {

				it( "should not mutate container token", () => {
					valuesClause.values( "var", [] );
					expect( container.targetToken.values )
						.toBeUndefined();
				} );

				it( "should return FinishClause object", () => {
					const limitOffsetClause:FinishClause = valuesClause
						.values( "var", [] );

					expect( limitOffsetClause ).toEqual( {
						toCompactString: jasmine.any( Function ),
						toPrettyString: jasmine.any( Function ),
						toString: jasmine.any( Function ),
						debug: jasmine.any( Function ),
					} );
				} );


				it( "should add VALUES token", () => {
					valuesClause.values( "var", [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values )
						.toEqual( jasmine.any( ValuesToken ) );
				} );

				it( "should add Variable", () => {
					valuesClause.values( "var", [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var" ) );
				} );

				it( "should add empty values", () => {
					valuesClause.values( "var", [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [] );
				} );

				it( "should add native values", () => {
					const date:Date = new Date();
					valuesClause.values( "var", [ "val", 10, date ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [
							new LiteralToken( "val" ),
							new LiteralToken( 10 ),
							new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ),
						] );
				} );

			} );

			describe( "When function", () => {

				it( "should not mutate container token", () => {
					valuesClause.values( "var", () => [] );
					expect( container.targetToken.values )
						.toBeUndefined();
				} );

				it( "should return FinishClause object", () => {
					const limitOffsetClause:FinishClause = valuesClause
						.values( "var", () => [] );

					expect( limitOffsetClause ).toEqual( {
						toCompactString: jasmine.any( Function ),
						toPrettyString: jasmine.any( Function ),
						toString: jasmine.any( Function ),
						debug: jasmine.any( Function ),
					} );
				} );


				it( "should add VALUES token", () => {
					valuesClause.values( "var", () => [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values )
						.toEqual( jasmine.any( ValuesToken ) );
				} );

				it( "should add Variable", () => {
					valuesClause.values( "var", () => [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var" ) );
				} );

				it( "should add empty values", () => {
					valuesClause.values( "var", () => [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [] );
				} );

				it( "should provide PatternBuilder", () => {
					const spy:jasmine.Spy = jasmine.createSpy()
						.and.returnValue( [] );

					valuesClause.values( "var", spy );
					expect( spy ).toHaveBeenCalledWith( jasmine.objectContaining<PatternBuilder>( {
						var: jasmine.any( Function ),
						resource: jasmine.any( Function ),

						path: jasmine.any( Function ),

						isBlank: jasmine.any( Function ),
						count: jasmine.any( Function ),

						add: jasmine.any( Function ),
						not: jasmine.any( Function ),
					} ) );
				} );


				it( "should add string value", () => {
					valuesClause.values( "var", () => "val" );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new LiteralToken( "val" ) ] );
				} );

				it( "should add Date value", () => {
					const date:Date = new Date();
					valuesClause.values( "var", () => date );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ) ] );
				} );

				it( "should add string pattern value", () => {
					valuesClause.values( "var", _ => _.literal( "val" ) );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new RDFLiteralToken( "val" ) ] );
				} );

				it( "should add pattern IRI value", () => {
					valuesClause.values( "var", _ => _.resource( "https://example.com/" ) );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new IRIRefToken( "https://example.com/" ) ] );
				} );

				it( "should add pattern Prefixed Name value", () => {
					valuesClause.values( "var", _ => _.resource( "ex:resource/" ) );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new PrefixedNameToken( "ex", "resource/" ) ] );
				} );

				it( "should set prefix used whe Prefixed Name value", () => {
					valuesClause.values( "var", _ => _.resource( "ex:resource/" ) );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.iriResolver.prefixes ).toEqual( new Map( [
						[ "ex", true ],
					] ) )
				} );


				it( "should add multiple values", () => {
					const date:Date = new Date();
					valuesClause.values( "var", _ => [
						"val",
						10,
						date,
						_.literal( "val" ),
						_.resource( "https://example.com/" ),
						_.resource( "ex:resource/" )
					] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [
							new LiteralToken( "val" ),
							new LiteralToken( 10 ),
							new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ),
							new RDFLiteralToken( "val" ),
							new IRIRefToken( "https://example.com/" ),
							new PrefixedNameToken( "ex", "resource/" ),
						] );
				} );

			} );

		} );

		describe( "When multiple variable", () => {

			describe( "When singles values", () => {

				it( "should not mutate container token", () => {
					valuesClause.values( [], [] );
					expect( container.targetToken.values )
						.toBeUndefined();
				} );

				it( "should return FinishClause object", () => {
					const limitOffsetClause:FinishClause = valuesClause
						.values( [], [] );

					expect( limitOffsetClause ).toEqual( {
						toCompactString: jasmine.any( Function ),
						toPrettyString: jasmine.any( Function ),
						toString: jasmine.any( Function ),
						debug: jasmine.any( Function ),
					} );
				} );


				it( "should add VALUES token", () => {
					valuesClause.values( [], [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values )
						.toEqual( jasmine.any( ValuesToken ) );
				} );

				it( "should add empty variables", () => {
					valuesClause.values( [], [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toEqual( [] );
				} );

				it( "should add variables", () => {
					valuesClause.values( [ "var1", "var2" ], [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var1" ) );
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var2" ) );
				} );


				it( "should add empty values", () => {
					valuesClause.values( [], [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toEqual( [ [] ] );
				} );

				it( "should add native values", () => {
					valuesClause.values( [ "var1", "var2" ], [ "val1", 10 ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [
							new LiteralToken( "val1" ),
							new LiteralToken( 10 ),
						] );
				} );

			} );

			describe( "When multiple values", () => {

				it( "should not mutate container token", () => {
					valuesClause.values( [], [ [] ] );
					expect( container.targetToken.values )
						.toBeUndefined();
				} );

				it( "should return FinishClause object", () => {
					const limitOffsetClause:FinishClause = valuesClause
						.values( [], [ [] ] );

					expect( limitOffsetClause ).toEqual( {
						toCompactString: jasmine.any( Function ),
						toPrettyString: jasmine.any( Function ),
						toString: jasmine.any( Function ),
						debug: jasmine.any( Function ),
					} );
				} );


				it( "should add VALUES token", () => {
					valuesClause.values( [], [ [] ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values )
						.toEqual( jasmine.any( ValuesToken ) );
				} );

				it( "should add empty variables", () => {
					valuesClause.values( [], [ [] ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toEqual( [] );
				} );

				it( "should add variables", () => {
					valuesClause.values( [ "var1", "var2" ], [ [] ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var1" ) );
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var2" ) );
				} );


				it( "should add empty values", () => {
					valuesClause.values( [ "var" ], [ [] ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [] );
				} );

				it( "should add native values", () => {
					valuesClause.values( [ "var1", "var2" ], [ [ "val1" ], [ 10 ] ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new LiteralToken( "val1" ) ] );
					expect( newContainer.targetToken.values!.values )
						.toContain( [ new LiteralToken( 10 ) ] );
				} );

			} );

			describe( "When function", () => {

				it( "should not mutate container token", () => {
					valuesClause.values( [ "var" ], () => [] );
					expect( container.targetToken.values )
						.toBeUndefined();
				} );

				it( "should return FinishClause object", () => {
					const limitOffsetClause:FinishClause = valuesClause
						.values( [ "var" ], () => [] );

					expect( limitOffsetClause ).toEqual( {
						toCompactString: jasmine.any( Function ),
						toPrettyString: jasmine.any( Function ),
						toString: jasmine.any( Function ),
						debug: jasmine.any( Function ),
					} );
				} );


				it( "should add VALUES token", () => {
					valuesClause.values( [ "var" ], () => [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values )
						.toEqual( jasmine.any( ValuesToken ) );
				} );

				it( "should add empty variables", () => {
					valuesClause.values( [], () => [ [] ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toEqual( [] );
				} );

				it( "should add variables", () => {
					valuesClause.values( [ "var1", "var2" ], () => [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var1" ) );
					expect( newContainer.targetToken.values!.variables )
						.toContain( new VariableToken( "var2" ) );
				} );


				it( "should provide PatternBuilder", () => {
					const spy:jasmine.Spy = jasmine.createSpy()
						.and.returnValue( [] );

					valuesClause.values( [ "var" ], spy );
					expect( spy ).toHaveBeenCalledWith( jasmine.objectContaining<PatternBuilder>( {
						var: jasmine.any( Function ),
						resource: jasmine.any( Function ),

						path: jasmine.any( Function ),

						isBlank: jasmine.any( Function ),
						count: jasmine.any( Function ),

						add: jasmine.any( Function ),
						not: jasmine.any( Function ),
					} ) );
				} );


				it( "should add empty single values", () => {
					valuesClause.values( [], () => [] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toEqual( [ [] ] );
				} );

				it( "should add empty multiple values", () => {
					valuesClause.values( [ "var1", "var2" ], () => [ [], [] ] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toEqual( [ [], [] ] );
				} );

				it( "should add single values", () => {
					valuesClause.values( [ "var1", "var2", "var3" ], _ => [
						"val1",
						10,
						_.resource( "https://example.com/" )
					] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [
							new LiteralToken( "val1" ),
							new LiteralToken( 10 ),
							new IRIRefToken( "https://example.com/" ),
						] );
				} );

				it( "should add multiple values", () => {
					const date:Date = new Date();
					valuesClause.values( [ "var1", "var2" ], _ => [
						[ "val1", _.literal( "val2" ), ],
						[ 10, date, ],
						[ _.resource( "https://example.com/" ), _.resource( "ex:resource/" ) ],
					] );

					const newContainer:Container<QueryToken> = spyContainers.getFirst();
					expect( newContainer.targetToken.values!.values )
						.toContain( [
							new LiteralToken( "val1" ),
							new RDFLiteralToken( "val2" ),
						] );
					expect( newContainer.targetToken.values!.values )
						.toContain( [
							new LiteralToken( 10 ),
							new RDFLiteralToken( date.toISOString(), new IRIRefToken( XSD.dateTime ) ),
						] );
					expect( newContainer.targetToken.values!.values )
						.toContain( [
							new IRIRefToken( "https://example.com/" ),
							new PrefixedNameToken( "ex", "resource/" ),
						] );
				} );

			} );

		} );

	} );

} );
