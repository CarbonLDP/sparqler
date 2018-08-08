"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = require("./printing");
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
    SubjectToken.prototype.toString = function (spaces) {
        var query = this.subject.toString(spaces);
        var separator = !this.properties.length ? ""
            : (this.subject.token === "collection" || this.subject.token === "blankNodeProperty")
                && query.includes("\n") ? "\n"
                : " ";
        var subSpaces = separator === " " ?
            printing_1.addSpaces(spaces, query.length + 1) :
            printing_1.addSpaces(spaces, printing_1.INDENTATION_SPACES);
        var subIndent = printing_1.getIndentation(subSpaces);
        var properties = this.properties
            .map(function (property) { return property.toString(subSpaces); })
            .join(";" + printing_1.getSeparator(spaces) + subIndent);
        if (separator === "\n")
            separator += subIndent;
        return query + separator + properties;
    };
    return SubjectToken;
}());
exports.SubjectToken = SubjectToken;

//# sourceMappingURL=SubjectToken.js.map
