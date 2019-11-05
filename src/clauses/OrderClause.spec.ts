import { spyContainers } from "../../test/spies/clones";

import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { BracketedExpressionToken } from "../tokens/BracketedExpressionToken";
import { ExplicitOrderConditionToken } from "../tokens/ExplicitOrderConditionToken";
import { ExpressionListToken } from "../tokens/ExpressionListToken";
import { FunctionToken } from "../tokens/FunctionToken";
import { OrderToken } from "../tokens/OrderToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";
import { UnaryOperationToken } from "../tokens/UnaryOperationToken";
import { VariableToken } from "../tokens/VariableToken";

import { FinishClause } from "./FinishClause";
import { LimitOffsetClause } from "./LimitOffsetClause";
import { OrderClause } from "./OrderClause";


describe( "OrderClause", () => {

	it( "should exists", () => {
		expect( OrderClause ).toBeDefined();
		expect( OrderClause ).toEqual( jasmine.any( Object ) );
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


	describe( "OrderClause.createFrom", () => {

		it( "should exists", () => {
			expect( OrderClause.createFrom ).toBeDefined();
			expect( OrderClause.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const orderClause:OrderClause<FinishClause> = OrderClause
				.createFrom( FinishClause.createFrom, container, myObject );

			expect( myObject ).toBe( orderClause );
		} );


		it( "should create a OrderClause object", () => {
			const orderClause:OrderClause<FinishClause> = OrderClause
				.createFrom( FinishClause.createFrom, container, {} );

			expect( orderClause ).toEqual( {
				// Self methods
				orderBy: jasmine.any( Function ),

				// Inherited methods
				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "OrderClause.orderBy", () => {

		let orderClause:OrderClause<FinishClause>;
		beforeEach( () => {
			orderClause = OrderClause
				.createFrom( FinishClause.createFrom, container, {} );
		} );

		it( "should not mutate container token", () => {
			orderClause.orderBy( "" );
			expect( container.targetToken.queryClause.modifiers )
				.toEqual( [] );
		} );

		it( "should return a OrderClause & FinishClause object", () => {
			const limitOffsetClause:LimitOffsetClause<FinishClause> & FinishClause = orderClause
				.orderBy( "" );

			expect( limitOffsetClause ).toEqual( {
				limit: jasmine.any( Function ),
				offset: jasmine.any( Function ),

				values: jasmine.any( Function ),

				toCompactString: jasmine.any( Function ),
				toPrettyString: jasmine.any( Function ),
				toString: jasmine.any( Function ),
				debug: jasmine.any( Function ),
			} );
		} );


		it( "should add ORDER BY token", () => {
			orderClause.orderBy( "" );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getLast();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( jasmine.any( OrderToken ) );
		} );

		it( "should add ORDER BY token with a Var", () => {
			orderClause.orderBy( _ => _.var( "foo" ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getFirst();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new OrderToken( [
					new VariableToken( "foo" ),
				] ) );
		} );

		it( "should add ORDER BY token with a Function", () => {
			orderClause.orderBy( _ => _.isIRI( _.var( "foo" ) ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getFirst();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new OrderToken( [
					new FunctionToken(
						"isIRI",
						new ExpressionListToken( [ new VariableToken( "foo" ) ] )
					),
				] ) );
		} );

		it( "should add ORDER BY token with another Expression", () => {
			orderClause.orderBy( _ => _.not( _.var( "foo" ) ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getFirst();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new OrderToken( [
					new BracketedExpressionToken(
						new UnaryOperationToken(
							"!",
							new VariableToken( "foo" )
						)
					),
				] ) );
		} );

		it( "should add ORDER BY token with another explicit order", () => {
			orderClause.orderBy( _ => _.desc( _.var( "foo" ) ) );

			const newContainer:Container<QueryToken<SelectToken>> = spyContainers.getFirst();
			expect( newContainer.targetToken.queryClause.modifiers )
				.toContain( new OrderToken( [
					new ExplicitOrderConditionToken(
						"DESC",
						new BracketedExpressionToken(
							new VariableToken( "foo" )
						)
					),
				] ) );
		} );

	} );

} );
