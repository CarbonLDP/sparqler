# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!-- ## [Unreleased] -->

<!-- ### Added -->

<!-- ### Fixed -->

<!-- ### Breaking Changes -->

## [Unreleased]

### Fixed

- [#45](https://github.com/CarbonLDP/sparqler/issues/45) - Not adding all the elements in a single variable values pattern
- [#4](https://github.com/CarbonLDP/sparqler/issues/4) - Add support for SPARQL expressions
    <br>Example:<br>
    ```typescript
    import { SPARQLER } from "sparqler";
    import { PatternBuilder } from "sparqler/patterns";
  
    new SPARQLER()
        .select( (_:PatternBuilder) => ([
            _.var("foo"),
            _.max(_.var("baz")).as( "total" ),
        ]) )
        .where( (_:PatternBuilder) => ([
            // Using the same object methods
            _.bind( _.var("bar").multiply( 0.5 ), "baz" ),
            // Using the builder methods
            _.filter( _.gte( _.var("bar"), 10 ) ),
        ]))
        .groupBy( (_:PatternBuilder) => ([ _.var("foo") ]) )
    ;
    ```

## [0.6.0] (2018-09-20)

- [#33](https://github.com/CarbonLDP/sparqler/issues/33) - Full support for property paths
    <br>Example:<br>
    ```typescript
    ( _:PathBuilder ) => _
      .inverse( "ex:path1" ) // ^ex:path1
        .then( "ex:path2" )   // ^ex:path1 / ex:path2
        .onceOrMore()         // (^ex:path1 / ex:path2)+
    ```

## [0.5.0] (2018-08-22)

### Added

- [#27](https://github.com/CarbonLDP/sparqler/issues/27) - Add method to debug query
    ```typescript
    sparqler
        /* ... */
        .debug( ( query, container ) => {
            // `query`:  the same query before the debug method
            // `container`: the data container of the query (the actual query tokens, IRI options, etc)
        } );
    ```
- [#30](https://github.com/CarbonLDP/sparqler/issues/30) - Support ASK queries
    <br>Example:<br>
    ```typescript                                                                       
    sparqler
        .ask()
        .where( _ => [
            /* Patterns */
        ] );
    ```

### Breaking Changes

- Refactor internal code (this does not affect SPARQLer interfaces):
    - Create tokens that replicate the grammatical tree
    - Refactor query creation using the new tokens models
    - Refactor patterns using the new model

## [0.4.0] (2018-03-23)

### Added

- [#21](https://github.com/CarbonLDP/sparqler/issues/21) - Add support for modifiers in the select statement
    - Add `DISTINCT` support over `selectDistinct()` and `selectAllDistinct()`
    - Add `REDUCED` support over `selectReduced()` and `selectAllReduced()`

## [0.3.1] (2018-01-29)

### Fixed

- [#19](https://github.com/CarbonLDP/sparqler/issues/19) - When adding a prefix with the same name, the last one will be preserved
- [#18](https://github.com/CarbonLDP/sparqler/issues/18) - Workaround for Stardog's SPARQL query parsing with the `BASE` definition

## [0.3.0] (2017-12-29)

### Added

- [#13](https://github.com/CarbonLDP/sparqler/issues/13) - Support for `VALUES` as clause
    <br>Example:<br>
    ```typescript                                                                       
    sparqler
        .select( "book", "title" )
        .where( _ => _.var( "book" ).has( "title", _.var( "title" ) ) )
        .values( [ "book", "title" ], _ => [
            [ _.resource( "http://example.com/guides/value-clause/" ) ],
            [ "Value Clause Guide" ]
        ] );
    ```
- [#10](https://github.com/CarbonLDP/sparqler/issues/10) - Support for sub-selects
    <br>Example:<br>
    ```typescript
    // Comments of the first recommended book
    sparqler
        .select( "book", "comments" )
        .where( _ => [
            _.select( "book" )
                .where( [
                _.var( "book" ).has( "recomendation-points", _.var( "points" )  )
                ] )
                .orderBy( "DESC( ?points )" )
                .limit( 1 ),
            _.var( "book" ).has( "comment", _.var( "comments" ) )
        ] );
    ```
- [#9](https://github.com/CarbonLDP/sparqler/issues/9) - Add base support for RAW property paths

### Fixed

- [#14](https://github.com/CarbonLDP/sparqler/issues/14) - Validate variable names

## [0.2.0] (2017-06-01)

### Added

- [#7](https://github.com/CarbonLDP/sparqler/issues/7) - Add patterns:
    - `SERVICE` - Full support
    - `SERVICE SILENT` - Full support
    - `BIND` - Basic support with RAW expression string 
    - `FILTER` - Basic support with RAW expression strings

## [0.1.1] (2017-03-25)

### Added

- [#1](https://github.com/CarbonLDP/sparqler/issues/1) - Support integration with [carbonldp-js-sdk](https://github.com/CarbonLDP/carbonldp-js-sdk)

## [0.1.0] (2016-12-22)

- First release


[Unreleased]: https://github.com/CarbonLDP/sparqler/compare/v0.6.0...HEAD

[0.6.0]: https://github.com/CarbonLDP/sparqler/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/CarbonLDP/sparqler/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/CarbonLDP/sparqler/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/CarbonLDP/sparqler/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/CarbonLDP/sparqler/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/CarbonLDP/sparqler/compare/v0.1.0...v0.2.0
[0.1.1]: https://github.com/CarbonLDP/sparqler/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/CarbonLDP/sparqler/compare/afc291c...v0.1.0