export class QueryToken {
    constructor(query, values) {
        this.token = "query";
        this.prologues = [];
        this.query = query;
        this.values = values;
    }
    addPrologues(...prologues) {
        this.prologues.push(...prologues);
        return this;
    }
    toString() {
        let query = this.prologues.join(" ");
        if (this.prologues.length)
            query += " ";
        query += this.query;
        if (this.values)
            query += ` ${this.values}`;
        return query;
    }
}

//# sourceMappingURL=QueryToken.js.map
