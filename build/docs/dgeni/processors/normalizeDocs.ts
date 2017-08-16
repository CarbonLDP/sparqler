import {
	DocCollection,
	Processor,
} from "dgeni";
import { ClassExportDoc } from "dgeni-packages/typescript/api-doc-types/ClassExportDoc";
import { ContainerExportDoc } from "dgeni-packages/typescript/api-doc-types/ContainerExportDoc";
import { FunctionExportDoc } from "dgeni-packages/typescript/api-doc-types/FunctionExportDoc";
import { MemberDoc } from "dgeni-packages/typescript/api-doc-types/MemberDoc";
import { MethodMemberDoc } from "dgeni-packages/typescript/api-doc-types/MethodMemberDoc";
import { OverloadInfo } from "dgeni-packages/typescript/api-doc-types/OverloadInfo";

interface JSDocMethod {
	params:JSDocParam[];
}

interface JSDocParam {
	name:string;
	optional?:boolean;
	type?:string;
}

const PARAM_REGEX:RegExp = /(.*?)([?]?): +(.*)/;

export function normalizeDocsProcessor():NormalizeDocs {
	return new NormalizeDocs();
}

export class NormalizeDocs implements Processor {

	$runAfter = [ "processing-docs" ];
	$runBefore = [ "docs-processed" ];

	$process( docs:DocCollection ) {
		docs.forEach( doc => {
			if( [ "module", "index" ].includes( doc.docType ) ) return;

			switch( doc.docType ) {
				case "class":
					this._normalizeClass( doc );
					break;

				case "interface":
					this._normalizeContainer( doc );
					break;

				case "function":
					this._normalizeParams( doc );
					break;

				default:
					return;
			}

			if( doc.name === "Container" ) {
				console.log( doc.members );
				// console.log( doc );
			}
		} );
	}

	_normalizeClass( doc:ClassExportDoc ):void {
		this._normalizeContainer( doc );

		if( doc.constructorDoc )
			this._normalizeFunctionLike( doc.constructorDoc as MethodMemberDoc );

		if( doc.statics ) doc.statics
			.filter( isMethod )
			.forEach( this._normalizeFunctionLike );
	}

	_normalizeContainer( doc:ContainerExportDoc ):void {
		if( doc.members ) doc.members
			.filter( isMethod )
			.forEach( this._normalizeFunctionLike );
	}

	_normalizeFunctionLike( doc:MethodMemberDoc | FunctionExportDoc ):void {
		this._normalizeParams( doc );

		const overloads:( MethodMemberDoc | OverloadInfo )[] = doc.overloads;
		if( overloads ) overloads.forEach( this._normalizeParams );
	}

	_normalizeParams( doc:( MethodMemberDoc | FunctionExportDoc | OverloadInfo ) & Partial<JSDocMethod> ):void {
		if( ! doc.parameters ) return;
		doc.params = doc.params ? doc.params : [];

		doc.parameters.forEach( parameter => {
			const [ , name, optional, type ] = parameter.match( PARAM_REGEX );

			let jsDocParam = doc.params.find( param => param.name == name );
			if( ! jsDocParam ) doc.params.push( jsDocParam = { name } );

			jsDocParam.optional = ! ! optional;
			jsDocParam.type = type;
		} );
	}

}

function isMethod( doc:MemberDoc ):doc is MethodMemberDoc {
	return doc.docType === "method";
}

