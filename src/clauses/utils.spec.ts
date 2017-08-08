import { Container } from "sparqler/clauses";
import { genericDecorator } from "sparqler/clauses/utils";


describe( "genericDecorator", ():void => {

	it( "should exists", ():void => {
		expect( genericDecorator ).toBeDefined();
		expect( genericDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should bind the function properties to the provided container", ():void => {
		const container:Container = new Container();
		const object = genericDecorator( {
			function1: function function1():Container { return this; },
			function2: function function2():Container { return this; },
		}, container, {} );

		expect( object ).toEqual( jasmine.objectContaining( {
			function1: jasmine.any( Function ),
			function2: jasmine.any( Function ),
		} ) );
		expect( object.function1() ).toBe( container );
		expect( object.function2() ).toBe( container );
	} );

	it( "should keep the reference of the provided object", ():void => {
		const providedObject:object = {};
		const returnedObject:object = genericDecorator(
			{ function1: function function1() {} },
			new Container(),
			providedObject,
		);

		expect( returnedObject ).toBe( providedObject );
	} );

} );
