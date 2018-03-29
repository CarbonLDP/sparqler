import { joinPatterns } from "./utils";
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
        return "GRAPH " + this.graph + " { " + joinPatterns(this.patterns) + " }";
    };
    return GraphToken;
}());
export { GraphToken };

//# sourceMappingURL=GraphToken.js.map
