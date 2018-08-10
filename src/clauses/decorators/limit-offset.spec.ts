import Container from "sparqler/clauses/Container";
import {
	FinishClause,
} from "sparqler/clauses/interfaces";
import {
	CurrentMethod,
	finishDecorator,
	limitDecorator,
	LimitOffsetContainer,
	offsetDecorator,
} from "sparqler/clauses/decorators";
import { IRIResolver } from "sparqler/iri";
import {
	LIMIT,
	OFFSET,
} from "sparqler/patterns/tokens";
import {
	NumberLiteral,
	Token,
} from "sparqler/tokens";

describe( "LimitOffsetContainer", ():void => {

	it( "should exists", ():void => {
		expect( LimitOffsetContainer ).toBeDefined();
		expect( LimitOffsetContainer ).toEqual( jasmine.any( Function ) );
	} );

	it( "should be instantiable", ():void => {
		const container:LimitOffsetContainer = new LimitOffsetContainer( null, null, null );
		expect( container ).toBeDefined();
		expect( container ).toEqual( jasmine.any( LimitOffsetContainer ) );
	} );

	it( "should be a read only object", ():void => {
		type Writable<T extends { [x:string]:any }, K extends string> = { [P in K]?: T[P] };
		const container:Writable<LimitOffsetContainer, keyof LimitOffsetContainer> & { something?:any }
			= new LimitOffsetContainer( null, null, null );

		expect( () => container._tokens = null ).toThrowError( /read only/ );
		expect( () => container._iriResolver = null ).toThrowError( /read only/ );
		expect( () => container._finishDecorator = null ).toThrowError( /read only/ );

		expect( () => container._limitUsed = null ).toThrowError( /read only/ );
		expect( () => container._offsetUsed = null ).toThrowError( /read only/ );

		expect( () => container.something = null ).toThrowError( /extensible/ );
	} );

	it( "should set correctly the _limitUsed property", ():void => {
		const limitUsedContainer:LimitOffsetContainer = new LimitOffsetContainer( null, null, CurrentMethod.LIMIT );
		expect( limitUsedContainer._limitUsed ).toBe( true );

		const offsetUsedContainer:LimitOffsetContainer = new LimitOffsetContainer( null, null, CurrentMethod.OFFSET );
		expect( offsetUsedContainer._limitUsed ).toBe( false );

		const noneUsedContainer:LimitOffsetContainer = new LimitOffsetContainer( null, null, null );
		expect( noneUsedContainer._limitUsed ).toBe( false );
	} );

	it( "should set correctly the _offsetUsed property", ():void => {
		const offsetUsedContainer:LimitOffsetContainer = new LimitOffsetContainer( null, null, CurrentMethod.OFFSET );
		expect( offsetUsedContainer._offsetUsed ).toBe( true );

		const limitUsedContainer:LimitOffsetContainer = new LimitOffsetContainer( null, null, CurrentMethod.LIMIT );
		expect( limitUsedContainer._offsetUsed ).toBe( false );

		const noneUsedContainer:LimitOffsetContainer = new LimitOffsetContainer( null, null, null );
		expect( noneUsedContainer._offsetUsed ).toBe( false );
	} );

} );

describe( "limitDecorator", ():void => {

	it( "should exists", ():void => {
		expect( limitDecorator ).toBeDefined();
		expect( limitDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a LimitClause & ValuesClause", ():void => {
		const container:Container = new Container();
		const limitClause = limitDecorator( container, {} );

		expect( limitClause ).toBeDefined();
		expect( limitClause ).toEqual( {
			limit: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		expect( limitClause.limit.name ).toBe( "bound limit" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };

		const limitClause
			= limitDecorator<FinishClause, MyObject>( container, myObject );

		expect( limitClause ).toEqual( {
			// The original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// The decorated methods
			limit: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		// To maintain the object reference
		expect( limitClause as MyObject ).toBe( myObject );
	} );

} );

describe( "offsetDecorator", ():void => {

	it( "should exists", ():void => {
		expect( offsetDecorator ).toBeDefined();
		expect( offsetDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a OffsetClause & ValuesClause", ():void => {
		const container:Container = new Container();
		const offsetClause = offsetDecorator( container, {} );

		expect( offsetClause ).toBeDefined();
		expect( offsetClause ).toEqual( {
			offset: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		expect( offsetClause.offset.name ).toBe( "bound offset" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };

		const offsetClause
			= offsetDecorator<FinishClause, MyObject>( container, myObject );

		expect( offsetClause ).toEqual( {
			// The original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// The decorated methods
			offset: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		// To maintain the object reference
		expect( offsetClause as MyObject ).toBe( myObject );
	} );

} );
