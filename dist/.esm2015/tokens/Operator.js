import { EMPTY_SEPARATOR, Token, } from "./Token";
export class Operator extends Token {
    getPrettySeparator(nextToken) {
        return EMPTY_SEPARATOR;
    }
    getCompactSeparator(nextToken) {
        return EMPTY_SEPARATOR;
    }
}
export default Operator;

//# sourceMappingURL=Operator.js.map
