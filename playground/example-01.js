"use strict";
var Sparqler_1 = require("../src/Sparqler");
var builder = new Sparqler_1.default()
    .base("https://carbonldp.base22.io/apps/test-app/")
    .prefix("", "https://carbonldp.base22.io/apps/test-app/")
    .prefix("ex", "http://example.com/ns#")
    .prefix("xsd", "http://www.w3.org/2001/XMLSchema#")
    .select("s", "p")
    .from("posts/")
    .where(function (_) {
    return { getPattern: function () { return "?s ?p ?o"; } };
})
    .limit(1)
    .offset(1);
console.log(builder.toQueryString());
