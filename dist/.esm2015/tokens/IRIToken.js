export class IRIToken {
    constructor(value) {
        this.token = "iri";
        this.value = value;
    }
    toString() {
        return `<${this.value}>`;
    }
}

//# sourceMappingURL=IRIToken.js.map
