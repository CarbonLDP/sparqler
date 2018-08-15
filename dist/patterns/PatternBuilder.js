"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../data/Container");
var Factory_1 = require("../data/Factory");
var SubSelectPattern_1 = require("./clausePatterns/SubSelectPattern");
var NotTriplePatternsBuilder_1 = require("./notTriplePatterns/NotTriplePatternsBuilder");
var TriplePatternsBuilder_1 = require("./triplePatterns/TriplePatternsBuilder");
exports.PatternBuilder = {
    create: function (iriResolver) {
        var container = new Container_1.Container({
            iriResolver: iriResolver,
            targetToken: void 0,
        });
        return exports.PatternBuilder
            .createFrom(container, {});
    },
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(TriplePatternsBuilder_1.TriplePatternsBuilder.createFrom, NotTriplePatternsBuilder_1.NotTriplePatternsBuilder.createFrom, SubSelectPattern_1.SubSelectPattern.createFrom)(container, object);
    },
};

//# sourceMappingURL=PatternBuilder.js.map
