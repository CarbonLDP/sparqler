import { Pattern } from "../../src/patterns/Pattern";

import { MockPatternToken } from "./MockPatternToken";


export class MockPattern implements Pattern<MockPatternToken> {

	constructor( private label:string ) {}

	getPattern():MockPatternToken {
		return new MockPatternToken( this.label );
	}

}
