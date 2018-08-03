"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HavingToken_1 = require("../tokens/HavingToken");
var OrderClause_1 = require("./OrderClause");
var SolutionModifierClause_1 = require("./SolutionModifierClause");
function getHavingFn(genericFactory, container) {
    return function (rawCondition) {
        var token = new HavingToken_1.HavingToken(rawCondition);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        var orderClause = OrderClause_1.OrderClause.createFrom(genericFactory, newContainer, {});
        return genericFactory(newContainer, orderClause);
    };
}
exports.HavingClause = {
    createFrom: function (genericFactory, container, object) {
        return OrderClause_1.OrderClause.createFrom(genericFactory, container, Object.assign(object, {
            having: getHavingFn(genericFactory, container),
        }));
    },
};

//# sourceMappingURL=HavingClause.js.map
