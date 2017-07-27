"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("sparqler/clauses/Container");
var decorators_1 = require("sparqler/clauses/decorators");
var utils_1 = require("sparqler/clauses/utils");
var tokens_1 = require("sparqler/patterns/tokens");
var tokens_2 = require("sparqler/tokens");
function groupBy(rawCondition) {
    var tokens = [tokens_1.GROUP, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, decorators_1.havingDecorator(container, {}));
}
function groupDecorator(container, object) {
    return utils_1.genericDecorator({ groupBy: groupBy }, container, decorators_1.havingDecorator(container, object));
}
exports.groupDecorator = groupDecorator;

//# sourceMappingURL=group.js.map
