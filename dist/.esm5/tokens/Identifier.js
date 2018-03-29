import * as tslib_1 from "tslib";
import { StringLiteral } from "./StringLiteral";
import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
var Identifier = (function (_super) {
    tslib_1.__extends(Identifier, _super);
    function Identifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Identifier.prototype.getPrettySeparator = function (nextToken) {
        if (this.value === "UNION")
            return NEW_LINE_SEPARATOR;
        return SPACE_SEPARATOR;
    };
    Identifier.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof StringLiteral)
            return SPACE_SEPARATOR;
        return EMPTY_SEPARATOR;
    };
    return Identifier;
}(Token));
export { Identifier };
export default Identifier;

//# sourceMappingURL=Identifier.js.map
