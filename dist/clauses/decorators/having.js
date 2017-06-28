"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = require("sparqler/clauses");
var decorators_1 = require("sparqler/clauses/decorators");
var tokens_1 = require("sparqler/patterns/tokens");
var tokens_2 = require("sparqler/tokens");
function having(rawCondition) {
    var tokens = [tokens_1.HAVING, new tokens_2.StringLiteral(rawCondition)];
    var container = new clauses_1.Container(this, tokens);
    return this._finishDecorator(container, decorators_1.orderDecorator(container, {}));
}
function havingDecorator(container, object) {
    return clauses_1.genericDecorator({ having: having }, container, decorators_1.orderDecorator(container, object));
}
exports.havingDecorator = havingDecorator;

//# sourceMappingURL=having.js.map
