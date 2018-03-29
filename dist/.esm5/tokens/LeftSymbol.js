import * as tslib_1 from "tslib";
import { Identifier } from "./Identifier";
import { EMPTY_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
var LeftSymbol = (function (_super) {
    tslib_1.__extends(LeftSymbol, _super);
    function LeftSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof LeftSymbol || nextToken instanceof Identifier)
            return SPACE_SEPARATOR;
        return EMPTY_SEPARATOR;
    };
    LeftSymbol.prototype.getCompactSeparator = function (nextToken) {
        return EMPTY_SEPARATOR;
    };
    return LeftSymbol;
}(Token));
export { LeftSymbol };
export default LeftSymbol;

//# sourceMappingURL=LeftSymbol.js.map
