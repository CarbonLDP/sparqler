"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tokens_1 = require("../Patterns/Tokens");
var TriplesPattern_1 = require("./TriplesPattern");
var BlankNode = (function (_super) {
    __extends(BlankNode, _super);
    function BlankNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankNode.prototype.getSelfTokens = function () {
        if (!this.patternTokens.find(function (token) { return token === Tokens_1.SAME_SUBJECT_SEPARATOR || token === Tokens_1.SAME_PROPERTY_SEPARATOR; }))
            return [Tokens_1.OPEN_SINGLE_BN].concat(this.patternTokens, [Tokens_1.CLOSE_SINGLE_BN]);
        return [Tokens_1.OPEN_MULTI_BN].concat(this.patternTokens, [Tokens_1.CLOSE_MULTI_BN]);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlankNode;

//# sourceMappingURL=BlankNode.js.map
