"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../data/utils");
var LanguageToken_1 = require("../../tokens/LanguageToken");
var XSD = require("../../utils/XSD");
var TriplePatternHas_1 = require("./TriplePatternHas");
function getWithTypeFn(container) {
    return function (type) {
        if (type in XSD)
            type = XSD[type];
        var iriType = container.iriResolver.resolve(type, true);
        var subject = utils_1.cloneElement(container.targetToken.subject, { type: iriType });
        var targetToken = utils_1.cloneElement(container.targetToken, { subject: subject });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return TriplePatternHas_1.TriplePatternHas.createFrom(newContainer, {});
    };
}
function getWithLanguageFn(container) {
    return function (language) {
        var langToken = new LanguageToken_1.LanguageToken(language);
        var subject = utils_1.cloneElement(container.targetToken.subject, { language: langToken });
        var targetToken = utils_1.cloneElement(container.targetToken, { subject: subject });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return TriplePatternHas_1.TriplePatternHas.createFrom(newContainer, {});
    };
}
exports.RDFLiteral = {
    createFrom: function (container, object) {
        return TriplePatternHas_1.TriplePatternHas.createFrom(container, Object.assign(object, {
            withType: getWithTypeFn(container),
            withLanguage: getWithLanguageFn(container),
        }));
    },
};

//# sourceMappingURL=RDFLiteral.js.map
