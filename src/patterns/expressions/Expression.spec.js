"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../../core/containers/Container");
var IRIResolver_1 = require("../../core/iri/IRIResolver");
var TriplePatternsBuilder_1 = require("../triplePatterns/TriplePatternsBuilder");
var VariableToken_1 = require("../../tokens/VariableToken");
var XSD_1 = require("../../utils/XSD");
var Expression_1 = require("./Expression");
var ExpressionsBuilder_1 = require("./ExpressionsBuilder");
describe("Expression", function () {
    it("should exists", function () {
        expect(Expression_1.Expression).toBeDefined();
        expect(Expression_1.Expression).toEqual(jasmine.any(Object));
    });
    var container;
    var triplesBuilder;
    var expressionsBuilder;
    beforeEach(function () {
        var iriResolver = new IRIResolver_1.IRIResolver();
        iriResolver.prefixes.set("ex", false);
        container = new Container_1.Container({
            iriResolver: iriResolver,
            targetToken: new VariableToken_1.VariableToken("foo"),
        });
        var generalContainer = new Container_1.Container({
            iriResolver: iriResolver,
            targetToken: void 0,
        });
        triplesBuilder = TriplePatternsBuilder_1.TriplePatternsBuilder
            .createFrom(generalContainer, {});
        expressionsBuilder = ExpressionsBuilder_1.ExpressionsBuilder
            .createFrom(generalContainer, {});
    });
    describe("Expression.createFrom", function () {
        it("should exists", function () {
            expect(Expression_1.Expression.createFrom).toBeDefined();
            expect(Expression_1.Expression.createFrom).toEqual(jasmine.any(Function));
        });
        it("should extend the object provided", function () {
            var myObject = {};
            var finishPattern = Expression_1.Expression
                .createFrom(container, myObject);
            expect(myObject).toBe(finishPattern);
        });
        it("should create a Expression object", function () {
            var finishPattern = Expression_1.Expression
                .createFrom(container, {});
            expect(finishPattern).toEqual({
                if: jasmine.any(Function),
                coalesce: jasmine.any(Function),
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
                count: jasmine.any(Function),
                countDistinct: jasmine.any(Function),
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
                or: jasmine.any(Function),
                and: jasmine.any(Function),
                equals: jasmine.any(Function),
                notEquals: jasmine.any(Function),
                lt: jasmine.any(Function),
                lte: jasmine.any(Function),
                gt: jasmine.any(Function),
                gte: jasmine.any(Function),
                in: jasmine.any(Function),
                notIn: jasmine.any(Function),
                add: jasmine.any(Function),
                subtract: jasmine.any(Function),
                multiply: jasmine.any(Function),
                divide: jasmine.any(Function),
                not: jasmine.any(Function),
                plus: jasmine.any(Function),
                minus: jasmine.any(Function),
                as: jasmine.any(Function),
                getExpression: jasmine.any(Function),
            });
        });
    });
    describe("Expression.getExpression", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression.createFrom(container, {});
        });
        it("should return targetToken", function () {
            var token = expression.getExpression();
            expect(token).toBe(container.targetToken);
        });
    });
    describe("Expression.as", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression.createFrom(container, {});
        });
        it("should create assigment with string variable", function () {
            var token = expression.as("bar");
            expect(token.getProjection().toString()).toBe("(?foo AS ?bar)");
        });
        it("should create assigment with object variable", function () {
            var token = expression.as(triplesBuilder.var("bar"));
            expect(token.getProjection().toString()).toBe("(?foo AS ?bar)");
        });
    });
    describe("Expression.if", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.if).toBeDefined();
            expect(expression.if).toEqual(jasmine.any(Function));
        });
        it("should create function using expression & triples", function () {
            var returned = expression.if(triplesBuilder.resource("ex:resource"), triplesBuilder.literal(false));
            expect(returned.getExpression().toString(0)).toEqual("IF( ?foo, ex:resource, false )");
        });
        it("should create function using expression & natives", function () {
            var returned = expression.if("ex:resource", false);
            expect(returned.getExpression().toString(0)).toEqual("IF( ?foo, ex:resource, false )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.if("ex:resource", false, "extra");
            expect(returned.getExpression().toString(0)).toEqual("IF( ?foo, ex:resource, false )");
        });
    });
    describe("Expression.coalesce", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.coalesce).toBeDefined();
            expect(expression.coalesce).toEqual(jasmine.any(Function));
        });
        it("should create function using expression, triples & natives", function () {
            var returned = expression.coalesce(triplesBuilder.resource("ex:resource-1"), "ex:resource-2", false, triplesBuilder.literal("value"));
            expect(returned.getExpression().toString(0)).toEqual("COALESCE( ?foo, ex:resource-1, ex:resource-2, false, \"value\" )");
        });
    });
    describe("Expression.sameTerm", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sameTerm).toBeDefined();
            expect(expression.sameTerm).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.sameTerm(triplesBuilder.literal("value"));
            expect(returned.getExpression().toString(0)).toEqual("sameTerm( ?foo, \"value\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.sameTerm("value");
            expect(returned.getExpression().toString(0)).toEqual("sameTerm( ?foo, \"value\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sameTerm("value", "extra");
            expect(returned.getExpression().toString(0)).toEqual("sameTerm( ?foo, \"value\" )");
        });
    });
    describe("Expression.isIRI", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.isIRI).toBeDefined();
            expect(expression.isIRI).toEqual(jasmine.any(Function));
        });
        it("should create", function () {
            var returned = expression.isIRI();
            expect(returned.getExpression().toString(0)).toEqual("isIRI( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.isIRI("extra");
            expect(returned.getExpression().toString(0)).toEqual("isIRI( ?foo )");
        });
    });
    describe("Expression.isURI", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.isURI).toBeDefined();
            expect(expression.isURI).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.isURI();
            expect(returned.getExpression().toString(0)).toEqual("isURI( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.isURI("extra");
            expect(returned.getExpression().toString(0)).toEqual("isURI( ?foo )");
        });
    });
    describe("Expression.isBlank", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.isBlank).toBeDefined();
            expect(expression.isBlank).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.isBlank();
            expect(returned.getExpression().toString(0)).toEqual("isBLANK( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.isBlank("extra");
            expect(returned.getExpression().toString(0)).toEqual("isBLANK( ?foo )");
        });
    });
    describe("Expression.isLiteral", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.isLiteral).toBeDefined();
            expect(expression.isLiteral).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.isLiteral();
            expect(returned.getExpression().toString(0)).toEqual("isLITERAL( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.isLiteral("extra");
            expect(returned.getExpression().toString(0)).toEqual("isLITERAL( ?foo )");
        });
    });
    describe("Expression.isNumeric", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.isNumeric).toBeDefined();
            expect(expression.isNumeric).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.isNumeric();
            expect(returned.getExpression().toString(0)).toEqual("isNUMERIC( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.isNumeric("extra");
            expect(returned.getExpression().toString(0)).toEqual("isNUMERIC( ?foo )");
        });
    });
    describe("Expression.str", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.str).toBeDefined();
            expect(expression.str).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.str();
            expect(returned.getExpression().toString(0)).toEqual("STR( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.str("extra");
            expect(returned.getExpression().toString(0)).toEqual("STR( ?foo )");
        });
    });
    describe("Expression.lang", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.lang).toBeDefined();
            expect(expression.lang).toEqual(jasmine.any(Function));
        });
        it("should create function using natives", function () {
            var returned = expression.lang();
            expect(returned.getExpression().toString(0)).toEqual("LANG( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.lang("extra");
            expect(returned.getExpression().toString(0)).toEqual("LANG( ?foo )");
        });
    });
    describe("Expression.datatype", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.datatype).toBeDefined();
            expect(expression.datatype).toEqual(jasmine.any(Function));
        });
        it("should create function using natives", function () {
            var returned = expression.datatype();
            expect(returned.getExpression().toString(0)).toEqual("DATATYPE( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.datatype("extra");
            expect(returned.getExpression().toString(0)).toEqual("DATATYPE( ?foo )");
        });
    });
    describe("Expression.iri", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.iri).toBeDefined();
            expect(expression.iri).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.iri();
            expect(returned.getExpression().toString(0)).toEqual("IRI( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.iri("extra");
            expect(returned.getExpression().toString(0)).toEqual("IRI( ?foo )");
        });
    });
    describe("Expression.uri", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.uri).toBeDefined();
            expect(expression.uri).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.uri();
            expect(returned.getExpression().toString(0)).toEqual("URI( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.uri("extra");
            expect(returned.getExpression().toString(0)).toEqual("URI( ?foo )");
        });
    });
    describe("Expression.bnode", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.bnode).toBeDefined();
            expect(expression.bnode).toEqual(jasmine.any(Function));
        });
        it("should create function using natives", function () {
            var returned = expression.bnode();
            expect(returned.getExpression().toString(0)).toEqual("BNODE( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.bnode("extra");
            expect(returned.getExpression().toString(0)).toEqual("BNODE( ?foo )");
        });
    });
    describe("Expression.strDT", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.strDT).toBeDefined();
            expect(expression.strDT).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.strDT(triplesBuilder.resource(XSD_1.XSD.integer));
            expect(returned.getExpression().toString(0)).toEqual("STRDT( ?foo, <http://www.w3.org/2001/XMLSchema#integer> )");
        });
        it("should create function using natives", function () {
            var returned = expression.strDT(XSD_1.XSD.integer);
            expect(returned.getExpression().toString(0)).toEqual("STRDT( ?foo, <http://www.w3.org/2001/XMLSchema#integer> )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.strDT(XSD_1.XSD.integer, "extra");
            expect(returned.getExpression().toString(0)).toEqual("STRDT( ?foo, <http://www.w3.org/2001/XMLSchema#integer> )");
        });
    });
    describe("Expression.strLang", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.strLang).toBeDefined();
            expect(expression.strLang).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.strLang(triplesBuilder.literal("en"));
            expect(returned.getExpression().toString(0)).toEqual("STRLANG( ?foo, \"en\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.strLang("en");
            expect(returned.getExpression().toString(0)).toEqual("STRLANG( ?foo, \"en\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.strLang("en", "extra");
            expect(returned.getExpression().toString(0)).toEqual("STRLANG( ?foo, \"en\" )");
        });
    });
    describe("Expression.strLen", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.strLen).toBeDefined();
            expect(expression.strLen).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.strLen();
            expect(returned.getExpression().toString(0)).toEqual("STRLEN( ?foo )");
        });
        it("should create function using natives", function () {
            var returned = expression.strLen();
            expect(returned.getExpression().toString(0)).toEqual("STRLEN( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.strLen("extra");
            expect(returned.getExpression().toString(0)).toEqual("STRLEN( ?foo )");
        });
    });
    describe("Expression.substr", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.substr).toBeDefined();
            expect(expression.substr).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.substr(triplesBuilder.literal(4));
            expect(returned.getExpression().toString(0)).toEqual("SUBSTR( ?foo, 4 )");
        });
        it("should create function with length using triples", function () {
            var returned = expression.substr(triplesBuilder.literal(4), triplesBuilder.literal(1));
            expect(returned.getExpression().toString(0)).toEqual("SUBSTR( ?foo, 4, 1 )");
        });
        it("should create function using natives", function () {
            var returned = expression.substr(4);
            expect(returned.getExpression().toString(0)).toEqual("SUBSTR( ?foo, 4 )");
        });
        it("should create function with length using natives", function () {
            var returned = expression.substr(4, 1);
            expect(returned.getExpression().toString(0)).toEqual("SUBSTR( ?foo, 4, 1 )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.substr(4, 1, "extra");
            expect(returned.getExpression().toString(0)).toEqual("SUBSTR( ?foo, 4, 1 )");
        });
    });
    describe("Expression.uCase", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.uCase).toBeDefined();
            expect(expression.uCase).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.uCase();
            expect(returned.getExpression().toString(0)).toEqual("UCASE( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.uCase("extra");
            expect(returned.getExpression().toString(0)).toEqual("UCASE( ?foo )");
        });
    });
    describe("Expression.lCase", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.lCase).toBeDefined();
            expect(expression.lCase).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.lCase();
            expect(returned.getExpression().toString(0)).toEqual("LCASE( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.lCase("extra");
            expect(returned.getExpression().toString(0)).toEqual("LCASE( ?foo )");
        });
    });
    describe("Expression.strStarts", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.strStarts).toBeDefined();
            expect(expression.strStarts).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.strStarts(triplesBuilder.literal("hell"));
            expect(returned.getExpression().toString(0)).toEqual("STRSTARTS( ?foo, \"hell\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.strStarts("hell");
            expect(returned.getExpression().toString(0)).toEqual("STRSTARTS( ?foo, \"hell\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.strStarts("hell", "extra");
            expect(returned.getExpression().toString(0)).toEqual("STRSTARTS( ?foo, \"hell\" )");
        });
    });
    describe("Expression.strEnds", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.strEnds).toBeDefined();
            expect(expression.strEnds).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.strEnds(triplesBuilder.literal("hell"));
            expect(returned.getExpression().toString(0)).toEqual("STRENDS( ?foo, \"hell\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.strEnds("hell");
            expect(returned.getExpression().toString(0)).toEqual("STRENDS( ?foo, \"hell\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.strEnds("hell", "extra");
            expect(returned.getExpression().toString(0)).toEqual("STRENDS( ?foo, \"hell\" )");
        });
    });
    describe("Expression.contains", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.contains).toBeDefined();
            expect(expression.contains).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.contains(triplesBuilder.literal("el"));
            expect(returned.getExpression().toString(0)).toEqual("CONTAINS( ?foo, \"el\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.contains("el");
            expect(returned.getExpression().toString(0)).toEqual("CONTAINS( ?foo, \"el\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.contains("el", "extra");
            expect(returned.getExpression().toString(0)).toEqual("CONTAINS( ?foo, \"el\" )");
        });
    });
    describe("Expression.strBefore", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.strBefore).toBeDefined();
            expect(expression.strBefore).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.strBefore(triplesBuilder.literal("el"));
            expect(returned.getExpression().toString(0)).toEqual("STRBEFORE( ?foo, \"el\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.strBefore("el");
            expect(returned.getExpression().toString(0)).toEqual("STRBEFORE( ?foo, \"el\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.strBefore("el", "extra");
            expect(returned.getExpression().toString(0)).toEqual("STRBEFORE( ?foo, \"el\" )");
        });
    });
    describe("Expression.strAfter", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.strAfter).toBeDefined();
            expect(expression.strAfter).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.strAfter(triplesBuilder.literal("el"));
            expect(returned.getExpression().toString(0)).toEqual("STRAFTER( ?foo, \"el\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.strAfter("el");
            expect(returned.getExpression().toString(0)).toEqual("STRAFTER( ?foo, \"el\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.strAfter("el", "extra");
            expect(returned.getExpression().toString(0)).toEqual("STRAFTER( ?foo, \"el\" )");
        });
    });
    describe("Expression.encodeForUri", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.encodeForUri).toBeDefined();
            expect(expression.encodeForUri).toEqual(jasmine.any(Function));
        });
        it("should create function using natives", function () {
            var returned = expression.encodeForUri();
            expect(returned.getExpression().toString(0)).toEqual("ENCODE_FOR_URI( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.encodeForUri("extra");
            expect(returned.getExpression().toString(0)).toEqual("ENCODE_FOR_URI( ?foo )");
        });
    });
    describe("Expression.concat", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.concat).toBeDefined();
            expect(expression.concat).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.concat("foo", triplesBuilder.literal("bar"));
            expect(returned.getExpression().toString(0)).toEqual("CONCAT( ?foo, \"foo\", \"bar\" )");
        });
    });
    describe("Expression.langMatches", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.langMatches).toBeDefined();
            expect(expression.langMatches).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.langMatches(triplesBuilder.literal("fr"));
            expect(returned.getExpression().toString(0)).toEqual("LANGMATCHES( ?foo, \"fr\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.langMatches("fr");
            expect(returned.getExpression().toString(0)).toEqual("LANGMATCHES( ?foo, \"fr\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.langMatches("fr", "extra");
            expect(returned.getExpression().toString(0)).toEqual("LANGMATCHES( ?foo, \"fr\" )");
        });
    });
    describe("Expression.regex", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.regex).toBeDefined();
            expect(expression.regex).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.regex(triplesBuilder.literal("^Foo"));
            expect(returned.getExpression().toString(0)).toEqual("REGEX( ?foo, \"^Foo\" )");
        });
        it("should create function with flag using triples", function () {
            var returned = expression.regex(triplesBuilder.literal("^foo"), triplesBuilder.literal("i"));
            expect(returned.getExpression().toString(0)).toEqual("REGEX( ?foo, \"^foo\", \"i\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.regex("^Foo");
            expect(returned.getExpression().toString(0)).toEqual("REGEX( ?foo, \"^Foo\" )");
        });
        it("should create function with flag using natives", function () {
            var returned = expression.regex("^foo", "i");
            expect(returned.getExpression().toString(0)).toEqual("REGEX( ?foo, \"^foo\", \"i\" )");
        });
        it("should create function using regex", function () {
            var returned = expression.regex(/^Foo/);
            expect(returned.getExpression().toString(0)).toEqual("REGEX( ?foo, \"^Foo\" )");
        });
        it("should create function using regex with flags", function () {
            var returned = expression.regex(/^foo/i);
            expect(returned.getExpression().toString(0)).toEqual("REGEX( ?foo, \"^foo\", \"i\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.regex("^foo", "i", "extra");
            expect(returned.getExpression().toString(0)).toEqual("REGEX( ?foo, \"^foo\", \"i\" )");
        });
    });
    describe("Expression.replace", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.replace).toBeDefined();
            expect(expression.replace).toEqual(jasmine.any(Function));
        });
        it("should create function using triples", function () {
            var returned = expression.replace(triplesBuilder.literal("r"), triplesBuilder.literal("z"));
            expect(returned.getExpression().toString(0)).toEqual("REPLACE( ?foo, \"r\", \"z\" )");
        });
        it("should create function with flag using triples", function () {
            var returned = expression.replace(triplesBuilder.literal("R"), triplesBuilder.literal("z"), triplesBuilder.literal("i"));
            expect(returned.getExpression().toString(0)).toEqual("REPLACE( ?foo, \"R\", \"z\", \"i\" )");
        });
        it("should create function using natives", function () {
            var returned = expression.replace("r", "z");
            expect(returned.getExpression().toString(0)).toEqual("REPLACE( ?foo, \"r\", \"z\" )");
        });
        it("should create function with flag using natives", function () {
            var returned = expression.replace("R", "z", "i");
            expect(returned.getExpression().toString(0)).toEqual("REPLACE( ?foo, \"R\", \"z\", \"i\" )");
        });
        it("should create function using regex", function () {
            var returned = expression.replace(/r/, "z");
            expect(returned.getExpression().toString(0)).toEqual("REPLACE( ?foo, \"r\", \"z\" )");
        });
        it("should create function using regex with flags", function () {
            var returned = expression.replace(/R/i, "z");
            expect(returned.getExpression().toString(0)).toEqual("REPLACE( ?foo, \"R\", \"z\", \"i\" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.replace("R", "z", "i", "extra");
            expect(returned.getExpression().toString(0)).toEqual("REPLACE( ?foo, \"R\", \"z\", \"i\" )");
        });
    });
    describe("Expression.abs", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.abs).toBeDefined();
            expect(expression.abs).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.abs();
            expect(returned.getExpression().toString(0)).toEqual("ABS( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.abs("extra");
            expect(returned.getExpression().toString(0)).toEqual("ABS( ?foo )");
        });
    });
    describe("Expression.round", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.round).toBeDefined();
            expect(expression.round).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.round();
            expect(returned.getExpression().toString(0)).toEqual("ROUND( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.round("extra");
            expect(returned.getExpression().toString(0)).toEqual("ROUND( ?foo )");
        });
    });
    describe("Expression.ceil", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.ceil).toBeDefined();
            expect(expression.ceil).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.ceil();
            expect(returned.getExpression().toString(0)).toEqual("CEIL( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.ceil("extra");
            expect(returned.getExpression().toString(0)).toEqual("CEIL( ?foo )");
        });
    });
    describe("Expression.floor", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.floor).toBeDefined();
            expect(expression.floor).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.floor();
            expect(returned.getExpression().toString(0)).toEqual("FLOOR( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.floor("extra");
            expect(returned.getExpression().toString(0)).toEqual("FLOOR( ?foo )");
        });
    });
    describe("Expression.year", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.year).toBeDefined();
            expect(expression.year).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.year();
            expect(returned.getExpression().toString(0)).toEqual("YEAR( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.year("extra");
            expect(returned.getExpression().toString(0)).toEqual("YEAR( ?foo )");
        });
    });
    describe("Expression.month", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.month).toBeDefined();
            expect(expression.month).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.month();
            expect(returned.getExpression().toString(0)).toEqual("MONTH( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.month("extra");
            expect(returned.getExpression().toString(0)).toEqual("MONTH( ?foo )");
        });
    });
    describe("Expression.day", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.day).toBeDefined();
            expect(expression.day).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.day();
            expect(returned.getExpression().toString(0)).toEqual("DAY( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.day("extra");
            expect(returned.getExpression().toString(0)).toEqual("DAY( ?foo )");
        });
    });
    describe("Expression.hours", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.hours).toBeDefined();
            expect(expression.hours).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.hours();
            expect(returned.getExpression().toString(0)).toEqual("HOURS( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.hours("extra");
            expect(returned.getExpression().toString(0)).toEqual("HOURS( ?foo )");
        });
    });
    describe("Expression.minutes", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.minutes).toBeDefined();
            expect(expression.minutes).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.minutes();
            expect(returned.getExpression().toString(0)).toEqual("MINUTES( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.minutes("extra");
            expect(returned.getExpression().toString(0)).toEqual("MINUTES( ?foo )");
        });
    });
    describe("Expression.seconds", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.seconds).toBeDefined();
            expect(expression.seconds).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.seconds();
            expect(returned.getExpression().toString(0)).toEqual("SECONDS( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.seconds("extra");
            expect(returned.getExpression().toString(0)).toEqual("SECONDS( ?foo )");
        });
    });
    describe("Expression.timezone", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.timezone).toBeDefined();
            expect(expression.timezone).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.timezone();
            expect(returned.getExpression().toString(0)).toEqual("TIMEZONE( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.timezone("extra");
            expect(returned.getExpression().toString(0)).toEqual("TIMEZONE( ?foo )");
        });
    });
    describe("Expression.tz", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.tz).toBeDefined();
            expect(expression.tz).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.tz();
            expect(returned.getExpression().toString(0)).toEqual("TZ( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.tz("extra");
            expect(returned.getExpression().toString(0)).toEqual("TZ( ?foo )");
        });
    });
    describe("Expression.md5", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.md5).toBeDefined();
            expect(expression.md5).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.md5();
            expect(returned.getExpression().toString(0)).toEqual("MD5( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.md5("extra");
            expect(returned.getExpression().toString(0)).toEqual("MD5( ?foo )");
        });
    });
    describe("Expression.sha1", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sha1).toBeDefined();
            expect(expression.sha1).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.sha1();
            expect(returned.getExpression().toString(0)).toEqual("SHA1( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sha1("extra");
            expect(returned.getExpression().toString(0)).toEqual("SHA1( ?foo )");
        });
    });
    describe("Expression.sha256", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sha256).toBeDefined();
            expect(expression.sha256).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.sha256();
            expect(returned.getExpression().toString(0)).toEqual("SHA256( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sha256("extra");
            expect(returned.getExpression().toString(0)).toEqual("SHA256( ?foo )");
        });
    });
    describe("Expression.sha384", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sha384).toBeDefined();
            expect(expression.sha384).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.sha384();
            expect(returned.getExpression().toString(0)).toEqual("SHA384( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sha384("extra");
            expect(returned.getExpression().toString(0)).toEqual("SHA384( ?foo )");
        });
    });
    describe("Expression.sha512", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sha512).toBeDefined();
            expect(expression.sha512).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.sha512();
            expect(returned.getExpression().toString(0)).toEqual("SHA512( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sha512("extra");
            expect(returned.getExpression().toString(0)).toEqual("SHA512( ?foo )");
        });
    });
    describe("Expression.count", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.count).toBeDefined();
            expect(expression.count).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.count();
            expect(returned.getExpression().toString(0)).toEqual("COUNT( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.count("extra");
            expect(returned.getExpression().toString(0)).toEqual("COUNT( ?foo )");
        });
    });
    describe("Expression.countDistinct", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.countDistinct).toBeDefined();
            expect(expression.countDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.countDistinct();
            expect(returned.getExpression().toString(0)).toEqual("COUNT( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.countDistinct("extra");
            expect(returned.getExpression().toString(0)).toEqual("COUNT( DISTINCT ?foo )");
        });
    });
    describe("Expression.sum", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sum).toBeDefined();
            expect(expression.sum).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.sum();
            expect(returned.getExpression().toString(0)).toEqual("SUM( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sum("extra");
            expect(returned.getExpression().toString(0)).toEqual("SUM( ?foo )");
        });
    });
    describe("Expression.sumDistinct", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sumDistinct).toBeDefined();
            expect(expression.sumDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.sumDistinct();
            expect(returned.getExpression().toString(0)).toEqual("SUM( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sumDistinct("extra");
            expect(returned.getExpression().toString(0)).toEqual("SUM( DISTINCT ?foo )");
        });
    });
    describe("Expression.avg", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.avg).toBeDefined();
            expect(expression.avg).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.avg();
            expect(returned.getExpression().toString(0)).toEqual("AVG( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.avg("extra");
            expect(returned.getExpression().toString(0)).toEqual("AVG( ?foo )");
        });
    });
    describe("Expression.avgDistinct", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.avgDistinct).toBeDefined();
            expect(expression.avgDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.avgDistinct();
            expect(returned.getExpression().toString(0)).toEqual("AVG( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.avgDistinct("extra");
            expect(returned.getExpression().toString(0)).toEqual("AVG( DISTINCT ?foo )");
        });
    });
    describe("Expression.min", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.min).toBeDefined();
            expect(expression.min).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.min();
            expect(returned.getExpression().toString(0)).toEqual("MIN( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.min("extra");
            expect(returned.getExpression().toString(0)).toEqual("MIN( ?foo )");
        });
    });
    describe("Expression.minDistinct", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.minDistinct).toBeDefined();
            expect(expression.minDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.minDistinct();
            expect(returned.getExpression().toString(0)).toEqual("MIN( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.minDistinct("extra");
            expect(returned.getExpression().toString(0)).toEqual("MIN( DISTINCT ?foo )");
        });
    });
    describe("Expression.max", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.max).toBeDefined();
            expect(expression.max).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.max();
            expect(returned.getExpression().toString(0)).toEqual("MAX( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.max("extra");
            expect(returned.getExpression().toString(0)).toEqual("MAX( ?foo )");
        });
    });
    describe("Expression.maxDistinct", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.maxDistinct).toBeDefined();
            expect(expression.maxDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.maxDistinct();
            expect(returned.getExpression().toString(0)).toEqual("MAX( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.maxDistinct("extra");
            expect(returned.getExpression().toString(0)).toEqual("MAX( DISTINCT ?foo )");
        });
    });
    describe("Expression.groupConcat", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.groupConcat).toBeDefined();
            expect(expression.groupConcat).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.groupConcat();
            expect(returned.getExpression().toString(0)).toEqual("GROUP_CONCAT( ?foo )");
        });
        it("should create function with separator", function () {
            var returned = expression.groupConcat(", ");
            expect(returned.getExpression().toString(0)).toEqual("GROUP_CONCAT( ?foo; SEPARATOR=\", \" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.groupConcat(", ", "extra");
            expect(returned.getExpression().toString(0)).toEqual("GROUP_CONCAT( ?foo; SEPARATOR=\", \" )");
        });
    });
    describe("Expression.groupConcatDistinct", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.groupConcatDistinct).toBeDefined();
            expect(expression.groupConcatDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.groupConcatDistinct();
            expect(returned.getExpression().toString(0)).toEqual("GROUP_CONCAT( DISTINCT ?foo )");
        });
        it("should create function with separator", function () {
            var returned = expression.groupConcatDistinct(", ");
            expect(returned.getExpression().toString(0)).toEqual("GROUP_CONCAT( DISTINCT ?foo; SEPARATOR=\", \" )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.groupConcatDistinct(", ", "extra");
            expect(returned.getExpression().toString(0)).toEqual("GROUP_CONCAT( DISTINCT ?foo; SEPARATOR=\", \" )");
        });
    });
    describe("Expression.sample", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sample).toBeDefined();
            expect(expression.sample).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.sample();
            expect(returned.getExpression().toString(0)).toEqual("SAMPLE( ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sample("extra");
            expect(returned.getExpression().toString(0)).toEqual("SAMPLE( ?foo )");
        });
    });
    describe("Expression.sampleDistinct", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.sampleDistinct).toBeDefined();
            expect(expression.sampleDistinct).toEqual(jasmine.any(Function));
        });
        it("should create function", function () {
            var returned = expression.sampleDistinct();
            expect(returned.getExpression().toString(0)).toEqual("SAMPLE( DISTINCT ?foo )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.sampleDistinct("extra");
            expect(returned.getExpression().toString(0)).toEqual("SAMPLE( DISTINCT ?foo )");
        });
    });
    describe("Expression.or", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.or).toBeDefined();
            expect(expression.or).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.or(triplesBuilder.var("bar"), triplesBuilder.var("baz"));
            expect(returned.getExpression().toString(0)).toEqual("?foo || ?bar || ?baz");
        });
        it("should create operation using natives", function () {
            var returned = expression.or("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo || \"bar\" || \"baz\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.or(expressionsBuilder.or(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo || ( ?baz || ?qux )");
        });
    });
    describe("Expression.and", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.and).toBeDefined();
            expect(expression.and).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.and(triplesBuilder.var("bar"), triplesBuilder.var("baz"));
            expect(returned.getExpression().toString(0)).toEqual("?foo && ?bar && ?baz");
        });
        it("should create operation using natives", function () {
            var returned = expression.and("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo && \"bar\" && \"baz\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.and(expressionsBuilder.or(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo && ( ?baz || ?qux )");
        });
    });
    describe("Expression.equals", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.equals).toBeDefined();
            expect(expression.equals).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.equals(triplesBuilder.var("bar"));
            expect(returned.getExpression().toString(0)).toEqual("?foo = ?bar");
        });
        it("should create operation using natives", function () {
            var returned = expression.equals("bar");
            expect(returned.getExpression().toString(0)).toEqual("?foo = \"bar\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.equals(expressionsBuilder.or(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo = ( ?baz || ?qux )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.equals("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo = \"bar\"");
        });
    });
    describe("Expression.notEquals", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.notEquals).toBeDefined();
            expect(expression.notEquals).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.notEquals(triplesBuilder.var("bar"));
            expect(returned.getExpression().toString(0)).toEqual("?foo != ?bar");
        });
        it("should create operation using natives", function () {
            var returned = expression.notEquals("bar");
            expect(returned.getExpression().toString(0)).toEqual("?foo != \"bar\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.notEquals(expressionsBuilder.and(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo != ( ?baz && ?qux )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.notEquals("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo != \"bar\"");
        });
    });
    describe("Expression.lt", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.lt).toBeDefined();
            expect(expression.lt).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.lt(triplesBuilder.var("bar"));
            expect(returned.getExpression().toString(0)).toEqual("?foo < ?bar");
        });
        it("should create operation using natives", function () {
            var returned = expression.lt("bar");
            expect(returned.getExpression().toString(0)).toEqual("?foo < \"bar\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.lt(expressionsBuilder.equals(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo < ( ?baz = ?qux )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.lt("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo < \"bar\"");
        });
    });
    describe("Expression.lte", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.lte).toBeDefined();
            expect(expression.lte).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.lte(triplesBuilder.var("bar"));
            expect(returned.getExpression().toString(0)).toEqual("?foo <= ?bar");
        });
        it("should create operation using natives", function () {
            var returned = expression.lte("bar");
            expect(returned.getExpression().toString(0)).toEqual("?foo <= \"bar\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.lte(expressionsBuilder.notEquals(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo <= ( ?baz != ?qux )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.lte("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo <= \"bar\"");
        });
    });
    describe("Expression.gt", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.gt).toBeDefined();
            expect(expression.gt).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.gt(triplesBuilder.var("bar"));
            expect(returned.getExpression().toString(0)).toEqual("?foo > ?bar");
        });
        it("should create operation using natives", function () {
            var returned = expression.gt("bar");
            expect(returned.getExpression().toString(0)).toEqual("?foo > \"bar\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.gt(expressionsBuilder.lt(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo > ( ?baz < ?qux )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.gt("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo > \"bar\"");
        });
    });
    describe("Expression.gte", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.gte).toBeDefined();
            expect(expression.gte).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.gte(triplesBuilder.var("bar"));
            expect(returned.getExpression().toString(0)).toEqual("?foo >= ?bar");
        });
        it("should create operation using natives", function () {
            var returned = expression.gte("bar");
            expect(returned.getExpression().toString(0)).toEqual("?foo >= \"bar\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.gte(expressionsBuilder.lte(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo >= ( ?baz <= ?qux )");
        });
        it("should not add extra parameters", function () {
            var returned = expression.gte("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo >= \"bar\"");
        });
    });
    describe("Expression.in", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.in).toBeDefined();
            expect(expression.in).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.in(triplesBuilder.var("bar"), triplesBuilder.var("baz"));
            expect(returned.getExpression().toString(0)).toEqual("?foo IN( ?bar, ?baz )");
        });
        it("should create operation using natives", function () {
            var returned = expression.in("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo IN( \"bar\", \"baz\" )");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.in(expressionsBuilder.gt(triplesBuilder.var("baz"), triplesBuilder.var("qux")), true);
            expect(returned.getExpression().toString(0)).toEqual("?foo IN( ?baz > ?qux, true )");
        });
    });
    describe("Expression.notIn", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.notIn).toBeDefined();
            expect(expression.notIn).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.notIn(triplesBuilder.var("bar"), triplesBuilder.var("baz"));
            expect(returned.getExpression().toString(0)).toEqual("?foo NOT IN( ?bar, ?baz )");
        });
        it("should create operation using natives", function () {
            var returned = expression.notIn("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo NOT IN( \"bar\", \"baz\" )");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.notIn(expressionsBuilder.gt(triplesBuilder.var("baz"), triplesBuilder.var("qux")), true);
            expect(returned.getExpression().toString(0)).toEqual("?foo NOT IN( ?baz > ?qux, true )");
        });
    });
    describe("Expression.add", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.add).toBeDefined();
            expect(expression.add).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.add(triplesBuilder.var("bar"), triplesBuilder.var("baz"));
            expect(returned.getExpression().toString(0)).toEqual("?foo + ?bar + ?baz");
        });
        it("should create operation using natives", function () {
            var returned = expression.add("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo + \"bar\" + \"baz\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.add(expressionsBuilder.gt(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo + ( ?baz > ?qux )");
        });
    });
    describe("Expression.subtract", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.subtract).toBeDefined();
            expect(expression.subtract).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.subtract(triplesBuilder.var("bar"), triplesBuilder.var("baz"));
            expect(returned.getExpression().toString(0)).toEqual("?foo - ?bar - ?baz");
        });
        it("should create operation using natives", function () {
            var returned = expression.subtract("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo - \"bar\" - \"baz\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.subtract(expressionsBuilder.gte(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo - ( ?baz >= ?qux )");
        });
    });
    describe("Expression.multiply", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.multiply).toBeDefined();
            expect(expression.multiply).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.multiply(triplesBuilder.var("bar"), triplesBuilder.var("baz"));
            expect(returned.getExpression().toString(0)).toEqual("?foo * ?bar * ?baz");
        });
        it("should create operation using natives", function () {
            var returned = expression.multiply("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo * \"bar\" * \"baz\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.multiply(expressionsBuilder.add(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo * ( ?baz + ?qux )");
        });
    });
    describe("Expression.divide", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.divide).toBeDefined();
            expect(expression.divide).toEqual(jasmine.any(Function));
        });
        it("should create operation using expressions", function () {
            var returned = expression.divide(triplesBuilder.var("bar"), triplesBuilder.var("baz"));
            expect(returned.getExpression().toString(0)).toEqual("?foo / ?bar / ?baz");
        });
        it("should create operation using natives", function () {
            var returned = expression.divide("bar", "baz");
            expect(returned.getExpression().toString(0)).toEqual("?foo / \"bar\" / \"baz\"");
        });
        it("should create operation wrapping non supported operations", function () {
            var returned = expression.divide(expressionsBuilder.subtract(triplesBuilder.var("baz"), triplesBuilder.var("qux")));
            expect(returned.getExpression().toString(0)).toEqual("?foo / ( ?baz - ?qux )");
        });
    });
    describe("Expression.not", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.not).toBeDefined();
            expect(expression.not).toEqual(jasmine.any(Function));
        });
        it("should create operation", function () {
            var returned = expression.not();
            expect(returned.getExpression().toString(0)).toEqual("! ?foo");
        });
    });
    describe("Expression.plus", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.plus).toBeDefined();
            expect(expression.plus).toEqual(jasmine.any(Function));
        });
        it("should create operation", function () {
            var returned = expression.plus();
            expect(returned.getExpression().toString(0)).toEqual("+ ?foo");
        });
    });
    describe("Expression.minus", function () {
        var expression;
        beforeEach(function () {
            expression = Expression_1.Expression
                .createFrom(container, {});
        });
        it("should exists", function () {
            expect(expression.minus).toBeDefined();
            expect(expression.minus).toEqual(jasmine.any(Function));
        });
        it("should create operation", function () {
            var returned = expression.minus();
            expect(returned.getExpression().toString(0)).toEqual("- ?foo");
        });
    });
});
