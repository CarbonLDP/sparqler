"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TriplesPattern_1 = require("./TriplesPattern");
var TriplesSubject = (function (_super) {
    tslib_1.__extends(TriplesSubject, _super);
    function TriplesSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TriplesSubject.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () {
                return _this.getSelfTokens().concat(_this.patternTokens);
            },
        };
    };
    return TriplesSubject;
}(TriplesPattern_1.TriplesPattern));
exports.TriplesSubject = TriplesSubject;
exports.default = TriplesSubject;

//# sourceMappingURL=TriplesSubject.js.map
