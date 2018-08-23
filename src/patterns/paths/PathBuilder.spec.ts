import { spyContainers } from "../../../test/spies/Container";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { IRIRefToken } from "../../tokens/IRIRefToken";
import { IRIToken } from "../../tokens/IRIToken";
import { PathAlternativeToken } from "../../tokens/PathAlternativeToken";
import { PathInverseToken } from "../../tokens/PathInverseToken";
import { PathModToken } from "../../tokens/PathModToken";
import { PathNegatedToken } from "../../tokens/PathNegatedToken";
import { PathSequenceToken } from "../../tokens/PathSequenceToken";
import { PathToken } from "../../tokens/PathToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { SubPathToken } from "../../tokens/SubPathToken";

import { Resource } from "../triplePatterns/Resource";
import { TripleSubject } from "../triplePatterns/TripleSubject";

import { Path } from "./Path";
import { PathBuilder } from "./PathBuilder";


describe( "PathBuilder", () => {

	it( "should exists", () => {
		expect( PathBuilder ).toBeDefined();
		expect( PathBuilder ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<undefined>;
	beforeEach( () => {
		container = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: void 0,
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "PathBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( PathBuilder.createFrom ).toBeDefined();
			expect( PathBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const builder:PathBuilder = PathBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( builder );
		} );


		it( "should create a PathBuilder object", () => {
			const builder:PathBuilder = PathBuilder
				.createFrom( container, {} );

			expect( builder ).toEqual( {
				path: jasmine.any( Function ),
				subPath: jasmine.any( Function ),

				alternative: jasmine.any( Function ),
				sequence: jasmine.any( Function ),

				inverse: jasmine.any( Function ),
				negated: jasmine.any( Function ),

				oneOrNone: jasmine.any( Function ),
				zeroOrMore: jasmine.any( Function ),
				onceOrMore: jasmine.any( Function ),
			} );
		} );

	} );


	function createResource( iri:string ):Resource {
		return TripleSubject.createFrom( new Container( {
			iriResolver: container.iriResolver,
			targetToken: new SubjectToken( new IRIRefToken( iri ) ),
		} ), {} );
	}

	function createMockPath<T extends PathToken>( token:T ):Path<T> {
		const pathContainer:Container<T> = new Container( {
			iriResolver: container.iriResolver,
			targetToken: token,
		} );
		return Path.createFrom( pathContainer, {} );
	}


	describe( "PathBuilder.path", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.path ).toBeDefined();
			expect( builder.path ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.path( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.path( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.path( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.path( createResource( "resource/" ) );

			const container:Container<IRIToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new IRIRefToken( "resource/" ) );
		} );

		it( "should create Path from string IRIToken", () => {
			builder.path( "resource/" );

			const container:Container<IRIToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new IRIRefToken( "resource/" ) );
		} );

		it( "should create Path from keyword a", () => {
			builder.path( "a" );

			const container:Container<"a"> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( "a" );
		} );

	} );

	describe( "PathBuilder.subPath", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.subPath ).toBeDefined();
			expect( builder.subPath ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.subPath( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.subPath( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.subPath( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path", () => {
			const path = builder.subPath( createMockPath( new IRIRefToken( "/" ) ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from empty", () => {
			const path = builder.subPath();
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.subPath( createResource( "resource/" ) );

			const container:Container<SubPathToken<IRIToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SubPathToken( new IRIRefToken( "resource/" ) ) );
		} );

		it( "should create Path from string IRIToken", () => {
			builder.subPath( "resource/" );

			const container:Container<SubPathToken<IRIToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SubPathToken( new IRIRefToken( "resource/" ) ) );
		} );

		it( "should create Path from keyword a", () => {
			builder.subPath( "a" );

			const container:Container<SubPathToken<"a">> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SubPathToken( "a" ) );
		} );

		it( "should create Path from Path", () => {
			builder.subPath( createMockPath( new IRIRefToken( "/" ) ) );

			const container:Container<SubPathToken<IRIRefToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SubPathToken( new IRIRefToken( "/" ) ) );
		} );

		it( "should create Path from empty", () => {
			builder.subPath();

			const container:Container<SubPathToken<undefined>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new SubPathToken( void 0 ) );
		} );

	} );


	describe( "PathBuilder.alternative", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.alternative ).toBeDefined();
			expect( builder.alternative ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.alternative( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.alternative( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.alternative( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with PathInAlternativeToken", () => {
			const path = builder.alternative( createMockPath( new IRIRefToken( "/" ) ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with PathAlternativeToken", () => {
			const path = builder.alternative( createMockPath( new PathAlternativeToken() ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.alternative( createResource( "resource/" ) );

			const container:Container<PathAlternativeToken<IRIToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken<IRIToken>()
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );

		it( "should create Path from string IRIToken", () => {
			builder.alternative( "resource/" );

			const container:Container<PathAlternativeToken<IRIToken>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken<IRIToken>()
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );

		it( "should create Path from keyword a", () => {
			builder.alternative( "a" );

			const container:Container<PathAlternativeToken<"a">> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken<"a">()
				.addPath( "a" )
			);
		} );

		it( "should create Path from Path", () => {
			builder.alternative( createMockPath( new IRIRefToken( "/" ) ) );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new IRIRefToken( "/" ) )
			);
		} );

		it( "should create Path from PathNegatedToken", () => {
			builder.alternative( createMockPath( new PathNegatedToken( "a" ) ) );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new PathNegatedToken( "a" ) )
			);
		} );

		it( "should create Path from SubPathToken", () => {
			builder.alternative( createMockPath( new SubPathToken( "a" ) ) );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new SubPathToken( "a" ) )
			);
		} );

		it( "should create Path from PathModToken", () => {
			builder.alternative( createMockPath( new PathModToken( "a", "?" ) ) );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new PathModToken( "a", "?" ) )
			);
		} );

		it( "should create Path from PathInverseToken", () => {
			builder.alternative( createMockPath( new PathInverseToken( "a" ) ) );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new PathInverseToken( "a" ) )
			);
		} );

		it( "should create Path from PathSequenceToken", () => {
			builder.alternative( createMockPath( new PathSequenceToken() ) );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new PathSequenceToken() )
			);
		} );

		it( "should create Path from PathAlternativeToken", () => {
			builder.alternative( createMockPath( new PathAlternativeToken() ) );

			const container:Container<PathAlternativeToken<SubPathToken<PathAlternativeToken>>> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken<SubPathToken<PathAlternativeToken>>()
				.addPath( new SubPathToken( new PathAlternativeToken() ) )
			);
		} );


		it( "should create Path from multiple", () => {
			builder.alternative(
				createResource( "resource/" ),
				"resource/",
				"a",
				createMockPath( new IRIRefToken( "/" ) ),
				createMockPath( new PathNegatedToken( "a" ) ),
				createMockPath( new SubPathToken( "a" ) ),
				createMockPath( new PathModToken( "a", "?" ) ),
				createMockPath( new PathInverseToken( "a" ) ),
				createMockPath( new PathSequenceToken() ),
				createMockPath( new PathAlternativeToken() ),
			);

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new PathSequenceToken() )
				.addPath( new SubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from array", () => {
			builder.alternative( [
				createResource( "resource/" ),
				"resource/",
				"a",
				createMockPath( new IRIRefToken( "/" ) ),
				createMockPath( new PathNegatedToken( "a" ) ),
				createMockPath( new SubPathToken( "a" ) ),
				createMockPath( new PathModToken( "a", "?" ) ),
				createMockPath( new PathInverseToken( "a" ) ),
				createMockPath( new PathSequenceToken() ),
				createMockPath( new PathAlternativeToken() ),
			] );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new PathSequenceToken() )
				.addPath( new SubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from multiple array", () => {
			builder.alternative( [
				createResource( "resource/" ),
				"resource/",
				"a",
			], [
				createMockPath( new IRIRefToken( "/" ) ),
				createMockPath( new PathNegatedToken( "a" ) ),
				createMockPath( new SubPathToken( "a" ) ),
				createMockPath( new PathModToken( "a", "?" ) ),
				createMockPath( new PathInverseToken( "a" ) ),
				createMockPath( new PathSequenceToken() ),
			], [
				createMockPath( new PathAlternativeToken() ),
			] );

			const container:Container<PathAlternativeToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathAlternativeToken()
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new PathSequenceToken() )
				.addPath( new SubPathToken( new PathAlternativeToken() ) )
			);
		} );

	} );

	describe( "PathBuilder.sequence", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.sequence ).toBeDefined();
			expect( builder.sequence ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.sequence( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.sequence( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.sequence( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with supported path", () => {
			const path = builder.sequence( createMockPath( new IRIRefToken( "/" ) ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with not supported path", () => {
			const path = builder.sequence( createMockPath( new PathAlternativeToken() ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.sequence( createResource( "resource/" ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );

		it( "should create Path from string IRIToken", () => {
			builder.sequence( "resource/" );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new IRIRefToken( "resource/" ) )
			);
		} );

		it( "should create Path from keyword a", () => {
			builder.sequence( "a" );

			const container:Container<PathSequenceToken<"a">> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken<"a">()
				.addPath( "a" )
			);
		} );

		it( "should create Path from Path", () => {
			builder.sequence( createMockPath( new IRIRefToken( "/" ) ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new IRIRefToken( "/" ) )
			);
		} );

		it( "should create Path from PathNegatedToken", () => {
			builder.sequence( createMockPath( new PathNegatedToken( "a" ) ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new PathNegatedToken( "a" ) )
			);
		} );

		it( "should create Path from SubPathToken", () => {
			builder.sequence( createMockPath( new SubPathToken( "a" ) ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new SubPathToken( "a" ) )
			);
		} );

		it( "should create Path from PathModToken", () => {
			builder.sequence( createMockPath( new PathModToken( "a", "?" ) ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new PathModToken( "a", "?" ) )
			);
		} );

		it( "should create Path from PathInverseToken", () => {
			builder.sequence( createMockPath( new PathInverseToken( "a" ) ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new PathInverseToken( "a" ) )
			);
		} );

		it( "should create Path from PathSequenceToken", () => {
			builder.sequence( createMockPath( new PathSequenceToken() ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new SubPathToken( new PathSequenceToken() ) )
			);
		} );

		it( "should create Path from PathAlternativeToken", () => {
			builder.sequence( createMockPath( new PathAlternativeToken() ) );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new SubPathToken( new PathAlternativeToken() ) )
			);
		} );


		it( "should create Path from multiple", () => {
			builder.sequence(
				createResource( "resource/" ),
				"resource/",
				"a",
				createMockPath( new IRIRefToken( "/" ) ),
				createMockPath( new PathNegatedToken( "a" ) ),
				createMockPath( new SubPathToken( "a" ) ),
				createMockPath( new PathModToken( "a", "?" ) ),
				createMockPath( new PathInverseToken( "a" ) ),
				createMockPath( new PathSequenceToken() ),
				createMockPath( new PathAlternativeToken() ),
			);

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new SubPathToken( new PathSequenceToken() ) )
				.addPath( new SubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from array", () => {
			builder.sequence( [
				createResource( "resource/" ),
				"resource/",
				"a",
				createMockPath( new IRIRefToken( "/" ) ),
				createMockPath( new PathNegatedToken( "a" ) ),
				createMockPath( new SubPathToken( "a" ) ),
				createMockPath( new PathModToken( "a", "?" ) ),
				createMockPath( new PathInverseToken( "a" ) ),
				createMockPath( new PathSequenceToken() ),
				createMockPath( new PathAlternativeToken() ),
			] );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new SubPathToken( new PathSequenceToken() ) )
				.addPath( new SubPathToken( new PathAlternativeToken() ) )
			);
		} );

		it( "should create Path from multiple array", () => {
			builder.sequence( [
				createResource( "resource/" ),
				"resource/",
				"a",
			], [
				createMockPath( new IRIRefToken( "/" ) ),
				createMockPath( new PathNegatedToken( "a" ) ),
				createMockPath( new SubPathToken( "a" ) ),
				createMockPath( new PathModToken( "a", "?" ) ),
				createMockPath( new PathInverseToken( "a" ) ),
				createMockPath( new PathSequenceToken() ),
			], [
				createMockPath( new PathAlternativeToken() ),
			] );

			const container:Container<PathSequenceToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathSequenceToken()
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( new IRIRefToken( "resource/" ) )
				.addPath( "a" )
				.addPath( new IRIRefToken( "/" ) )
				.addPath( new PathNegatedToken( "a" ) )
				.addPath( new SubPathToken( "a" ) )
				.addPath( new PathModToken( "a", "?" ) )
				.addPath( new PathInverseToken( "a" ) )
				.addPath( new SubPathToken( new PathSequenceToken() ) )
				.addPath( new SubPathToken( new PathAlternativeToken() ) )
			);
		} );

	} );


	describe( "PathBuilder.inverse", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.inverse ).toBeDefined();
			expect( builder.inverse ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.inverse( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.inverse( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.inverse( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with supported path", () => {
			const path = builder.inverse( createMockPath( new IRIRefToken( "/" ) ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with not supported path", () => {
			const path = builder.inverse( createMockPath( new PathAlternativeToken() ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.inverse( createResource( "resource/" ) );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new IRIRefToken( "resource/" ) ) );
		} );

		it( "should create Path from string IRIToken", () => {
			builder.inverse( "resource/" );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new IRIRefToken( "resource/" ) ) );
		} );

		it( "should create Path from keyword a", () => {
			builder.inverse( "a" );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( "a" ) );
		} );

		it( "should create Path from Path", () => {
			builder.inverse( createMockPath( new IRIRefToken( "/" ) ) );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new IRIRefToken( "/" ) ) );
		} );

		it( "should create Path from PathNegatedToken", () => {
			builder.inverse( createMockPath( new PathNegatedToken( "a" ) ) );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new PathNegatedToken( "a" ) ) );
		} );

		it( "should create Path from SubPathToken", () => {
			builder.inverse( createMockPath( new SubPathToken( "a" ) ) );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new SubPathToken( "a" ) ) );
		} );

		it( "should create Path from PathModToken", () => {
			builder.inverse( createMockPath( new PathModToken( "a", "?" ) ) );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new PathModToken( "a", "?" ) ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			builder.inverse( createMockPath( new PathInverseToken( "a" ) ) );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new SubPathToken( new PathInverseToken( "a" ) ) ) );
		} );

		it( "should create Path from PathSequenceToken", () => {
			builder.inverse( createMockPath( new PathSequenceToken() ) );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new SubPathToken( new PathSequenceToken() ) ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			builder.inverse( createMockPath( new PathAlternativeToken() ) );

			const container:Container<PathInverseToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathInverseToken( new SubPathToken( new PathAlternativeToken() ) ) );
		} );

	} );

	describe( "PathBuilder.negated", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.negated ).toBeDefined();
			expect( builder.negated ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.negated( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.negated( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.negated( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with supported path", () => {
			const path = builder.negated( createMockPath( new IRIRefToken( "/" ) ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with not supported path", () => {
			const path = builder.negated( createMockPath( new PathAlternativeToken<IRIToken>() ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.negated( createResource( "resource/" ) );

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new IRIRefToken( "resource/" ) ) );
		} );

		it( "should create Path from string IRIToken", () => {
			builder.negated( "resource/" );

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new IRIRefToken( "resource/" ) ) );
		} );

		it( "should create Path from keyword a", () => {
			builder.negated( "a" );

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( "a" ) );
		} );

		it( "should create Path from Path", () => {
			builder.negated( createMockPath( new IRIRefToken( "/" ) ) );

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new IRIRefToken( "/" ) ) );
		} );

		it( "should create Path from SubPathToken", () => {
			builder.negated( createMockPath( new SubPathToken( "a" ) ) );

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new SubPathToken( "a" ) ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			builder.negated( createMockPath( new PathInverseToken( "a" ) ) );

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new PathInverseToken( "a" ) ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			builder.negated( createMockPath( new PathAlternativeToken<IRIToken>() ) );

			const container:Container<PathNegatedToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathNegatedToken( new SubPathToken( new PathAlternativeToken() ) ) );
		} );

	} );


	describe( "PathBuilder.oneOrNone", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.oneOrNone ).toBeDefined();
			expect( builder.oneOrNone ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.oneOrNone( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.oneOrNone( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.oneOrNone( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with supported path", () => {
			const path = builder.oneOrNone( createMockPath( new IRIRefToken( "/" ) ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with not supported path", () => {
			const path = builder.oneOrNone( createMockPath( new PathAlternativeToken() ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.oneOrNone( createResource( "resource/" ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "resource/" ), "?" ) );
		} );

		it( "should create Path from string IRIToken", () => {
			builder.oneOrNone( "resource/" );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "resource/" ), "?" ) );
		} );

		it( "should create Path from keyword a", () => {
			builder.oneOrNone( "a" );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( "a", "?" ) );
		} );

		it( "should create Path from Path", () => {
			builder.oneOrNone( createMockPath( new IRIRefToken( "/" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "/" ), "?" ) );
		} );

		it( "should create Path from PathNegatedToken", () => {
			builder.oneOrNone( createMockPath( new PathNegatedToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new PathNegatedToken( "a" ), "?" ) );
		} );

		it( "should create Path from SubPathToken", () => {
			builder.oneOrNone( createMockPath( new SubPathToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( "a" ), "?" ) );
		} );

		it( "should create Path from PathModToken", () => {
			builder.oneOrNone( createMockPath( new PathModToken( "a", "?" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathModToken( "a", "?" ) ), "?" ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			builder.oneOrNone( createMockPath( new PathInverseToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathInverseToken( "a" ) ), "?" ) );
		} );

		it( "should create Path from PathSequenceToken", () => {
			builder.oneOrNone( createMockPath( new PathSequenceToken() ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathSequenceToken() ), "?" ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			builder.oneOrNone( createMockPath( new PathAlternativeToken() ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathAlternativeToken() ), "?" ) );
		} );

	} );

	describe( "PathBuilder.zeroOrMore", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.zeroOrMore ).toBeDefined();
			expect( builder.zeroOrMore ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.zeroOrMore( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.zeroOrMore( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.zeroOrMore( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with supported path", () => {
			const path = builder.zeroOrMore( createMockPath( new IRIRefToken( "/" ) ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with not supported path", () => {
			const path = builder.zeroOrMore( createMockPath( new PathAlternativeToken() ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.zeroOrMore( createResource( "resource/" ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "resource/" ), "*" ) );
		} );

		it( "should create Path from string IRIToken", () => {
			builder.zeroOrMore( "resource/" );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "resource/" ), "*" ) );
		} );

		it( "should create Path from keyword a", () => {
			builder.zeroOrMore( "a" );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( "a", "*" ) );
		} );

		it( "should create Path from Path", () => {
			builder.zeroOrMore( createMockPath( new IRIRefToken( "/" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "/" ), "*" ) );
		} );

		it( "should create Path from PathNegatedToken", () => {
			builder.zeroOrMore( createMockPath( new PathNegatedToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new PathNegatedToken( "a" ), "*" ) );
		} );

		it( "should create Path from SubPathToken", () => {
			builder.zeroOrMore( createMockPath( new SubPathToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( "a" ), "*" ) );
		} );

		it( "should create Path from PathModToken", () => {
			builder.zeroOrMore( createMockPath( new PathModToken( "a", "?" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathModToken( "a", "?" ) ), "*" ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			builder.zeroOrMore( createMockPath( new PathInverseToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathInverseToken( "a" ) ), "*" ) );
		} );

		it( "should create Path from PathSequenceToken", () => {
			builder.zeroOrMore( createMockPath( new PathSequenceToken() ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathSequenceToken() ), "*" ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			builder.zeroOrMore( createMockPath( new PathAlternativeToken() ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathAlternativeToken() ), "*" ) );
		} );

	} );

	describe( "PathBuilder.onceOrMore", () => {

		let builder:PathBuilder;
		beforeEach( () => {
			builder = PathBuilder.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( builder.onceOrMore ).toBeDefined();
			expect( builder.onceOrMore ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return path from Resource", () => {
			const path = builder.onceOrMore( createResource( "resource/" ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from property string", () => {
			const path = builder.onceOrMore( "resource/" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from keyword a", () => {
			const path = builder.onceOrMore( "a" );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with supported path", () => {
			const path = builder.onceOrMore( createMockPath( new IRIRefToken( "/" ) ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );

		it( "should return path from path with not supported path", () => {
			const path = builder.onceOrMore( createMockPath( new PathAlternativeToken() ) );
			expect( path ).toEqual( {
				getPath: jasmine.any( Function ),
			} );
		} );


		it( "should create Path from Resource's IRIToken", () => {
			builder.onceOrMore( createResource( "resource/" ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "resource/" ), "+" ) );
		} );

		it( "should create Path from string IRIToken", () => {
			builder.onceOrMore( "resource/" );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "resource/" ), "+" ) );
		} );

		it( "should create Path from keyword a", () => {
			builder.onceOrMore( "a" );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( "a", "+" ) );
		} );

		it( "should create Path from Path", () => {
			builder.onceOrMore( createMockPath( new IRIRefToken( "/" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new IRIRefToken( "/" ), "+" ) );
		} );

		it( "should create Path from PathNegatedToken", () => {
			builder.onceOrMore( createMockPath( new PathNegatedToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new PathNegatedToken( "a" ), "+" ) );
		} );

		it( "should create Path from SubPathToken", () => {
			builder.onceOrMore( createMockPath( new SubPathToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( "a" ), "+" ) );
		} );

		it( "should create Path from PathModToken", () => {
			builder.onceOrMore( createMockPath( new PathModToken( "a", "?" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathModToken( "a", "?" ) ), "+" ) );
		} );

		it( "should create Path from PathInverseToken", () => {
			builder.onceOrMore( createMockPath( new PathInverseToken( "a" ) ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathInverseToken( "a" ) ), "+" ) );
		} );

		it( "should create Path from PathSequenceToken", () => {
			builder.onceOrMore( createMockPath( new PathSequenceToken() ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathSequenceToken() ), "+" ) );
		} );

		it( "should create Path from PathAlternativeToken", () => {
			builder.onceOrMore( createMockPath( new PathAlternativeToken() ) );

			const container:Container<PathModToken> = spyContainers.getLast();
			expect( container.targetToken ).toEqual( new PathModToken( new SubPathToken( new PathAlternativeToken() ), "+" ) );
		} );

	} );

} );
