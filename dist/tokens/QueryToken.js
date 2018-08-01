"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryToken = (function () {
    function QueryToken(query, values) {
        this.token = "query";
        this.prologues = [];
        this.queryClause = query;
        this.values = values;
    }
    QueryToken.prototype.addPrologues = function () {
        var prologues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            prologues[_i] = arguments[_i];
        }
        var _a;
        (_a = this.prologues).push.apply(_a, prologues);
        return this;
    };
    QueryToken.prototype.toString = function () {
        var query = this.prologues.join(" ");
        if (this.prologues.length)
            query += " ";
        query += this.queryClause;
        if (this.values)
            query += " " + this.values;
        return query;
    };
    return QueryToken;
}());
exports.QueryToken = QueryToken;

//# sourceMappingURL=QueryToken.js.map
