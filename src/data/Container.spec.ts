import { TokenNode } from "../tokens/TokenNode";
import { Container, ContainerData } from "./Container";
import { IRIResolver } from "./IRIResolver";


describe( "Container", ():void => {

	it( "should exists", ():void => {
		expect( Container ).toBeDefined();
		expect( Container ).toEqual( jasmine.any( Function ) );
	} );

	it( "should be instantiable", ():void => {
		const container:Container<TokenNode> = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: { token: "none" },
		} );
		expect( container ).toBeDefined();
		expect( container ).toEqual( jasmine.any( Container ) );
	} );

	it( "should be a read only object", ():void => {
		const container:Container<TokenNode> & { something?:any } = new Container( {
			iriResolver: new IRIResolver(),
			targetToken: { token: "none" },
		} );

		expect( () => container.something = null ).toThrowError( /extensible/ );
	} );

	it( "should assign provided data", ():void => {
		const data:ContainerData<TokenNode> = {
			iriResolver: new IRIResolver(),
			targetToken: { token: "none" },
		};

		const container:Container<TokenNode> = new Container( data );

		expect( container ).toEqual( jasmine.objectContaining( data ) );
	} );

} );