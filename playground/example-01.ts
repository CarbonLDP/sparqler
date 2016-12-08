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

	.from( "" )

	.where( ( _ ) => {
		return [
			_.resource( "" )
				.has( "ldp:contains", _.resource( "posts/" ) ),
			_.var( "s" )
				.has( "color", _.literal( "#222" ).ofType( "string" ) ),
			_.literal( "#222" ).withLanguage( "es" )
				.has( "some", "more" )
		]
	} )

	.limit( 2 );

console.log( builder.toQueryString() );