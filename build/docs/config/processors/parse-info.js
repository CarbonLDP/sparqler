const path = require( "path" );

const literalsRegex = /([^:,;<>&|\s\[\]]+|&gt;|&lt;)/g;
const multipleHeritageRegex = /(?=\s+implements)/;
const singleHeritageRegex = /(implements|extends)\s+(.*)/;
const parametersRegex = /(\S*)?:(.*)?/;

module.exports = function parse( getExportDocType ) {
	return {
		$runAfter: [ "tags-extracted" ],
		$runBefore: [ "processing-docs" ],
		$process: function( docs ) {
			return docs.forEach( doc => {
				createURL( doc );
				parseTypeParams( doc, docs );
				parseHeritage( doc, docs );
				parseReturnType( doc, docs );
				parseParameters( doc, docs );

				// Parse exports documents
				if( doc.exports ) doc.exports.forEach( exportedDoc => {
					createURL( exportedDoc );
					parseTypeParams( exportedDoc, docs );
					parseHeritage( exportedDoc, docs );
					parseReturnType( exportedDoc, docs );
					parseParameters( exportedDoc, docs );
				} );

				// Parse members
				if( doc.members ) doc.members.forEach( member => {
					// if( member.name === "where" && doc.name === "WhereClause" ) debugger;
					createURL( member );
					parseTypeParams( member, docs );
					parseReturnType( member, docs );
					parseParameters( member, docs );
				} );

				// if( doc.docType === "module" && ( doc.name === "IRI" || doc.name === "NotTriplesPattern" ) ) {
				// 	console.log( doc.exports );
				// }
			} );
		}
	};

	function createURL( doc ) {
		if( [ "module", "class", "interface" ].includes( doc.docType ) ) doc.url = `/${ doc.id }/`;
		if( [ "function", "member" ].includes( doc.docType ) ) doc.url = `/${ doc.id.replace( ".", "/#" ) }`;
	}

	// Convert type generics to HTML
	function parseTypeParams( doc, docs ) {
		if( ! doc.typeParams ) return;
		doc.parsedTypeParams = getTypesHTML( doc.typeParams, doc, docs );
	}

	// Convert heritage to HTML
	function parseHeritage( doc, docs ) {
		if( ! doc.heritage || typeof doc.heritage !== "string" ) return;

		let heritage = {};

		let heritageArray = doc.heritage.split( multipleHeritageRegex );
		heritageArray.forEach( heritageStr => {
			let match = heritageStr.match( singleHeritageRegex );
			heritage[ match[ 1 ] ] = getTypesHTML( match[ 2 ], doc, docs );
		} );

		doc.parsedHeritage = heritage;
	}

	// Convert return type to HTML
	function parseReturnType( doc, docs ) {
		if( doc.returnType === void 0 ) {
			if( "returnType" in doc ) doc.returnType = "any";
			return;
		}

		doc.parsedReturnType = getTypesHTML( doc.returnType, doc, docs );
	}

	// Parse parameters
	function parseParameters( doc, docs ) {
		if( ! doc.parameters ) return;

		doc.parsedParameters = doc.parameters.map( parameterStr => {
			let parts = parameterStr.match( parametersRegex ).splice( 1, 2 );
			return {
				name: parts[ 0 ],
				type: parts.length > 1 ? getTypesHTML( parts[ 1 ], doc, docs ) : "any",
			};
		} );
	}

	function getTypesHTML( str, doc, docs ) {
		return str
			.replace( /</g, "&lt;" )
			.replace( />/g, "&gt;" )
			.replace( literalsRegex, ( match ) => {
				if( [ "extends", "&gt;", "&lt;" ].includes( match ) ) return match;

				let url = getTypeURL( match, doc, docs );
				if( url === match ) return match;

				return `<a href="/${ url }">${ match }</a>`;
			} )
			;
	}

	function getTypeURL( name, doc, docs ) {
		if( ! name ) return name;

		let node;
		let module = doc.docType === "module" ? doc : doc.docType === "member" ? doc.classDoc.moduleDoc : doc.moduleDoc;

		node = module.moduleTree.valueDeclaration.getNamedDeclarations()[ name ];
		if( ! node ) return name;

		node = node[ 0 ];
		if( ! node ) return name;

		let parentID = module.id;
		let type;

		if( ! node.localSymbol ) {
			// Obtains the ID
			parentID = path.relative(
				module.fileInfo.basePath,
				path.resolve(
					path.dirname( module.fileInfo.filePath ),
					node.parent.parent.parent.moduleSpecifier.text
				)
			);
		}

		// Search for its type
		type = docs
			.find( doc => doc.id === parentID )
			.exports
			.find( doc => doc.name === name )
			.docType;

		if( [ "type-alias", "function", "member", "enum" ].includes( type ) )
			return `${ parentID }/#${ name }`;
		return `${ parentID }/${ name }/`;
	}
};
