var SubjectToken = (function () {
    function SubjectToken(subject) {
        this.token = "subject";
        this.subject = subject;
        this.predicates = [];
    }
    SubjectToken.prototype.addPredicate = function (predicate) {
        this.predicates.push(predicate);
        return this;
    };
    SubjectToken.prototype.toString = function () {
        return this.subject + " " + this.predicates.join("; ");
    };
    return SubjectToken;
}());
export { SubjectToken };

//# sourceMappingURL=SubjectToken.js.map
