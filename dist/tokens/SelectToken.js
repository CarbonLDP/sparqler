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
var CommonSelectToken_1 = require("./CommonSelectToken");
var printing_1 = require("./printing");
var SelectToken = (function (_super) {
    __extends(SelectToken, _super);
    function SelectToken(modifier, dataset) {
        var _this = _super.call(this, modifier) || this;
        _this.token = "select";
        _this.dataset = dataset;
        return _this;
    }
    SelectToken.prototype.toString = function (spaces) {
        var query = _super.prototype.toString.call(this, spaces);
        var separator = printing_1.getSeparator(spaces);
        if (this.dataset)
            query += separator + this.dataset;
        query += separator + this.where.toString(spaces);
        if (this.modifiers.length)
            query += separator + this.modifiers.join(separator);
        return query;
    };
    return SelectToken;
}(CommonSelectToken_1.CommonSelectToken));
exports.SelectToken = SelectToken;

//# sourceMappingURL=SelectToken.js.map
