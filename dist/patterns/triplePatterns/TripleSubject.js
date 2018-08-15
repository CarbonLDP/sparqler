"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyBuilder_1 = require("./PropertyBuilder");
var TriplePattern_1 = require("./TriplePattern");
exports.TripleSubject = {
    createFrom: function (container, object) {
        var triplePatternFactory = TriplePattern_1.TriplePattern.createFrom;
        return PropertyBuilder_1.PropertyBuilder.createFrom(triplePatternFactory, container, Object.assign(object, {
            getSubject: function () { return container.targetToken.subject; },
        }));
    }
};

//# sourceMappingURL=TripleSubject.js.map
