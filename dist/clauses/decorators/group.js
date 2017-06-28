"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = require("sparqler/clauses");
var decorators_1 = require("sparqler/clauses/decorators");
var tokens_1 = require("sparqler/patterns/tokens");
var tokens_2 = require("sparqler/tokens");
function groupBy(rawCondition) {
    var tokens = [tokens_1.GROUP, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new clauses_1.Container(this, tokens);
    return this._finishDecorator(container, decorators_1.havingDecorator(container, {}));
}
function groupDecorator(container, object) {
    return clauses_1.genericDecorator({ groupBy: groupBy }, container, decorators_1.havingDecorator(container, object));
}
exports.groupDecorator = groupDecorator;

//# sourceMappingURL=group.js.map
