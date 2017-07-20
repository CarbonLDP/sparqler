"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("sparqler/clauses/Container");
var decorators_1 = require("sparqler/clauses/decorators");
var SPARQLER = (function () {
    function SPARQLER(finishDecorator) {
        var container = new Container_1.Container(finishDecorator);
        return decorators_1.queryDecorator(container, this);
    }
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
exports.default = SPARQLER;

//# sourceMappingURL=index.js.map
