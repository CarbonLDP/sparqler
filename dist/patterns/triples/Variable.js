"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tokens_1 = require("./../tokens");
var tokens_2 = require("./../../tokens");
var TriplesSubject_1 = require("./TriplesSubject");
var nameRegex = /^((?:[0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))((?:[0-9A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))*$/;
var Variable = (function (_super) {
    tslib_1.__extends(Variable, _super);
    function Variable(resolver, name) {
        var _this = this;
        if (!nameRegex.test(name))
            throw new Error("Invalid variable name");
        _this = _super.call(this, resolver) || this;
        _this.elementTokens = [tokens_1.VAR_SYMBOL, new tokens_2.StringLiteral(name)];
        return _this;
    }
    return Variable;
}(TriplesSubject_1.TriplesSubject));
exports.Variable = Variable;
exports.default = Variable;

//# sourceMappingURL=Variable.js.map