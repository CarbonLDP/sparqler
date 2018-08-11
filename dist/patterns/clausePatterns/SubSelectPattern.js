"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../../data/Container");
var SubSelectToken_1 = require("../../tokens/SubSelectToken");
var VariableToken_1 = require("../../tokens/VariableToken");
var SubWherePattern_1 = require("./SubWherePattern");
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
        return SubWherePattern_1.SubWherePattern.createFrom(newContainer, {});
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
