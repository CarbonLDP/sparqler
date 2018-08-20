import { Container } from "../data/Container";
import { IRIResolver } from "../data/IRIResolver";

import { PatternBuilder } from "./PatternBuilder";


describe( "PatternBuilder", ():void => {

	let iriResolver:IRIResolver;
	let container:Container<undefined>;
	beforeEach( () => {
		iriResolver = new IRIResolver();
		iriResolver.prefixes.set( "ex", false );

		container = new Container( {
			iriResolver: iriResolver,
			targetToken: void 0,
		} );
	} );

	it( "should exists", ():void => {
		expect( PatternBuilder ).toBeDefined();
		expect( PatternBuilder ).toEqual( jasmine.any( Object ) );
	} );


	describe( "PatternBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( PatternBuilder.createFrom ).toBeDefined();
			expect( PatternBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:PatternBuilder = PatternBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a PatternBuilder object", () => {
			const finishPattern:PatternBuilder = PatternBuilder
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				resource: jasmine.any( Function ),
				var: jasmine.any( Function ),
				literal: jasmine.any( Function ),

				collection: jasmine.any( Function ),
				blankNode: jasmine.any( Function ),


				undefined: "UNDEF",

				graph: jasmine.any( Function ),
				group: jasmine.any( Function ),
				union: jasmine.any( Function ),
				optional: jasmine.any( Function ),
				minus: jasmine.any( Function ),
				service: jasmine.any( Function ),
				serviceSilent: jasmine.any( Function ),


				filter: jasmine.any( Function ),
				bind: jasmine.any( Function ),
				values: jasmine.any( Function ),
				select: jasmine.any( Function ),
				selectDistinct: jasmine.any( Function ),
				selectReduced: jasmine.any( Function ),
				selectAll: jasmine.any( Function ),
				selectAllDistinct: jasmine.any( Function ),
				selectAllReduced: jasmine.any( Function ),
			} );
		} );

	} );

	describe( "PatternBuilder.create", () => {

		it( "should exists", () => {
			expect( PatternBuilder.create ).toBeDefined();
			expect( PatternBuilder.create ).toEqual( jasmine.any( Function ) );
		} );


		it( "should call .createFrom", () => {
			const spy:jasmine.Spy = spyOn( PatternBuilder, "createFrom" );

			PatternBuilder.create( iriResolver );

			const expectedContainer:Container<undefined> = new Container( {
				iriResolver,
				targetToken: void 0,
			} );
			expect( spy ).toHaveBeenCalledWith( expectedContainer, {} );

		} );

	} );

} );
