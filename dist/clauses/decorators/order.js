"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("sparqler/clauses/Container");
var decorators_1 = require("sparqler/clauses/decorators");
var utils_1 = require("sparqler/clauses/utils");
var tokens_1 = require("sparqler/patterns/tokens");
var tokens_2 = require("sparqler/tokens");
function orderBy(rawCondition) {
    var tokens = [tokens_1.ORDER, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, decorators_1.limitOffsetDecorator(container, {}));
}
function orderDecorator(container, object) {
    return utils_1.genericDecorator({ orderBy: orderBy }, container, decorators_1.limitOffsetDecorator(container, object));
}
exports.orderDecorator = orderDecorator;

//# sourceMappingURL=order.js.map
