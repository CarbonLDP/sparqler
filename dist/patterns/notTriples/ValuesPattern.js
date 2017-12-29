"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var tokens_1 = require("./../tokens");
var ObjectPattern_1 = require("./../../utils/ObjectPattern");
var ValuesPattern = (function (_super) {
    __extends(ValuesPattern, _super);
    function ValuesPattern(resolver, variables) {
        var _this = _super.call(this, [tokens_1.VALUES]) || this;
        _this.init();
        _this.resolver = resolver;
        _this.length = variables.length;
        if (_this.length === 1) {
            (_a = _this.patternTokens).push.apply(_a, variables[0].getSelfTokens().concat([tokens_1.OPEN_SINGLE_BLOCK]));
        }
        else {
            _this.patternTokens.push(tokens_1.OPEN_SINGLE_LIST);
            variables.forEach(function (variable) {
                return (_a = _this.patternTokens).push.apply(_a, variable.getSelfTokens());
                var _a;
            });
            _this.patternTokens.push(tokens_1.CLOSE_SINGLE_LIST, tokens_1.OPEN_MULTI_BLOCK);
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
            (_a = this.patternTokens).push.apply(_a, ObjectPattern_1.serialize(values[0]));
        }
        else {
            this.patternTokens.push(tokens_1.OPEN_SINGLE_LIST);
            values.forEach(function (value) {
                return (_a = _this.patternTokens).push.apply(_a, ObjectPattern_1.serialize(value));
                var _a;
            });
            this.patternTokens.push(tokens_1.CLOSE_SINGLE_LIST);
        }
        return this.interfaces.addPattern;
        var _a;
    };
    ValuesPattern.prototype.getPattern = function () {
        if (this.length === 1) {
            this.patternTokens.push(tokens_1.CLOSE_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(tokens_1.CLOSE_MULTI_BLOCK);
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
}(_1.NotTriplesPattern));
exports.ValuesPattern = ValuesPattern;
exports.default = ValuesPattern;

//# sourceMappingURL=ValuesPattern.js.map
