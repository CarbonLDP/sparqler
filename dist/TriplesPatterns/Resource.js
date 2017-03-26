"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesSubject_1 = require("./TriplesSubject");
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(resolver, iri) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = resolver._resolveIRI(iri);
        return _this;
    }
    return Resource;
}(TriplesSubject_1.TriplesSubject));
exports.Resource = Resource;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resource;

//# sourceMappingURL=Resource.js.map
