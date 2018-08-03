"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OffsetToken_1 = require("../tokens/OffsetToken");
var SolutionModifierClause_1 = require("./SolutionModifierClause");
function getOffsetFn(genericFactory, container) {
    return function (offset) {
        var token = new OffsetToken_1.OffsetToken(offset);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        return genericFactory(newContainer, {});
    };
}
exports.OffsetClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            offset: getOffsetFn(genericFactory, container),
        });
    },
};

//# sourceMappingURL=OffsetClause.js.map
