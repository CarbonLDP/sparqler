export class BaseToken {
    constructor(iri) {
        this.token = "base";
        this.iri = iri;
    }
    toString() {
        return `BASE ${this.iri}`;
    }
}

//# sourceMappingURL=BaseToken.js.map
