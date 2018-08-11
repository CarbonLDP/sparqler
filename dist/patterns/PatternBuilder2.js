"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../data/Container");
var Factory_1 = require("../data/Factory");
var SubSelectPattern_1 = require("./clausePatterns/SubSelectPattern");
var NotTriplePatternBuilder_1 = require("./notTriplePatterns/NotTriplePatternBuilder");
var TriplePatternBuilder_1 = require("./triplePatterns/TriplePatternBuilder");
exports.PatternBuilder2 = {
    create: function (iriResolver) {
        var container = new Container_1.Container({
            iriResolver: iriResolver,
            targetToken: { token: "none" },
        });
        return exports.PatternBuilder2
            .createFrom(container, {});
    },
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(TriplePatternBuilder_1.TriplePatternBuilder.createFrom, NotTriplePatternBuilder_1.NotTriplePatternBuilder.createFrom, SubSelectPattern_1.SubSelectPattern.createFrom)(container, object);
    },
};

//# sourceMappingURL=PatternBuilder2.js.map
