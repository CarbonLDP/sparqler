export const EMPTY_SEPARATOR:string = "";
export const SPACE_SEPARATOR:string = " ";
export let NEW_LINE_SEPARATOR:string = "\n";
export const TAB_SEPARATOR:string = "    ";

let indentation:number = 0;
export function addIndentation() {
	NEW_LINE_SEPARATOR = "\n" + TAB_SEPARATOR.repeat( ++ indentation );
}
export function removeIndentation() {
	NEW_LINE_SEPARATOR = "\n" + TAB_SEPARATOR.repeat( -- indentation );
}

export enum TokenFormat {
	PRETTY,
	COMPACT,
}

export abstract class Token {

	constructor( protected value:string ) {};

	getTokenValue( format:TokenFormat, nextToken?:Token ):string {
		let separator:string = SPACE_SEPARATOR;

		if( nextToken !== void 0 ) {
			switch( format ) {
				case TokenFormat.PRETTY:
					separator = this.getPrettySeparator( nextToken );
					break;
				case TokenFormat.COMPACT:
					separator = this.getCompactSeparator( nextToken );
					break;
			}
		}

		return this.value + separator;
	}

	protected abstract getPrettySeparator( nextToken:Token ):string;

	protected abstract getCompactSeparator( nextToken:Token ):string;

}

export default Token;