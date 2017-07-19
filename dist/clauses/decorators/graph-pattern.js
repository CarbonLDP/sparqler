"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("sparqler/clauses/utils");
function getPattern() {
    return [].concat(this._tokens);
}
function graphPatternDecorator(container, object) {
    return utils_1.genericDecorator({ getPattern: getPattern }, container, object);
}
exports.graphPatternDecorator = graphPatternDecorator;

//# sourceMappingURL=graph-pattern.js.map
