import { CLOSE_MULTI_LIST, CLOSE_SINGLE_LIST, EMPTY_SEPARATOR, OPEN_MULTI_LIST, OPEN_SINGLE_LIST, } from "./../tokens";
import { NewLineSymbol, } from "./../../tokens";
import { serialize } from "./../../utils/ObjectPattern";
import { TriplesPattern } from "./TriplesPattern";
export class Collection extends TriplesPattern {
    constructor(resolver, values) {
        super(resolver);
        let tokens = [];
        values.forEach((value, index) => {
            tokens.push(...serialize(value));
            if (index < values.length - 1)
                tokens.push(EMPTY_SEPARATOR);
        });
        let isSingle = values.length <= 1 && !tokens.find(token => token instanceof NewLineSymbol);
        this.elementTokens = [
            isSingle ? OPEN_SINGLE_LIST : OPEN_MULTI_LIST,
            ...tokens,
            isSingle ? CLOSE_SINGLE_LIST : CLOSE_MULTI_LIST,
        ];
    }
    getPattern() {
        return this.getSelfTokens().concat(this.patternTokens);
    }
    init() {
        super.init();
        this.interfaces.graphPattern = {
            getPattern: () => this.getPattern(),
            getSelfTokens: () => this.getSelfTokens(),
        };
    }
}
export default Collection;

//# sourceMappingURL=Collection.js.map
