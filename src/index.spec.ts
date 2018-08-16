import { FinishClause } from "./clauses/FinishClause";
import { QueryClause } from "./clauses/QueryClause";

import DefaultExport, { FinishFactory, SPARQLER } from "./index";


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

		expect( sparqler ).toEqual( jasmine.objectContaining<QueryClause<any>>( {
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


	it( "should accept a custom SELECT finish decorator", ():void => {
		interface MyFinish extends FinishClause {
			customFinish:Function;
		}

		const customSelectFinish:FinishFactory<MyFinish> = ( container, object ) => {
			return FinishClause.createFrom( container, Object.assign( object, {
				customFinish: () => {},
			} ) );
		};

		type CustomFinish = MyFinish & FinishClause;
		const sparqler:SPARQLER<CustomFinish> = new SPARQLER<CustomFinish>( customSelectFinish );

		const customFinish:CustomFinish = sparqler
			.selectAll()
			.where( () => [] );

		expect( customFinish ).toEqual( jasmine.objectContaining<CustomFinish>( {
			customFinish: jasmine.any( Function ),
		} ) );
	} );

} );
