export const joinPatterns = (patterns) => {
    return patterns
        .map(pattern => {
        if (pattern.token === "select")
            return `{ ${pattern} }`;
        return pattern;
    })
        .join(". ");
};

//# sourceMappingURL=utils.js.map
