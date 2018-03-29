import * as tslib_1 from "tslib";
import { TriplesSubject } from "./TriplesSubject";
var Resource = (function (_super) {
    tslib_1.__extends(Resource, _super);
    function Resource(resolver, iri) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = resolver.resolve(iri);
        return _this;
    }
    return Resource;
}(TriplesSubject));
export { Resource };
export default Resource;

//# sourceMappingURL=Resource.js.map
