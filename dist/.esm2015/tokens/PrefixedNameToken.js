import { isPrefixed } from "./../iri/utils";
const NAMESPACE_REGEX = /^([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?$/;
export class PrefixedNameToken {
    constructor(prefixedOrNamespace, localName) {
        this.token = "prefixedName";
        let namespace = prefixedOrNamespace;
        if (localName === void 0) {
            if (!isPrefixed(prefixedOrNamespace))
                throw new Error("Invalid prefixed name.");
            [namespace, localName] = prefixedOrNamespace.split(/:(.*)/);
        }
        if (!NAMESPACE_REGEX.test(namespace))
            throw new Error("Invalid prefixed namespace.");
        this.namespace = namespace;
        const [, ln1, ln2, ln3] = localName.split(/^(.)(?:(.*)?(.))?$/);
        let preSanitation = "";
        if (ln1)
            preSanitation += ln1.replace(/([\-.])/g, "\\$1");
        if (ln2)
            preSanitation += ln2;
        if (ln2)
            preSanitation += ln3.replace(/([.])/g, "\\$1");
        this.localName = preSanitation.replace(/([~!$&'|()*+,;=/?#@%])/g, "\\$1");
    }
    toString() {
        return `${this.namespace}:${this.localName}`;
    }
}

//# sourceMappingURL=PrefixedNameToken.js.map
