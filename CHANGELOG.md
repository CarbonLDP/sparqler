# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.4.0 (2018-03-23)

- Resolved [#21](https://github.com/CarbonLDP/sparqler/issues/21)
    - Added `selectDistinct` and `selectAllDistinct`
    - Added `selectReduced` and `selectAllReduced`

## 0.3.1 (2018-01-29)

### Fixed

- Fixed #19 - Redeclare a prefix has not been replace and the query string ended with both statements
- Added workaround for Stardog's SPARQL query parsing (no spaces between `BASE` and `<`

## 0.3.0 (2017-12-29)

- Added support for CONSTRUCT queries
- Added OPTIONAL pattern
- Added GRAPH pattern
- Added collection expressions

## 0.2.0 (2017-06-01)

- Closed #7: Adds missing patterns: SERVICE, BIND and FILTER

## 0.1.1 (2017-03-25)

- Fixed compiler error

## 0.1.0 (2016-12-22)

- First release