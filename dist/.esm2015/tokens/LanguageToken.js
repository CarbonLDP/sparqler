const LANGUAGE_REGEX = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;
export function isLanguageTag(tag) {
    return LANGUAGE_REGEX.test(tag);
}
export class LanguageToken {
    constructor(tag) {
        this.token = "language";
        if (!isLanguageTag(tag))
            throw new Error("Invalid language tag.");
        this.tag = tag;
    }
    toString() {
        return `@${this.tag}`;
    }
}

//# sourceMappingURL=LanguageToken.js.map
