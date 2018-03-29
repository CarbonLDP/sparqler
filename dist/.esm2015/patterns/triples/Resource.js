import { TriplesSubject } from "./TriplesSubject";
export class Resource extends TriplesSubject {
    constructor(resolver, iri) {
        super(resolver);
        this.elementTokens = resolver.resolve(iri);
    }
}
export default Resource;

//# sourceMappingURL=Resource.js.map
