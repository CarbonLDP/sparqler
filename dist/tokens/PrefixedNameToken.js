"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("sparqler/iri/utils");
var NAMESPACE_REGEX = /^([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?$/;
var NORMALIZE_REGEX = /([_~.\-!$&'|()*+,;=/?#@%])/g;
var PrefixedNameToken = (function () {
    function PrefixedNameToken(prefixedOrNamespace, localName) {
        this.token = "prefixedName";
        var namespace = prefixedOrNamespace;
        if (localName === void 0) {
            if (!utils_1.isPrefixed(prefixedOrNamespace))
                throw new Error("Invalid prefixed name.");
            _a = prefixedOrNamespace.split(/:(.*)/), namespace = _a[0], localName = _a[1];
        }
        if (!NAMESPACE_REGEX.test(namespace))
            throw new Error("Invalid prefixed namespace.");
        this.namespace = namespace;
        this.localName = localName.replace(NORMALIZE_REGEX, "\\$1");
        var _a;
    }
    PrefixedNameToken.prototype.toString = function () {
        return this.namespace + ":" + this.localName;
    };
    return PrefixedNameToken;
}());
exports.PrefixedNameToken = PrefixedNameToken;

//# sourceMappingURL=PrefixedNameToken.js.map
