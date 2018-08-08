"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = require("./GroupPatternToken");
var ServicePatternToken = (function () {
    function ServicePatternToken(resource, modifier) {
        this.token = "servicePattern";
        this.modifier = modifier;
        this.resource = resource;
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    ServicePatternToken.prototype.toString = function (spaces) {
        var query = "SERVICE ";
        if (this.modifier)
            query += "SILENT ";
        query += this.resource + " " + this.groupPattern.toString(spaces);
        return query;
    };
    return ServicePatternToken;
}());
exports.ServicePatternToken = ServicePatternToken;

//# sourceMappingURL=ServicePatternToken.js.map
