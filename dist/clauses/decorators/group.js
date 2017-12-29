"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./../Container");
var _1 = require("./");
var utils_1 = require("./../utils");
var tokens_1 = require("./../../patterns/tokens");
var tokens_2 = require("./../../tokens");
function groupBy(rawCondition) {
    var tokens = [tokens_1.GROUP, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, _1.havingDecorator(container, {}));
}
function groupDecorator(container, object) {
    return utils_1.genericDecorator({ groupBy: groupBy }, container, _1.havingDecorator(container, object));
}
exports.groupDecorator = groupDecorator;

//# sourceMappingURL=group.js.map
