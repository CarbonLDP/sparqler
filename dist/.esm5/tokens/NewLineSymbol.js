import * as tslib_1 from "tslib";
import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
var NewLineSymbol = (function (_super) {
    tslib_1.__extends(NewLineSymbol, _super);
    function NewLineSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewLineSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof NewLineSymbol) {
            if ([".", ";", ","].indexOf(nextToken["value"]) !== -1)
                return SPACE_SEPARATOR;
        }
        return NEW_LINE_SEPARATOR;
    };
    NewLineSymbol.prototype.getCompactSeparator = function (nextToken) {
        return EMPTY_SEPARATOR;
    };
    return NewLineSymbol;
}(Token));
export { NewLineSymbol };
export default NewLineSymbol;

//# sourceMappingURL=NewLineSymbol.js.map
