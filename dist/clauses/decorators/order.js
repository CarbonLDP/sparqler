"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("../../patterns/tokens");
var tokens_2 = require("../../tokens");
var Container_1 = require("../Container");
var utils_1 = require("../utils");
var limit_offset_1 = require("./limit-offset");
function orderBy(rawCondition) {
    var tokens = [tokens_1.ORDER, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, limit_offset_1.limitOffsetDecorator(container, {}));
}
function orderDecorator(container, object) {
    return utils_1.genericDecorator({ orderBy: orderBy }, container, limit_offset_1.limitOffsetDecorator(container, object));
}
exports.orderDecorator = orderDecorator;

//# sourceMappingURL=order.js.map
