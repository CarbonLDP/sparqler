import * as tslib_1 from "tslib";
import { VAR_SYMBOL } from "./../tokens";
import { StringLiteral, } from "./../../tokens";
import { TriplesSubject } from "./TriplesSubject";
var nameRegex = /^((?:[0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))((?:[0-9A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))*$/;
var Variable = (function (_super) {
    tslib_1.__extends(Variable, _super);
    function Variable(resolver, name) {
        var _this = this;
        if (!nameRegex.test(name))
            throw new Error("Invalid variable name");
        _this = _super.call(this, resolver) || this;
        _this.elementTokens = [VAR_SYMBOL, new StringLiteral(name)];
        return _this;
    }
    return Variable;
}(TriplesSubject));
export { Variable };
export default Variable;

//# sourceMappingURL=Variable.js.map
