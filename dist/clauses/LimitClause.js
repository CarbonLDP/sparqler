"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LimitToken_1 = require("../tokens/LimitToken");
var SolutionModifierClause_1 = require("./SolutionModifierClause");
function getLimitFn(genericFactory, container) {
    return function (limit) {
        var token = new LimitToken_1.LimitToken(limit);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        return genericFactory(newContainer, {});
    };
}
exports.LimitClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            limit: getLimitFn(genericFactory, container),
        });
    },
};

//# sourceMappingURL=LimitClause.js.map
