"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver2_1 = require("../iri/IRIResolver2");
var PatternBuilder_1 = require("../patterns/PatternBuilder");
var WhereToken_1 = require("../tokens/WhereToken");
var GroupClause_1 = require("./GroupClause");
var utils_1 = require("./utils");
function getWhereFn(genericFactory, container) {
    return function (patternFunction) {
        var _a;
        var iriResolver = new IRIResolver2_1.IRIResolver2(container.iriResolver);
        var patterns = patternFunction.call(void 0, new PatternBuilder_1.PatternBuilder(iriResolver));
        var query = (_a = utils_1.cloneElement(container.targetToken.queryClause, { where: new WhereToken_1.WhereToken() })).addPattern.apply(_a, patterns);
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: query });
        var newContainer = utils_1.cloneElement(container, { targetToken: queryToken });
        var groupClause = GroupClause_1.GroupClause.create(genericFactory, newContainer, {});
        return genericFactory(newContainer, groupClause);
    };
}
exports.WhereClause = {
    create: function (genericFactory, container, object) {
        return Object.assign(object, {
            where: getWhereFn(genericFactory, container),
        });
    },
};

//# sourceMappingURL=WhereClause.js.map
