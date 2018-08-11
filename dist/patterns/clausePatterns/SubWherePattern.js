"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./../../data/utils");
var WhereToken_1 = require("./../../tokens/WhereToken");
var GroupClause_1 = require("../../clauses/GroupClause");
var FinishPattern_1 = require("./FinishPattern");
function getWhereFn(container) {
    return function (patterns) {
        var _a;
        var where = new WhereToken_1.WhereToken();
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        (_a = where.groupPattern.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        var targetToken = utils_1.cloneElement(container.targetToken, { where: where });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        var groupClause = GroupClause_1.GroupClause.createFrom(FinishPattern_1.FinishPattern.createFrom, newContainer, {});
        return FinishPattern_1.FinishPattern.createFrom(newContainer, groupClause);
    };
}
exports.SubWherePattern = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            where: getWhereFn(container),
        });
    },
};

//# sourceMappingURL=SubWherePattern.js.map
