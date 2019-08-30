// Semantic UI
if( process.env.NODE_ENV === "production" ) {
	require( "../semantic-ui/dist/semantic.min" );
	require( "../semantic-ui/dist/semantic.min.css" );
} else {
	require( "../semantic-ui/dist/semantic" );
	require( "../semantic-ui/dist/semantic.css" );
}

// Customs
//  js
import "./scripts/main";
//  css
import "./styles/main.scss";