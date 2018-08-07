"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubjectToken = (function () {
    function SubjectToken(subject) {
        this.token = "subject";
        this.subject = subject;
        this.properties = [];
    }
    SubjectToken.prototype.addPredicate = function (predicate) {
        this.properties.push(predicate);
        return this;
    };
    SubjectToken.prototype.toString = function () {
        var query = "" + this.subject;
        if (this.properties.length)
            query += " " + this.properties.join("; ");
        return query;
    };
    return SubjectToken;
}());
exports.SubjectToken = SubjectToken;

//# sourceMappingURL=SubjectToken.js.map
