(function() {
	// Start Highlight
	$( document ).ready( function() {
		hljs.initHighlighting();
		$( ".overview-code" ).each( function( i, block ) {
			hljs.highlightBlock( block );
		} );
	} );

	// Sidebar behaviour
	$( ".js-sidebar-toggler" ).click( function() {
		if( $( window ).width() <= 768 ) {
			$( ".docs-left-menu" )
				.toggleClass( "in-mobile" )
				.addClass( "docs-left-menu--visible" )
			;
		} else {
			$( ".docs-left-menu" )
				.toggleClass( "docs-left-menu--visible" )
				.addClass( "in-mobile" )
			;
		}
	} );
})();