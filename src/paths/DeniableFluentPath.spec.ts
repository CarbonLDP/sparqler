import { spyContainers } from "../../test/spies/FluentPathContainer";

import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";

import { IRIRefToken } from "../tokens/IRIRefToken";
import { PathAlternativeToken } from "../tokens/PathAlternativeToken";
import { PathInNegatedToken } from "../tokens/PathInNegatedToken";
import { PathInverseToken } from "../tokens/PathInverseToken";
import { PathNegatedToken } from "../tokens/PathNegatedToken";
import { PathToken } from "../tokens/PathToken";
import { PrefixedNameToken } from "../tokens/PrefixedNameToken";
import { SharedSubPathToken } from "../tokens/SharedSubPathToken";
import { SubPathInNegatedToken } from "../tokens/SubPathInNegatedToken";

import { DeniableFluentPath } from "./DeniableFluentPath";
import { FluentPath } from "./FluentPath";
import { FluentPathContainer } from "./FluentPathContainer";


describe( "DeniableFluentPath", () => {

	it( "should exists", () => {
		expect( DeniableFluentPath ).toBeDefined();
		expect( DeniableFluentPath ).toEqual( jasmine.any( Object ) );
	} );

	beforeEach( () => {
		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );

	function getContainer<T extends PathToken>( token:T ):FluentPathContainer<T> {
		return new FluentPathContainer( {
			iriResolver: new IRIResolver(),
			targetToken: token,
			fluentPathFactory: FluentPath.createFrom,
			deniableFluentPathFactory: DeniableFluentPath.createFrom,
		} );
	}


	describe( "DeniableFluentPath.createFrom", () => {

		it( "should exists", () => {
			expect( DeniableFluentPath.createFrom ).toBeDefined();
			expect( DeniableFluentPath.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const path:DeniableFluentPath<any> = DeniableFluentPath
				.createFrom( getContainer( "a" ), myObject );

			expect( myObject ).toBe( path );
		} );


		it( "should create a DeniableFluentPath object", () => {
			const path:DeniableFluentPath<any> = DeniableFluentPath
				.createFrom( getContainer( "a" ), {} );

			expect( path ).toEqual( {
				negated: jasmine.any( Function ),

				// Inherit
				subPath: jasmine.any( Function ),

				or: jasmine.any( Function ),

				then: jasmine.any( Function ),

				inverse: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),

				getPath: jasmine.any( Function ),
			} );
		} );

	} );


	function getPath<T extends PathInNegatedToken | SubPathInNegatedToken | PathAlternativeToken<PathInNegatedToken>>( token:T ):DeniableFluentPath<T> {
		return DeniableFluentPath.createFrom( getContainer( token ), {} );
	}


	describe( "DeniableFluentPath.negated", () => {

		it( "should exists", () => {
			const path = getPath( "a" );

			expect( path.negated ).toBeDefined();
			expect( path.negated ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from keyword `a`", () => {
			const path = getPath( "a" )
				.negated();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from IRIRef", () => {
			const path = getPath( new IRIRefToken( "/" ) )
				.negated();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from PrefixedName", () => {
			const path = getPath( new PrefixedNameToken( "ex", "some" ) )
				.negated();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from Alternative", () => {
			const path = getPath( new PathAlternativeToken<"a">() )
				.negated();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from keyword a", () => {
			getPath( "a" )
				.negated();

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( "a" ) );
		} );

		it( "should create Path from IRIRefToken", () => {
			getPath( new IRIRefToken( "/" ) )
				.negated();

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new IRIRefToken( "/" ) ) );
		} );

		it( "should create Path from PrefixedNamed", () => {
			getPath( new PrefixedNameToken( "ex", "some" ) )
				.negated();

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new PrefixedNameToken( "ex", "some" ) ) );
		} );

		it( "should create Path from SubPathToken", () => {
			getPath( new SharedSubPathToken( "a" ) )
				.negated();

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new SharedSubPathToken( "a" ) ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			getPath( new PathInverseToken( "a" ) )
				.negated();

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new PathInverseToken( "a" ) ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			getPath( new PathAlternativeToken<"a">() )
				.negated();

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new SharedSubPathToken( new PathAlternativeToken() ) ) );
		} );

	} );

} );
