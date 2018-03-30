import { isPrefixed } from "./../iri";
import { BooleanToken } from "./BooleanToken";
import { IRIToken } from "./IRIToken";
import { LanguageToken } from "./LanguageToken";
import { NumberToken } from "./NumberToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { StringToken } from "./StringToken";
export class LiteralToken {
    constructor(value) {
        this.token = "literal";
        if (value === void 0)
            return;
        this.setValue(value);
    }
    setValue(value) {
        if (this.value && this.value.value === value)
            return;
        this.value = typeof value === "boolean" ? new BooleanToken(value) :
            typeof value === "number" ? new NumberToken(value) :
                new StringToken(value);
        return this;
    }
    setType(type) {
        if (!this.value)
            throw new Error("Must set a value before a type.");
        if (this.value.token !== "string")
            this.value = new StringToken(`${this.value}`);
        this.type = typeof type === "string" ? isPrefixed(type) ?
            new PrefixedNameToken(type) : new IRIToken(type) : type;
        return this;
    }
    setLanguage(language) {
        if (!this.value || this.value.token !== "string")
            throw new Error("Non-string value can't have a language.");
        this.type = void 0;
        this.language = new LanguageToken(language);
        return this;
    }
    toString() {
        if (this.language)
            return `${this.value}${this.language}`;
        if (this.type)
            return `${this.value}^^${this.type}`;
        return `${this.value}`;
    }
}

//# sourceMappingURL=LiteralToken.js.map