export class BindToken {
    constructor(expression, variable) {
        this.token = "bind";
        this.expression = expression;
        this.variable = variable;
    }
    toString() {
        return `BIND(${this.expression} AS ${this.variable})`;
    }
}

//# sourceMappingURL=BindToken.js.map
