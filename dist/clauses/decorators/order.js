"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./../Container");
var _1 = require("./");
var tokens_1 = require("./../../patterns/tokens");
var tokens_2 = require("./../../tokens");
function orderBy(rawCondition) {
    var tokens = [tokens_1.ORDER, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, _1.limitOffsetDecorator(container, {}));
}
exports.orderBy = orderBy;
function orderDecorator(container, object) {
    return Object.assign(_1.limitOffsetDecorator(container, object), {
        orderBy: orderBy.bind(container),
    });
}
exports.orderDecorator = orderDecorator;

//# sourceMappingURL=order.js.map
