var FilterToken = (function () {
    function FilterToken(constraint) {
        this.token = "filter";
        this.constraint = constraint;
    }
    FilterToken.prototype.toString = function () {
        return "FILTER( " + this.constraint + " )";
    };
    return FilterToken;
}());
export { FilterToken };

//# sourceMappingURL=FilterToken.js.map
