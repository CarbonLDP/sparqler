"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SelectToken_1 = require("../tokens/SelectToken");
var VariableToken_1 = require("../tokens/VariableToken");
var FormClause_1 = require("./FormClause");
var utils_1 = require("./utils");
var WhereClause_1 = require("./WhereClause");
function getSelectFn(genericFactory, container, modifier) {
    return function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        if (variables && variables.length === 0)
            throw new Error("Need to provide al least one variable.");
        var query = new SelectToken_1.SelectToken(modifier);
        query.addVariable.apply(query, variables.map(function (x) { return x === "*" ? x : new VariableToken_1.VariableToken(x); }));
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: query });
        var newContainer = utils_1.cloneElement(container, { targetToken: queryToken });
        return FormClause_1.FromClause.createFrom(genericFactory, newContainer, {});
    };
}
exports.SelectClause = {
    createFrom: function (genericFactory, container, object) {
        return WhereClause_1.WhereClause.createFrom(genericFactory, container, Object.assign(object, {
            select: getSelectFn(genericFactory, container),
            selectDistinct: getSelectFn(genericFactory, container, "DISTINCT"),
            selectReduced: getSelectFn(genericFactory, container, "REDUCED"),
            selectAll: function () { return getSelectFn(genericFactory, container)("*"); },
            selectAllDistinct: function () { return getSelectFn(genericFactory, container, "DISTINCT")("*"); },
            selectAllReduced: function () { return getSelectFn(genericFactory, container, "REDUCED")("*"); },
        }));
    },
};

//# sourceMappingURL=SelectClause.js.map
