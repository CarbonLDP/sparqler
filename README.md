# SPARQLER

[![npm version](https://badge.fury.io/js/sparqler.svg)](https://badge.fury.io/js/sparqler)

[![CircleCI](https://circleci.com/gh/CarbonLDP/sparqler.svg?style=svg)](https://circleci.com/gh/CarbonLDP/sparqler)

SPARQL query buildER for JavaScript/TypeScript.

SPARQLER offers a fluent interface to help you construct queries and prevent errors by malformed patterns. 

## Installation

With [npm](https://npmjs.org/) installed, run

```shell script
npm install sparqler
```

## Usage examples

```javascript
import { SPARQLER } from "sparqler";
// const SPARQLER = require( "sparqler" ).SPARQLER // With Node.js

let query = new SPARQLER()
    .base( "https://example.com/resource/" )
    .prefix( "ex", "https://example.com/ns#" )
    .select( _ => [
        _.var( "bar" )
    ] )
    .where( _ => [
        _.resource( "" ) 
            .has( _.resource( "ex:foo" ), _.var( "bar" ) )
            .and( _.resource( "ex:baz" ), _.literal( 10 ) ),
    ] )
    .orderBy( _ => [
        _.desc( _.var( "bar" ) )
    ] )
    .toPrettyString();
    // .toCompactString(); // Minimal query size, but difficult to read

console.log( query );
```

Output:
```sparql
BASE <https://example.com/resource/>
PREFIX ex: <https://example.com/ns#>
SELECT ?bar
WHERE {
    <> ex:foo ?bar;
       ex:baz 10
}
ORDER BY DESC (?bar)
```

Every method generates a different object with the corresponding methods available in that step.
This means that if you store a query reference and modify it afterwards,
printing the reference will not have the modification; but this also means
you can generate different queries using a share base without mutating it:


```javascript
import { SPARQLER } from "sparqler";

let query1 = new SPARQLER()
    .base( "https://example.com/resource/" )
    .prefix( "ex", "https://example.com/ns#" )
    .select( _ => _.var( "bar" ) )
    .where( _ => _.resource( "" ).has( _.resource( "ex:foo" ), _.var( "bar" ) ) );

// Add an order
let query2 = query1
    .orderBy( _ => [
        _.desc( _.var( "bar" ) )
    ] );

console.log( query1.toPrettyString() );
console.log( query2.toPrettyString() );
```

Output:
```sparql
# query1
BASE <https://example.com/resource/>
PREFIX ex: <https://example.com/ns#>
SELECT ?bar
WHERE { <> ex:foo ?bar }

# query2
BASE <https://example.com/resource/>
PREFIX ex: <https://example.com/ns#>
SELECT ?bar
WHERE { <> ex:foo ?bar }
ORDER BY DESC (?bar) # The added order
```

## API Documentation

See https://carbonldp.github.io/sparqler/ for the API documentation.

## License

	Copyright (c) 2015-present, Base22 Technology Group, LLC.
	All rights reserved.

	This source code is licensed under the BSD-style license found in the
	LICENSE file in the root directory of this source tree.
