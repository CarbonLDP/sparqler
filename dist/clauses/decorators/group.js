"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var tokens_1 = require("../../patterns/tokens");
var tokens_2 = require("../../tokens");
var having_1 = require("./having");
function groupBy(rawCondition) {
    var tokens = [tokens_1.GROUP, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new _1.Container(this, tokens);
    return this._finishDecorator(container, having_1.havingDecorator(container, {}));
}
function groupDecorator(container, object) {
    return _1.genericDecorator({ groupBy: groupBy }, container, having_1.havingDecorator(container, object));
}
exports.groupDecorator = groupDecorator;

//# sourceMappingURL=group.js.map
