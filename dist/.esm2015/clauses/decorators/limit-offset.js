import { Container } from "./../Container";
import { valuesDecorator } from "./values";
import { LIMIT, OFFSET, } from "./../../patterns/tokens";
import { NumberLiteral, } from "./../../tokens";
export var CurrentMethod;
(function (CurrentMethod) {
    CurrentMethod[CurrentMethod["LIMIT"] = 0] = "LIMIT";
    CurrentMethod[CurrentMethod["OFFSET"] = 1] = "OFFSET";
})(CurrentMethod || (CurrentMethod = {}));
export class LimitOffsetContainer extends Container {
    constructor(previousContainer, newTokens, currentMethod) {
        super(previousContainer, newTokens);
        this._offsetUsed = currentMethod === CurrentMethod.OFFSET;
        this._limitUsed = currentMethod === CurrentMethod.LIMIT;
        Object.freeze(this);
    }
}
export function limit(limit) {
    const tokens = [LIMIT, new NumberLiteral(limit)];
    if (this._offsetUsed) {
        const container = new Container(this, tokens);
        return this._finishDecorator(container, valuesDecorator(container, {}));
    }
    const container = new LimitOffsetContainer(this, tokens, CurrentMethod.LIMIT);
    return this._finishDecorator(container, offsetDecorator(container, {}));
}
export function offset(offset) {
    const tokens = [OFFSET, new NumberLiteral(offset)];
    if (this._limitUsed) {
        const container = new Container(this, tokens);
        return this._finishDecorator(container, valuesDecorator(container, {}));
    }
    const container = new LimitOffsetContainer(this, tokens, CurrentMethod.OFFSET);
    return this._finishDecorator(container, limitDecorator(container, {}));
}
export function limitDecorator(container, object) {
    return Object.assign(valuesDecorator(container, object), {
        limit: limit.bind(container),
    });
}
export function offsetDecorator(container, object) {
    return Object.assign(valuesDecorator(container, object), {
        offset: offset.bind(container),
    });
}
export function limitOffsetDecorator(container, object) {
    return Object.assign(valuesDecorator(container, object), {
        limit: limit.bind(container),
        offset: offset.bind(container),
    });
}

//# sourceMappingURL=limit-offset.js.map
