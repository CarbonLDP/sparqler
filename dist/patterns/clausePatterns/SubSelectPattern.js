"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../../data/Container");
var SubSelectToken_1 = require("../../tokens/SubSelectToken");
var VariableToken_1 = require("../../tokens/VariableToken");
var WherePattern_1 = require("./WherePattern");
function getSelectFn(container, modifier) {
    return function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var targetToken = new SubSelectToken_1.SubSelectToken(modifier);
        if (variables.length)
            targetToken.addVariable.apply(targetToken, variables.map(function (x) { return new VariableToken_1.VariableToken(x); }));
        var newContainer = new Container_1.Container({
            iriResolver: container.iriResolver,
            targetToken: targetToken
        });
        return WherePattern_1.WherePattern.createFrom(newContainer, {});
    };
}
exports.SubSelectPattern = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            select: getSelectFn(container),
            selectDistinct: getSelectFn(container, "DISTINCT"),
            selectReduced: getSelectFn(container, "REDUCED"),
            selectAll: function () { return getSelectFn(container)(); },
            selectAllDistinct: function () { return getSelectFn(container, "DISTINCT")(); },
            selectAllReduced: function () { return getSelectFn(container, "REDUCED")(); },
        });
    },
};

//# sourceMappingURL=SubSelectPattern.js.map
