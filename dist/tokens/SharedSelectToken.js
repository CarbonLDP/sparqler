"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SharedQueryClauseToken_1 = require("./SharedQueryClauseToken");
var SharedSelectToken = (function (_super) {
    __extends(SharedSelectToken, _super);
    function SharedSelectToken(modifier) {
        var _this = _super.call(this) || this;
        _this.modifier = modifier;
        _this.variables = [];
        return _this;
    }
    SharedSelectToken.prototype.addVariable = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var _a;
        (_a = this.variables).push.apply(_a, variables);
        return this;
    };
    SharedSelectToken.prototype.toString = function (spaces) {
        var query = "SELECT";
        if (this.modifier)
            query += " " + this.modifier;
        query += this.variables.length ?
            " " + this.variables.join(" ") :
            " *";
        return query;
    };
    return SharedSelectToken;
}(SharedQueryClauseToken_1.SharedQueryClauseToken));
exports.SharedSelectToken = SharedSelectToken;

//# sourceMappingURL=SharedSelectToken.js.map