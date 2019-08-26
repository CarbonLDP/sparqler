import { Container } from "../core/containers/Container";
import { IRIResolver } from "../core/iri/IRIResolver";

import { ExpressionsBuilder } from "./ExpressionsBuilder";


describe( "ExpressionsBuilder", ():void => {

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
		expect( ExpressionsBuilder ).toBeDefined();
		expect( ExpressionsBuilder ).toEqual( jasmine.any( Object ) );
	} );


	describe( "ExpressionsBuilder.createFrom", () => {

		it( "should exists", () => {
			expect( ExpressionsBuilder.createFrom ).toBeDefined();
			expect( ExpressionsBuilder.createFrom ).toEqual( jasmine.any( Function ) );
		} );

		it( "should extend the object provided", () => {
			const myObject:{} = {};
			const finishPattern:ExpressionsBuilder = ExpressionsBuilder
				.createFrom( container, myObject );

			expect( myObject ).toBe( finishPattern );
		} );


		it( "should create a ExpressionsBuilder object", () => {
			const finishPattern:ExpressionsBuilder = ExpressionsBuilder
				.createFrom( container, {} );

			expect( finishPattern ).toEqual( {
				bound: jasmine.any( Function ),
				if: jasmine.any( Function ),
				coalesce: jasmine.any( Function ),
				exists: jasmine.any( Function ),
				notExists: jasmine.any( Function ),
				sameTerm: jasmine.any( Function ),
				isIRI: jasmine.any( Function ),
				isURI: jasmine.any( Function ),
				isBlank: jasmine.any( Function ),
				isLiteral: jasmine.any( Function ),
				isNumeric: jasmine.any( Function ),
				str: jasmine.any( Function ),
				lang: jasmine.any( Function ),
				datatype: jasmine.any( Function ),
				iri: jasmine.any( Function ),
				uri: jasmine.any( Function ),
				bnode: jasmine.any( Function ),
				strDT: jasmine.any( Function ),
				strLang: jasmine.any( Function ),
				uuid: jasmine.any( Function ),
				strUUID: jasmine.any( Function ),
				strLen: jasmine.any( Function ),
				substr: jasmine.any( Function ),
				uCase: jasmine.any( Function ),
				lCase: jasmine.any( Function ),
				strStarts: jasmine.any( Function ),
				strEnds: jasmine.any( Function ),
				contains: jasmine.any( Function ),
				strBefore: jasmine.any( Function ),
				strAfter: jasmine.any( Function ),
				encodeForUri: jasmine.any( Function ),
				concat: jasmine.any( Function ),
				langMatches: jasmine.any( Function ),
				regex: jasmine.any( Function ),
				replace: jasmine.any( Function ),
				abs: jasmine.any( Function ),
				round: jasmine.any( Function ),
				ceil: jasmine.any( Function ),
				floor: jasmine.any( Function ),
				rand: jasmine.any( Function ),
				now: jasmine.any( Function ),
				year: jasmine.any( Function ),
				month: jasmine.any( Function ),
				day: jasmine.any( Function ),
				hours: jasmine.any( Function ),
				minutes: jasmine.any( Function ),
				seconds: jasmine.any( Function ),
				timezone: jasmine.any( Function ),
				tz: jasmine.any( Function ),
				md5: jasmine.any( Function ),
				sha1: jasmine.any( Function ),
				sha256: jasmine.any( Function ),
				sha384: jasmine.any( Function ),
				sha512: jasmine.any( Function ),
				custom: jasmine.any( Function ),
				customDistinct: jasmine.any( Function ),
				count: jasmine.any( Function ),
				countDistinct: jasmine.any( Function ),
				countAll: jasmine.any( Function ),
				countAllDistinct: jasmine.any( Function ),
				sum: jasmine.any( Function ),
				sumDistinct: jasmine.any( Function ),
				avg: jasmine.any( Function ),
				avgDistinct: jasmine.any( Function ),
				min: jasmine.any( Function ),
				minDistinct: jasmine.any( Function ),
				max: jasmine.any( Function ),
				maxDistinct: jasmine.any( Function ),
				groupConcat: jasmine.any( Function ),
				groupConcatDistinct: jasmine.any( Function ),
				sample: jasmine.any( Function ),
				sampleDistinct: jasmine.any( Function ),

				or: jasmine.any( Function ),
				and: jasmine.any( Function ),
				equals: jasmine.any( Function ),
				notEquals: jasmine.any( Function ),
				lt: jasmine.any( Function ),
				lte: jasmine.any( Function ),
				gt: jasmine.any( Function ),
				gte: jasmine.any( Function ),
				add: jasmine.any( Function ),
				in: jasmine.any( Function ),
				notIn: jasmine.any( Function ),
				subtract: jasmine.any( Function ),
				multiply: jasmine.any( Function ),
				divide: jasmine.any( Function ),
				not: jasmine.any( Function ),
				plus: jasmine.any( Function ),
				minus: jasmine.any( Function ),
			} );
		} );

	} );

} );
