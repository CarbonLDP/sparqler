import { Container } from "sparqler/data/Container";
import { Factory } from "sparqler/data/Factory";
import { IRIResolver2 } from "sparqler/data/IRIResolver2";
import { TokenNode } from "sparqler/tokens";

describe( "Factory", () => {


	describe( "Factory.createFrom", () => {

		let container:Container<TokenNode>;
		beforeEach( () => {
			container = new Container<TokenNode>( {
				iriResolver: new IRIResolver2(),
				targetToken: { token: "none" },
			} );
		} );

		it( "should apply one factory function", () => {
			const factory1:Factory<Container<TokenNode>, { factory1:boolean }> = ( _container, object ) => Object
				.assign( object, { factory1: true } );

			const factory = Factory.createFrom( factory1 );
			expect( factory ).not.toBe( factory1 );

			const object = {};
			const returned = factory( container, object );

			expect( object ).toBe( returned );
			expect( returned ).toEqual( {
				factory1: true,
			} );
		} );

		it( "should apply two factory function", () => {
			const factory1:Factory<Container<TokenNode>, { factory1:boolean }> = ( _container, object ) => Object
				.assign( object, { factory1: true } );
			const factory2:Factory<Container<TokenNode>, { factory2:boolean }> = ( _container, object ) => Object
				.assign( object, { factory2: true } );

			const factory = Factory.createFrom( factory1, factory2 );
			expect( factory ).not.toBe( factory1 );
			expect( factory ).not.toBe( factory2 );

			const object = {};
			const returned = factory( container, object );

			expect( object ).toBe( returned );
			expect( returned ).toEqual( {
				factory1: true,
				factory2: true,
			} );
		} );

		it( "should apply three factory function", () => {
			const factory1:Factory<Container<TokenNode>, { factory1:boolean }> = ( _container, object ) => Object
				.assign( object, { factory1: true } );
			const factory2:Factory<Container<TokenNode>, { factory2:boolean }> = ( _container, object ) => Object
				.assign( object, { factory2: true } );
			const factory3:Factory<Container<TokenNode>, { factory3:boolean }> = ( _container, object ) => Object
				.assign( object, { factory3: true } );

			const factory = Factory.createFrom( factory1, factory2, factory3 );
			expect( factory ).not.toBe( factory1 );
			expect( factory ).not.toBe( factory2 );
			expect( factory ).not.toBe( factory3 );

			const object = {};
			const returned = factory( container, object );

			expect( object ).toBe( returned );
			expect( returned ).toEqual( {
				factory1: true,
				factory2: true,
				factory3: true,
			} );
		} );

	} );


} );
