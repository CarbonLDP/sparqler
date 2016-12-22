"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tokens_1 = require("../Patterns/Tokens");
var TriplesPattern_1 = require("./TriplesPattern");
var ObjectPattern = require("../Utils/ObjectPattern");
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(resolver, values) {
        var _this = _super.call(this, resolver) || this;
        if (values.length === 1) {
            _this.elementTokens = [Tokens_1.OPEN_SINGLE_LIST];
        }
        else {
            _this.elementTokens = [Tokens_1.OPEN_MULTI_LIST];
        }
        values.forEach(function (value, index) {
            (_a = _this.elementTokens).push.apply(_a, ObjectPattern.serialize(value));
            if (index < values.length - 1)
                _this.elementTokens.push(Tokens_1.EMPTY_SEPARATOR);
            var _a;
        });
        if (values.length === 1) {
            _this.elementTokens.push(Tokens_1.CLOSE_SINGLE_LIST);
        }
        else {
            _this.elementTokens.push(Tokens_1.CLOSE_MULTI_LIST);
        }
        return _this;
    }
    Collection.prototype.getPattern = function () {
        return this.elementTokens.concat(this.patternTokens);
    };
    Collection.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () { return _this.getPattern(); },
            getSelfTokens: function () { return _this.elementTokens; },
        };
    };
    return Collection;
}(TriplesPattern_1.TriplesPattern));
exports.Collection = Collection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Collection;

//# sourceMappingURL=Collection.js.map
