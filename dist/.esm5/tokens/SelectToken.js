import { joinPatterns } from "./utils";
var SelectToken = (function () {
    function SelectToken(modifier) {
        this.token = "select";
        this.modifier = modifier;
        this.variables = [];
        this.patterns = [];
        this.modifiers = [];
    }
    SelectToken.prototype.addVariable = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        (_a = this.variables).push.apply(_a, variables);
        return this;
        var _a;
    };
    SelectToken.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, patterns);
        return this;
        var _a;
    };
    SelectToken.prototype.addModifier = function () {
        var modifier = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modifier[_i] = arguments[_i];
        }
        (_a = this.modifiers).push.apply(_a, modifier);
        return this;
        var _a;
    };
    SelectToken.prototype.toString = function () {
        var query = "SELECT";
        if (this.modifier)
            query += " " + this.modifier;
        if (this.variables.length)
            query += " " + this.variables.join(" ");
        query += " WHERE { " + joinPatterns(this.patterns) + " }";
        if (this.modifiers.length)
            query += " " + this.modifiers.join(" ");
        return query;
    };
    return SelectToken;
}());
export { SelectToken };

//# sourceMappingURL=SelectToken.js.map
