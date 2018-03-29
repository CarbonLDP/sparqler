import { TriplesPattern } from "./TriplesPattern";
export class TriplesSubject extends TriplesPattern {
    init() {
        super.init();
        this.interfaces.graphPattern = {
            getPattern: () => {
                return this.getSelfTokens().concat(this.patternTokens);
            },
        };
    }
}
export default TriplesSubject;

//# sourceMappingURL=TriplesSubject.js.map
