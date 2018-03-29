const LABEL_REGEX = /^_:[A-Za-z0-9_]([A-Za-z0-9_\-.]*[A-Za-z0-9_\-])?$/;
export class BlankNodeToken {
    constructor(label) {
        this.token = "blankNode";
        if (!label)
            return;
        if (!LABEL_REGEX.test(label))
            throw new Error("Invalid blank node label.");
        this.label = label;
    }
    toString() {
        if (this.label)
            return this.label;
        return `[]`;
    }
}

//# sourceMappingURL=BlankNodeToken.js.map
