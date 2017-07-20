import SPARQLER from "../src";

const startTime:[ number, number ] = process.hrtime();

const builder = new SPARQLER();

const finishQuery = builder
	.base( "https://carbonldp.base22.io/" )
	.vocab( "https://carbonldp.base22.io/vocabulary/#" )
	.prefix( "", "https://carbonldp.base22.io/" )
	.prefix( "ex", "http://example.com/ns#" )
	.prefix( "xsd", "http://www.w3.org/2001/XMLSchema#" )
	.prefix( "ldp", "http://www.w3.org/ns/ldp#" )

	.select( "s", "color" )
	// .selectDistinct( "s", "color" )
	// .selectReduced( "s", "color" )
	// .selectAll()
	// .selectAllDistinct()
	// .selectAllReduced()

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
				_.literal( 100.2 ),
				_.blankNode().has( "color", _.resource( "#asdf" ) ).and( "color", _.resource( "#asdf" ) ),
			),
			_.collection(
				_.blankNode().has( "color", _.resource( "#asdf" ) ).and( "color", _.resource( "#asdf" ) ),
			),
			_.collection(
				"some",
				_.resource( ":some" ),
			).has( "color", _.resource( "#asdf" ) ).and( "color", _.resource( "#asdf" ) ),
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
			], [
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
			_.values().has(),

			_.service( "a-service", _.resource( "some" ).has( "ex:property", "ex:object" ) ),
			_.service( ":a-service", _.resource( "some" ).has( "ex:property", "ex:object" ) ),
			_.service( _.var( "service" ), _.resource( "some" ).has( "ex:property", "ex:object" ) ),
			_.service( _.resource( "a-service" ), [
				_.resource( "some" )
					.has( "ex:property", "ex:object" )
					.and( "ex:property", "ex:object" ),
				_.resource( "some-2" ).has( "ex:property-2", "ex:object-2" ),
			] ),

			_.serviceSilent( "a-service", _.resource( "some" ).has( "ex:property", "ex:object" ) ),
			_.serviceSilent( ":a-service", _.resource( "some" ).has( "ex:property", "ex:object" ) ),
			_.serviceSilent( _.var( "service" ), _.resource( "some" ).has( "ex:property", "ex:object" ) ),
			_.serviceSilent( _.resource( "a-service" ), [
				_.resource( "some" )
					.has( "ex:property", "ex:object" )
					.and( "ex:property", "ex:object" ),
				_.resource( "some-2" ).has( "ex:property-2", "ex:object-2" ),
			] ),

			_.bind( "?v = ?v1", "equal" ),
			_.bind( "?v2 = ?v1", _.var( "equal2" ) ),

			_.filter( "( ?v = ?v2 )" ),
			_.filter( "BNODE( ?s )" ),
		];
	} )

	.limit( 2 );

let difference:number[] = process.hrtime( startTime );
let time:number = ( difference[ 0 ] * 1e9 + difference[ 1 ] ) / 1000000;
console.log( "\n" + time + "ms\n");

console.log( finishQuery.toPrettyString() );
// finishQuery.toPrettyString();

difference = process.hrtime( startTime );
time = ( difference[ 0 ] * 1e9 + difference[ 1 ] ) / 1000000;
console.log( "\n" + time + "ms\n");

console.log( finishQuery.toCompactString() );
// finishQuery.toCompactString();

difference = process.hrtime( startTime );
time = ( difference[ 0 ] * 1e9 + difference[ 1 ] ) / 1000000;
console.log( "\n" + time + "ms\n");
