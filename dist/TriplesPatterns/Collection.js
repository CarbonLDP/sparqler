"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Tokens_1 = require("../Patterns/Tokens");
var TriplesPattern_1 = require("./TriplesPattern");
var ObjectPattern = require("../Utils/ObjectPattern");
var NewLineSymbol_1 = require("../Tokens/NewLineSymbol");
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(resolver, values) {
        var _this = _super.call(this, resolver) || this;
        var tokens = [];
        values.forEach(function (value, index) {
            tokens.push.apply(tokens, ObjectPattern.serialize(value));
            if (index < values.length - 1)
                tokens.push(Tokens_1.EMPTY_SEPARATOR);
        });
        var isSingle = values.length <= 1 && !tokens.find(function (token) { return token instanceof NewLineSymbol_1.NewLineSymbol; });
        _this.elementTokens = [
            isSingle ? Tokens_1.OPEN_SINGLE_LIST : Tokens_1.OPEN_MULTI_LIST
        ].concat(tokens, [
            isSingle ? Tokens_1.CLOSE_SINGLE_LIST : Tokens_1.CLOSE_MULTI_LIST
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
}(TriplesPattern_1.TriplesPattern));
exports.Collection = Collection;
exports.default = Collection;

//# sourceMappingURL=Collection.js.map
