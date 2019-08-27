import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";
import { AssigmentToken } from "../tokens/AssigmentToken";
import { BracketedExpressionToken } from "../tokens/BracketedExpressionToken";
import { ExpressionListToken } from "../tokens/ExpressionListToken";
import { FunctionToken } from "../tokens/FunctionToken";

import { GroupToken } from "../tokens/GroupToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";
import { UnaryOperationToken } from "../tokens/UnaryOperationToken";
import { VariableToken } from "../tokens/VariableToken";

import { FinishClause } from "./FinishClause";
import { GroupClause } from "./GroupClause";
import { HavingClause } from "./HavingClause";


describe( "GroupClause", () => {

	it( "should exists", () => {
		expect( GroupClause ).toBeDefined();
		expect( GroupClause ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<QueryToken<SelectToken>>;
	beforeEach( () => {
		const iriResolver:IRIResolver = new IRIResolver();
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new QueryToken( new SelectToken() ),
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "GroupClause.createFrom", () => {

		it( "should exists", () => {
			expect( GroupClause.createFrom ).toBeDefined();
			expect( GroupClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const groupClause:GroupClause<FinishClause> = GroupClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( groupClause );
		} );


		it( "should create a GroupClause object", () => {
			const groupClause:GroupClause<FinishClause> = GroupClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( groupClause ).toEqual( {
				// Self methods
				groupBy: jasmine.any( Function ),

				// Inherited methods
				having: jasmine.any( Function ),

				orderBy: jasmine.any( Function ),

				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "GroupClause.groupBy", () => {

		let groupClause:GroupClause<FinishClause>;
		beforeEach( () => {
			groupClause = GroupClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			groupClause.groupBy( "" );
			expect( container.targetToken.queryClause.modifiers )
				.toEqual( [] );
		} );

		it( "should return a GroupClause & FinishClause object", () => {
			const havingClause:HavingClause<FinishClause> & FinishClause = groupClause
				.groupBy( "" );

			expect( havingClause ).toEqual( {
				orderBy: jasmine.any( Function ),

				having: jasmine.any( Function ),

				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),

				toCompactString: jasmine.any( Function ),
				toPrettyString: jasmine.any( Function ),
				toString: jasmine.any( Function ),
				debug: jasmine.any( Function ),
			} );
		} );


		it( "should add GROUP BY token", () => {
			groupClause.groupBy( "" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( jasmine.any( GroupToken ) );
		} );

		it( "should add GROUP BY token with a Variable", () => {
			groupClause.groupBy( _ => _.var( "foo" ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new GroupToken( [
					new VariableToken( "foo" ),
				] ) );
		} );

		it( "should add GROUP BY token with a Function", () => {
			groupClause.groupBy( _ => _.isIRI( _.var( "foo" ) ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new GroupToken( [
					new FunctionToken(
						"isIRI",
						new ExpressionListToken( [ new VariableToken( "foo" ) ] )
					),
				] ) );
		} );

		it( "should add GROUP BY token with another Expression", () => {
			groupClause.groupBy( _ => _.not( _.var( "foo" ) ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new GroupToken( [
					new BracketedExpressionToken(
						new UnaryOperationToken(
							"!",
							new VariableToken( "foo" )
						)
					),
				] ) );
		} );

		it( "should add GROUP BY token with Assigment", () => {
			groupClause.groupBy( _ => _.not( _.var( "foo" ) ).as( "bar" ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new GroupToken( [
					new AssigmentToken(
						new UnaryOperationToken(
							"!",
							new VariableToken( "foo" )
						),
						new VariableToken( "bar" )
					),
				] ) );
		} );

	} );

} );
