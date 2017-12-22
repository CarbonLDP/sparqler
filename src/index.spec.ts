import {
	Container,
	FinishClause,
} from "./clauses";
import * as ContainerModule from "./clauses/Container";
import { finishDecorator } from "./clauses/decorators";

import DefaultExport, {
	FinishDecorator,
	SPARQLER,
} from "./index";

describe( "SPARQLER", ():void => {

	it( "should exists", ():void => {
		expect( SPARQLER ).toBeDefined();
		expect( SPARQLER ).toEqual( jasmine.any( Function ) );
	} );

	it( "should be the default export of the module", ():void => {
		expect( DefaultExport ).toBe( SPARQLER );
	} );

	it( "should be instantiable", ():void => {
		const sparqler:SPARQLER = new SPARQLER();

		expect( sparqler ).toBeDefined();
		expect( sparqler ).toEqual( jasmine.any( SPARQLER ) );
	} );

	it( "should be a QueryClause object", ():void => {
		const sparqler:SPARQLER = new SPARQLER();

		expect( sparqler ).toEqual( jasmine.objectContaining( {
			base: jasmine.any( Function ),
			vocab: jasmine.any( Function ),
			prefix: jasmine.any( Function ),

			select: jasmine.any( Function ),
			selectDistinct: jasmine.any( Function ),
			selectReduced: jasmine.any( Function ),

			selectAll: jasmine.any( Function ),
			selectAllDistinct: jasmine.any( Function ),
			selectAllReduced: jasmine.any( Function ),
		} ) );
	} );

	it( "should accept a custom finish decorator", ():void => {
		interface MyFinish {
			customFinish:Function;
		}

		const customFinishDecorator:FinishDecorator<MyFinish> = ( container, object ) => {
			return finishDecorator( container, Object.assign( object, {
				customFinish: () => {},
			} ) );
		};

		let container:Container = void 0;
		const spy:jasmine.Spy = spyOn( ContainerModule, "Container" ).and.callFake( ( ...args ) => {
			return container = new Container( ...args );
		} );

		type CustomFinish = MyFinish & FinishClause;
		const sparqler:SPARQLER<CustomFinish> = new SPARQLER<CustomFinish>( customFinishDecorator );
		expect( spy ).toHaveBeenCalledTimes( 1 );
		expect( container._finishDecorator ).toBe( customFinishDecorator );

		const customFinish:CustomFinish = sparqler.selectAll().where( () => [] );
		expect( customFinish ).toEqual( jasmine.objectContaining( {
			customFinish: jasmine.any( Function ),
		} ) );
	} );

} );
