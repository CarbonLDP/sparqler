"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FinishClause_1 = require("./clauses/FinishClause");
var QueryClause_1 = require("./clauses/QueryClause");
var IRIResolver_1 = require("./data/IRIResolver");
var QueryUnitContainer_1 = require("./data/QueryUnitContainer");
var QueryToken_1 = require("./tokens/QueryToken");
var SPARQLER = (function () {
    function SPARQLER(finishSelectFactory) {
        if (finishSelectFactory === void 0) { finishSelectFactory = FinishClause_1.FinishClause.createFrom; }
        var container = new QueryUnitContainer_1.QueryUnitContainer({
            iriResolver: new IRIResolver_1.IRIResolver(),
            targetToken: new QueryToken_1.QueryToken(void 0),
            selectFinishClauseFactory: finishSelectFactory,
        });
        return QueryClause_1.QueryClause.createFrom(container, this);
    }
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
exports.default = SPARQLER;

//# sourceMappingURL=index.js.map
