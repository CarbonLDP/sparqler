"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = require("sparqler/clauses");
var tokens_1 = require("sparqler/patterns/tokens");
var tokens_2 = require("sparqler/tokens");
var LimitContainer = (function (_super) {
    __extends(LimitContainer, _super);
    function LimitContainer(previousContainer, newTokens, offsetUsed) {
        var _this = _super.call(this, previousContainer, newTokens) || this;
        _this._offsetUsed = offsetUsed;
        Object.freeze(_this);
        return _this;
    }
    return LimitContainer;
}(clauses_1.Container));
exports.LimitContainer = LimitContainer;
var OffsetContainer = (function (_super) {
    __extends(OffsetContainer, _super);
    function OffsetContainer(previousContainer, newTokens, limitUsed) {
        var _this = _super.call(this, previousContainer, newTokens) || this;
        _this._limitUsed = limitUsed;
        Object.freeze(_this);
        return _this;
    }
    return OffsetContainer;
}(clauses_1.Container));
exports.OffsetContainer = OffsetContainer;
function limit(limit) {
    var tokens = [tokens_1.LIMIT, new tokens_2.NumberLiteral(limit)];
    if (this._offsetUsed) {
        var container_1 = new clauses_1.Container(this, tokens);
        return this._finishDecorator(container_1, {});
    }
    var container = new OffsetContainer(this, tokens, true);
    return this._finishDecorator(container, offsetBuilderDecorator(container, {}));
}
exports.limit = limit;
function offset(offset) {
    var tokens = [tokens_1.OFFSET, new tokens_2.NumberLiteral(offset)];
    if (this._limitUsed) {
        var container_2 = new clauses_1.Container(this, tokens);
        return this._finishDecorator(container_2, {});
    }
    var container = new LimitContainer(this, tokens, true);
    return this._finishDecorator(container, limitBuilderDecorator(container, {}));
}
exports.offset = offset;
function limitBuilderDecorator(container, object) {
    return clauses_1.genericDecorator({ limit: limit }, container, object);
}
exports.limitBuilderDecorator = limitBuilderDecorator;
function offsetBuilderDecorator(container, object) {
    return clauses_1.genericDecorator({ offset: offset }, container, object);
}
exports.offsetBuilderDecorator = offsetBuilderDecorator;
function limitOffsetDecorator(container, object) {
    return clauses_1.genericDecorator({
        limit: limit,
        offset: offset,
    }, container, object);
}
exports.limitOffsetDecorator = limitOffsetDecorator;

//# sourceMappingURL=limit-offset.js.map
