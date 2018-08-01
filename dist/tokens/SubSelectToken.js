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
var CommonSelectToken_1 = require("./CommonSelectToken");
var SubSelectToken = (function (_super) {
    __extends(SubSelectToken, _super);
    function SubSelectToken(modifier, values) {
        var _this = _super.call(this, modifier) || this;
        _this.token = "subSelect";
        _this.values = values;
        return _this;
    }
    SubSelectToken.prototype.toString = function () {
        var query = _super.prototype.toString.call(this);
        query += " " + this.where;
        if (this.modifiers.length)
            query += " " + this.modifiers.join(" ");
        if (this.values)
            query += " " + this.values;
        return "{ " + query + " }";
    };
    return SubSelectToken;
}(CommonSelectToken_1.CommonSelectToken));
exports.SubSelectToken = SubSelectToken;

//# sourceMappingURL=SubSelectToken.js.map
