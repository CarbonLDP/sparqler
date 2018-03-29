import { BASE, CLOSE_MULTI_BLOCK, CLOSE_MULTI_BN, CLOSE_MULTI_LIST, EMPTY_SEPARATOR, GRAPH_PATTERN_SEPARATOR, OPEN_MULTI_BLOCK, OPEN_MULTI_BN, OPEN_MULTI_LIST, PREFIX, SAME_PROPERTY_SEPARATOR, SAME_SUBJECT_SEPARATOR, SELECT, WHERE, } from "./../../patterns/tokens";
import { NewLineSymbol, StringLiteral, TokenFormat, } from "./../../tokens";
function toCompactString() {
    const tokens = this._tokens
        .filter(token => token !== WHERE);
    const maxTokens = [SELECT];
    let baseTokens;
    for (let index = 0, token = tokens[index]; token && maxTokens.indexOf(token) === -1; ++index, token = tokens[index]) {
        if (token === PREFIX) {
            const nextToken = tokens[index + 1];
            if (!this._iriResolver._prefixes.get(nextToken["value"])) {
                tokens.splice(index, 6);
                --index;
            }
        }
        else if (token === BASE) {
            baseTokens = tokens.splice(index, 4);
            --index;
        }
    }
    if (baseTokens) {
        const baseString = baseTokens.reduce((res, token, index, thisArray) => {
            let nextToken = thisArray[index + 1];
            return res + token.getTokenValue(TokenFormat.PRETTY, nextToken);
        }, "") + "\n";
        tokens.unshift(new StringLiteral(baseString));
    }
    return tokens.reduce((res, token, index, thisArray) => {
        let nextToken = thisArray[index + 1];
        if (nextToken === EMPTY_SEPARATOR)
            nextToken = thisArray[index + 2];
        return res + token.getTokenValue(TokenFormat.COMPACT, nextToken);
    }, "");
}
function toPrettyString() {
    const stack = [];
    let actual = {
        token: null,
        indentation: 0,
        subject: 0,
        property: 0,
        spaces: 0,
    };
    return this._tokens.reduce((res, token, index, tokens) => {
        let nextToken = tokens[index + 1];
        let tokenString = token.getTokenValue(TokenFormat.PRETTY, nextToken);
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
        if ([OPEN_MULTI_BLOCK, OPEN_MULTI_BN, OPEN_MULTI_LIST].indexOf(token) !== -1) {
            stack.push(actual);
            actual = {
                token: token,
                indentation: actual.indentation + 4,
                subject: 0,
                property: 0,
                spaces: token === OPEN_MULTI_BLOCK ? 0 : token === OPEN_MULTI_BN ? 1 : 2,
            };
        }
        else if ([CLOSE_MULTI_LIST].indexOf(token) !== -1) {
            if (nextToken && !(nextToken instanceof NewLineSymbol)) {
                let parent = actual;
                while ([OPEN_MULTI_BLOCK, OPEN_MULTI_BN, OPEN_MULTI_LIST].indexOf(parent.token) === -1)
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
        else if ([SAME_SUBJECT_SEPARATOR, SAME_PROPERTY_SEPARATOR, CLOSE_MULTI_LIST].indexOf(token) !== -1) {
            let parent = actual;
            while ([OPEN_MULTI_BLOCK, OPEN_MULTI_BN, OPEN_MULTI_LIST, CLOSE_MULTI_LIST, CLOSE_MULTI_BN].indexOf(parent.token) === -1)
                parent = stack.pop();
            stack.push(parent);
            if (token === SAME_SUBJECT_SEPARATOR) {
                actual = {
                    token: token,
                    indentation: parent.indentation + actual.subject,
                    subject: actual.subject,
                    property: 0,
                    spaces: 1,
                };
            }
            else if (token === SAME_PROPERTY_SEPARATOR) {
                actual = {
                    token: token,
                    indentation: parent.indentation + actual.subject + actual.property,
                    subject: actual.subject,
                    property: actual.property,
                    spaces: 2,
                };
            }
        }
        else if (token === GRAPH_PATTERN_SEPARATOR) {
            while (actual.token !== OPEN_MULTI_BLOCK)
                actual = stack.pop();
            actual.spaces = 0;
            actual.subject = 0;
            actual.property = 0;
        }
        if (nextToken === CLOSE_MULTI_BLOCK) {
            while (actual.token !== OPEN_MULTI_BLOCK)
                actual = stack.pop();
            actual = stack.pop();
        }
        else if (nextToken === CLOSE_MULTI_BN) {
            while (actual.token !== OPEN_MULTI_BN)
                actual = stack.pop();
            actual = stack.pop();
        }
        else if (nextToken === CLOSE_MULTI_LIST) {
            while (actual.token !== OPEN_MULTI_LIST)
                actual = stack.pop();
            actual = stack.pop();
        }
        if (tokenString.endsWith("\n")) {
            tokenString = tokenString + " ".repeat(actual.indentation);
        }
        return res + tokenString;
    }, "");
}
export function finishDecorator(container, object) {
    return Object.assign(object, {
        toCompactString: toCompactString.bind(container),
        toPrettyString: toPrettyString.bind(container),
        toString: toPrettyString.bind(container),
    });
}

//# sourceMappingURL=finish.js.map
