import { CLOSE_MULTI_BLOCK, CLOSE_SINGLE_BLOCK, GRAPH_PATTERN_SEPARATOR, OPEN_MULTI_BLOCK, OPEN_SINGLE_BLOCK, } from "./../patterns/tokens";
import { Identifier, NewLineSymbol, } from "./../tokens";
export function getBlockTokens(patterns) {
    var tokens = this.getTokens(patterns);
    var openToken = OPEN_SINGLE_BLOCK;
    var closeToken = CLOSE_SINGLE_BLOCK;
    if (this.isMultiLine(tokens)) {
        openToken = OPEN_MULTI_BLOCK;
        closeToken = CLOSE_MULTI_BLOCK;
    }
    return [openToken].concat(tokens, [closeToken]);
}
export function getTokens(patterns) {
    var patternArray = Array.isArray(patterns) ? patterns : [patterns];
    var triplesTokens = [];
    var lastToken = void 0;
    patternArray.forEach(function (graphPattern, index, array) {
        var tokens = graphPattern.getPattern();
        if (lastToken === GRAPH_PATTERN_SEPARATOR && (tokens[0] instanceof Identifier || tokens[0] === OPEN_MULTI_BLOCK || tokens[0] === OPEN_SINGLE_BLOCK))
            triplesTokens.pop();
        triplesTokens.push.apply(triplesTokens, tokens);
        lastToken = tokens[tokens.length - 1];
        if (index < array.length - 1 && lastToken !== CLOSE_MULTI_BLOCK && lastToken !== CLOSE_SINGLE_BLOCK) {
            triplesTokens.push(lastToken = GRAPH_PATTERN_SEPARATOR);
        }
    });
    return triplesTokens;
}
export function isMultiLine(tokens) {
    return tokens.find(function (token) { return token instanceof NewLineSymbol && [".", ";", ",", ""].indexOf(token["value"]) !== -1; }) !== void 0;
}

//# sourceMappingURL=Patterns.js.map
