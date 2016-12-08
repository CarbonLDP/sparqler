// Internal interface
export abstract class Literal {
}

export interface RDFLiteral extends Literal {
	ofType( type:string ):Literal;
	withLanguage( language:string ):Literal;
}

// Internal interface
export interface NumericLiteral extends Literal {
}

// Internal interface
export interface BooleanLiteral extends Literal {
}

export default Literal;