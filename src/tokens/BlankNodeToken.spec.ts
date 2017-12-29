import * as IRIUtilsModule from "sparqler/iri/utils";

import * as Module from "./BlankNodeToken";
import { BlankNodeToken } from "./BlankNodeToken";

describe( "Module BlankNodeToken", ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( "BlankNodeToken", ():void => {

		it( "should exists", ():void => {
			expect( BlankNodeToken ).toBeDefined();
			expect( BlankNodeToken ).toEqual( jasmine.any( Function ) );
		} );

		it( "should store the provided label", ():void => {
			const token:BlankNodeToken = new BlankNodeToken( "_:label" );

			expect( token ).toBeDefined();
			expect( token.label ).toBe( "_:label" );
		} );

		it( "should not assign label if non is provided", ():void => {
			const token:BlankNodeToken = new BlankNodeToken();
			expect( token ).toBeDefined();
			expect( token.label ).toBeUndefined();
		} );

		it( "should validate is a valid blank node label", ():void => {
			const bNodeCreator = ( label ) => () => new BlankNodeToken( label );

			expect( bNodeCreator( "_:" ) ).toThrowError( "Invalid blank node label." );
			expect( bNodeCreator( "_:-not-start-with" ) ).toThrowError( "Invalid blank node label." );
			expect( bNodeCreator( "_:.not-start-with" ) ).toThrowError( "Invalid blank node label." );
			expect( bNodeCreator( "_:not-end-with." ) ).toThrowError( "Invalid blank node label." );
			expect( bNodeCreator( "_:#invalid-character" ) ).toThrowError( "Invalid blank node label." );
			expect( bNodeCreator( "_:@invalid-character" ) ).toThrowError( "Invalid blank node label." );
			expect( bNodeCreator( "_:invalid-@-character." ) ).toThrowError( "Invalid blank node label." );
			expect( bNodeCreator( "_:invalid-character-@." ) ).toThrowError( "Invalid blank node label." );
		} );

		it( "should assign the `blankNode` as token name", ():void => {
			expect( new BlankNodeToken( "_:label" ).token ).toBe( "blankNode" );
			expect( new BlankNodeToken().token ).toBe( "blankNode" );
		} );

		describe( "BlankNodeToken.toString", ():void => {

			it( "should override toString method", ():void => {
				const token:BlankNodeToken = new BlankNodeToken();

				expect( token.toString ).toBeDefined();
				expect( token.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the label provided", ():void => {
				expect( new BlankNodeToken( "_:label" ).toString() ).toBe( "_:label" );
				expect( new BlankNodeToken( "_:another-label" ).toString() ).toBe( "_:another-label" );
			} );

			it( "should return anon BNode if no label", ():void => {
				expect( new BlankNodeToken().toString() ).toBe( "[]" );
			} );

		} );

	} );

} );
