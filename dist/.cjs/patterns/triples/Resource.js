"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TriplesSubject_1 = require("./TriplesSubject");
var Resource = (function (_super) {
    tslib_1.__extends(Resource, _super);
    function Resource(resolver, iri) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = resolver.resolve(iri);
        return _this;
    }
    return Resource;
}(TriplesSubject_1.TriplesSubject));
exports.Resource = Resource;
exports.default = Resource;

//# sourceMappingURL=Resource.js.map
