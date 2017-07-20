import {
	Container,
	FinishClause,
} from "sparqler/clauses";
import { IRIResolver } from "sparqler/iri";
import {
	BASE,
	CLOSE_IRI,
	CLOSE_MULTI_BLOCK,
	CLOSE_MULTI_BN,
	CLOSE_MULTI_LIST,
	CLOSE_SINGLE_BLOCK,
	OPEN_IRI,
	OPEN_MULTI_BLOCK,
	OPEN_MULTI_BN,
	OPEN_MULTI_LIST,
	OPEN_SINGLE_BLOCK,
	PREFIX,
	PREFIX_SYMBOL,
	WHERE,
} from "sparqler/patterns/tokens";
import {
	NewLineSymbol,
	StringLiteral,
	Token,
} from "sparqler/tokens";

import { finishDecorator } from "./finish";

describe( "finishDecorator", ():void => {

	it( "should exists", ():void => {
		expect( finishDecorator ).toBeDefined();
		expect( finishDecorator ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a FinishClause", ():void => {
		const container:Container = new Container();
		const finishClause:FinishClause = finishDecorator( container, {} );

		// To contain the properties of a FinishClause
		expect( finishClause ).toEqual( jasmine.objectContaining( {
			toCompactString: jasmine.any( Function ),
			toPrettyString: jasmine.any( Function ),
			// TODO: Issue with jasmine: https://github.com/jasmine/jasmine/issues/1389
			// toString: jasmine.any( Function ),
		} ) );
		expect( finishClause.toString ).toEqual( jasmine.any( Function ) );

		// Properties should be bound
		expect( finishClause.toPrettyString.name ).toBe( "bound toPrettyString" );
		expect( finishClause.toCompactString.name ).toBe( "bound toCompactString" );
		expect( finishClause.toString.name ).toBe( "bound toPrettyString" );
	} );

	it( "should extend the object provided", ():void => {
		const container:Container = new Container();

		interface MyObject {
			aProperty:string;
			aFunction:Function;
		}

		const myObject:MyObject = {
			aProperty: "a property",
			aFunction: () => {},
		};
		const finishClause:FinishClause & MyObject = finishDecorator<MyObject>( container, myObject );

		// To contain the original properties
		expect( finishClause as MyObject ).toEqual( jasmine.objectContaining( {
			aProperty: jasmine.any( String ) as any,
			aFunction: jasmine.any( Function ),
		} ) );

		// To contain the properties of a FinishClause
		expect( finishClause ).toEqual( jasmine.objectContaining( {
			toCompactString: jasmine.any( Function ),
			toPrettyString: jasmine.any( Function ),
			// TODO: Issue with jasmine: https://github.com/jasmine/jasmine/issues/1389
			// toString: jasmine.any( Function ),
		} ) );
		expect( finishClause.toString ).toEqual( jasmine.any( Function ) );

		// Maintain reference as the object provided
		expect( finishClause as MyObject ).toBe( myObject );
	} );

} );

describe( "FinishClause", ():void => {

	class MockToken extends Token {
		//noinspection JSMethodCanBeStatic
		protected getCompactSeparator():string {
			return "|";
		}

		//noinspection JSMethodCanBeStatic
		protected getPrettySeparator( nextToken?:Token ):string {
			if( nextToken instanceof NewLineSymbol ) return "\n";
			return ", ";
		}
	}

	describe( "toCompactQuery", ():void => {

		it( "should construct the compact string", ():void => {
			const container:Container = new Container( null, [
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new MockToken( "token-3" ),
			] );
			const finishClause:FinishClause = finishDecorator( container, {} );

			const compactString:string = finishClause.toCompactString();
			expect( compactString ).toBe( "token-1|token-2|token-3" );
		} );

		it( "should omit unused prefixes tokens", ():void => {
			const prefixesTokens:Token[] = [
				// PREFIX prefix-1: <http://example.com/prefix-1#>
				PREFIX, new StringLiteral( "prefix-1" ), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral( "http://example.com/prefix-1#" ), CLOSE_IRI,
				// PREFIX prefix-2: <http://example.com/prefix-2#>
				PREFIX, new StringLiteral( "prefix-2" ), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral( "http://example.com/prefix-2#" ), CLOSE_IRI,
				// PREFIX prefix-3: <http://example.com/prefix-3#>
				PREFIX, new StringLiteral( "prefix-3" ), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral( "http://example.com/prefix-3#" ), CLOSE_IRI,
			];

			// Non used prefixes
			(() => {
				const container:Container = new Container( null, prefixesTokens );
				const compactString:string = finishDecorator( container, {} ).toCompactString();
				expect( compactString ).toBe( "" );
			})();

			// Non used prefixes
			(() => {
				const iriResolver:IRIResolver = new IRIResolver();
				iriResolver._prefixes.set( "prefix-1", false );
				iriResolver._prefixes.set( "prefix-3", false );

				const container:Container = new Container( null, prefixesTokens, iriResolver );
				const compactString:string = finishDecorator( container, {} ).toCompactString();
				expect( compactString ).toBe( "" );
			})();

			// First prefix used
			(() => {
				const iriResolver:IRIResolver = new IRIResolver();
				iriResolver._prefixes.set( "prefix-1", true );
				iriResolver._prefixes.set( "prefix-3", false );

				const container:Container = new Container( null, prefixesTokens, iriResolver );
				const compactString:string = finishDecorator( container, {} ).toCompactString();
				expect( compactString ).toBe( "PREFIX prefix-1:<http://example.com/prefix-1#>" );
			})();

			// Some prefixes used
			(() => {
				const iriResolver:IRIResolver = new IRIResolver();
				iriResolver._prefixes.set( "prefix-1", true );
				iriResolver._prefixes.set( "prefix-3", true );

				const container:Container = new Container( null, prefixesTokens, iriResolver );
				const compactString:string = finishDecorator( container, {} ).toCompactString();
				expect( compactString ).toBe(
					"PREFIX prefix-1:<http://example.com/prefix-1#>" +
					"PREFIX prefix-3:<http://example.com/prefix-3#>",
				);
			})();
		} );

		it( "should omit WHERE keyword", ():void => {
			(() => {
				const container:Container = new Container( null, [ WHERE ] );
				const compactString:string = finishDecorator( container, {} ).toCompactString();
				expect( compactString ).toBe( "" );
			})();

			(() => {
				const container:Container = new Container( null, [
					WHERE, OPEN_SINGLE_BLOCK, CLOSE_SINGLE_BLOCK,
				] );
				const compactString:string = finishDecorator( container, {} ).toCompactString();
				expect( compactString ).toBe( "{}" );
			})();
		} );

		it( "should keep only the last BASE statement", ():void => {
			const container:Container = new Container( null, [
				BASE, OPEN_IRI, new StringLiteral( "http://example.com/base-1/" ), CLOSE_IRI,
				BASE, OPEN_IRI, new StringLiteral( "http://example.com/base-2/" ), CLOSE_IRI,
				BASE, OPEN_IRI, new StringLiteral( "http://example.com/last-base/" ), CLOSE_IRI,
			] );
			const finishClause:FinishClause = finishDecorator( container, {} );

			const compactString:string = finishClause.toCompactString();
			expect( compactString ).toEqual( "BASE<http://example.com/last-base/>" );
		} );

		it( "should put BASE statement at first of all", ():void => {
			const iriResolver:IRIResolver = new IRIResolver();
			iriResolver._prefixes.set( "prefix-1", true );
			iriResolver._prefixes.set( "prefix-2", true );

			const container:Container = new Container( null, [
				PREFIX, new StringLiteral( "prefix-1" ), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral( "http://example.com/prefix-1#" ), CLOSE_IRI,
				BASE, OPEN_IRI, new StringLiteral( "http://example.com/base-1/" ), CLOSE_IRI,
				PREFIX, new StringLiteral( "prefix-2" ), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral( "http://example.com/prefix-2#" ), CLOSE_IRI,
				BASE, OPEN_IRI, new StringLiteral( "http://example.com/last-base/" ), CLOSE_IRI,
			], iriResolver );
			const finishClause:FinishClause = finishDecorator( container, {} );

			const compactString:string = finishClause.toCompactString();
			expect( compactString ).toEqual( "" +
				"BASE<http://example.com/last-base/>" +
				"PREFIX prefix-1:<http://example.com/prefix-1#>" +
				"PREFIX prefix-2:<http://example.com/prefix-2#>",
			);
		} );

	} );

	describe( "toPrettyString", ():void => {

		it( "should construct the pretty string", ():void => {
			const container:Container = new Container( null, [
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new MockToken( "token-3" ),
			] );
			const finishClause:FinishClause = finishDecorator( container, {} );

			const prettyString:string = finishClause.toPrettyString();
			expect( prettyString ).toBe( "token-1, token-2, token-3" );
		} );

		it( "should add block indentations", ():void => {
			(() => {
				const container:Container = new Container( null, [
					OPEN_MULTI_BLOCK,
					CLOSE_MULTI_BLOCK,
				] );
				const prettyString:string = finishDecorator( container, {} ).toPrettyString();
				expect( prettyString ).toBe( "{\n}" );
			})();

			(() => {
				const container:Container = new Container( null, [
					OPEN_MULTI_BLOCK,
					new MockToken( "token-1" ),
					CLOSE_MULTI_BLOCK,
				] );
				const prettyString:string = finishDecorator( container, {} ).toPrettyString();
				expect( prettyString ).toBe(
					"{\n" +
					"    token-1\n" +
					"}",
				);
			})();

			(() => {
				const container:Container = new Container( null, [
					OPEN_MULTI_BLOCK,
					new MockToken( "token-1" ),
					OPEN_MULTI_BLOCK,
					new MockToken( "token-2" ),
					CLOSE_MULTI_BLOCK,
					new MockToken( "token-3" ),
					CLOSE_MULTI_BLOCK,
				] );
				const prettyString:string = finishDecorator( container, {} ).toPrettyString();
				expect( prettyString ).toBe(
					"{\n" +
					"    token-1\n" +
					"    {\n" +
					"        token-2\n" +
					"    }\n" +
					"    token-3\n" +
					"}",
				);
			})();
		} );


		it( "should add list indentations", ():void => {
			(() => {
				const container:Container = new Container( null, [
					OPEN_MULTI_LIST,
					CLOSE_MULTI_LIST,
				] );
				const prettyString:string = finishDecorator( container, {} ).toPrettyString();
				expect( prettyString ).toBe( "(\n)" );
			})();

			(() => {
				const container:Container = new Container( null, [
					OPEN_MULTI_LIST,
					new MockToken( "token-1" ),
					CLOSE_MULTI_LIST,
				] );
				const prettyString:string = finishDecorator( container, {} ).toPrettyString();
				expect( prettyString ).toBe(
					"(\n" +
					"    token-1\n" +
					")",
				);
			})();
		} );

		it( "should add blank node indentations", ():void => {
			(() => {
				const container:Container = new Container( null, [
					OPEN_MULTI_BN,
					CLOSE_MULTI_BN,
				] );
				const prettyString:string = finishDecorator( container, {} ).toPrettyString();
				expect( prettyString ).toBe( "[\n]" );
			})();

			(() => {
				const container:Container = new Container( null, [
					OPEN_MULTI_BN,
					new MockToken( "token-1" ),
					CLOSE_MULTI_BN,
				] );
				const prettyString:string = finishDecorator( container, {} ).toPrettyString();
				expect( prettyString ).toBe(
					"[\n" +
					"    token-1\n" +
					"]",
				);
			})();

			(() => {
				const container:Container = new Container( null, [
					OPEN_MULTI_BN,
					new MockToken( "token-1" ),
					OPEN_MULTI_BN,
					new MockToken( "token-2" ),
					CLOSE_MULTI_BN,
					new MockToken( "token-3" ),
					CLOSE_MULTI_BN,
				] );
				const prettyString:string = finishDecorator( container, {} ).toPrettyString();
				expect( prettyString ).toBe(
					"[\n" +
					"    token-1\n" +
					"    [\n" +
					"        token-2\n" +
					"    ]\n" +
					"    token-3\n" +
					"]",
				);
			})();
		} );

	} );

	describe( "toString", ():void => {

		it( "should return the same string as toPrettyString()", ():void => {
			const container:Container = new Container( null, [
				new MockToken( "token-1" ),
				new MockToken( "token-2" ),
				new MockToken( "token-3" ),
			] );
			const finishClause:FinishClause = finishDecorator( container, {} );

			const prettyString:string = finishClause.toPrettyString();
			const objectString:string = finishClause.toString();
			expect( objectString ).toBe( prettyString );
		} );

	} );

} );
