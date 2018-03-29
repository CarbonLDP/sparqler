export class OrderToken {
    constructor(condition, flow) {
        this.token = "order";
        this.condition = condition;
        if (flow)
            this.flow = flow;
    }
    toString() {
        return "ORDER BY " + (this.flow ?
            `${this.flow}( ${this.condition} )` :
            `${this.condition}`);
    }
}

//# sourceMappingURL=OrderToken.js.map
