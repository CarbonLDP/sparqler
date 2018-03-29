import * as tslib_1 from "tslib";
import { CLOSE_MULTI_LIST, CLOSE_SINGLE_LIST, EMPTY_SEPARATOR, OPEN_MULTI_LIST, OPEN_SINGLE_LIST, } from "./../tokens";
import { NewLineSymbol, } from "./../../tokens";
import { serialize } from "./../../utils/ObjectPattern";
import { TriplesPattern } from "./TriplesPattern";
var Collection = (function (_super) {
    tslib_1.__extends(Collection, _super);
    function Collection(resolver, values) {
        var _this = _super.call(this, resolver) || this;
        var tokens = [];
        values.forEach(function (value, index) {
            tokens.push.apply(tokens, serialize(value));
            if (index < values.length - 1)
                tokens.push(EMPTY_SEPARATOR);
        });
        var isSingle = values.length <= 1 && !tokens.find(function (token) { return token instanceof NewLineSymbol; });
        _this.elementTokens = [
            isSingle ? OPEN_SINGLE_LIST : OPEN_MULTI_LIST
        ].concat(tokens, [
            isSingle ? CLOSE_SINGLE_LIST : CLOSE_MULTI_LIST,
        ]);
        return _this;
    }
    Collection.prototype.getPattern = function () {
        return this.getSelfTokens().concat(this.patternTokens);
    };
    Collection.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () { return _this.getPattern(); },
            getSelfTokens: function () { return _this.getSelfTokens(); },
        };
    };
    return Collection;
}(TriplesPattern));
export { Collection };
export default Collection;

//# sourceMappingURL=Collection.js.map
