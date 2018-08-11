"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../../data/Container");
var GroupPatternToken_1 = require("../../tokens/GroupPatternToken");
var UnionPatternToken_1 = require("../../tokens/UnionPatternToken");
var NotTriplePattern_1 = require("./NotTriplePattern");
var UnionPattern_1 = require("./UnionPattern");
function getUnionFn(container) {
    return function (patterns) {
        var _a;
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        var newGroupToken = new GroupPatternToken_1.GroupPatternToken();
        (_a = newGroupToken.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        var unionToken = new UnionPatternToken_1.UnionPatternToken();
        unionToken.groupPatterns.push(container.targetToken, newGroupToken);
        var newContainer = new Container_1.Container({
            iriResolver: container.iriResolver,
            targetToken: unionToken,
        });
        return UnionPattern_1.UnionPattern.createFrom(newContainer, {});
    };
}
exports.GroupPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            union: getUnionFn(container),
        }));
    }
};

//# sourceMappingURL=GroupPattern.js.map
