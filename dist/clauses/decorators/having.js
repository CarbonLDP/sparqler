"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./../Container");
var _1 = require("./");
var utils_1 = require("./../utils");
var tokens_1 = require("./../../patterns/tokens");
var tokens_2 = require("./../../tokens");
function having(rawCondition) {
    var tokens = [tokens_1.HAVING, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, _1.orderDecorator(container, {}));
}
function havingDecorator(container, object) {
    return utils_1.genericDecorator({ having: having }, container, _1.orderDecorator(container, object));
}
exports.havingDecorator = havingDecorator;

//# sourceMappingURL=having.js.map
