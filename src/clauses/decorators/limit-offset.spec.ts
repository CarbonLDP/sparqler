import {
	Container,
	FinishClause,
	LimitOffsetClause,
} from "../";
import { IRIResolver } from "../../iri";
import {
	LIMIT,
	OFFSET,
} from "../../patterns/tokens";
import {
	NumberLiteral,
	Token,
} from "../../tokens";
import {
	CurrentMethod,
	finishDecorator,
	limitDecorator,
	LimitOffsetContainer,
	limitOffsetDecorator,
	offsetDecorator,
} from "../decorators";

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

describe( "limitOffsetDecorator", ():void => {

	it( "should exists", ():void => {
		expect( limitOffsetDecorator ).toBeDefined();
		expect( limitOffsetDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a LimitOffsetClause", ():void => {
		const container:Container = new Container();
		const limitOffsetClause:LimitOffsetClause<FinishClause> = limitOffsetDecorator( container, {} );

		expect( limitOffsetClause ).toEqual( {
			// Self methods
			limit: jasmine.any( Function ),
			offset: jasmine.any( Function ),

			//Inherited methods
			values: jasmine.any( Function ),
		} );

		expect( limitOffsetClause.limit.name ).toBe( "bound limit" );
		expect( limitOffsetClause.offset.name ).toBe( "bound offset" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = { aProperty: "a property", aFunction: () => {} };

		const limitOffsetClause:LimitOffsetClause<FinishClause> & MyObject
			= limitOffsetDecorator<FinishClause, MyObject>( container, myObject );

		expect( limitOffsetClause ).toEqual( {
			// The original properties
			aProperty: jasmine.any( String ) as any as string,
			aFunction: jasmine.any( Function ),

			// The decorated methods
			offset: jasmine.any( Function ),
			limit: jasmine.any( Function ),

			values: jasmine.any( Function ),
		} );

		// To maintain the object reference
		expect( limitOffsetClause as MyObject ).toBe( myObject );
	} );

	describe( "LimitOffsetClause", ():void => {

		it( "should not change content of current container", ():void => {
			const container:Container = new Container();

			const tokensCopy:Token[] = [].concat( container._tokens );
			const iriResolverCopy:IRIResolver = new IRIResolver( container._iriResolver );

			const limitOffsetClause:LimitOffsetClause = limitOffsetDecorator( container, {} );

			// limit method
			limitOffsetClause.limit( 1 );
			expect( container._tokens ).toEqual( tokensCopy );
			expect( container._iriResolver ).toEqual( iriResolverCopy );

			// offset method
			limitOffsetClause.offset( 1 );
			expect( container._tokens ).toEqual( tokensCopy );
			expect( container._iriResolver ).toEqual( iriResolverCopy );
		} );

		describe( "LimitOffsetClause.limit", ():void => {

			it( "should construct limit tokens", ():void => {
				const container:Container = new Container();
				const limitOffsetClause:LimitOffsetClause = limitOffsetDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( Container as Function, "call" ).and.callFake( ( it, ...args ) => {
					newContainer = it;
					return Container.apply( it, args );
				} );

				limitOffsetClause.limit( 1 );
				expect( spy ).toHaveBeenCalled();
				expect( newContainer._tokens ).toEqual( [
					LIMIT,
					new NumberLiteral( 1 ),
				] );
			} );

			it( "should return a FinishClause & ValuesClause & OffsetClause", ():void => {
				const container:Container = new Container();
				const limitOffsetClause:LimitOffsetClause = limitOffsetDecorator( container, {} );

				const returnedClause = limitOffsetClause.limit( 1 );
				expect( returnedClause ).toEqual( {
					// The finish methods
					toPrettyString: jasmine.any( Function ),
					toCompactString: jasmine.any( Function ),
					toString: jasmine.any( Function ),

					// The offset clause
					offset: jasmine.any( Function ),

					// The values clause
					values: jasmine.any( Function ),
				} );
			} );

			it( "should return a custom FinishClause & ValuesClause & OffsetClause", ():void => {
				type CustomFinish = FinishClause & { another:Function };

				function customFinishDecorator<W extends object>( container:Container, object:W ):CustomFinish & W {
					return Object.assign( finishDecorator( container, object ), {
						another: () => {},
					} );
				}

				const container:Container<CustomFinish> = new Container<CustomFinish>( customFinishDecorator );
				const limitOffsetClause:LimitOffsetClause<CustomFinish> = limitOffsetDecorator( container, {} );

				const returnedClause = limitOffsetClause.limit( 1 );
				expect( returnedClause ).toEqual( {
					// The finish methods
					toPrettyString: jasmine.any( Function ),
					toCompactString: jasmine.any( Function ),
					toString: jasmine.any( Function ),

					// The offset clause
					offset: jasmine.any( Function ),

					// The values clause
					values: jasmine.any( Function ),

					// Custom property
					another: jasmine.any( Function ),
				} );
			} );

			it( "should just return a FinishClause & ValuesClause if its called .limit().offset()", ():void => {
				const container:Container = new Container();
				const limitOffsetClause:LimitOffsetClause = limitOffsetDecorator( container, {} );

				const nextClause = limitOffsetClause
					.limit( 1 )
					.offset( 1 )
				;

				expect( nextClause ).toEqual( {
					values: jasmine.any( Function ),

					toPrettyString: jasmine.any( Function ),
					toCompactString: jasmine.any( Function ),
					toString: jasmine.any( Function ),
				} );
			} );

		} );

		describe( "offset", ():void => {

			it( "should construct offset tokens", ():void => {
				const container:Container = new Container();
				const limitOffsetClause:LimitOffsetClause = limitOffsetDecorator( container, {} );

				let newContainer:Container = void 0;
				const spy:jasmine.Spy = spyOn( Container as Function, "call" ).and.callFake( ( it, ...args ) => {
					newContainer = it;
					return Container.apply( it, args );
				} );

				limitOffsetClause.offset( 1 );
				expect( spy ).toHaveBeenCalled();
				expect( newContainer._tokens ).toEqual( [
					OFFSET,
					new NumberLiteral( 1 ),
				] );
			} );

			it( "should return a FinishClause & ValuesClause & LimitClause", ():void => {
				const container:Container = new Container();
				const limitOffsetClause:LimitOffsetClause = limitOffsetDecorator( container, {} );

				const returnedClause = limitOffsetClause.offset( 1 );
				expect( returnedClause ).toEqual( {
					// The finish methods
					toPrettyString: jasmine.any( Function ),
					toCompactString: jasmine.any( Function ),
					toString: jasmine.any( Function ),

					// The limit clause
					limit: jasmine.any( Function ),

					// The values clause
					values: jasmine.any( Function ),
				} );
			} );

			it( "should return a custom FinishClause & ValuesClause & LimitClause", ():void => {
				type CustomFinish = FinishClause & { another:Function };

				function customFinishDecorator<W extends object>( container:Container, object:W ):CustomFinish & W {
					return Object.assign( finishDecorator( container, object ), {
						another: () => {},
					} );
				}

				const container:Container<CustomFinish> = new Container<CustomFinish>( customFinishDecorator );
				const limitOffsetClause:LimitOffsetClause<CustomFinish> = limitOffsetDecorator( container, {} );

				const returnedClause = limitOffsetClause.offset( 1 );
				expect( returnedClause ).toEqual( {
					// The finish methods
					toPrettyString: jasmine.any( Function ),
					toCompactString: jasmine.any( Function ),
					toString: jasmine.any( Function ),

					// The limit clause
					limit: jasmine.any( Function ),

					// The values clause
					values: jasmine.any( Function ),

					// Custom property
					another: jasmine.any( Function ),
				} );
			} );

			it( "should just return a FinishClause & ValuesClause if its called .offset().limit()", ():void => {
				const container:Container = new Container();
				const limitOffsetClause:LimitOffsetClause = limitOffsetDecorator( container, {} );

				const nextClause = limitOffsetClause
					.offset( 1 )
					.limit( 1 )
				;

				expect( nextClause ).toEqual( {
					values: jasmine.any( Function ),

					toPrettyString: jasmine.any( Function ),
					toCompactString: jasmine.any( Function ),
					toString: jasmine.any( Function ),
				} );
			} );

		} );

	} );

} );