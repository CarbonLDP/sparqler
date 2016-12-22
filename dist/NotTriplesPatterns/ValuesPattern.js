"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotTriplesPattern_1 = require("./NotTriplesPattern");
var Tokens_1 = require("../Patterns/Tokens");
var ObjectPattern = require("../Utils/ObjectPattern");
var ValuesPattern = (function (_super) {
    __extends(ValuesPattern, _super);
    function ValuesPattern(resolver, variables) {
        var _this = _super.call(this, [Tokens_1.VALUES]) || this;
        _this.init();
        _this.resolver = resolver;
        _this.isSingle = variables.length === 1;
        if (_this.isSingle) {
            (_a = _this.patternTokens).push.apply(_a, variables[0].getSelfTokens().concat([Tokens_1.OPEN_SINGLE_BLOCK]));
        }
        else {
            _this.patternTokens.push(Tokens_1.OPEN_SINGLE_LIST);
            variables.forEach(function (variable) {
                return (_a = _this.patternTokens).push.apply(_a, variable.getSelfTokens());
                var _a;
            });
            _this.patternTokens.push(Tokens_1.CLOSE_SINGLE_LIST, Tokens_1.OPEN_MULTI_BLOCK);
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
        if (this.isSingle) {
            (_a = this.patternTokens).push.apply(_a, ObjectPattern.serialize(values[0]));
        }
        else {
            this.patternTokens.push(Tokens_1.OPEN_SINGLE_LIST);
            values.forEach(function (value) {
                return (_a = _this.patternTokens).push.apply(_a, ObjectPattern.serialize(value));
                var _a;
            });
            this.patternTokens.push(Tokens_1.CLOSE_SINGLE_LIST);
        }
        return this.interfaces.addPattern;
        var _a;
    };
    ValuesPattern.prototype.getPattern = function () {
        if (this.isSingle) {
            this.patternTokens.push(Tokens_1.CLOSE_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(Tokens_1.CLOSE_MULTI_BLOCK);
        }
        return this.patternTokens;
    };
    ValuesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
                getPattern: function () { return _this.getPattern(); },
            }
        };
    };
    return ValuesPattern;
}(NotTriplesPattern_1.NotTriplesPattern));
exports.ValuesPattern = ValuesPattern;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValuesPattern;

//# sourceMappingURL=ValuesPattern.js.map
