import * as tslib_1 from "tslib";
import { Container } from "./../Container";
import { valuesDecorator } from "./values";
import { LIMIT, OFFSET, } from "./../../patterns/tokens";
import { NumberLiteral, } from "./../../tokens";
export var CurrentMethod;
(function (CurrentMethod) {
    CurrentMethod[CurrentMethod["LIMIT"] = 0] = "LIMIT";
    CurrentMethod[CurrentMethod["OFFSET"] = 1] = "OFFSET";
})(CurrentMethod || (CurrentMethod = {}));
var LimitOffsetContainer = (function (_super) {
    tslib_1.__extends(LimitOffsetContainer, _super);
    function LimitOffsetContainer(previousContainer, newTokens, currentMethod) {
        var _this = _super.call(this, previousContainer, newTokens) || this;
        _this._offsetUsed = currentMethod === CurrentMethod.OFFSET;
        _this._limitUsed = currentMethod === CurrentMethod.LIMIT;
        Object.freeze(_this);
        return _this;
    }
    return LimitOffsetContainer;
}(Container));
export { LimitOffsetContainer };
export function limit(limit) {
    var tokens = [LIMIT, new NumberLiteral(limit)];
    if (this._offsetUsed) {
        var container_1 = new Container(this, tokens);
        return this._finishDecorator(container_1, valuesDecorator(container_1, {}));
    }
    var container = new LimitOffsetContainer(this, tokens, CurrentMethod.LIMIT);
    return this._finishDecorator(container, offsetDecorator(container, {}));
}
export function offset(offset) {
    var tokens = [OFFSET, new NumberLiteral(offset)];
    if (this._limitUsed) {
        var container_2 = new Container(this, tokens);
        return this._finishDecorator(container_2, valuesDecorator(container_2, {}));
    }
    var container = new LimitOffsetContainer(this, tokens, CurrentMethod.OFFSET);
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
