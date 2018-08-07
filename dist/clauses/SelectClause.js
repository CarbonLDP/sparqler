"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container2_1 = require("../data/Container2");
var utils_1 = require("../data/utils");
var SelectToken_1 = require("../tokens/SelectToken");
var VariableToken_1 = require("../tokens/VariableToken");
var FormClause_1 = require("./FormClause");
function getSelectFn(genericFactory, container, modifier) {
    return function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        if (variables && variables.length === 0)
            throw new Error("Need to provide al least one variable.");
        var queryClause = new SelectToken_1.SelectToken(modifier);
        queryClause.addVariable.apply(queryClause, variables.map(function (x) { return x === "*" ? x : new VariableToken_1.VariableToken(x); }));
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: queryClause });
        var newContainer = new Container2_1.Container2({
            iriResolver: container.iriResolver,
            targetToken: queryToken,
        });
        return FormClause_1.FromClause.createFrom(genericFactory, newContainer, {});
    };
}
exports.SelectClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            select: getSelectFn(genericFactory, container),
            selectDistinct: getSelectFn(genericFactory, container, "DISTINCT"),
            selectReduced: getSelectFn(genericFactory, container, "REDUCED"),
            selectAll: function () { return getSelectFn(genericFactory, container)("*"); },
            selectAllDistinct: function () { return getSelectFn(genericFactory, container, "DISTINCT")("*"); },
            selectAllReduced: function () { return getSelectFn(genericFactory, container, "REDUCED")("*"); },
        });
    },
};

//# sourceMappingURL=SelectClause.js.map
