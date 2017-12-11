"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var GraphToken = (function () {
    function GraphToken(graph) {
        this.token = "graph";
        this.graph = graph;
        this.patterns = [];
    }
    GraphToken.prototype.addPattern = function () {
        var pattern = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pattern[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, pattern);
        return this;
        var _a;
    };
    GraphToken.prototype.toString = function () {
        return "GRAPH " + this.graph + " { " + utils_1.joinPatterns(this.patterns) + " }";
    };
    return GraphToken;
}());
exports.GraphToken = GraphToken;

//# sourceMappingURL=GraphToken.js.map
