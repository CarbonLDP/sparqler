export class PrefixToken {
    constructor(namespace, iri) {
        this.token = "prefix";
        this.namespace = namespace;
        this.iri = iri;
    }
    toString() {
        return `PREFIX ${this.namespace}: ${this.iri}`;
    }
}

//# sourceMappingURL=PrefixToken.js.map
