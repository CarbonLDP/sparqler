import { CLOSE_QUOTE, LANG_SYMBOL, OPEN_QUOTE, } from "./../tokens";
import { StringLiteral, } from "./../../tokens";
import { addType } from "./../../utils/ObjectPattern";
import { TriplesSubject } from "./TriplesSubject";
export class Literal extends TriplesSubject {
    constructor(resolver, value) {
        super(resolver);
        this.value = value + "";
    }
}
export class RDFLiteral extends Literal {
    constructor(resolver, value) {
        super(resolver, value);
        this.elementTokens = [OPEN_QUOTE, new StringLiteral(value), CLOSE_QUOTE];
    }
    ofType(type) {
        this.elementTokens = addType(this.value, type);
        return this;
    }
    ;
    withLanguage(language) {
        this.elementTokens = [OPEN_QUOTE, new StringLiteral(this.value), CLOSE_QUOTE, LANG_SYMBOL, new StringLiteral(language)];
        return this;
    }
    ;
}
export class NumericLiteral extends Literal {
    constructor(resolver, value) {
        super(resolver, value);
        let type = Number.isInteger(value) ? "integer" : "float";
        this.elementTokens = addType(this.value, type);
    }
}
export class BooleanLiteral extends Literal {
    constructor(resolver, value) {
        super(resolver, value);
        this.elementTokens = addType(this.value, "boolean");
    }
}

//# sourceMappingURL=Literals.js.map
