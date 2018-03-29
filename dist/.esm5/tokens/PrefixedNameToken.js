import { isPrefixed } from "./../iri/utils";
var NAMESPACE_REGEX = /^([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?$/;
var PrefixedNameToken = (function () {
    function PrefixedNameToken(prefixedOrNamespace, localName) {
        this.token = "prefixedName";
        var namespace = prefixedOrNamespace;
        if (localName === void 0) {
            if (!isPrefixed(prefixedOrNamespace))
                throw new Error("Invalid prefixed name.");
            _a = prefixedOrNamespace.split(/:(.*)/), namespace = _a[0], localName = _a[1];
        }
        if (!NAMESPACE_REGEX.test(namespace))
            throw new Error("Invalid prefixed namespace.");
        this.namespace = namespace;
        var _b = localName.split(/^(.)(?:(.*)?(.))?$/), ln1 = _b[1], ln2 = _b[2], ln3 = _b[3];
        var preSanitation = "";
        if (ln1)
            preSanitation += ln1.replace(/([\-.])/g, "\\$1");
        if (ln2)
            preSanitation += ln2;
        if (ln2)
            preSanitation += ln3.replace(/([.])/g, "\\$1");
        this.localName = preSanitation.replace(/([~!$&'|()*+,;=/?#@%])/g, "\\$1");
        var _a;
    }
    PrefixedNameToken.prototype.toString = function () {
        return this.namespace + ":" + this.localName;
    };
    return PrefixedNameToken;
}());
export { PrefixedNameToken };

//# sourceMappingURL=PrefixedNameToken.js.map
