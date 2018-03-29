import { Container } from "./clauses/Container";
import { queryDecorator } from "./clauses/decorators";
var SPARQLER = (function () {
    function SPARQLER(finishDecorator) {
        var container = new Container(finishDecorator);
        return queryDecorator(container, this);
    }
    return SPARQLER;
}());
export { SPARQLER };
export default SPARQLER;

//# sourceMappingURL=index.js.map
