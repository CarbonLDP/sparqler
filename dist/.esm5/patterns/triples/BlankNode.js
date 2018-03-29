import * as tslib_1 from "tslib";
import { CLOSE_MULTI_BN, CLOSE_SINGLE_BN, OPEN_MULTI_BN, OPEN_SINGLE_BN, SAME_PROPERTY_SEPARATOR, SAME_SUBJECT_SEPARATOR, } from "./../tokens";
import { TriplesPattern } from "./TriplesPattern";
var BlankNode = (function (_super) {
    tslib_1.__extends(BlankNode, _super);
    function BlankNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankNode.prototype.getSelfTokens = function () {
        if (!this.patternTokens.find(function (token) { return token === SAME_SUBJECT_SEPARATOR || token === SAME_PROPERTY_SEPARATOR; }))
            return [OPEN_SINGLE_BN].concat(this.patternTokens, [CLOSE_SINGLE_BN]);
        return [OPEN_MULTI_BN].concat(this.patternTokens, [CLOSE_MULTI_BN]);
    };
    BlankNode.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () { return _this.getSelfTokens(); },
            getSelfTokens: function () { return _this.getSelfTokens(); },
        };
    };
    return BlankNode;
}(TriplesPattern));
export { BlankNode };
export default BlankNode;

//# sourceMappingURL=BlankNode.js.map
