"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PredicateToken = (function () {
    function PredicateToken(predicate) {
        this.token = "predicate";
        this.predicate = predicate;
        this.objects = [];
    }
    PredicateToken.prototype.addObject = function (object) {
        this.objects.push(object);
        return this;
    };
    PredicateToken.prototype.toString = function () {
        return this.predicate + " " + this.objects.join(", ");
    };
    return PredicateToken;
}());
exports.PredicateToken = PredicateToken;

//# sourceMappingURL=PredicateToken.js.map
