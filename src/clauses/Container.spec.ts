import {
	Container,
	FinishDecorator,
} from "sparqler/clauses";
import { Token } from "sparqler/tokens";
import { IRIResolver } from "sparqler/iri";
import * as IRIResolverModule from "sparqler/iri/IRIResolver";


describe( "Container", ():void => {

	class MockToken extends Token {
		//noinspection JSMethodCanBeStatic
		protected getPrettySeparator():string {
			throw new Error( "Method not implemented." );
		}

		//noinspection JSMethodCanBeStatic
		protected getCompactSeparator():string {
			throw new Error( "Method not implemented." );
		}
	}

	it( "should exists", ():void => {
		expect( Container ).toBeDefined();
		expect( Container ).toEqual( jasmine.any( Function ) );
	} );

	it( "should be instantiable", ():void => {
		const container:Container = new Container();
		expect( container ).toBeDefined();
		expect( container ).toEqual( jasmine.any( Container ) );
	} );

	it( "should be read only object", ():void => {
		type Writable<T extends { [x:string]:any }, K extends string> = { [P in K]: T[P] };
		const container:Writable<Container, keyof Container> & { something?:any } = new Container();

		expect( () => container._tokens = null ).toThrowError( /read only/ );
		expect( () => container._iriResolver = null ).toThrowError( /read only/ );
		expect( () => container._finishDecorator = null ).toThrowError( /read only/ );
		expect( () => container.something = null ).toThrowError( /extensible/ );
	} );

	it( "should be able to set custom finish decorator", ():void => {
		const customFinishDecorator:FinishDecorator<any> = () => {};
		const container:Container = new Container( customFinishDecorator );
		expect( container._finishDecorator ).toBe( customFinishDecorator );
	} );

	it( "should copy data if previous container is provided", ():void => {
		const customFinishDecorator:FinishDecorator<any> = () => {};
		const customTokens:Token[] = [ new MockToken( "previous-token-1" ), new MockToken( "previous-token-2" ) ];
		const customIRIResolver:IRIResolver = new IRIResolver();

		const previousContainer:Container = new class extends Container {
			_finishDecorator = customFinishDecorator;
			_tokens = customTokens;
			_iriResolver = customIRIResolver;
		};

		const spyIRIResolver:jasmine.Spy = spyOn( IRIResolverModule, "IRIResolver" ).and.callThrough();
		const container:Container = new Container( previousContainer );

		expect( container._finishDecorator ).toBe( customFinishDecorator );

		expect( container._tokens ).not.toBe( customTokens );
		// TODO: Wrong types for `jasmine.arrayContaining`
		expect( container._tokens ).toEqual( jasmine.arrayContaining( customTokens ) as any );

		expect( container._iriResolver ).not.toBe( customIRIResolver );
		expect( spyIRIResolver ).toHaveBeenCalledTimes( 1 );
		expect( spyIRIResolver ).toHaveBeenCalledWith( customIRIResolver );
	} );

	it( "should append new tokens to the data copied of the container", ():void => {
		const previousTokens:Token[] = [ new MockToken( "previous-token-1" ), new MockToken( "previous-token-2" ) ];
		const previousContainer:Container = new class extends Container {
			_tokens = previousTokens;
		};

		const newTokens:Token[] = [ new MockToken( "new-token-1" ), new MockToken( "new-token-2" ) ];
		const container:Container = new Container( previousContainer, newTokens );

		expect( container._tokens ).not.toBe( previousTokens );
		expect( container._tokens ).not.toBe( newTokens );

		// TODO: Wrong types for `jasmine.arrayContaining`
		expect( container._tokens ).toEqual( jasmine.arrayContaining( previousTokens ) as any );
		expect( container._tokens ).toEqual( jasmine.arrayContaining( newTokens ) as any );
	} );

	it( "should not append tokens if the provided is null", ():void => {
		const previousTokens:Token[] = [ new MockToken( "previous-token-1" ), new MockToken( "previous-token-2" ) ];
		const previousContainer:Container = new class extends Container {
			_tokens = previousTokens;
		};

		const container:Container = new Container( previousContainer, null );

		expect( container._tokens ).not.toBe( previousTokens );

		// TODO: Wrong types for `jasmine.arrayContaining`
		expect( container._tokens ).toEqual( jasmine.arrayContaining( previousTokens ) as any );
		expect( container._tokens.length ).toBe( previousTokens.length );
	} );

	it( "should use the IRIResolver provided instead of the previous container", ():void => {
		const previousIRIResolver:IRIResolver = new IRIResolver();

		const previousContainer:Container = new class extends Container {
			_iriResolver = previousIRIResolver;
		};

		const newIRIResolver:IRIResolver = new IRIResolver();

		const spyIRIResolver:jasmine.Spy = spyOn( IRIResolverModule, "IRIResolver" ).and.callThrough();
		const container:Container = new Container( previousContainer, null, newIRIResolver );

		expect( container._iriResolver ).not.toBe( previousIRIResolver );
		expect( spyIRIResolver ).not.toHaveBeenCalled();

		expect( container._iriResolver ).toBe( newIRIResolver );
	} );

	it( "should use the previous IRIResolver if the provided is null", ():void => {
		const previousIRIResolver:IRIResolver = new IRIResolver();

		const previousContainer:Container = new class extends Container {
			_iriResolver = previousIRIResolver;
		};

		const spyIRIResolver:jasmine.Spy = spyOn( IRIResolverModule, "IRIResolver" ).and.callThrough();
		const container:Container = new Container( previousContainer, null, null );

		expect( container._iriResolver ).not.toBe( previousIRIResolver );
		expect( spyIRIResolver ).toHaveBeenCalledTimes( 1 );
		expect( spyIRIResolver ).toHaveBeenCalledWith( previousIRIResolver );
	} );

} );