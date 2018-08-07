"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../data/utils");
function cloneSolutionModifierContainer(container, token) {
    var targetToken = container.targetToken.token === "query" ?
        _cloneFromQuery(container.targetToken, token) :
        _cloneFromClause(container.targetToken, token);
    return utils_1.cloneElement(container, { targetToken: targetToken });
}
exports.cloneSolutionModifierContainer = cloneSolutionModifierContainer;
function _cloneFromClause(clauseToken, token) {
    var modifiers = clauseToken.modifiers.concat(token);
    return utils_1.cloneElement(clauseToken, { modifiers: modifiers });
}
function _cloneFromQuery(queryToken, token) {
    var queryClause = _cloneFromClause(queryToken.queryClause, token);
    return utils_1.cloneElement(queryToken, { queryClause: queryClause });
}

//# sourceMappingURL=SolutionModifierClause.js.map
