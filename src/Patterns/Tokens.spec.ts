import * as Tokens from "./Tokens";
import { LeftSymbol } from "../Tokens/LeftSymbol";
import { Operator } from "../Tokens/Operator";
import { RightSymbol } from "../Tokens/RightSymbol";
import { NewLineSymbol } from "../Tokens/NewLineSymbol";
import { Identifier } from "../Tokens/Identifier";

describe( "Module Tokens", ():void => {

	it( "Exists", ():void => {
		expect( Tokens ).toBeDefined();
		expect( Tokens ).toEqual( jasmine.any( Object ) );
	} );

	it( "Tokens.VAR_SYMBOL", ():void => {
		expect( Tokens.VAR_SYMBOL ).toBeDefined();
		expect( Tokens.VAR_SYMBOL[ "value" ] ).toBe( "?" );
		expect( Tokens.VAR_SYMBOL ).toEqual( jasmine.any( LeftSymbol ) );
	} );

	it( "Tokens.PREFIX_SYMBOL", ():void => {
		expect( Tokens.PREFIX_SYMBOL ).toBeDefined();
		expect( Tokens.PREFIX_SYMBOL[ "value"] ).toBe( ":" );
		expect( Tokens.PREFIX_SYMBOL ).toEqual( jasmine.any( Operator ) );
	} );

	it( "Tokens.OFF_TYPE", ():void => {
		expect( Tokens.OFF_TYPE ).toBeDefined();
		expect( Tokens.OFF_TYPE[ "value" ] ).toBe( "^^" );
		expect( Tokens.OFF_TYPE ).toEqual( jasmine.any( Operator ) );
	} );

	it( "Tokens.LANG_SYMBOL", ():void => {
		expect( Tokens.LANG_SYMBOL ).toBeDefined();
		expect( Tokens.LANG_SYMBOL[ "value" ] ).toBe( "@" );
		expect( Tokens.LANG_SYMBOL ).toEqual( jasmine.any( Operator ) );
	} );

	it( "Tokens.OPEN_IRI", ():void => {
		expect( Tokens.OPEN_IRI ).toBeDefined();
		expect( Tokens.OPEN_IRI[ "value" ] ).toBe( "<" );
		expect( Tokens.OPEN_IRI ).toEqual( jasmine.any( LeftSymbol ) );
	} );

	it( "Tokens.CLOSE_IRI", ():void => {
		expect( Tokens.CLOSE_IRI ).toBeDefined();
		expect( Tokens.CLOSE_IRI[ "value" ] ).toBe( ">" );
		expect( Tokens.CLOSE_IRI ).toEqual( jasmine.any( RightSymbol ) );
	} );


	it( "Tokens.OPEN_QUOTE", ():void => {
		expect( Tokens.OPEN_QUOTE ).toBeDefined();
		expect( Tokens.OPEN_QUOTE[ "value" ] ).toBe( "\"" );
		expect( Tokens.OPEN_QUOTE ).toEqual( jasmine.any( LeftSymbol ) );
	} );

	it( "Tokens.CLOSE_QUOTE", ():void => {
		expect( Tokens.CLOSE_QUOTE ).toBeDefined();
		expect( Tokens.CLOSE_QUOTE[ "value" ] ).toBe( "\"" );
		expect( Tokens.CLOSE_QUOTE ).toEqual( jasmine.any( RightSymbol ) );
	} );

	it( "Tokens.GRAPH_PATTERN_SEPARATOR", ():void => {
		expect( Tokens.GRAPH_PATTERN_SEPARATOR ).toBeDefined();
		expect( Tokens.GRAPH_PATTERN_SEPARATOR[ "value" ] ).toBe( "." );
		expect( Tokens.GRAPH_PATTERN_SEPARATOR ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.SAME_SUBJECT_SEPARATOR", ():void => {
		expect( Tokens.SAME_SUBJECT_SEPARATOR ).toBeDefined();
		expect( Tokens.SAME_SUBJECT_SEPARATOR[ "value" ] ).toBe( ";" );
		expect( Tokens.SAME_SUBJECT_SEPARATOR ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.SAME_PROPERTY_SEPARATOR", ():void => {
		expect( Tokens.SAME_PROPERTY_SEPARATOR ).toBeDefined();
		expect( Tokens.SAME_PROPERTY_SEPARATOR[ "value" ] ).toBe( "," );
		expect( Tokens.SAME_PROPERTY_SEPARATOR ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.EMPTY_SEPARATOR", ():void => {
		expect( Tokens.EMPTY_SEPARATOR ).toBeDefined();
		expect( Tokens.EMPTY_SEPARATOR[ "value" ] ).toBe( "" );
		expect( Tokens.EMPTY_SEPARATOR ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.OPEN_MULTI_BLOCK", ():void => {
		expect( Tokens.OPEN_MULTI_BLOCK ).toBeDefined();
		expect( Tokens.OPEN_MULTI_BLOCK[ "value" ] ).toBe( "{" );
		expect( Tokens.OPEN_MULTI_BLOCK ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.CLOSE_MULTI_BLOCK", ():void => {
		expect( Tokens.CLOSE_MULTI_BLOCK ).toBeDefined();
		expect( Tokens.CLOSE_MULTI_BLOCK[ "value" ] ).toBe( "}" );
		expect( Tokens.CLOSE_MULTI_BLOCK ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.OPEN_SINGLE_BLOCK", ():void => {
		expect( Tokens.OPEN_SINGLE_BLOCK ).toBeDefined();
		expect( Tokens.OPEN_SINGLE_BLOCK[ "value" ] ).toBe( "{" );
		expect( Tokens.OPEN_SINGLE_BLOCK ).toEqual( jasmine.any( LeftSymbol ) );
	} );

	it( "Tokens.CLOSE_SINGLE_BLOCK", ():void => {
		expect( Tokens.CLOSE_SINGLE_BLOCK ).toBeDefined();
		expect( Tokens.CLOSE_SINGLE_BLOCK[ "value" ] ).toBe( "}" );
		expect( Tokens.CLOSE_SINGLE_BLOCK ).toEqual( jasmine.any( RightSymbol ) );
	} );

	it( "Tokens.OPEN_MULTI_BN", ():void => {
		expect( Tokens.OPEN_MULTI_BN ).toBeDefined();
		expect( Tokens.OPEN_MULTI_BN[ "value" ] ).toBe( "[" );
		expect( Tokens.OPEN_MULTI_BN ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.CLOSE_MULTI_BN", ():void => {
		expect( Tokens.CLOSE_MULTI_BN ).toBeDefined();
		expect( Tokens.CLOSE_MULTI_BN[ "value" ] ).toBe( "]" );
		expect( Tokens.CLOSE_MULTI_BN ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.OPEN_SINGLE_BN", ():void => {
		expect( Tokens.OPEN_SINGLE_BN ).toBeDefined();
		expect( Tokens.OPEN_SINGLE_BN[ "value" ] ).toBe( "[" );
		expect( Tokens.OPEN_SINGLE_BN ).toEqual( jasmine.any( LeftSymbol ) );
	} );

	it( "Tokens.CLOSE_SINGLE_BN", ():void => {
		expect( Tokens.CLOSE_SINGLE_BN ).toBeDefined();
		expect( Tokens.CLOSE_SINGLE_BN[ "value" ] ).toBe( "]" );
		expect( Tokens.CLOSE_SINGLE_BN ).toEqual( jasmine.any( RightSymbol ) );
	} );

	it( "Tokens.OPEN_MULTI_LIST", ():void => {
		expect( Tokens.OPEN_MULTI_LIST ).toBeDefined();
		expect( Tokens.OPEN_MULTI_LIST[ "value" ] ).toBe( "(" );
		expect( Tokens.OPEN_MULTI_LIST ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.CLOSE_MULTI_LIST", ():void => {
		expect( Tokens.CLOSE_MULTI_LIST ).toBeDefined();
		expect( Tokens.CLOSE_MULTI_LIST[ "value" ] ).toBe( ")" );
		expect( Tokens.CLOSE_MULTI_LIST ).toEqual( jasmine.any( NewLineSymbol ) );
	} );

	it( "Tokens.OPEN_SINGLE_LIST", ():void => {
		expect( Tokens.OPEN_SINGLE_LIST ).toBeDefined();
		expect( Tokens.OPEN_SINGLE_LIST[ "value" ] ).toBe( "(" );
		expect( Tokens.OPEN_SINGLE_LIST ).toEqual( jasmine.any( LeftSymbol ) );
	} );

	it( "Tokens.CLOSE_SINGLE_LIST", ():void => {
		expect( Tokens.CLOSE_SINGLE_LIST ).toBeDefined();
		expect( Tokens.CLOSE_SINGLE_LIST[ "value" ] ).toBe( ")" );
		expect( Tokens.CLOSE_SINGLE_LIST ).toEqual( jasmine.any( RightSymbol ) );
	} );

	it( "Tokens.GRAPH", ():void => {
		expect( Tokens.GRAPH ).toBeDefined();
		expect( Tokens.GRAPH[ "value" ] ).toBe( "GRAPH" );
		expect( Tokens.GRAPH ).toEqual( jasmine.any( Identifier ) );
	} );

	it( "Tokens.OPTIONAL", ():void => {
		expect( Tokens.OPTIONAL ).toBeDefined();
		expect( Tokens.OPTIONAL[ "value" ] ).toBe( "OPTIONAL" );
		expect( Tokens.OPTIONAL ).toEqual( jasmine.any( Identifier ) );
	} );

	it( "Tokens.UNION", ():void => {
		expect( Tokens.UNION ).toBeDefined();
		expect( Tokens.UNION[ "value" ] ).toBe( "UNION" );
		expect( Tokens.UNION ).toEqual( jasmine.any( Identifier ) );
	} );

	it( "Tokens.MINUS", ():void => {
		expect( Tokens.MINUS ).toBeDefined();
		expect( Tokens.MINUS[ "value" ] ).toBe( "MINUS" );
		expect( Tokens.MINUS ).toEqual( jasmine.any( Identifier ) );
	} );

	it( "Tokens.VALUES", ():void => {
		expect( Tokens.VALUES ).toBeDefined();
		expect( Tokens.VALUES[ "value" ] ).toBe( "VALUES" );
		expect( Tokens.VALUES ).toEqual( jasmine.any( Identifier ) );
	} );

	it( "Tokens.UNDEF", ():void => {
		expect( Tokens.UNDEF ).toBeDefined();
		expect( Tokens.UNDEF[ "value" ] ).toBe( "UNDEF" );
		expect( Tokens.UNDEF ).toEqual( jasmine.any( Identifier ) );
	} );

} );