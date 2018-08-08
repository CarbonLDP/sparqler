"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = require("./GroupPatternToken");
var GraphToken = (function () {
    function GraphToken(graph) {
        this.token = "graph";
        this.graph = graph;
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    GraphToken.prototype.addPattern = function () {
        var pattern = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pattern[_i] = arguments[_i];
        }
        var _a;
        (_a = this.groupPattern.patterns).push.apply(_a, pattern);
        return this;
    };
    GraphToken.prototype.toString = function (spaces) {
        return "GRAPH " + this.graph + " " + this.groupPattern.toString(spaces);
    };
    return GraphToken;
}());
exports.GraphToken = GraphToken;

//# sourceMappingURL=GraphToken.js.map
