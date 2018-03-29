export class ValuesToken {
    constructor() {
        this.token = "values";
        this.variables = [];
        this.values = [];
    }
    addValues(variable, ...values) {
        this.variables.push(variable);
        this.values.push(values);
        return this;
    }
    toString() {
        const variables = this.variables.length ? this.variables.length === 1 ? this.variables.join(" ") :
            `( ${this.variables.join(" ")} )` : "()";
        const values = this.variables.length ? this.variables.length === 1 ? this.values[0] :
            this.values.map(varValues => `( ${varValues.join(" ")} )`) : ["()"];
        return `VALUES ${variables} { ${values.join(" ")} }`;
    }
}

//# sourceMappingURL=ValuesToken.js.map
