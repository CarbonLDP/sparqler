"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesSubject_1 = require("./TriplesSubject");
var StringLiteral_1 = require("../Tokens/StringLiteral");
var Tokens_1 = require("../Patterns/Tokens");
var Variable = (function (_super) {
    __extends(Variable, _super);
    function Variable(resolver, name) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = [Tokens_1.VAR_SYMBOL, new StringLiteral_1.StringLiteral(name)];
        return _this;
    }
    return Variable;
}(TriplesSubject_1.TriplesSubject));
exports.Variable = Variable;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Variable;

//# sourceMappingURL=Variable.js.map
