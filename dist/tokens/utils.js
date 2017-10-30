"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinPatterns = function (patterns) {
    var buffer = "";
    for (var _i = 0, patterns_1 = patterns; _i < patterns_1.length; _i++) {
        var pattern = patterns_1[_i];
        if (buffer)
            buffer += ". ";
        buffer += pattern.token === "select" ? "{ " + pattern + " }" : pattern;
    }
    return buffer;
};

//# sourceMappingURL=utils.js.map
