import Sparqler from "../src/Sparqler";

let builder = new Sparqler();

builder
	.base( "https://carbonldp.base22.io/apps/test-app/" )
	.vocab( "https://carbonldp.base22.io/apps/test-app/vocabulary/#" )
	.prefix( "", "https://carbonldp.base22.io/apps/test-app/" )
	.prefix( "ex", "http://example.com/ns#" )
	.prefix( "xsd", "http://www.w3.org/2001/XMLSchema#" )
	.prefix( "ldp", "http://www.w3.org/ns/ldp#" )

	.select( "s", "color" )
	// .selectAll()

	.from( "" )

	.where( ( _ ) => {
		return [
			_.resource( "" )
				.has( "ldp:contains", _.resource( "posts/" ) ),
			_.var( "s" )
				.has( "color", _.literal( "#222" ).ofType( "string" ) ),
			_.literal( "#222" ).withLanguage( "es" )
				.has( "some", "more" ),
			_.blankNode()
				.has( "other", _.blankNode().has( "mmm", "ok..." ).and( "ok", "no" ) )
				.and( "color", _.resource( "#asdf" ) ),
			_.collection( "Ha!" ),
			_.collection(
				"some",
				"mmm..",
				_.resource( ":some" ),
				_.resource( ":some" ),
				_.literal( 100.2 ),
				_.blankNode().has( "color", _.resource( "#asdf" ) ).and( "color", _.resource( "#asdf" ) ),
			),
			_.resource( "son/" )
				.has( "name", _.collection( "My name", _.blankNode().has( "address", "My address" ) ) ),
			_.graph( "some", _.resource( "some" ).has( "yes", "no" ) ),
			_.graph( _.var( "g" ), _.resource( "some" ).has( "ex:yes", "no" ) ),
			_.resource( "" )
				.has( "ldp:contains", _.resource( "posts/" ) ),
			_.resource( "" )
				.has( "ldp:contains", _.resource( "posts/" ) ),
			_.graph( _.var( "g" ), [
				_.resource( "some" ).has( "ex:yes", "no" ),
				_.resource( "some" ).has( "ex:yes", "no" ),
				_.optional( [
					_.resource( "some" ).has( "ex:yes", "no" ),
				] ),
			] ),
			_.optional( [
				_.resource( "some" ).has( "ex:yes", "no" ).and( "ex:yes", "maybe" ),
				_.resource( "some" ).has( "ex:yes", [ "yes", "maybe" ] )
			] ),
			_.union( [
				_.resource( "some" ).has( "ex:yes", [ "yes", "maybe" ] ),
			],  [
				_.resource( "some" ).has( "ex:yes", [ "yes", "maybe" ] ),
			] ),
			_.minus(
				_.resource( "some" ).has( "ex:yes", [ "yes", "maybe" ] ),
			),
			_.minus(
				_.resource( "some" ).has( "ex:yes", "yes" ),
				_.resource( "some" ).has( "ex:yes", "maybe" ),
			),
			_.values( _.var( "v" ) ).has( 1 ),
			_.values( _.var( "v" ) ).has( 1 ).and( 1.1 ).and( "some" ).and( _.undefined ),
			_.values( _.var( "v1" ), _.var( "v2" ) ).has( 1, 2 ).and( _.undefined, _.literal( "nope" ) ).and( true, false ),
		];
	} )

	.limit( 2 );

console.log( builder.getPrettySparqlQuery() );
console.log( "\n\n" );
console.log( builder.getCompactSparqlQuery() );