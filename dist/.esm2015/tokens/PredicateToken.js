export class PredicateToken {
    constructor(predicate) {
        this.token = "predicate";
        this.predicate = predicate;
        this.objects = [];
    }
    addObject(object) {
        this.objects.push(object);
        return this;
    }
    toString() {
        return `${this.predicate} ${this.objects.join(", ")}`;
    }
}

//# sourceMappingURL=PredicateToken.js.map
