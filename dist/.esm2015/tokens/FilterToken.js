export class FilterToken {
    constructor(constraint) {
        this.token = "filter";
        this.constraint = constraint;
    }
    toString() {
        return `FILTER( ${this.constraint} )`;
    }
}

//# sourceMappingURL=FilterToken.js.map
