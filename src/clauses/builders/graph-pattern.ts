import {
	Container,
	genericDecorator,
} from "sparqler/clauses/data-container";
import { GraphPattern } from "sparqler/patterns/interfaces";
import { Token } from "sparqler/tokens/Token";


function getPattern( this:Container<GraphPattern> ):Token[] {
	return this._tokens;
}

export function graphPatternDecorator<W extends object>( base:Container<GraphPattern>, object:W ):W & GraphPattern {
	return genericDecorator( { getPattern }, base, object );
}
