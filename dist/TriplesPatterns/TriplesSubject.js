"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesPattern_1 = require("./TriplesPattern");
var TriplesSubject = (function (_super) {
    __extends(TriplesSubject, _super);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TriplesSubject;

//# sourceMappingURL=TriplesSubject.js.map
