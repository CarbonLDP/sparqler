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
var ConstructToken = (function (_super) {
    __extends(ConstructToken, _super);
    function ConstructToken() {
        var _this = _super.call(this) || this;
        _this.token = "construct";
        _this.triples = [];
        return _this;
    }
    ConstructToken.prototype.addTriple = function () {
        var triple = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            triple[_i] = arguments[_i];
        }
        var _a;
        (_a = this.triples).push.apply(_a, triple);
        return this;
    };
    ConstructToken.prototype.toString = function () {
        var query = "CONSTRUCT { " + this.triples.join(". ") + " } " + this.where;
        if (this.modifiers.length)
            query += " " + this.modifiers.join(" ");
        return query;
    };
    return ConstructToken;
}(CommonQueryClauseToken_1.CommonQueryClauseToken));
exports.ConstructToken = ConstructToken;

//# sourceMappingURL=ConstructToken.js.map
