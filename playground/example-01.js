"use strict";
var Sparqler_1 = require("../src/Sparqler");
var builder = new Sparqler_1.default();
builder
    .base("https://carbonldp.base22.io/apps/test-app/")
    .vocab("https://carbonldp.base22.io/apps/test-app/vocabulary/#")
    .prefix("", "https://carbonldp.base22.io/apps/test-app/")
    .prefix("ex", "http://example.com/ns#")
    .prefix("xsd", "http://www.w3.org/2001/XMLSchema#")
    .prefix("ldp", "http://www.w3.org/ns/ldp#")
    .select("s", "color")
    .from("")
    .where(function (_) {
    return [
        _.resource("")
            .has("ldp:contains", _.resource("posts/")),
        _.var("s")
            .has("color", _.literal("#222").ofType("string")),
        _.literal("#222").withLanguage("es")
            .has("some", "more"),
        _.blankNode()
            .has("other", _.blankNode().has("mmm", "ok...").and("ok", "no"))
            .and("color", _.resource("#asdf")),
        _.collection("Ha!"),
        _.collection("some", "mmm..", _.resource(":some"), _.resource(":some"), _.literal(100.2), _.blankNode().has("color", _.resource("#asdf")).and("color", _.resource("#asdf"))),
        _.resource("son/")
            .has("name", _.collection("My name", _.blankNode().has("address", "My address"))),
    ];
})
    .limit(2);
console.log(builder.getPrettySparqlQuery());
console.log("\n\n");
console.log(builder.getCompactSparqlQuery());
