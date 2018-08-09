import { FinishClause } from "../clauses/FinishClause";

import { QueryToken } from "../tokens/QueryToken";

import { Container } from "./Container";
import { IRIResolver } from "./IRIResolver";
import { QueryUnitContainer } from "./QueryUnitContainer";


describe( "QueryUnitContainer", () => {

	it( "should exists", ():void => {
		expect( QueryUnitContainer ).toBeDefined();
		expect( QueryUnitContainer ).toEqual( jasmine.any( Function ) );
	} );

	describe( "QueryUnitContainer.constructor", () => {

		it( "should be instantiable", () => {
			const container:QueryUnitContainer<FinishClause> = new QueryUnitContainer( {
				iriResolver: new IRIResolver(),
				targetToken: new QueryToken( void 0 ),
				selectFinishClauseFactory: FinishClause.createFrom,
			} );

			expect( container ).toEqual( jasmine.any( QueryUnitContainer ) );
		} );

		it( "should extend Container", () => {
			const container:QueryUnitContainer<FinishClause> = new QueryUnitContainer( {
				iriResolver: new IRIResolver(),
				targetToken: new QueryToken( void 0 ),
				selectFinishClauseFactory: FinishClause.createFrom,
			} );

			expect( container ).toEqual( jasmine.any( Container ) );
		} );

		it( "should be a read only object", ():void => {
			const container:QueryUnitContainer<FinishClause> & { something?:any } = new QueryUnitContainer( {
				iriResolver: new IRIResolver(),
				targetToken: new QueryToken( void 0 ),
				selectFinishClauseFactory: FinishClause.createFrom,
			} );

			expect( () => container.something = null ).toThrowError( /extensible/ );
		} );


		it( "should assign the selectFinishClauseFactory", () => {
			const container:QueryUnitContainer<FinishClause> = new QueryUnitContainer( {
				iriResolver: new IRIResolver(),
				targetToken: new QueryToken( void 0 ),
				selectFinishClauseFactory: FinishClause.createFrom,
			} );

			expect( container.selectFinishClauseFactory ).toBe( FinishClause.createFrom );
		} );

	} );

} );
