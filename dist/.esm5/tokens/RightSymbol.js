import * as tslib_1 from "tslib";
import { Identifier } from "./Identifier";
import { LeftSymbol } from "./LeftSymbol";
import { NewLineSymbol } from "./NewLineSymbol";
import { Operator } from "./Operator";
import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
var RightSymbol = (function (_super) {
    tslib_1.__extends(RightSymbol, _super);
    function RightSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RightSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier && nextToken["value"] !== "UNDEF")
            return NEW_LINE_SEPARATOR;
        if (nextToken instanceof NewLineSymbol) {
            if (["}", "]", ")"].indexOf(nextToken["value"]) !== -1) {
                return NEW_LINE_SEPARATOR;
            }
        }
        if (nextToken instanceof LeftSymbol) {
            if (nextToken["value"] === "(")
                return NEW_LINE_SEPARATOR;
        }
        if (nextToken instanceof Operator)
            return EMPTY_SEPARATOR;
        return SPACE_SEPARATOR;
    };
    RightSymbol.prototype.getCompactSeparator = function (nextToken) {
        return EMPTY_SEPARATOR;
    };
    return RightSymbol;
}(Token));
export { RightSymbol };
export default RightSymbol;

//# sourceMappingURL=RightSymbol.js.map
