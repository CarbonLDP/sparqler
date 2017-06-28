"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = require("sparqler/clauses");
function getPattern() {
    return this._tokens;
}
function graphPatternDecorator(container, object) {
    return clauses_1.genericDecorator({ getPattern: getPattern }, container, object);
}
exports.graphPatternDecorator = graphPatternDecorator;

//# sourceMappingURL=graph-pattern.js.map
