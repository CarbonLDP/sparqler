"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tokens_1 = require("./../tokens");
var TriplesPattern_1 = require("./TriplesPattern");
var BlankNode = (function (_super) {
    tslib_1.__extends(BlankNode, _super);
    function BlankNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankNode.prototype.getSelfTokens = function () {
        if (!this.patternTokens.find(function (token) { return token === tokens_1.SAME_SUBJECT_SEPARATOR || token === tokens_1.SAME_PROPERTY_SEPARATOR; }))
            return [tokens_1.OPEN_SINGLE_BN].concat(this.patternTokens, [tokens_1.CLOSE_SINGLE_BN]);
        return [tokens_1.OPEN_MULTI_BN].concat(this.patternTokens, [tokens_1.CLOSE_MULTI_BN]);
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
}(TriplesPattern_1.TriplesPattern));
exports.BlankNode = BlankNode;
exports.default = BlankNode;

//# sourceMappingURL=BlankNode.js.map
