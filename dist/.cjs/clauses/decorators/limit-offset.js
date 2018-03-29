"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Container_1 = require("./../Container");
var values_1 = require("./values");
var tokens_1 = require("./../../patterns/tokens");
var tokens_2 = require("./../../tokens");
var CurrentMethod;
(function (CurrentMethod) {
    CurrentMethod[CurrentMethod["LIMIT"] = 0] = "LIMIT";
    CurrentMethod[CurrentMethod["OFFSET"] = 1] = "OFFSET";
})(CurrentMethod = exports.CurrentMethod || (exports.CurrentMethod = {}));
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
}(Container_1.Container));
exports.LimitOffsetContainer = LimitOffsetContainer;
function limit(limit) {
    var tokens = [tokens_1.LIMIT, new tokens_2.NumberLiteral(limit)];
    if (this._offsetUsed) {
        var container_1 = new Container_1.Container(this, tokens);
        return this._finishDecorator(container_1, values_1.valuesDecorator(container_1, {}));
    }
    var container = new LimitOffsetContainer(this, tokens, CurrentMethod.LIMIT);
    return this._finishDecorator(container, offsetDecorator(container, {}));
}
exports.limit = limit;
function offset(offset) {
    var tokens = [tokens_1.OFFSET, new tokens_2.NumberLiteral(offset)];
    if (this._limitUsed) {
        var container_2 = new Container_1.Container(this, tokens);
        return this._finishDecorator(container_2, values_1.valuesDecorator(container_2, {}));
    }
    var container = new LimitOffsetContainer(this, tokens, CurrentMethod.OFFSET);
    return this._finishDecorator(container, limitDecorator(container, {}));
}
exports.offset = offset;
function limitDecorator(container, object) {
    return Object.assign(values_1.valuesDecorator(container, object), {
        limit: limit.bind(container),
    });
}
exports.limitDecorator = limitDecorator;
function offsetDecorator(container, object) {
    return Object.assign(values_1.valuesDecorator(container, object), {
        offset: offset.bind(container),
    });
}
exports.offsetDecorator = offsetDecorator;
function limitOffsetDecorator(container, object) {
    return Object.assign(values_1.valuesDecorator(container, object), {
        limit: limit.bind(container),
        offset: offset.bind(container),
    });
}
exports.limitOffsetDecorator = limitOffsetDecorator;

//# sourceMappingURL=limit-offset.js.map
