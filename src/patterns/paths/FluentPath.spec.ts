import { getFluentPathContainer } from "../../../test/factories/FluentPathContainer";
import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../core/containers/Container";
import { IRIResolver } from "../../core/iri/IRIResolver";

import { IRIRefToken } from "../../tokens/IRIRefToken";
import { IRIToken } from "../../tokens/IRIToken";
import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathInverseToken } from "../../tokens/PathInverseToken";
import { PathModToken } from "../../tokens/PathModToken";
import { PathNegatedToken } from "../../tokens/PathNegatedToken";
import { PathSequenceToken } from "../../tokens/PathSequenceToken";
import { PathToken } from "../../tokens/PathToken";
import { PrefixedNameToken } from "../../tokens/PrefixedNameToken";
import { SharedSubPathToken } from "../../tokens/SharedSubPathToken";
import { SubPathInNegatedToken } from "../../tokens/SubPathInNegatedToken";
import { SubPathToken } from "../../tokens/SubPathToken";

import { Resource } from "../triplePatterns/Resource";
import { FluentPath } from "./FluentPath";
import { Path } from "./Path";


describe( "FluentPath", () => {

	it( "should exists", () => {
		expect( FluentPath ).toBeDefined();
		expect( FluentPath ).toEqual( jasmine.any( Object ) );
	} );

	beforeEach( () => {
		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "FluentPath.createFrom", () => {

		it( "should exists", () => {
			expect( FluentPath.createFrom ).toBeDefined();
			expect( FluentPath.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const path:FluentPath = FluentPath
				.createFrom( getFluentPathContainer( "a" ), myObject );

			expect( myObject ).toBe( path );
		} );


		it( "should create a FluentPath object", () => {
			const path:FluentPath = FluentPath
				.createFrom( getFluentPathContainer( "a" ), {} );

			expect( path ).toEqual( {
				subPath: jasmine.any( Function ),

				or: jasmine.any( Function ),

				then: jasmine.any( Function ),

				inverse: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),

				// Inherit
				getPath: jasmine.any( Function ),
			} );
		} );

	} );


	function createResource( iri:string ):Resource {
		return Resource.createFrom( new Container( {
			iriResolver: new IRIResolver(),
			targetToken: new IRIRefToken( iri ),
		} ), {} );
	}

	function createMockPath<T extends PathToken>( token:T ):Path<T> {
		const pathContainer:Container<T> = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: token,
		} );
		return Path.createFrom( pathContainer, {} );
	}


	function getPath<T extends PathToken>( token:T ):FluentPath<T> {
		return FluentPath.createFrom( getFluentPathContainer( token ), {} );
	}


	describe( "FluentPath.subPath", () => {

		it( "should exists", () => {
			const path = getPath( "a" );

			expect( path.subPath ).toBeDefined();
			expect( path.subPath ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from keyword `a`", () => {
			const path = getPath( "a" )
				.subPath();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from IRIRef", () => {
			const path = getPath( new IRIRefToken( "/" ) )
				.subPath();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from PrefixedName", () => {
			const path = getPath( new PrefixedNameToken( "ex", "some" ) )
				.subPath();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from Mod", () => {
			const path = getPath( new PathModToken( new IRIRefToken( "/" ), "?" ) )
				.subPath();

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
				.subPath();

			const container:Container<SubPathToken<"a">> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SharedSubPathToken( "a" ) );
		} );

		it( "should create Path from IRIRefToken", () => {
			getPath( new IRIRefToken( "/" ) )
				.subPath();

			const container:Container<SubPathToken<IRIToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SharedSubPathToken( new IRIRefToken( "/" ) ) );
		} );

		it( "should create Path from PrefixedNamed", () => {
			getPath( new PrefixedNameToken( "ex", "some" ) )
				.subPath();

			const container:Container<SubPathInNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SharedSubPathToken( new PrefixedNameToken( "ex", "some" ) ) );
		} );

		it( "should create Path from Mod", () => {
			getPath( new PathModToken( new IRIRefToken( "/" ), "?" ) )
				.subPath();

			const container:Container<SubPathToken<PathModToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SharedSubPathToken( new PathModToken( new IRIRefToken( "/" ), "?" ) ) );
		} );

	} );


	describe( "FluentPath.or", () => {

		it( "should exists", () => {
			const path = getPath( "a" );

			expect( path.or ).toBeDefined();
			expect( path.or ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from keyword a adding keyword a", () => {
			const path = getPath( "a" )
				.or( "a" );

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a adding path with IRIRef", () => {
			const path = getPath( "a" )
				.or( createMockPath( new IRIRefToken( "/" ) ) );

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a adding inverse path with IRI", () => {
			const path = getPath( "a" )
				.or( createMockPath( new PathInverseToken( new IRIRefToken( "/" ) ) ) );

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a adding path with Mod", () => {
			const path = getPath( "a" )
				.or( createMockPath( new PathModToken( new IRIRefToken( "/" ), "?" ) ) );

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

		it( "should return path from Alternative with keyword a adding path with Mod", () => {
			const path = getPath( new PathAlternativeToken().addPath( "a" ) )
				.or( createMockPath( new PathModToken( new IRIRefToken( "/" ), "?" ) ) );

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


		it( "should return path from path with Mod adding keyword a ", () => {
			const path = getPath( new PathModToken( new IRIRefToken( "/" ), "?" ) )
				.or( "a" );

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

		it( "should return path from Alternative with Mod adding keyword a ", () => {
			const path = getPath( new PathAlternativeToken().addPath( new PathModToken( new IRIRefToken( "/" ), "?" ) ) )
				.or( "a" );

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

		it( "should return path from path with PathAlternativeToken", () => {
			const path = getPath( "a" )
				.or( createMockPath( new PathAlternativeToken() ) );

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


		it( "should create Path from keyword a adding IRI", () => {
			getPath( "a" )
				.or( "resource/" );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );

		it( "should create Path from keyword a adding Alternative", () => {
			getPath( "a" )
				.or( createMockPath( new PathAlternativeToken() ) );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from Alternative with keyword a adding IRI", () => {
			getPath( new PathAlternativeToken().addPath( "a" ) )
				.or( "resource/" );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );


		it( "should create Path from keyword a adding multiple", () => {
			getPath( "a" )
				.or(
					createResource( "resource/" ),
					"resource/",
					"a",
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
					createMockPath( new PathAlternativeToken() ),
				);

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new PathSequenceToken() )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from keyword a adding array", () => {
			getPath( "a" )
				.or( [
					createResource( "resource/" ),
					"resource/",
					"a",
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
					createMockPath( new PathAlternativeToken() ),
				] );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new PathSequenceToken() )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from keyword a adding multiple array", () => {
			getPath( "a" )
				.or( [
					createResource( "resource/" ),
					"resource/",
					"a",
				], [
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
				], [
					createMockPath( new PathAlternativeToken() ),
				] );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new PathSequenceToken() )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from Alternative with keyword a adding multiple array", () => {
			getPath( new PathAlternativeToken().addPath( "a" ) )
				.or( [
					createResource( "resource/" ),
					"resource/",
					"a",
				], [
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
				], [
					createMockPath( new PathAlternativeToken() ),
				] );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new PathSequenceToken() )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );


		it( "should create Path from keyword a adding chained calls", () => {
			getPath( "a" )
				.or( "resource-1/" )
				.or( "resource-2/" )
				.or( "resource-3/" )
			;

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource-1/" ) )
				.addPath( new IRIRefToken( "resource-2/" ) )
				.addPath( new IRIRefToken( "resource-3/" ) )
			);
		} );

		it( "should create Path from Alternative with keyword a adding chained calls", () => {
			getPath( new PathAlternativeToken().addPath( "a" ) )
				.or( "resource-1/" )
				.or( "resource-2/" )
				.or( "resource-3/" )
			;

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource-1/" ) )
				.addPath( new IRIRefToken( "resource-2/" ) )
				.addPath( new IRIRefToken( "resource-3/" ) )
			);
		} );

	} );

	describe( "FluentPath.then", () => {


		it( "should exists", () => {
			const path = getPath( "a" );

			expect( path.then ).toBeDefined();
			expect( path.then ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from keyword a adding keyword a", () => {
			const path = getPath( "a" )
				.then( "a" );

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

		it( "should return path from keyword a adding path with IRIRef", () => {
			const path = getPath( "a" )
				.then( createMockPath( new IRIRefToken( "/" ) ) );

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

		it( "should return path from keyword a adding inverse path with IRI", () => {
			const path = getPath( "a" )
				.then( createMockPath( new PathInverseToken( new IRIRefToken( "/" ) ) ) );

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

		it( "should return path from keyword a adding path with Mod", () => {
			const path = getPath( "a" )
				.then( createMockPath( new PathModToken( new IRIRefToken( "/" ), "?" ) ) );

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

		it( "should return path from Sequence with keyword a adding path with Mod", () => {
			const path = getPath( new PathSequenceToken().addPath( "a" ) )
				.then( createMockPath( new PathModToken( new IRIRefToken( "/" ), "?" ) ) );

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


		it( "should return path from path with Mod adding keyword a ", () => {
			const path = getPath( new PathModToken( new IRIRefToken( "/" ), "?" ) )
				.then( "a" );

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

		it( "should return path from Sequence with Mod adding keyword a ", () => {
			const path = getPath( new PathSequenceToken().addPath( new PathModToken( new IRIRefToken( "/" ), "?" ) ) )
				.then( "a" );

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

		it( "should return path from path with PathAlternativeToken", () => {
			const path = getPath( "a" )
				.then( createMockPath( new PathAlternativeToken() ) );

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


		it( "should create Path from keyword a adding IRI", () => {
			getPath( "a" )
				.then( "resource/" );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );

		it( "should create Path from keyword a adding Alternative", () => {
			getPath( "a" )
				.then( createMockPath( new PathAlternativeToken() ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from Alternative with keyword a adding IRI", () => {
			getPath( new PathAlternativeToken().addPath( "a" ) )
				.then( "resource/" );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new SharedSubPathToken( new PathAlternativeToken().addPath( "a" ) ) )
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );

		it( "should create Path from Sequence with keyword a adding IRI", () => {
			getPath( new PathSequenceToken().addPath( "a" ) )
				.then( "resource/" );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );


		it( "should create Path from keyword a adding multiple", () => {
			getPath( "a" )
				.then(
					createResource( "resource/" ),
					"resource/",
					"a",
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
					createMockPath( new PathAlternativeToken() ),
				);

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new SharedSubPathToken( new PathSequenceToken() ) )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from keyword a adding array", () => {
			getPath( "a" )
				.then( [
					createResource( "resource/" ),
					"resource/",
					"a",
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
					createMockPath( new PathAlternativeToken() ),
				] );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new SharedSubPathToken( new PathSequenceToken() ) )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from keyword a adding multiple array", () => {
			getPath( "a" )
				.then( [
					createResource( "resource/" ),
					"resource/",
					"a",
				], [
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
				], [
					createMockPath( new PathAlternativeToken() ),
				] );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new SharedSubPathToken( new PathSequenceToken() ) )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from Sequence with keyword a adding multiple array", () => {
			getPath( new PathSequenceToken().addPath( "a" ) )
				.then( [
					createResource( "resource/" ),
					"resource/",
					"a",
				], [
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
				], [
					createMockPath( new PathAlternativeToken() ),
				] );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new SharedSubPathToken( new PathSequenceToken() ) )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from Alternative with keyword a adding multiple array", () => {
			getPath( new PathAlternativeToken().addPath( "a" ) )
				.then( [
					createResource( "resource/" ),
					"resource/",
					"a",
				], [
					createMockPath( new IRIRefToken( "/" ) ),
					createMockPath( new PathNegatedToken( "a" ) ),
					createMockPath( new SharedSubPathToken( "a" ) ),
					createMockPath( new PathModToken( "a", "?" ) ),
					createMockPath( new PathInverseToken( "a" ) ),
					createMockPath( new PathSequenceToken() ),
				], [
					createMockPath( new PathAlternativeToken() ),
				] );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new SharedSubPathToken( new PathAlternativeToken().addPath( "a" ) ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SharedSubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new SharedSubPathToken( new PathSequenceToken() ) )
				.addPath( new SharedSubPathToken( new PathAlternativeToken() ) )
			);
		} );


		it( "should create Path from keyword a adding chained calls", () => {
			getPath( "a" )
				.then( "resource-1/" )
				.then( "resource-2/" )
				.then( "resource-3/" )
			;

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource-1/" ) )
				.addPath( new IRIRefToken( "resource-2/" ) )
				.addPath( new IRIRefToken( "resource-3/" ) )
			);
		} );

		it( "should create Path from Sequence with keyword a adding chained calls", () => {
			getPath( new PathSequenceToken().addPath( "a" ) )
				.then( "resource-1/" )
				.then( "resource-2/" )
				.then( "resource-3/" )
			;

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( "a" )
				.addPath( new IRIRefToken( "resource-1/" ) )
				.addPath( new IRIRefToken( "resource-2/" ) )
				.addPath( new IRIRefToken( "resource-3/" ) )
			);
		} );

	} );


	describe( "FluentPath.inverse", () => {

		it( "should exists", () => {
			const path = getPath( "a" );

			expect( path.inverse ).toBeDefined();
			expect( path.inverse ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from keyword `a`", () => {
			const path = getPath( "a" )
				.inverse();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from IRIRef", () => {
			const path = getPath( new IRIRefToken( "/" ) )
				.inverse();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from PrefixedName", () => {
			const path = getPath( new PrefixedNameToken( "ex", "some" ) )
				.inverse();

			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),

				subPath: jasmine.any( Function ),
				or: jasmine.any( Function ),
				then: jasmine.any( Function ),
				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),
				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

		it( "should return path from Alternative", () => {
			const path = getPath( new PathAlternativeToken() )
				.inverse();

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
				.inverse();

			const container:Container<PathInverseToken<"a">> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( "a" ) );
		} );

		it( "should create Path from IRIRefToken", () => {
			getPath( new IRIRefToken( "/" ) )
				.inverse();

			const container:Container<PathInverseToken<IRIToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new IRIRefToken( "/" ) ) );
		} );

		it( "should create Path from PrefixedNamed", () => {
			getPath( new PrefixedNameToken( "ex", "some" ) )
				.inverse();

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new PrefixedNameToken( "ex", "some" ) ) );
		} );

		it( "should create Path from Mod", () => {
			getPath( new PathModToken( new IRIRefToken( "/" ), "?" ) )
				.inverse();

			const container:Container<PathInverseToken<PathModToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new PathModToken( new IRIRefToken( "/" ), "?" ) ) );
		} );


		it( "should create Path from PathNegatedToken", () => {
			getPath( new PathNegatedToken( "a" ) )
				.inverse();

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new PathNegatedToken( "a" ) ) );
		} );

		it( "should create Path from SubPathToken", () => {
			getPath( new SharedSubPathToken( "a" ) )
				.inverse();

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new SharedSubPathToken( "a" ) ) );
		} );

		it( "should create Path from PathModToken", () => {
			getPath( new PathModToken( "a", "?" ) )
				.inverse();

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new PathModToken( "a", "?" ) ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			getPath( new PathInverseToken( "a" ) )
				.inverse();

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new SharedSubPathToken( new PathInverseToken( "a" ) ) ) );
		} );

		it( "should create Path from PathSequenceToken", () => {
			getPath( new PathSequenceToken() )
				.inverse();

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new SharedSubPathToken( new PathSequenceToken() ) ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			getPath( new PathAlternativeToken() )
				.inverse();

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new SharedSubPathToken( new PathAlternativeToken() ) ) );
		} );

	} );


	describe( "FluentPath.oneOrNone", () => {

		it( "should exists", () => {
			const path = getPath( "a" );

			expect( path.oneOrNone ).toBeDefined();
			expect( path.oneOrNone ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from keyword a", () => {
			const path = getPath( "a" )
				.oneOrNone();

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

		it( "should return path from path with supported path", () => {
			const path = getPath( new IRIRefToken( "/" ) )
				.oneOrNone();

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

		it( "should return path from path with not supported path", () => {
			const path = getPath( new PathAlternativeToken() )
				.oneOrNone();

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
				.oneOrNone();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( "a", "?" ) );
		} );

		it( "should create Path from IRI", () => {
			getPath( new IRIRefToken( "/" ) )
				.oneOrNone();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "/" ), "?" ) );
		} );

		it( "should create Path from PathNegatedToken", () => {
			getPath( new PathNegatedToken( "a" ) )
				.oneOrNone();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new PathNegatedToken( "a" ), "?" ) );
		} );

		it( "should create Path from SubPathToken", () => {
			getPath( new SharedSubPathToken( "a" ) )
				.oneOrNone();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( "a" ), "?" ) );
		} );

		it( "should create Path from PathModToken", () => {
			getPath( new PathModToken( "a", "?" ) )
				.oneOrNone();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathModToken( "a", "?" ) ), "?" ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			getPath( new PathInverseToken( "a" ) )
				.oneOrNone();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathInverseToken( "a" ) ), "?" ) );
		} );

		it( "should create Path from PathSequenceToken", () => {
			getPath( new PathSequenceToken() )
				.oneOrNone();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathSequenceToken() ), "?" ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			getPath( new PathAlternativeToken() )
				.oneOrNone();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathAlternativeToken() ), "?" ) );
		} );

	} );

	describe( "FluentPath.zeroOrMore", () => {

		it( "should exists", () => {
			const path = getPath( "a" );

			expect( path.zeroOrMore ).toBeDefined();
			expect( path.zeroOrMore ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from keyword a", () => {
			const path = getPath( "a" )
				.zeroOrMore();

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

		it( "should return path from path with supported path", () => {
			const path = getPath( new IRIRefToken( "/" ) )
				.zeroOrMore();

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

		it( "should return path from path with not supported path", () => {
			const path = getPath( new PathAlternativeToken() )
				.zeroOrMore();

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
				.zeroOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( "a", "*" ) );
		} );

		it( "should create Path from IRI", () => {
			getPath( new IRIRefToken( "/" ) )
				.zeroOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "/" ), "*" ) );
		} );

		it( "should create Path from PathNegatedToken", () => {
			getPath( new PathNegatedToken( "a" ) )
				.zeroOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new PathNegatedToken( "a" ), "*" ) );
		} );

		it( "should create Path from SubPathToken", () => {
			getPath( new SharedSubPathToken( "a" ) )
				.zeroOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( "a" ), "*" ) );
		} );

		it( "should create Path from PathModToken", () => {
			getPath( new PathModToken( "a", "?" ) )
				.zeroOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathModToken( "a", "?" ) ), "*" ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			getPath( new PathInverseToken( "a" ) )
				.zeroOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathInverseToken( "a" ) ), "*" ) );
		} );

		it( "should create Path from PathSequenceToken", () => {
			getPath( new PathSequenceToken() )
				.zeroOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathSequenceToken() ), "*" ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			getPath( new PathAlternativeToken() )
				.zeroOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathAlternativeToken() ), "*" ) );
		} );

	} );

	describe( "FluentPath.onceOrMore", () => {

		it( "should exists", () => {
			const path = getPath( "a" );

			expect( path.onceOrMore ).toBeDefined();
			expect( path.onceOrMore ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from keyword a", () => {
			const path = getPath( "a" )
				.onceOrMore();

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

		it( "should return path from path with supported path", () => {
			const path = getPath( new IRIRefToken( "/" ) )
				.onceOrMore();

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

		it( "should return path from path with not supported path", () => {
			const path = getPath( new PathAlternativeToken() )
				.onceOrMore();

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
				.onceOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( "a", "+" ) );
		} );

		it( "should create Path from IRI", () => {
			getPath( new IRIRefToken( "/" ) )
				.onceOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "/" ), "+" ) );
		} );

		it( "should create Path from PathNegatedToken", () => {
			getPath( new PathNegatedToken( "a" ) )
				.onceOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new PathNegatedToken( "a" ), "+" ) );
		} );

		it( "should create Path from SubPathToken", () => {
			getPath( new SharedSubPathToken( "a" ) )
				.onceOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( "a" ), "+" ) );
		} );

		it( "should create Path from PathModToken", () => {
			getPath( new PathModToken( "a", "?" ) )
				.onceOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathModToken( "a", "?" ) ), "+" ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			getPath( new PathInverseToken( "a" ) )
				.onceOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathInverseToken( "a" ) ), "+" ) );
		} );

		it( "should create Path from PathSequenceToken", () => {
			getPath( new PathSequenceToken() )
				.onceOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathSequenceToken() ), "+" ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			getPath( new PathAlternativeToken() )
				.onceOrMore();

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SharedSubPathToken( new PathAlternativeToken() ), "+" ) );
		} );

	} );

} );
