let standAlonePages = [ "module", "class", "interface" ];

module.exports = function navigation() {
	return {
		$runAfter: [ "processing-docs" ],
		$runBefore: [ 'docs-processed' ],
		$process: function( docs ) {
			let navigationDocs = [];

			return docs.filter( doc => {
				if( standAlonePages.includes( doc.docType ) ) {
					doc.navigationDocs = navigationDocs;

					if( doc.docType === 'module' ) {
						// console.log( doc.exports );
						navigationDocs.push( {
							id: doc.id,
							url: doc.url,
							name: doc.name,
							type: doc.docType,
							exports: ( doc.exports || [] )
								.filter( exportedDoc => standAlonePages.includes( exportedDoc.docType ) && exportedDoc.name !== "default" )
						} );
						// console.log( navigationDocs[ navigationDocs.length - 1 ] );
					}

					return doc.name !== "default";
				}
				return false;
			} ).concat( {
				name: 'index',
				id: 'index',
				docType: 'index',
				navigationDocs: navigationDocs,
			} );
		},
	};
};