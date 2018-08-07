"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FinishClause_1 = require("../../clauses/FinishClause");
var Factory_1 = require("../../data/Factory");
var Pattern_1 = require("../Pattern");
exports.FinishClausePattern = {
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(Pattern_1.Pattern.createFrom, FinishClause_1.FinishClause.createFrom)(container, object);
    },
};

//# sourceMappingURL=FinishClausePattern.js.map
