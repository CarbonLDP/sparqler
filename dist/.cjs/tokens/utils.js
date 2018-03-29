"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinPatterns = function (patterns) {
    return patterns
        .map(function (pattern) {
        if (pattern.token === "select")
            return "{ " + pattern + " }";
        return pattern;
    })
        .join(". ");
};

//# sourceMappingURL=utils.js.map
