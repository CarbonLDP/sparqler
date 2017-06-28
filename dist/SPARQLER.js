"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = require("sparqler/clauses");
var decorators_1 = require("sparqler/clauses/decorators");
var SPARQLER = (function () {
    function SPARQLER(finishDecorator) {
        var container = new clauses_1.Container(finishDecorator);
        return decorators_1.queryDecorator(container, this);
    }
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
exports.default = SPARQLER;

//# sourceMappingURL=SPARQLER.js.map
