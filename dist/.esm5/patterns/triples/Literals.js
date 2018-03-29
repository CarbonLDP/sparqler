import * as tslib_1 from "tslib";
import { CLOSE_QUOTE, LANG_SYMBOL, OPEN_QUOTE, } from "./../tokens";
import { StringLiteral, } from "./../../tokens";
import { addType } from "./../../utils/ObjectPattern";
import { TriplesSubject } from "./TriplesSubject";
var Literal = (function (_super) {
    tslib_1.__extends(Literal, _super);
    function Literal(resolver, value) {
        var _this = _super.call(this, resolver) || this;
        _this.value = value + "";
        return _this;
    }
    return Literal;
}(TriplesSubject));
export { Literal };
var RDFLiteral = (function (_super) {
    tslib_1.__extends(RDFLiteral, _super);
    function RDFLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        _this.elementTokens = [OPEN_QUOTE, new StringLiteral(value), CLOSE_QUOTE];
        return _this;
    }
    RDFLiteral.prototype.ofType = function (type) {
        this.elementTokens = addType(this.value, type);
        return this;
    };
    ;
    RDFLiteral.prototype.withLanguage = function (language) {
        this.elementTokens = [OPEN_QUOTE, new StringLiteral(this.value), CLOSE_QUOTE, LANG_SYMBOL, new StringLiteral(language)];
        return this;
    };
    ;
    return RDFLiteral;
}(Literal));
export { RDFLiteral };
var NumericLiteral = (function (_super) {
    tslib_1.__extends(NumericLiteral, _super);
    function NumericLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        var type = Number.isInteger(value) ? "integer" : "float";
        _this.elementTokens = addType(_this.value, type);
        return _this;
    }
    return NumericLiteral;
}(Literal));
export { NumericLiteral };
var BooleanLiteral = (function (_super) {
    tslib_1.__extends(BooleanLiteral, _super);
    function BooleanLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        _this.elementTokens = addType(_this.value, "boolean");
        return _this;
    }
    return BooleanLiteral;
}(Literal));
export { BooleanLiteral };

//# sourceMappingURL=Literals.js.map
