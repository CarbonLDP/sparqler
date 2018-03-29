export class CollectionToken {
    constructor() {
        this.token = "collection";
        this.objects = [];
    }
    addObject(object) {
        this.objects.push(object);
        return this;
    }
    toString() {
        if (!this.objects.length)
            return "()";
        return `( ${this.objects.join(" ")} )`;
    }
}

//# sourceMappingURL=CollectionToken.js.map
