"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../data/Container");
var utils_1 = require("../data/utils");
var SelectToken_1 = require("../tokens/SelectToken");
var VariableToken_1 = require("../tokens/VariableToken");
var FromClause_1 = require("./FromClause");
function getSelectFn(genericFactory, container, modifier) {
    return function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var queryClause = new SelectToken_1.SelectToken(modifier);
        if (variables.length)
            queryClause.addVariable.apply(queryClause, variables.map(function (x) { return new VariableToken_1.VariableToken(x); }));
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: queryClause });
        var newContainer = new Container_1.Container({
            iriResolver: container.iriResolver,
            targetToken: queryToken,
        });
        return FromClause_1.FromClause.createFrom(genericFactory, newContainer, {});
    };
}
exports.SelectClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            select: getSelectFn(genericFactory, container),
            selectDistinct: getSelectFn(genericFactory, container, "DISTINCT"),
            selectReduced: getSelectFn(genericFactory, container, "REDUCED"),
            selectAll: function () { return getSelectFn(genericFactory, container)(); },
            selectAllDistinct: function () { return getSelectFn(genericFactory, container, "DISTINCT")(); },
            selectAllReduced: function () { return getSelectFn(genericFactory, container, "REDUCED")(); },
        });
    },
};

//# sourceMappingURL=SelectClause.js.map
