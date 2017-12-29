"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("./..");
var tokens_1 = require("./../../patterns/tokens");
var tokens_2 = require("./../../tokens");
function toCompactString() {
    var tokens = this._tokens
        .filter(function (token) { return token !== tokens_1.WHERE; });
    var maxTokens = [tokens_1.SELECT];
    var baseTokens;
    for (var index = 0, token = tokens[index]; token && maxTokens.indexOf(token) === -1; ++index, token = tokens[index]) {
        if (token === tokens_1.PREFIX) {
            var nextToken = tokens[index + 1];
            if (!this._iriResolver._prefixes.get(nextToken["value"])) {
                tokens.splice(index, 6);
                --index;
            }
        }
        else if (token === tokens_1.BASE) {
            baseTokens = tokens.splice(index, 4);
            --index;
        }
    }
    if (baseTokens)
        tokens.unshift.apply(tokens, baseTokens);
    return tokens.reduce(function (res, token, index, thisArray) {
        var nextToken = thisArray[index + 1];
        if (nextToken === tokens_1.EMPTY_SEPARATOR)
            nextToken = thisArray[index + 2];
        return res + token.getTokenValue(tokens_2.TokenFormat.COMPACT, nextToken);
    }, "");
}
function toPrettyString() {
    var stack = [];
    var actual = {
        token: null,
        indentation: 0,
        subject: 0,
        property: 0,
        spaces: 0,
    };
    return this._tokens.reduce(function (res, token, index, tokens) {
        var nextToken = tokens[index + 1];
        var tokenString = token.getTokenValue(tokens_2.TokenFormat.PRETTY, nextToken);
        if (actual.spaces === 0) {
            actual.subject += tokenString.length;
            if (tokenString.endsWith(" "))
                actual.spaces++;
        }
        else if (actual.spaces === 1) {
            actual.property += tokenString.length;
            if (tokenString.endsWith(" "))
                actual.spaces++;
        }
        if ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST].indexOf(token) !== -1) {
            stack.push(actual);
            actual = {
                token: token,
                indentation: actual.indentation + 4,
                subject: 0,
                property: 0,
                spaces: token === tokens_1.OPEN_MULTI_BLOCK ? 0 : token === tokens_1.OPEN_MULTI_BN ? 1 : 2,
            };
        }
        else if ([tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
            if (nextToken && !(nextToken instanceof tokens_2.NewLineSymbol)) {
                var parent = actual;
                while ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST].indexOf(parent.token) === -1)
                    parent = stack.pop();
                stack.push(parent);
                actual = {
                    token: token,
                    indentation: parent.indentation + 4,
                    subject: 0,
                    property: 0,
                    spaces: 1,
                };
            }
        }
        else if ([tokens_1.SAME_SUBJECT_SEPARATOR, tokens_1.SAME_PROPERTY_SEPARATOR, tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
            var parent = actual;
            while ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST, tokens_1.CLOSE_MULTI_LIST, tokens_1.CLOSE_MULTI_BN].indexOf(parent.token) === -1)
                parent = stack.pop();
            stack.push(parent);
            if (token === tokens_1.SAME_SUBJECT_SEPARATOR) {
                actual = {
                    token: token,
                    indentation: parent.indentation + actual.subject,
                    subject: actual.subject,
                    property: 0,
                    spaces: 1,
                };
            }
            else if (token === tokens_1.SAME_PROPERTY_SEPARATOR) {
                actual = {
                    token: token,
                    indentation: parent.indentation + actual.subject + actual.property,
                    subject: actual.subject,
                    property: actual.property,
                    spaces: 2,
                };
            }
        }
        else if (token === tokens_1.GRAPH_PATTERN_SEPARATOR) {
            while (actual.token !== tokens_1.OPEN_MULTI_BLOCK)
                actual = stack.pop();
            actual.spaces = 0;
            actual.subject = 0;
            actual.property = 0;
        }
        if (nextToken === tokens_1.CLOSE_MULTI_BLOCK) {
            while (actual.token !== tokens_1.OPEN_MULTI_BLOCK)
                actual = stack.pop();
            actual = stack.pop();
        }
        else if (nextToken === tokens_1.CLOSE_MULTI_BN) {
            while (actual.token !== tokens_1.OPEN_MULTI_BN)
                actual = stack.pop();
            actual = stack.pop();
        }
        else if (nextToken === tokens_1.CLOSE_MULTI_LIST) {
            while (actual.token !== tokens_1.OPEN_MULTI_LIST)
                actual = stack.pop();
            actual = stack.pop();
        }
        if (tokenString.endsWith("\n")) {
            tokenString = tokenString + " ".repeat(actual.indentation);
        }
        return res + tokenString;
    }, "");
}
function finishDecorator(container, object) {
    return __1.genericDecorator({
        toCompactString: toCompactString,
        toPrettyString: toPrettyString,
        toString: toPrettyString,
    }, container, object);
}
exports.finishDecorator = finishDecorator;

//# sourceMappingURL=finish.js.map
