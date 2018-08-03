"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupToken_1 = require("../tokens/GroupToken");
var HavingClause_1 = require("./HavingClause");
var SolutionModifierClause_1 = require("./SolutionModifierClause");
function getGroupByFn(genericFactory, container) {
    return function (rawCondition) {
        var token = new GroupToken_1.GroupToken(rawCondition);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        var havingClause = HavingClause_1.HavingClause.createFrom(genericFactory, newContainer, {});
        return genericFactory(newContainer, havingClause);
    };
}
exports.GroupClause = {
    createFrom: function (genericFactory, container, object) {
        return HavingClause_1.HavingClause.createFrom(genericFactory, container, Object.assign(object, {
            groupBy: getGroupByFn(genericFactory, container),
        }));
    },
};

//# sourceMappingURL=GroupClause.js.map
