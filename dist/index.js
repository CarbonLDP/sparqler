"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./clauses/Container");
var decorators_1 = require("./clauses/decorators");
var FinishClause_1 = require("./clauses/FinishClause");
var QueryClause_1 = require("./clauses/QueryClause");
var IRIResolver2_1 = require("./data/IRIResolver2");
var QueryUnitContainer_1 = require("./data/QueryUnitContainer");
var tokens_1 = require("./tokens");
var SPARQLER = (function () {
    function SPARQLER(finishDecorator) {
        var container = new Container_1.Container(finishDecorator);
        return decorators_1.queryDecorator(container, this);
    }
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
exports.default = SPARQLER;
var SPARQLER2 = (function () {
    function SPARQLER2(finishSelectFactory) {
        if (finishSelectFactory === void 0) { finishSelectFactory = FinishClause_1.FinishClause.createFrom; }
        var container = new QueryUnitContainer_1.QueryUnitContainer({
            iriResolver: new IRIResolver2_1.IRIResolver2(),
            targetToken: new tokens_1.QueryToken(void 0),
            selectFinishClauseFactory: finishSelectFactory,
        });
        return QueryClause_1.QueryClause.createFrom(container, this);
    }
    return SPARQLER2;
}());
exports.SPARQLER2 = SPARQLER2;

//# sourceMappingURL=index.js.map
