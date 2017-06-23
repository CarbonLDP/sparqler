import {
	Container,
	genericDecorator,
} from "sparqler/clauses";
import { GraphPattern } from "sparqler/patterns";
import { Token } from "sparqler/tokens";


function getPattern( this:Container<GraphPattern> ):Token[] {
	return this._tokens;
}

export function graphPatternDecorator<W extends object>( base:Container<GraphPattern>, object:W ):W & GraphPattern {
	return genericDecorator( { getPattern }, base, object );
}
