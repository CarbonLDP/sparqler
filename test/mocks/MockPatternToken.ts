import { GroupPatternToken } from "sparqler/tokens/GroupPatternToken";

export class MockPatternToken extends GroupPatternToken {
	readonly label:string;

	constructor( label:string ) {
		super();
		this.label = label;
	}
}
