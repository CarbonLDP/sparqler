import { QueryToken } from "../tokens/QueryToken";

import { cloneElement } from "./utils";


describe( "cloneElement", () => {

	it( "should exists", ():void => {
		expect( cloneElement ).toBeDefined();
		expect( cloneElement ).toEqual( jasmine.any( Function ) );
	} );


	it( "should clone object provided", () => {
		const object = { the: "object", with: [ "array" ] };
		const returned = cloneElement( object );

		expect( returned ).toEqual( { the: "object", with: [ "array" ] } );
	} );

	it( "should clone with prototype", () => {
		const object = new QueryToken( void 0 );
		const returned = cloneElement( object );

		expect( returned ).toEqual( jasmine.any( QueryToken ) );
	} );

	it( "should return different reference", () => {
		const object = {};
		const returned = cloneElement( object );

		expect( object ).not.toBe( returned );
	} );


	it( "should assign new data to the clone", () => {
		const object = { the: "object", with: "old data" };
		const newData = { with: "new data" };
		const returned = cloneElement( object, newData );

		expect( returned ).toEqual( {
			the: "object",
			with: "new data",
		} );
	} );

	it( "should freeze object returned", () => {
		const object:{ the:"object" } = { the: "object" };
		const returned:{ the:"object", something?:null } = cloneElement( object );

		expect( () => returned.something = null ).toThrowError( /extensible/ );
	} );

} );
