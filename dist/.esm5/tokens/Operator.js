import * as tslib_1 from "tslib";
import { EMPTY_SEPARATOR, Token, } from "./Token";
var Operator = (function (_super) {
    tslib_1.__extends(Operator, _super);
    function Operator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Operator.prototype.getPrettySeparator = function (nextToken) {
        return EMPTY_SEPARATOR;
    };
    Operator.prototype.getCompactSeparator = function (nextToken) {
        return EMPTY_SEPARATOR;
    };
    return Operator;
}(Token));
export { Operator };
export default Operator;

//# sourceMappingURL=Operator.js.map
