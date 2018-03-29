import * as tslib_1 from "tslib";
import { Identifier } from "./Identifier";
import { Operator } from "./Operator";
import { RightSymbol } from "./RightSymbol";
import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
var NumberLiteral = (function (_super) {
    tslib_1.__extends(NumberLiteral, _super);
    function NumberLiteral(value) {
        return _super.call(this, value + "") || this;
    }
    NumberLiteral.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier)
            return NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator || nextToken instanceof RightSymbol)
            return EMPTY_SEPARATOR;
        return SPACE_SEPARATOR;
    };
    NumberLiteral.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor)
            return SPACE_SEPARATOR;
        return EMPTY_SEPARATOR;
    };
    return NumberLiteral;
}(Token));
export { NumberLiteral };
export default NumberLiteral;

//# sourceMappingURL=NumberLiteral.js.map
