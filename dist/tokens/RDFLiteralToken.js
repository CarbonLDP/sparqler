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
var LiteralToken_1 = require("./LiteralToken");
var RDFLiteralToken = (function (_super) {
    __extends(RDFLiteralToken, _super);
    function RDFLiteralToken(value, typeOrLanguage) {
        var _this = _super.call(this, value) || this;
        if (!typeOrLanguage)
            return _this;
        if (typeOrLanguage.token === "language") {
            _this.language = typeOrLanguage;
        }
        else {
            _this.type = typeOrLanguage;
        }
        return _this;
    }
    RDFLiteralToken.prototype.toString = function (spaces) {
        var value = _super.prototype.toString.call(this);
        if (this.language)
            return value + this.language;
        if (this.type)
            return value + "^^" + this.type;
        return value;
    };
    return RDFLiteralToken;
}(LiteralToken_1.LiteralToken));
exports.RDFLiteralToken = RDFLiteralToken;

//# sourceMappingURL=RDFLiteralToken.js.map
