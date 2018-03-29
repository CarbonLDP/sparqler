var NotTriplesPattern = (function () {
    function NotTriplesPattern(tokens) {
        this.patternTokens = tokens;
    }
    NotTriplesPattern.prototype.getPattern = function () {
        return this.patternTokens;
    };
    return NotTriplesPattern;
}());
export { NotTriplesPattern };
export default NotTriplesPattern;

//# sourceMappingURL=NotTriplesPattern.js.map
