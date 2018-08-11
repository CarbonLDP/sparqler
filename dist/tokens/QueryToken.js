"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = require("./printing");
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
    QueryToken.prototype.toString = function (spaces) {
        var separator = printing_1.getSeparator(spaces);
        var query = this.prologues
            .map(function (prologue) {
            if (prologue.token === "base")
                return prologue + "\n";
            return prologue + separator;
        })
            .join("");
        if (this.queryClause)
            query += this.queryClause.toString(spaces);
        if (this.values)
            query += separator + this.values.toString(spaces);
        return query;
    };
    return QueryToken;
}());
exports.QueryToken = QueryToken;

//# sourceMappingURL=QueryToken.js.map
