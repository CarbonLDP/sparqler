import { Container } from "./clauses/Container";
import { queryDecorator } from "./clauses/decorators";
export class SPARQLER {
    constructor(finishDecorator) {
        const container = new Container(finishDecorator);
        return queryDecorator(container, this);
    }
}
export default SPARQLER;

//# sourceMappingURL=index.js.map
