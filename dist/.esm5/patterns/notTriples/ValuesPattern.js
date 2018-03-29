import * as tslib_1 from "tslib";
import { NotTriplesPattern } from "./";
import { CLOSE_MULTI_BLOCK, CLOSE_SINGLE_BLOCK, CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK, OPEN_SINGLE_BLOCK, OPEN_SINGLE_LIST, VALUES, } from "./../tokens";
import { serialize } from "./../../utils/ObjectPattern";
var ValuesPattern = (function (_super) {
    tslib_1.__extends(ValuesPattern, _super);
    function ValuesPattern(resolver, variables) {
        var _this = _super.call(this, [VALUES]) || this;
        _this.init();
        _this.resolver = resolver;
        _this.length = variables.length;
        if (_this.length === 1) {
            (_a = _this.patternTokens).push.apply(_a, variables[0].getSelfTokens().concat([OPEN_SINGLE_BLOCK]));
        }
        else {
            _this.patternTokens.push(OPEN_SINGLE_LIST);
            variables.forEach(function (variable) {
                return (_a = _this.patternTokens).push.apply(_a, variable.getSelfTokens());
                var _a;
            });
            _this.patternTokens.push(CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK);
        }
        return _this;
        var _a;
    }
    ValuesPattern.prototype.has = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (this.length !== values.length)
            throw new Error("InvalidArgumentError: The number of variables and values are different.");
        if (this.length === 1) {
            (_a = this.patternTokens).push.apply(_a, serialize(values[0]));
        }
        else {
            this.patternTokens.push(OPEN_SINGLE_LIST);
            values.forEach(function (value) {
                return (_a = _this.patternTokens).push.apply(_a, serialize(value));
                var _a;
            });
            this.patternTokens.push(CLOSE_SINGLE_LIST);
        }
        return this.interfaces.addPattern;
        var _a;
    };
    ValuesPattern.prototype.getPattern = function () {
        if (this.length === 1) {
            this.patternTokens.push(CLOSE_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(CLOSE_MULTI_BLOCK);
        }
        return this.patternTokens;
    };
    ValuesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
                getPattern: function () { return _this.getPattern(); },
            },
        };
    };
    return ValuesPattern;
}(NotTriplesPattern));
export { ValuesPattern };
export default ValuesPattern;

//# sourceMappingURL=ValuesPattern.js.map
