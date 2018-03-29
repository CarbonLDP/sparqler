import * as tslib_1 from "tslib";
import { Identifier } from "./Identifier";
import { NewLineSymbol } from "./NewLineSymbol";
import { Operator } from "./Operator";
import { RightSymbol } from "./RightSymbol";
import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
var StringLiteral = (function (_super) {
    tslib_1.__extends(StringLiteral, _super);
    function StringLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringLiteral.prototype.getPrettySeparator = function (nextToken) {
        if ((nextToken instanceof Identifier && nextToken["value"] !== "AS") || (nextToken instanceof NewLineSymbol && (nextToken["value"] === ")" || nextToken["value"] === "}")))
            return NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator || (nextToken instanceof RightSymbol && nextToken["value"] !== ")"))
            return EMPTY_SEPARATOR;
        return SPACE_SEPARATOR;
    };
    StringLiteral.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof Identifier)
            return SPACE_SEPARATOR;
        return EMPTY_SEPARATOR;
    };
    return StringLiteral;
}(Token));
export { StringLiteral };
export default StringLiteral;

//# sourceMappingURL=StringLiteral.js.map
