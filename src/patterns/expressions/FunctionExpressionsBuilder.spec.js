"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../../core/containers/Container");
var IRIResolver_1 = require("../../core/iri/IRIResolver");
var TriplePatternsBuilder_1 = require("../triplePatterns/TriplePatternsBuilder");
var XSD_1 = require("../../utils/XSD");
var FunctionExpressionsBuilder_1 = require("./FunctionExpressionsBuilder");
describe("FunctionExpressionsBuilder", function () {
    it("should exists", function () {
        expect(FunctionExpressionsBuilder_1.FunctionExpressionsBuilder).toBeDefined();
        expect(FunctionExpressionsBuilder_1.FunctionExpressionsBuilder).toEqual(jasmine.any(Object));
    });
    var container;
    var triplesBuilder;
    beforeEach(function () {
        var iriResolver = new IRIResolver_1.IRIResolver();
        iriResolver.prefixes.set("ex", false);
        container = new Container_1.Container({
            iriResolver: iriResolver,
            targetToken: void 0,
        });
        triplesBuilder = TriplePatternsBuilder_1.TriplePatternsBuilder
            .createFrom(container, {});
    });
    describe("FunctionExpressionsBuilder.createFrom", function () {
        it("should exists", function () {
            expect(FunctionExpressionsBuilder_1.FunctionExpressionsBuilder.createFrom).toBeDefined();
            expect(FunctionExpressionsBuilder_1.FunctionExpressionsBuilder.createFrom).toEqual(jasmine.any(Function));
        });
        it("should extend the object provided", function () {
            var myObject = {};
            var finishPattern = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, myObject);
            expect(myObject).toBe(finishPattern);
        });
        it("should create a FunctionExpressionsBuilder object", function () {
            var finishPattern = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
            expect(finishPattern).toEqual({
                bound: jasmine.any(Function),
                if: jasmine.any(Function),
                coalesce: jasmine.any(Function),
                exists: jasmine.any(Function),
                notExists: jasmine.any(Function),
                sameTerm: jasmine.any(Function),
                isIRI: jasmine.any(Function),
                isURI: jasmine.any(Function),
                isBlank: jasmine.any(Function),
                isLiteral: jasmine.any(Function),
                isNumeric: jasmine.any(Function),
                str: jasmine.any(Function),
                lang: jasmine.any(Function),
                datatype: jasmine.any(Function),
                iri: jasmine.any(Function),
                uri: jasmine.any(Function),
                bnode: jasmine.any(Function),
                strDT: jasmine.any(Function),
                strLang: jasmine.any(Function),
                uuid: jasmine.any(Function),
                strUUID: jasmine.any(Function),
                strLen: jasmine.any(Function),
                substr: jasmine.any(Function),
                uCase: jasmine.any(Function),
                lCase: jasmine.any(Function),
                strStarts: jasmine.any(Function),
                strEnds: jasmine.any(Function),
                contains: jasmine.any(Function),
                strBefore: jasmine.any(Function),
                strAfter: jasmine.any(Function),
                encodeForUri: jasmine.any(Function),
                concat: jasmine.any(Function),
                langMatches: jasmine.any(Function),
                regex: jasmine.any(Function),
                replace: jasmine.any(Function),
                abs: jasmine.any(Function),
                round: jasmine.any(Function),
                ceil: jasmine.any(Function),
                floor: jasmine.any(Function),
                rand: jasmine.any(Function),
                now: jasmine.any(Function),
                year: jasmine.any(Function),
                month: jasmine.any(Function),
                day: jasmine.any(Function),
                hours: jasmine.any(Function),
                minutes: jasmine.any(Function),
                seconds: jasmine.any(Function),
                timezone: jasmine.any(Function),
                tz: jasmine.any(Function),
                md5: jasmine.any(Function),
                sha1: jasmine.any(Function),
                sha256: jasmine.any(Function),
                sha384: jasmine.any(Function),
                sha512: jasmine.any(Function),
                custom: jasmine.any(Function),
                customDistinct: jasmine.any(Function),
                count: jasmine.any(Function),
                countDistinct: jasmine.any(Function),
                countAll: jasmine.any(Function),
                countAllDistinct: jasmine.any(Function),
                sum: jasmine.any(Function),
                sumDistinct: jasmine.any(Function),
                avg: jasmine.any(Function),
                avgDistinct: jasmine.any(Function),
                min: jasmine.any(Function),
                minDistinct: jasmine.any(Function),
                max: jasmine.any(Function),
                maxDistinct: jasmine.any(Function),
                groupConcat: jasmine.any(Function),
                groupConcatDistinct: jasmine.any(Function),
                sample: jasmine.any(Function),
                sampleDistinct: jasmine.any(Function),
            });
        });
    });
    describe("FunctionExpressionsBuilder.bound", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.bound).toBeDefined();
            expect(builder.bound).toEqual(jasmine.any(Function));
        });
        it("should create function using variable", function () {
            var variable = triplesBuilder.var("foo");
            var expression = builder.bound(variable);
            expect(expression.getExpression().toString(0)).toEqual("BOUND( ?foo )");
        });
        it("should create function using string variable", function () {
            var expression = builder.bound("foo");
            expect(expression.getExpression().toString(0)).toEqual("BOUND( ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.bound("foo", "extra");
            expect(expression.getExpression().toString(0)).toEqual("BOUND( ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.if", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.if).toBeDefined();
            expect(builder.if).toEqual(jasmine.any(Function));
        });
        it("should create function using expression & triples", function () {
            var expression = builder.if(builder.bound("foo"), triplesBuilder.resource("ex:resource"), triplesBuilder.literal(false));
            expect(expression.getExpression().toString(0)).toEqual("IF( BOUND( ?foo ), ex:resource, false )");
        });
        it("should create function using expression & natives", function () {
            var expression = builder.if(builder.bound("foo"), "ex:resource", false);
            expect(expression.getExpression().toString(0)).toEqual("IF( BOUND( ?foo ), ex:resource, false )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.if(builder.bound("foo"), "ex:resource", false, "extra");
            expect(expression.getExpression().toString(0)).toEqual("IF( BOUND( ?foo ), ex:resource, false )");
        });
    });
    describe("FunctionExpressionsBuilder.coalesce", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.coalesce).toBeDefined();
            expect(builder.coalesce).toEqual(jasmine.any(Function));
        });
        it("should create function using expression, triples & natives", function () {
            var expression = builder.coalesce(builder.bound("foo"), triplesBuilder.resource("ex:resource-1"), "ex:resource-2", false, triplesBuilder.literal("value"));
            expect(expression.getExpression().toString(0)).toEqual("COALESCE( BOUND( ?foo ), ex:resource-1, ex:resource-2, false, \"value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.exists", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.exists).toBeDefined();
            expect(builder.exists).toEqual(jasmine.any(Function));
        });
        it("should create function with empty pattern", function () {
            var expression = builder.exists();
            expect(expression.getExpression().toString(0)).toEqual("EXISTS {}");
        });
        it("should create function using single pattern", function () {
            var expression = builder.exists(triplesBuilder.resource("ex:resource-1").has("ex:property-1", false));
            expect(expression.getExpression().toString(0)).toEqual("EXISTS { ex:resource-1 ex:property-1 false }");
        });
        it("should create function using multiple inline pattern", function () {
            var expression = builder.exists(triplesBuilder.resource("ex:resource-1").has("ex:property-1", false), triplesBuilder.resource("ex:resource-2").has("ex:property-2", "value"));
            expect(expression.getExpression().toString()).toEqual("EXISTS { " +
                "ex:resource-1 ex:property-1 false. " +
                "ex:resource-2 ex:property-2 \"value\" " +
                "}");
        });
        it("should create function using multiple array pattern", function () {
            var expression = builder.exists([
                triplesBuilder.resource("ex:resource-1").has("ex:property-1", false),
                triplesBuilder.resource("ex:resource-2").has("ex:property-2", "value"),
            ]);
            expect(expression.getExpression().toString()).toEqual("EXISTS { " +
                "ex:resource-1 ex:property-1 false. " +
                "ex:resource-2 ex:property-2 \"value\" " +
                "}");
        });
    });
    describe("FunctionExpressionsBuilder.notExists", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.notExists).toBeDefined();
            expect(builder.notExists).toEqual(jasmine.any(Function));
        });
        it("should create function with empty pattern", function () {
            var expression = builder.notExists();
            expect(expression.getExpression().toString(0)).toEqual("NOT EXISTS {}");
        });
        it("should create function using single pattern", function () {
            var expression = builder.notExists(triplesBuilder.resource("ex:resource-1").has("ex:property-1", false));
            expect(expression.getExpression().toString(0)).toEqual("NOT EXISTS { ex:resource-1 ex:property-1 false }");
        });
        it("should create function using multiple inline pattern", function () {
            var expression = builder.notExists(triplesBuilder.resource("ex:resource-1").has("ex:property-1", false), triplesBuilder.resource("ex:resource-2").has("ex:property-2", "value"));
            expect(expression.getExpression().toString()).toEqual("NOT EXISTS { " +
                "ex:resource-1 ex:property-1 false. " +
                "ex:resource-2 ex:property-2 \"value\" " +
                "}");
        });
        it("should create function using multiple array pattern", function () {
            var expression = builder.notExists([
                triplesBuilder.resource("ex:resource-1").has("ex:property-1", false),
                triplesBuilder.resource("ex:resource-2").has("ex:property-2", "value"),
            ]);
            expect(expression.getExpression().toString()).toEqual("NOT EXISTS { " +
                "ex:resource-1 ex:property-1 false. " +
                "ex:resource-2 ex:property-2 \"value\" " +
                "}");
        });
    });
    describe("FunctionExpressionsBuilder.sameTerm", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sameTerm).toBeDefined();
            expect(builder.sameTerm).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.sameTerm(triplesBuilder.var("foo"), triplesBuilder.literal("value"));
            expect(expression.getExpression().toString(0)).toEqual("sameTerm( ?foo, \"value\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.sameTerm("foo", "value");
            expect(expression.getExpression().toString(0)).toEqual("sameTerm( \"foo\", \"value\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sameTerm("foo", "value", "extra");
            expect(expression.getExpression().toString(0)).toEqual("sameTerm( \"foo\", \"value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.isIRI", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.isIRI).toBeDefined();
            expect(builder.isIRI).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.isIRI(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("isIRI( ?foo )");
        });
        it("should create function using natives", function () {
            var expression = builder.isIRI("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("isIRI( ex:resource )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.isIRI("ex:resource", "extra");
            expect(expression.getExpression().toString(0)).toEqual("isIRI( ex:resource )");
        });
    });
    describe("FunctionExpressionsBuilder.isURI", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.isURI).toBeDefined();
            expect(builder.isURI).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.isURI(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("isURI( ?foo )");
        });
        it("should create function using natives", function () {
            var expression = builder.isURI("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("isURI( ex:resource )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.isURI("ex:resource", "extra");
            expect(expression.getExpression().toString(0)).toEqual("isURI( ex:resource )");
        });
    });
    describe("FunctionExpressionsBuilder.isBlank", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.isBlank).toBeDefined();
            expect(builder.isBlank).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.isBlank(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("isBLANK( ?foo )");
        });
        it("should create function using natives", function () {
            var expression = builder.isBlank("value");
            expect(expression.getExpression().toString(0)).toEqual("isBLANK( \"value\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.isBlank("value", "extra");
            expect(expression.getExpression().toString(0)).toEqual("isBLANK( \"value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.isLiteral", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.isLiteral).toBeDefined();
            expect(builder.isLiteral).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.isLiteral(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("isLITERAL( ?foo )");
        });
        it("should create function using natives", function () {
            var expression = builder.isLiteral("value");
            expect(expression.getExpression().toString(0)).toEqual("isLITERAL( \"value\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.isLiteral("value");
            expect(expression.getExpression().toString(0)).toEqual("isLITERAL( \"value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.isNumeric", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.isNumeric).toBeDefined();
            expect(builder.isNumeric).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.isNumeric(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("isNUMERIC( ?foo )");
        });
        it("should create function using natives", function () {
            var expression = builder.isNumeric(1.10);
            expect(expression.getExpression().toString(0)).toEqual("isNUMERIC( 1.1 )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.isNumeric(1.10, "extra");
            expect(expression.getExpression().toString(0)).toEqual("isNUMERIC( 1.1 )");
        });
    });
    describe("FunctionExpressionsBuilder.str", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.str).toBeDefined();
            expect(builder.str).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.str(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("STR( ?foo )");
        });
        it("should create function using natives", function () {
            var expression = builder.str("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("STR( ex:resource )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.str("ex:resource", "extra");
            expect(expression.getExpression().toString(0)).toEqual("STR( ex:resource )");
        });
    });
    describe("FunctionExpressionsBuilder.lang", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.lang).toBeDefined();
            expect(builder.lang).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.lang(triplesBuilder.literal("hello").withLanguage("en"));
            expect(expression.getExpression().toString(0)).toEqual("LANG( \"hello\"@en )");
        });
        it("should create function using natives", function () {
            var expression = builder.lang("value");
            expect(expression.getExpression().toString(0)).toEqual("LANG( \"value\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.lang("value", "extra");
            expect(expression.getExpression().toString(0)).toEqual("LANG( \"value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.datatype", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.datatype).toBeDefined();
            expect(builder.datatype).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.datatype(triplesBuilder.literal("1").withType(XSD_1.XSD.integer));
            expect(expression.getExpression().toString(0)).toEqual("DATATYPE( \"1\"^^<http://www.w3.org/2001/XMLSchema#integer> )");
        });
        it("should create function using natives", function () {
            var expression = builder.datatype("value");
            expect(expression.getExpression().toString(0)).toEqual("DATATYPE( \"value\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.datatype("value", "extra");
            expect(expression.getExpression().toString(0)).toEqual("DATATYPE( \"value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.iri", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.iri).toBeDefined();
            expect(builder.iri).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.iri(triplesBuilder.literal("ex:resource"));
            expect(expression.getExpression().toString(0)).toEqual("IRI( \"ex:resource\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.iri("value");
            expect(expression.getExpression().toString(0)).toEqual("IRI( \"value\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.iri("value", "extra");
            expect(expression.getExpression().toString(0)).toEqual("IRI( \"value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.uri", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.uri).toBeDefined();
            expect(builder.uri).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.uri(triplesBuilder.literal("ex:resource"));
            expect(expression.getExpression().toString(0)).toEqual("URI( \"ex:resource\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.uri("value");
            expect(expression.getExpression().toString(0)).toEqual("URI( \"value\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.uri("value", "extra");
            expect(expression.getExpression().toString(0)).toEqual("URI( \"value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.bnode", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.bnode).toBeDefined();
            expect(builder.bnode).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.bnode(triplesBuilder.literal("label"));
            expect(expression.getExpression().toString(0)).toEqual("BNODE( \"label\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.bnode("label");
            expect(expression.getExpression().toString(0)).toEqual("BNODE( \"label\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.bnode("label", "extra");
            expect(expression.getExpression().toString(0)).toEqual("BNODE( \"label\" )");
        });
    });
    describe("FunctionExpressionsBuilder.strDT", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.strDT).toBeDefined();
            expect(builder.strDT).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.strDT(triplesBuilder.literal("123"), triplesBuilder.resource(XSD_1.XSD.integer));
            expect(expression.getExpression().toString(0)).toEqual("STRDT( \"123\", <http://www.w3.org/2001/XMLSchema#integer> )");
        });
        it("should create function using natives", function () {
            var expression = builder.strDT("123", XSD_1.XSD.integer);
            expect(expression.getExpression().toString(0)).toEqual("STRDT( \"123\", <http://www.w3.org/2001/XMLSchema#integer> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.strDT("123", XSD_1.XSD.integer, "extra");
            expect(expression.getExpression().toString(0)).toEqual("STRDT( \"123\", <http://www.w3.org/2001/XMLSchema#integer> )");
        });
    });
    describe("FunctionExpressionsBuilder.strLang", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.strLang).toBeDefined();
            expect(builder.strLang).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.strLang(triplesBuilder.literal("hello"), triplesBuilder.literal("en"));
            expect(expression.getExpression().toString(0)).toEqual("STRLANG( \"hello\", \"en\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.strLang("hello", "en");
            expect(expression.getExpression().toString(0)).toEqual("STRLANG( \"hello\", \"en\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.strLang("hello", "en", "extra");
            expect(expression.getExpression().toString(0)).toEqual("STRLANG( \"hello\", \"en\" )");
        });
    });
    describe("FunctionExpressionsBuilder.uuid", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.uuid).toBeDefined();
            expect(builder.uuid).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var expression = builder.uuid();
            expect(expression.getExpression().toString(0)).toEqual("UUID()");
        });
        it("should not add extra parameters", function () {
            var expression = builder.uuid("extra");
            expect(expression.getExpression().toString(0)).toEqual("UUID()");
        });
    });
    describe("FunctionExpressionsBuilder.strUUID", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.strUUID).toBeDefined();
            expect(builder.strUUID).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var expression = builder.strUUID();
            expect(expression.getExpression().toString(0)).toEqual("STRUUID()");
        });
        it("should not add extra parameters", function () {
            var expression = builder.strUUID("extra");
            expect(expression.getExpression().toString(0)).toEqual("STRUUID()");
        });
    });
    describe("FunctionExpressionsBuilder.strLen", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.strLen).toBeDefined();
            expect(builder.strLen).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.strLen(triplesBuilder.literal("hello"));
            expect(expression.getExpression().toString(0)).toEqual("STRLEN( \"hello\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.strLen("hello");
            expect(expression.getExpression().toString(0)).toEqual("STRLEN( \"hello\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.strLen("hello", "extra");
            expect(expression.getExpression().toString(0)).toEqual("STRLEN( \"hello\" )");
        });
    });
    describe("FunctionExpressionsBuilder.substr", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.substr).toBeDefined();
            expect(builder.substr).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.substr(triplesBuilder.literal("hello"), triplesBuilder.literal(4));
            expect(expression.getExpression().toString(0)).toEqual("SUBSTR( \"hello\", 4 )");
        });
        it("should create function with length using triples", function () {
            var expression = builder.substr(triplesBuilder.literal("hello"), triplesBuilder.literal(4), triplesBuilder.literal(1));
            expect(expression.getExpression().toString(0)).toEqual("SUBSTR( \"hello\", 4, 1 )");
        });
        it("should create function using natives", function () {
            var expression = builder.substr("hello", 4);
            expect(expression.getExpression().toString(0)).toEqual("SUBSTR( \"hello\", 4 )");
        });
        it("should create function with length using natives", function () {
            var expression = builder.substr("hello", 4, 1);
            expect(expression.getExpression().toString(0)).toEqual("SUBSTR( \"hello\", 4, 1 )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.substr("hello", 4, 1, "extra");
            expect(expression.getExpression().toString(0)).toEqual("SUBSTR( \"hello\", 4, 1 )");
        });
    });
    describe("FunctionExpressionsBuilder.uCase", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.uCase).toBeDefined();
            expect(builder.uCase).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.uCase(triplesBuilder.literal("hello"));
            expect(expression.getExpression().toString(0)).toEqual("UCASE( \"hello\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.uCase("hello");
            expect(expression.getExpression().toString(0)).toEqual("UCASE( \"hello\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.uCase("hello", "extra");
            expect(expression.getExpression().toString(0)).toEqual("UCASE( \"hello\" )");
        });
    });
    describe("FunctionExpressionsBuilder.lCase", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.lCase).toBeDefined();
            expect(builder.lCase).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.lCase(triplesBuilder.literal("hello"));
            expect(expression.getExpression().toString(0)).toEqual("LCASE( \"hello\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.lCase("hello");
            expect(expression.getExpression().toString(0)).toEqual("LCASE( \"hello\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.lCase("hello", "extra");
            expect(expression.getExpression().toString(0)).toEqual("LCASE( \"hello\" )");
        });
    });
    describe("FunctionExpressionsBuilder.strStarts", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.strStarts).toBeDefined();
            expect(builder.strStarts).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.strStarts(triplesBuilder.literal("hello"), triplesBuilder.literal("hell"));
            expect(expression.getExpression().toString(0)).toEqual("STRSTARTS( \"hello\", \"hell\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.strStarts("hello", "hell");
            expect(expression.getExpression().toString(0)).toEqual("STRSTARTS( \"hello\", \"hell\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.strStarts("hello", "hell", "extra");
            expect(expression.getExpression().toString(0)).toEqual("STRSTARTS( \"hello\", \"hell\" )");
        });
    });
    describe("FunctionExpressionsBuilder.strEnds", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.strEnds).toBeDefined();
            expect(builder.strEnds).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.strEnds(triplesBuilder.literal("hello"), triplesBuilder.literal("hell"));
            expect(expression.getExpression().toString(0)).toEqual("STRENDS( \"hello\", \"hell\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.strEnds("hello", "hell");
            expect(expression.getExpression().toString(0)).toEqual("STRENDS( \"hello\", \"hell\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.strEnds("hello", "hell", "extra");
            expect(expression.getExpression().toString(0)).toEqual("STRENDS( \"hello\", \"hell\" )");
        });
    });
    describe("FunctionExpressionsBuilder.contains", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.contains).toBeDefined();
            expect(builder.contains).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.contains(triplesBuilder.literal("hello"), triplesBuilder.literal("el"));
            expect(expression.getExpression().toString(0)).toEqual("CONTAINS( \"hello\", \"el\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.contains("hello", "el");
            expect(expression.getExpression().toString(0)).toEqual("CONTAINS( \"hello\", \"el\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.contains("hello", "el", "extra");
            expect(expression.getExpression().toString(0)).toEqual("CONTAINS( \"hello\", \"el\" )");
        });
    });
    describe("FunctionExpressionsBuilder.strBefore", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.strBefore).toBeDefined();
            expect(builder.strBefore).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.strBefore(triplesBuilder.literal("hello"), triplesBuilder.literal("el"));
            expect(expression.getExpression().toString(0)).toEqual("STRBEFORE( \"hello\", \"el\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.strBefore("hello", "el");
            expect(expression.getExpression().toString(0)).toEqual("STRBEFORE( \"hello\", \"el\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.strBefore("hello", "el", "extra");
            expect(expression.getExpression().toString(0)).toEqual("STRBEFORE( \"hello\", \"el\" )");
        });
    });
    describe("FunctionExpressionsBuilder.strAfter", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.strAfter).toBeDefined();
            expect(builder.strAfter).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.strAfter(triplesBuilder.literal("hello"), triplesBuilder.literal("el"));
            expect(expression.getExpression().toString(0)).toEqual("STRAFTER( \"hello\", \"el\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.strAfter("hello", "el");
            expect(expression.getExpression().toString(0)).toEqual("STRAFTER( \"hello\", \"el\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.strAfter("hello", "el", "extra");
            expect(expression.getExpression().toString(0)).toEqual("STRAFTER( \"hello\", \"el\" )");
        });
    });
    describe("FunctionExpressionsBuilder.encodeForUri", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.encodeForUri).toBeDefined();
            expect(builder.encodeForUri).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.encodeForUri(triplesBuilder.literal("some value"));
            expect(expression.getExpression().toString(0)).toEqual("ENCODE_FOR_URI( \"some value\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.encodeForUri("some value");
            expect(expression.getExpression().toString(0)).toEqual("ENCODE_FOR_URI( \"some value\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.encodeForUri("some value", "extra");
            expect(expression.getExpression().toString(0)).toEqual("ENCODE_FOR_URI( \"some value\" )");
        });
    });
    describe("FunctionExpressionsBuilder.concat", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.concat).toBeDefined();
            expect(builder.concat).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.concat(triplesBuilder.literal("foo"), triplesBuilder.literal("bar"));
            expect(expression.getExpression().toString(0)).toEqual("CONCAT( \"foo\", \"bar\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.concat("foo", "bar");
            expect(expression.getExpression().toString(0)).toEqual("CONCAT( \"foo\", \"bar\" )");
        });
    });
    describe("FunctionExpressionsBuilder.langMatches", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.langMatches).toBeDefined();
            expect(builder.langMatches).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.langMatches(triplesBuilder.literal("foo").withLanguage("fr-BE"), triplesBuilder.literal("fr"));
            expect(expression.getExpression().toString(0)).toEqual("LANGMATCHES( \"foo\"@fr-BE, \"fr\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.langMatches(triplesBuilder.literal("foo").withLanguage("fr-BE"), "fr");
            expect(expression.getExpression().toString(0)).toEqual("LANGMATCHES( \"foo\"@fr-BE, \"fr\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.langMatches(triplesBuilder.literal("foo").withLanguage("fr-BE"), "fr", "extra");
            expect(expression.getExpression().toString(0)).toEqual("LANGMATCHES( \"foo\"@fr-BE, \"fr\" )");
        });
    });
    describe("FunctionExpressionsBuilder.regex", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.regex).toBeDefined();
            expect(builder.regex).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.regex(triplesBuilder.var("Foo"), triplesBuilder.literal("^Foo"));
            expect(expression.getExpression().toString(0)).toEqual("REGEX( ?Foo, \"^Foo\" )");
        });
        it("should create function with flag using triples", function () {
            var expression = builder.regex(triplesBuilder.var("Foo"), triplesBuilder.literal("^foo"), triplesBuilder.literal("i"));
            expect(expression.getExpression().toString(0)).toEqual("REGEX( ?Foo, \"^foo\", \"i\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.regex(triplesBuilder.var("Foo"), "^Foo");
            expect(expression.getExpression().toString(0)).toEqual("REGEX( ?Foo, \"^Foo\" )");
        });
        it("should create function with flag using natives", function () {
            var expression = builder.regex(triplesBuilder.var("Foo"), "^foo", "i");
            expect(expression.getExpression().toString(0)).toEqual("REGEX( ?Foo, \"^foo\", \"i\" )");
        });
        it("should create function using regex", function () {
            var expression = builder.regex(triplesBuilder.var("Foo"), /^Foo/);
            expect(expression.getExpression().toString(0)).toEqual("REGEX( ?Foo, \"^Foo\" )");
        });
        it("should create function using regex with flags", function () {
            var expression = builder.regex(triplesBuilder.var("Foo"), /^foo/i);
            expect(expression.getExpression().toString(0)).toEqual("REGEX( ?Foo, \"^foo\", \"i\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.regex(triplesBuilder.var("Foo"), "^foo", "i", "extra");
            expect(expression.getExpression().toString(0)).toEqual("REGEX( ?Foo, \"^foo\", \"i\" )");
        });
    });
    describe("FunctionExpressionsBuilder.replace", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.replace).toBeDefined();
            expect(builder.replace).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.replace(triplesBuilder.var("Bar"), triplesBuilder.literal("r"), triplesBuilder.literal("z"));
            expect(expression.getExpression().toString(0)).toEqual("REPLACE( ?Bar, \"r\", \"z\" )");
        });
        it("should create function with flag using triples", function () {
            var expression = builder.replace(triplesBuilder.var("Bar"), triplesBuilder.literal("R"), triplesBuilder.literal("z"), triplesBuilder.literal("i"));
            expect(expression.getExpression().toString(0)).toEqual("REPLACE( ?Bar, \"R\", \"z\", \"i\" )");
        });
        it("should create function using natives", function () {
            var expression = builder.replace(triplesBuilder.var("Bar"), "r", "z");
            expect(expression.getExpression().toString(0)).toEqual("REPLACE( ?Bar, \"r\", \"z\" )");
        });
        it("should create function with flag using natives", function () {
            var expression = builder.replace(triplesBuilder.var("Bar"), "R", "z", "i");
            expect(expression.getExpression().toString(0)).toEqual("REPLACE( ?Bar, \"R\", \"z\", \"i\" )");
        });
        it("should create function using regex", function () {
            var expression = builder.replace(triplesBuilder.var("Bar"), /r/, "z");
            expect(expression.getExpression().toString(0)).toEqual("REPLACE( ?Bar, \"r\", \"z\" )");
        });
        it("should create function using regex with flags", function () {
            var expression = builder.replace(triplesBuilder.var("Bar"), /R/i, "z");
            expect(expression.getExpression().toString(0)).toEqual("REPLACE( ?Bar, \"R\", \"z\", \"i\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.replace(triplesBuilder.var("Bar"), "R", "z", "i", "extra");
            expect(expression.getExpression().toString(0)).toEqual("REPLACE( ?Bar, \"R\", \"z\", \"i\" )");
        });
    });
    describe("FunctionExpressionsBuilder.abs", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.abs).toBeDefined();
            expect(builder.abs).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.abs(triplesBuilder.literal(-1.5));
            expect(expression.getExpression().toString(0)).toEqual("ABS( -1.5 )");
        });
        it("should create function using natives", function () {
            var expression = builder.abs(-1.5);
            expect(expression.getExpression().toString(0)).toEqual("ABS( -1.5 )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.abs(-1.5, "extra");
            expect(expression.getExpression().toString(0)).toEqual("ABS( -1.5 )");
        });
    });
    describe("FunctionExpressionsBuilder.round", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.round).toBeDefined();
            expect(builder.round).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.round(triplesBuilder.literal(1.5));
            expect(expression.getExpression().toString(0)).toEqual("ROUND( 1.5 )");
        });
        it("should create function using natives", function () {
            var expression = builder.round(1.5);
            expect(expression.getExpression().toString(0)).toEqual("ROUND( 1.5 )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.round(1.5, "extra");
            expect(expression.getExpression().toString(0)).toEqual("ROUND( 1.5 )");
        });
    });
    describe("FunctionExpressionsBuilder.ceil", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.ceil).toBeDefined();
            expect(builder.ceil).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.ceil(triplesBuilder.literal(1.5));
            expect(expression.getExpression().toString(0)).toEqual("CEIL( 1.5 )");
        });
        it("should create function using natives", function () {
            var expression = builder.ceil(1.5);
            expect(expression.getExpression().toString(0)).toEqual("CEIL( 1.5 )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.ceil(1.5, "extra");
            expect(expression.getExpression().toString(0)).toEqual("CEIL( 1.5 )");
        });
    });
    describe("FunctionExpressionsBuilder.floor", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.floor).toBeDefined();
            expect(builder.floor).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.floor(triplesBuilder.literal(1.5));
            expect(expression.getExpression().toString(0)).toEqual("FLOOR( 1.5 )");
        });
        it("should create function using natives", function () {
            var expression = builder.floor(1.5);
            expect(expression.getExpression().toString(0)).toEqual("FLOOR( 1.5 )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.floor(1.5, "extra");
            expect(expression.getExpression().toString(0)).toEqual("FLOOR( 1.5 )");
        });
    });
    describe("FunctionExpressionsBuilder.rand", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.rand).toBeDefined();
            expect(builder.rand).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var expression = builder.rand();
            expect(expression.getExpression().toString(0)).toEqual("RAND()");
        });
        it("should not add extra parameters", function () {
            var expression = builder.rand("extra");
            expect(expression.getExpression().toString(0)).toEqual("RAND()");
        });
    });
    describe("FunctionExpressionsBuilder.now", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.now).toBeDefined();
            expect(builder.now).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var expression = builder.now();
            expect(expression.getExpression().toString(0)).toEqual("NOW()");
        });
        it("should not add extra parameters", function () {
            var expression = builder.now("extra");
            expect(expression.getExpression().toString(0)).toEqual("NOW()");
        });
    });
    describe("FunctionExpressionsBuilder.year", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.year).toBeDefined();
            expect(builder.year).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.year(triplesBuilder.literal("2011-01-10T14:45:13.815-05:00").withType(XSD_1.XSD.dateTime));
            expect(expression.getExpression().toString(0)).toEqual("YEAR( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should create function using natives", function () {
            var expression = builder.year(new Date("2011-01-10T14:45:13.815-05:00"));
            expect(expression.getExpression().toString(0)).toEqual("YEAR( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.year(new Date("2011-01-10T14:45:13.815-05:00"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("YEAR( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
    });
    describe("FunctionExpressionsBuilder.month", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.month).toBeDefined();
            expect(builder.month).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.month(triplesBuilder.literal("2011-01-10T14:45:13.815-05:00").withType(XSD_1.XSD.dateTime));
            expect(expression.getExpression().toString(0)).toEqual("MONTH( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should create function using natives", function () {
            var expression = builder.month(new Date("2011-01-10T14:45:13.815-05:00"));
            expect(expression.getExpression().toString(0)).toEqual("MONTH( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.month(new Date("2011-01-10T14:45:13.815-05:00"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("MONTH( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
    });
    describe("FunctionExpressionsBuilder.day", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.day).toBeDefined();
            expect(builder.day).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.day(triplesBuilder.literal("2011-01-10T14:45:13.815-05:00").withType(XSD_1.XSD.dateTime));
            expect(expression.getExpression().toString(0)).toEqual("DAY( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should create function using natives", function () {
            var expression = builder.day(new Date("2011-01-10T14:45:13.815-05:00"));
            expect(expression.getExpression().toString(0)).toEqual("DAY( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.day(new Date("2011-01-10T14:45:13.815-05:00"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("DAY( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
    });
    describe("FunctionExpressionsBuilder.hours", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.hours).toBeDefined();
            expect(builder.hours).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.hours(triplesBuilder.literal("2011-01-10T14:45:13.815-05:00").withType(XSD_1.XSD.dateTime));
            expect(expression.getExpression().toString(0)).toEqual("HOURS( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should create function using natives", function () {
            var expression = builder.hours(new Date("2011-01-10T14:45:13.815-05:00"));
            expect(expression.getExpression().toString(0)).toEqual("HOURS( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.hours(new Date("2011-01-10T14:45:13.815-05:00"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("HOURS( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
    });
    describe("FunctionExpressionsBuilder.minutes", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.minutes).toBeDefined();
            expect(builder.minutes).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.minutes(triplesBuilder.literal("2011-01-10T14:45:13.815-05:00").withType(XSD_1.XSD.dateTime));
            expect(expression.getExpression().toString(0)).toEqual("MINUTES( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should create function using natives", function () {
            var expression = builder.minutes(new Date("2011-01-10T14:45:13.815-05:00"));
            expect(expression.getExpression().toString(0)).toEqual("MINUTES( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.minutes(new Date("2011-01-10T14:45:13.815-05:00"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("MINUTES( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
    });
    describe("FunctionExpressionsBuilder.seconds", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.seconds).toBeDefined();
            expect(builder.seconds).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.seconds(triplesBuilder.literal("2011-01-10T14:45:13.815-05:00").withType(XSD_1.XSD.dateTime));
            expect(expression.getExpression().toString(0)).toEqual("SECONDS( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should create function using natives", function () {
            var expression = builder.seconds(new Date("2011-01-10T14:45:13.815-05:00"));
            expect(expression.getExpression().toString(0)).toEqual("SECONDS( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.seconds(new Date("2011-01-10T14:45:13.815-05:00"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("SECONDS( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
    });
    describe("FunctionExpressionsBuilder.timezone", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.timezone).toBeDefined();
            expect(builder.timezone).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.timezone(triplesBuilder.literal("2011-01-10T14:45:13.815-05:00").withType(XSD_1.XSD.dateTime));
            expect(expression.getExpression().toString(0)).toEqual("TIMEZONE( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should create function using natives", function () {
            var expression = builder.timezone(new Date("2011-01-10T14:45:13.815-05:00"));
            expect(expression.getExpression().toString(0)).toEqual("TIMEZONE( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.timezone(new Date("2011-01-10T14:45:13.815-05:00"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("TIMEZONE( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
    });
    describe("FunctionExpressionsBuilder.tz", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.tz).toBeDefined();
            expect(builder.tz).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.tz(triplesBuilder.literal("2011-01-10T14:45:13.815-05:00").withType(XSD_1.XSD.dateTime));
            expect(expression.getExpression().toString(0)).toEqual("TZ( \"2011-01-10T14:45:13.815-05:00\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should create function using natives", function () {
            var expression = builder.tz(new Date("2011-01-10T14:45:13.815-05:00"));
            expect(expression.getExpression().toString(0)).toEqual("TZ( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.tz(new Date("2011-01-10T14:45:13.815-05:00"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("TZ( \"2011-01-10T19:45:13.815Z\"^^<http://www.w3.org/2001/XMLSchema#dateTime> )");
        });
    });
    describe("FunctionExpressionsBuilder.md5", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.md5).toBeDefined();
            expect(builder.md5).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.md5(triplesBuilder.literal("abc").withType(XSD_1.XSD.string));
            expect(expression.getExpression().toString(0)).toEqual("MD5( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )");
        });
        it("should create function using natives", function () {
            var expression = builder.md5("abc");
            expect(expression.getExpression().toString(0)).toEqual("MD5( \"abc\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.md5("abc", "extra");
            expect(expression.getExpression().toString(0)).toEqual("MD5( \"abc\" )");
        });
    });
    describe("FunctionExpressionsBuilder.sha1", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sha1).toBeDefined();
            expect(builder.sha1).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.sha1(triplesBuilder.literal("abc").withType(XSD_1.XSD.string));
            expect(expression.getExpression().toString(0)).toEqual("SHA1( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )");
        });
        it("should create function using natives", function () {
            var expression = builder.sha1("abc");
            expect(expression.getExpression().toString(0)).toEqual("SHA1( \"abc\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sha1("abc", "extra");
            expect(expression.getExpression().toString(0)).toEqual("SHA1( \"abc\" )");
        });
    });
    describe("FunctionExpressionsBuilder.sha256", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sha256).toBeDefined();
            expect(builder.sha256).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.sha256(triplesBuilder.literal("abc").withType(XSD_1.XSD.string));
            expect(expression.getExpression().toString(0)).toEqual("SHA256( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )");
        });
        it("should create function using natives", function () {
            var expression = builder.sha256("abc");
            expect(expression.getExpression().toString(0)).toEqual("SHA256( \"abc\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sha256("abc", "extra");
            expect(expression.getExpression().toString(0)).toEqual("SHA256( \"abc\" )");
        });
    });
    describe("FunctionExpressionsBuilder.sha384", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sha384).toBeDefined();
            expect(builder.sha384).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.sha384(triplesBuilder.literal("abc").withType(XSD_1.XSD.string));
            expect(expression.getExpression().toString(0)).toEqual("SHA384( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )");
        });
        it("should create function using natives", function () {
            var expression = builder.sha384("abc");
            expect(expression.getExpression().toString(0)).toEqual("SHA384( \"abc\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sha384("abc", "extra");
            expect(expression.getExpression().toString(0)).toEqual("SHA384( \"abc\" )");
        });
    });
    describe("FunctionExpressionsBuilder.sha512", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sha512).toBeDefined();
            expect(builder.sha512).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var expression = builder.sha512(triplesBuilder.literal("abc").withType(XSD_1.XSD.string));
            expect(expression.getExpression().toString(0)).toEqual("SHA512( \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )");
        });
        it("should create function using natives", function () {
            var expression = builder.sha512("abc");
            expect(expression.getExpression().toString(0)).toEqual("SHA512( \"abc\" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sha512("abc", "extra");
            expect(expression.getExpression().toString(0)).toEqual("SHA512( \"abc\" )");
        });
    });
    describe("FunctionExpressionsBuilder.custom", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.custom).toBeDefined();
            expect(builder.custom).toEqual(jasmine.any(Function));
        });
        it("should create empty function with native IRI string", function () {
            var expression = builder.custom("https://example.com/ns#customFn");
            expect(expression.getExpression().toString(0)).toEqual("<https://example.com/ns#customFn>()");
        });
        it("should create empty function with native Prefixed string", function () {
            var expression = builder.custom("ex:customFn");
            expect(expression.getExpression().toString(0)).toEqual("ex:customFn()");
        });
        it("should create empty function with IRI resource", function () {
            var expression = builder.custom(triplesBuilder.resource("https://example.com/ns#customFn"));
            expect(expression.getExpression().toString(0)).toEqual("<https://example.com/ns#customFn>()");
        });
        it("should create empty function with Prefixed resource", function () {
            var expression = builder.custom(triplesBuilder.resource("ex:customFn"));
            expect(expression.getExpression().toString(0)).toEqual("ex:customFn()");
        });
        it("should create function using two triples", function () {
            var expression = builder.custom("ex:customFn", triplesBuilder.var("foo"), triplesBuilder.literal("abc").withType(XSD_1.XSD.string));
            expect(expression.getExpression().toString(0)).toEqual("ex:customFn( ?foo, \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )");
        });
        it("should create function using two natives", function () {
            var expression = builder.custom("ex:customFn", "ex:resource", "abc");
            expect(expression.getExpression().toString(0)).toEqual("ex:customFn( ex:resource, \"abc\" )");
        });
    });
    describe("FunctionExpressionsBuilder.customDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.customDistinct).toBeDefined();
            expect(builder.customDistinct).toEqual(jasmine.any(Function));
        });
        it("should create empty function with native IRI string", function () {
            var expression = builder.customDistinct("https://example.com/ns#customFn");
            expect(expression.getExpression().toString(0)).toEqual("<https://example.com/ns#customFn>()");
        });
        it("should create empty function with native Prefixed string", function () {
            var expression = builder.customDistinct("ex:customFn");
            expect(expression.getExpression().toString(0)).toEqual("ex:customFn()");
        });
        it("should create empty function with IRI resource", function () {
            var expression = builder.customDistinct(triplesBuilder.resource("https://example.com/ns#customFn"));
            expect(expression.getExpression().toString(0)).toEqual("<https://example.com/ns#customFn>()");
        });
        it("should create empty function with Prefixed resource", function () {
            var expression = builder.customDistinct(triplesBuilder.resource("ex:customFn"));
            expect(expression.getExpression().toString(0)).toEqual("ex:customFn()");
        });
        it("should create function using two triples", function () {
            var expression = builder.customDistinct("ex:customFn", triplesBuilder.var("foo"), triplesBuilder.literal("abc").withType(XSD_1.XSD.string));
            expect(expression.getExpression().toString(0)).toEqual("ex:customFn( DISTINCT ?foo, \"abc\"^^<http://www.w3.org/2001/XMLSchema#string> )");
        });
        it("should create function using two natives", function () {
            var expression = builder.customDistinct("ex:customFn", "ex:resource", "abc");
            expect(expression.getExpression().toString(0)).toEqual("ex:customFn( DISTINCT ex:resource, \"abc\" )");
        });
    });
    describe("FunctionExpressionsBuilder.count", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.count).toBeDefined();
            expect(builder.count).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.count("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("COUNT( ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.count(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("COUNT( ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.count(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("COUNT( ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.countDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.countDistinct).toBeDefined();
            expect(builder.countDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.countDistinct("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("COUNT( DISTINCT ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.countDistinct(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("COUNT( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.countDistinct(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("COUNT( DISTINCT ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.countAll", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.countAll).toBeDefined();
            expect(builder.countAll).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var expression = builder.countAll();
            expect(expression.getExpression().toString(0)).toEqual("COUNT( * )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.countAll("extra");
            expect(expression.getExpression().toString(0)).toEqual("COUNT( * )");
        });
    });
    describe("FunctionExpressionsBuilder.countAllDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.countAllDistinct).toBeDefined();
            expect(builder.countAllDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var expression = builder.countAllDistinct();
            expect(expression.getExpression().toString(0)).toEqual("COUNT( DISTINCT * )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.countAllDistinct("extra");
            expect(expression.getExpression().toString(0)).toEqual("COUNT( DISTINCT * )");
        });
    });
    describe("FunctionExpressionsBuilder.sum", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sum).toBeDefined();
            expect(builder.sum).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.sum("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("SUM( ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.sum(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("SUM( ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sum(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("SUM( ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.sumDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sumDistinct).toBeDefined();
            expect(builder.sumDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.sumDistinct("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("SUM( DISTINCT ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.sumDistinct(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("SUM( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sumDistinct(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("SUM( DISTINCT ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.avg", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.avg).toBeDefined();
            expect(builder.avg).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.avg("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("AVG( ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.avg(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("AVG( ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.avg(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("AVG( ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.avgDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.avgDistinct).toBeDefined();
            expect(builder.avgDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.avgDistinct("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("AVG( DISTINCT ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.avgDistinct(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("AVG( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.avgDistinct(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("AVG( DISTINCT ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.min", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.min).toBeDefined();
            expect(builder.min).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.min("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("MIN( ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.min(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("MIN( ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.min(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("MIN( ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.minDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.minDistinct).toBeDefined();
            expect(builder.minDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.minDistinct("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("MIN( DISTINCT ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.minDistinct(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("MIN( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.minDistinct(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("MIN( DISTINCT ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.max", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.max).toBeDefined();
            expect(builder.max).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.max("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("MAX( ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.max(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("MAX( ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.max(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("MAX( ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.maxDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.maxDistinct).toBeDefined();
            expect(builder.maxDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.maxDistinct("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("MAX( DISTINCT ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.maxDistinct(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("MAX( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.maxDistinct(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("MAX( DISTINCT ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.groupConcat", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.groupConcat).toBeDefined();
            expect(builder.groupConcat).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.groupConcat("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("GROUP_CONCAT( ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.groupConcat(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("GROUP_CONCAT( ?foo )");
        });
        it("should create function with expression and separator", function () {
            var expression = builder.groupConcat(triplesBuilder.var("foo"), ", ");
            expect(expression.getExpression().toString(0)).toEqual("GROUP_CONCAT( ?foo; SEPARATOR=\", \" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.groupConcat(triplesBuilder.var("foo"), ", ", "extra");
            expect(expression.getExpression().toString(0)).toEqual("GROUP_CONCAT( ?foo; SEPARATOR=\", \" )");
        });
    });
    describe("FunctionExpressionsBuilder.groupConcatDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.groupConcatDistinct).toBeDefined();
            expect(builder.groupConcatDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.groupConcatDistinct("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("GROUP_CONCAT( DISTINCT ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.groupConcatDistinct(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("GROUP_CONCAT( DISTINCT ?foo )");
        });
        it("should create function with expression and separator", function () {
            var expression = builder.groupConcatDistinct(triplesBuilder.var("foo"), ", ");
            expect(expression.getExpression().toString(0)).toEqual("GROUP_CONCAT( DISTINCT ?foo; SEPARATOR=\", \" )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.groupConcatDistinct(triplesBuilder.var("foo"), ", ", "extra");
            expect(expression.getExpression().toString(0)).toEqual("GROUP_CONCAT( DISTINCT ?foo; SEPARATOR=\", \" )");
        });
    });
    describe("FunctionExpressionsBuilder.sample", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sample).toBeDefined();
            expect(builder.sample).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.sample("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("SAMPLE( ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.sample(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("SAMPLE( ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sample(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("SAMPLE( ?foo )");
        });
    });
    describe("FunctionExpressionsBuilder.sampleDistinct", function () {
        var builder;
        beforeEach(function () {
            builder = FunctionExpressionsBuilder_1.FunctionExpressionsBuilder
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(builder.sampleDistinct).toBeDefined();
            expect(builder.sampleDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function with native", function () {
            var expression = builder.sampleDistinct("ex:resource");
            expect(expression.getExpression().toString(0)).toEqual("SAMPLE( DISTINCT ex:resource )");
        });
        it("should create function with expression", function () {
            var expression = builder.sampleDistinct(triplesBuilder.var("foo"));
            expect(expression.getExpression().toString(0)).toEqual("SAMPLE( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var expression = builder.sampleDistinct(triplesBuilder.var("foo"), "extra");
            expect(expression.getExpression().toString(0)).toEqual("SAMPLE( DISTINCT ?foo )");
        });
    });
});
