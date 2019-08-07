import { spyContainers } from "../../../test/spies/clones";

import { Container } from "../../data/Container";
import { IRIResolver } from "../../data/IRIResolver";

import { IRIRefToken } from "../../tokens/IRIRefToken";
import { LanguageToken } from "../../tokens/LanguageToken";
import { RDFLiteralToken } from "../../tokens/RDFLiteralToken";

import { XSD } from "../../utils/XSD";

import { RDFLiteral } from "./RDFLiteral";


describe( "RDFLiteral", () => {

	it( "should exists", () => {
		expect( RDFLiteral ).toBeDefined();
		expect( RDFLiteral ).toEqual( jasmine.any( Object ) );
	} );

	let container:Container<RDFLiteralToken>;
	beforeEach( () => {
		const vocab:string = "https://example.com/ns#";

		const iriResolver:IRIResolver = new IRIResolver( undefined, vocab );
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver,
			targetToken: new RDFLiteralToken( "value" )
		} );

		spyContainers.install();
	} );

	afterEach( () => {
		spyContainers.uninstall();
	} );


	describe( "RDFLiteral.createFrom", () => {

		it( "should exists", () => {
			expect( RDFLiteral.createFrom ).toBeDefined();
			expect( RDFLiteral.createFrom ).toEqual( jasmine.any( Function ) );
		} );


		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const literal:RDFLiteral = RDFLiteral
				.createFrom( container, myObject );

			expect( myObject ).toBe( literal );
		} );

		it( "should create a RDFLiteral object", () => {
			const literal:RDFLiteral = RDFLiteral
				.createFrom( container, {} );

			expect( literal ).toEqual( {
				withType: jasmine.any( Function ),
				withLanguage: jasmine.any( Function ),

				// Inherit
				getExpression: jasmine.any( Function ),
				getSubject: jasmine.any( Function ),
				has: jasmine.any( Function ),
			} );
		} );

	} );


	describe( "RDFLiteral.withType", () => {

		let literal:RDFLiteral;
		beforeEach( () => {
			literal = RDFLiteral
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( literal.withType ).toBeDefined();
			expect( literal.withType ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return Literal", () => {
			const returned = literal.withType( "string" );

			expect( returned ).toEqual( {
				getExpression: jasmine.any( Function ),
				getSubject: jasmine.any( Function ),
				has: jasmine.any( Function ),
			} );
		} );

		it( "should add relative XSD type", () => {
			literal.withType( "string" );

			const newContainer:Container<RDFLiteralToken> = spyContainers.getLast();
			expect( newContainer.targetToken.type )
				.toEqual( new IRIRefToken( XSD.string ) );
		} );

		it( "should add absolute XSD type", () => {
			literal.withType( XSD.string );

			const newContainer:Container<RDFLiteralToken> = spyContainers.getLast();
			expect( newContainer.targetToken.type )
				.toEqual( new IRIRefToken( XSD.string ) );
		} );

		it( "should add custom type", () => {
			literal.withType( "http://example.com/ns#type" );

			const newContainer:Container<RDFLiteralToken> = spyContainers.getLast();
			expect( newContainer.targetToken.type )
				.toEqual( new IRIRefToken( "http://example.com/ns#type" ) );
		} );

	} );

	describe( "RDFLiteral.withLanguage", () => {

		let literal:RDFLiteral;
		beforeEach( () => {
			literal = RDFLiteral
				.createFrom( container, {} );
		} );

		it( "should exists", () => {
			expect( literal.withLanguage ).toBeDefined();
			expect( literal.withLanguage ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return Literal", () => {
			const returned = literal.withLanguage( "string" );

			expect( returned ).toEqual( {
				getExpression: jasmine.any( Function ),
				getSubject: jasmine.any( Function ),
				has: jasmine.any( Function ),
			} );
		} );

		it( "should add language tag", () => {
			literal.withLanguage( "en" );

			const newContainer:Container<RDFLiteralToken> = spyContainers.getLast();
			expect( newContainer.targetToken.language )
				.toEqual( new LanguageToken( "en" ) );
		} );

	} );

} );
