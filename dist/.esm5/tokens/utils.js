export var joinPatterns = function (patterns) {
    return patterns
        .map(function (pattern) {
        if (pattern.token === "select")
            return "{ " + pattern + " }";
        return pattern;
    })
        .join(". ");
};

//# sourceMappingURL=utils.js.map
