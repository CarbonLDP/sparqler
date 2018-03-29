var LABEL_REGEX = /^_:[A-Za-z0-9_]([A-Za-z0-9_\-.]*[A-Za-z0-9_\-])?$/;
var BlankNodeToken = (function () {
    function BlankNodeToken(label) {
        this.token = "blankNode";
        if (!label)
            return;
        if (!LABEL_REGEX.test(label))
            throw new Error("Invalid blank node label.");
        this.label = label;
    }
    BlankNodeToken.prototype.toString = function () {
        if (this.label)
            return this.label;
        return "[]";
    };
    return BlankNodeToken;
}());
export { BlankNodeToken };

//# sourceMappingURL=BlankNodeToken.js.map
