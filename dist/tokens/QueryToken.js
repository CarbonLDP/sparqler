"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryToken = (function () {
    function QueryToken(query, values) {
        this.token = "query";
        this.prologues = [];
        this.query = query;
        this.values = values;
    }
    QueryToken.prototype.addPrologues = function () {
        var prologues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            prologues[_i] = arguments[_i];
        }
        (_a = this.prologues).push.apply(_a, prologues);
        return this;
        var _a;
    };
    QueryToken.prototype.toString = function () {
        var query = this.prologues.join(" ") + (" " + this.query);
        if (this.values)
            query += " " + this.values;
        return query;
    };
    return QueryToken;
}());
exports.QueryToken = QueryToken;

//# sourceMappingURL=QueryToken.js.map
