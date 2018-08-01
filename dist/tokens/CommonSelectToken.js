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
var CommonQueryClauseToken_1 = require("./CommonQueryClauseToken");
var CommonSelectToken = (function (_super) {
    __extends(CommonSelectToken, _super);
    function CommonSelectToken(modifier) {
        var _this = _super.call(this) || this;
        _this.modifier = modifier;
        _this.variables = [];
        return _this;
    }
    CommonSelectToken.prototype.addVariable = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var _a;
        (_a = this.variables).push.apply(_a, variables);
        return this;
    };
    CommonSelectToken.prototype.toString = function () {
        var query = "SELECT";
        if (this.modifier)
            query += " " + this.modifier;
        if (this.variables.length)
            query += " " + this.variables.join(" ");
        return query;
    };
    return CommonSelectToken;
}(CommonQueryClauseToken_1.CommonQueryClauseToken));
exports.CommonSelectToken = CommonSelectToken;

//# sourceMappingURL=CommonSelectToken.js.map
