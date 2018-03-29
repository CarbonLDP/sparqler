import * as tslib_1 from "tslib";
import { TriplesPattern } from "./TriplesPattern";
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
}(TriplesPattern));
export { TriplesSubject };
export default TriplesSubject;

//# sourceMappingURL=TriplesSubject.js.map
