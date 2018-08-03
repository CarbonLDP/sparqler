"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderToken_1 = require("../tokens/OrderToken");
var LimitOffsetClause_1 = require("./LimitOffsetClause");
var SolutionModifierClause_1 = require("./SolutionModifierClause");
function getOrderByFn(genericFactory, container) {
    return function (rawCondition) {
        var token = new OrderToken_1.OrderToken(rawCondition);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        var limitOffsetClause = LimitOffsetClause_1.LimitOffsetClause.createFrom(genericFactory, newContainer, {});
        return genericFactory(newContainer, limitOffsetClause);
    };
}
exports.OrderClause = {
    createFrom: function (genericFactory, container, object) {
        return LimitOffsetClause_1.LimitOffsetClause.createFrom(genericFactory, container, Object.assign(object, {
            orderBy: getOrderByFn(genericFactory, container),
        }));
    }
};

//# sourceMappingURL=OrderClause.js.map
