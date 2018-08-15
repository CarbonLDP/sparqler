"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = require("../data/IRIResolver");
var utils_1 = require("../data/utils");
var PatternBuilder_1 = require("../patterns/PatternBuilder");
var WhereToken_1 = require("../tokens/WhereToken");
var GroupClause_1 = require("./GroupClause");
function _getPatterns(iriResolver, patternFunction) {
    var patternOrPatterns = patternFunction(PatternBuilder_1.PatternBuilder.create(iriResolver));
    var patterns = Array.isArray(patternOrPatterns) ? patternOrPatterns : [patternOrPatterns];
    return patterns.map(function (x) { return x.getPattern(); });
}
function getWhereFn(genericFactory, container) {
    return function (patternFunction) {
        var _a;
        var iriResolver = new IRIResolver_1.IRIResolver(container.iriResolver);
        var patterns = _getPatterns(iriResolver, patternFunction);
        var query = (_a = utils_1.cloneElement(container.targetToken.queryClause, { where: new WhereToken_1.WhereToken() })).addPattern.apply(_a, patterns);
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: query });
        var newContainer = utils_1.cloneElement(container, { iriResolver: iriResolver, targetToken: queryToken });
        var groupClause = GroupClause_1.GroupClause.createFrom(genericFactory, newContainer, {});
        return genericFactory(newContainer, groupClause);
    };
}
exports.WhereClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            where: getWhereFn(genericFactory, container),
        });
    },
};

//# sourceMappingURL=WhereClause.js.map
