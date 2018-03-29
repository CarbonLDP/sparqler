export class SubjectToken {
    constructor(subject) {
        this.token = "subject";
        this.subject = subject;
        this.predicates = [];
    }
    addPredicate(predicate) {
        this.predicates.push(predicate);
        return this;
    }
    toString() {
        return `${this.subject} ${this.predicates.join("; ")}`;
    }
}

//# sourceMappingURL=SubjectToken.js.map
