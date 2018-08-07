"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container2_1 = require("../../data/Container2");
var utils_1 = require("../../data/utils");
var GroupPatternToken_1 = require("../../tokens/GroupPatternToken");
var NotTriplePattern_1 = require("./NotTriplePattern");
function getUnionFn(container) {
    return function (patterns) {
        var _a;
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        var newGroupToken = new GroupPatternToken_1.GroupPatternToken();
        (_a = newGroupToken.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        var groupPatterns = container.targetToken.groupPatterns.concat(newGroupToken);
        var unionToken = utils_1.cloneElement(container.targetToken, { groupPatterns: groupPatterns });
        var newContainer = new Container2_1.Container2({
            iriResolver: container.iriResolver,
            targetToken: unionToken,
        });
        return exports.UnionPattern.createFrom(newContainer, {});
    };
}
exports.UnionPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            union: getUnionFn(container),
        }));
    },
};

//# sourceMappingURL=UnionPattern.js.map
