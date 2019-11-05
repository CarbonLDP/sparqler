import { LimitToken } from "./LimitToken";
import { OffsetToken } from "./OffsetToken";
import { OptionalToken } from "./OptionalToken";
import { PatternToken } from "./PatternToken";
import { SharedQueryClauseToken } from "./SharedQueryClauseToken";
import { SolutionModifierToken } from "./SolutionModifierToken";
import { SubjectToken } from "./SubjectToken";
import { VariableToken } from "./VariableToken";
import { WhereToken } from "./WhereToken";


describe( "SharedQueryClauseToken", ():void => {

	class MockSharedQueryClauseToken extends SharedQueryClauseToken {
		readonly token:"mockShared" = "mockShared";

		constructor() {
			super();
		}

		toString( spaces?:number ):string {
			return this.where + " " + this.modifiers;
		}
	}

	it( "should exists", ():void => {
		expect( SharedQueryClauseToken ).toBeDefined();
		expect( SharedQueryClauseToken ).toEqual( jasmine.any( Function ) );
	} );


	describe( "SharedQueryClauseToken.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( SharedQueryClauseToken ) );
		} );

		it( "should initialize where", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();
			expect( token.where ).toEqual( jasmine.any( WhereToken ) );
		} );

		it( "should initialize modifiers", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();
			expect( token.modifiers ).toEqual( [] );
		} );

	} );

	describe( "SharedQueryClauseToken.addPattern", ():void => {

		it( "should exists", ():void => {
			expect( SharedQueryClauseToken.prototype.addPattern ).toBeDefined();
			expect( SharedQueryClauseToken.prototype.addPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add single pattern", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();

			const pattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			token.addPattern( pattern );

			expect( token.where.groupPattern.patterns ).toEqual( [ pattern ] );
		} );

		it( "should add multiple patterns", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();

			const pattern1:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			const pattern2:PatternToken = new OptionalToken();
			token.addPattern( pattern1, pattern2 );

			expect( token.where.groupPattern.patterns ).toEqual( [ pattern1, pattern2 ] );
		} );

		it( "should append patterns", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();

			const firstPattern:PatternToken = new SubjectToken( new VariableToken( "pattern" ) );
			token.addPattern( firstPattern );

			const newPattern:PatternToken = new OptionalToken();
			token.addPattern( newPattern );

			expect( token.where.groupPattern.patterns ).toEqual( [ firstPattern, newPattern ] );
		} );

		it( "should return itself", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();

			const pattern:PatternToken = new OptionalToken();
			const returned:SharedQueryClauseToken = token.addPattern( pattern );

			expect( returned ).toBe( token );
		} );

	} );

	describe( "SharedQueryClauseToken.addModifier", ():void => {

		it( "should exists", ():void => {
			expect( SharedQueryClauseToken.prototype.addModifier ).toBeDefined();
			expect( SharedQueryClauseToken.prototype.addModifier ).toEqual( jasmine.any( Function ) );
		} );

		it( "should add single modifier", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();

			const modifier:SolutionModifierToken = new LimitToken( 10 );
			token.addModifier( modifier );

			expect( token.modifiers ).toEqual( [ modifier ] );
		} );

		it( "should add multiple modifiers", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();

			const modifier1:SolutionModifierToken = new LimitToken( 10 );
			const modifier2:SolutionModifierToken = new OffsetToken( 0 );
			token.addModifier( modifier1, modifier2 );

			expect( token.modifiers ).toEqual( [ modifier1, modifier2 ] );
		} );

		it( "should append modifiers", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();

			const firstModifier:SolutionModifierToken = new LimitToken( 10 );
			token.addModifier( firstModifier );

			const newModifier:SolutionModifierToken = new OffsetToken( 0 );
			token.addModifier( newModifier );

			expect( token.modifiers ).toEqual( [ firstModifier, newModifier ] );
		} );

		it( "should return itself", ():void => {
			const token:SharedQueryClauseToken = new MockSharedQueryClauseToken();

			const modifier:SolutionModifierToken = new LimitToken( 10 );
			const returned:SharedQueryClauseToken = token.addModifier( modifier );

			expect( returned ).toBe( token );
		} );

	} );

} );
