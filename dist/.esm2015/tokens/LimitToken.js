export class LimitToken {
    constructor(value) {
        this.token = "limit";
        this.value = value;
    }
    toString() {
        return `LIMIT ${this.value}`;
    }
}

//# sourceMappingURL=LimitToken.js.map
