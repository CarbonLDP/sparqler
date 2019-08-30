import {
	DocCollection,
	Processor,
} from "dgeni";
import { ClassExportDoc } from "dgeni-packages/typescript/api-doc-types/ClassExportDoc";
import { ContainerExportDoc } from "dgeni-packages/typescript/api-doc-types/ContainerExportDoc";
import { FunctionExportDoc } from "dgeni-packages/typescript/api-doc-types/FunctionExportDoc";
import { InterfaceExportDoc } from "dgeni-packages/typescript/api-doc-types/InterfaceExportDoc";
import { MemberDoc } from "dgeni-packages/typescript/api-doc-types/MemberDoc";
import { MethodMemberDoc } from "dgeni-packages/typescript/api-doc-types/MethodMemberDoc";
import { OverloadInfo } from "dgeni-packages/typescript/api-doc-types/OverloadInfo";
import { SymbolFlags } from "typescript";
import { getExportDocType } from "dgeni-packages/typescript/services/TsParser";
import { Host } from "dgeni-packages/typescript/services/ts-host/host";
import { ParameterDoc } from "dgeni-packages/typescript/api-doc-types/ParameterDoc";

interface JSDocMethod {
	params:JSDocParam[];
}

interface JSDocParam {
	name:string;
	optional?:boolean;
	type?:string;
}

interface ExtendedClassExportDoc extends ClassExportDoc {
	interface?: InterfaceExportDoc & ParameterDoc;
}

interface IndexMemberDoc extends MethodMemberDoc {
	isIndex?:boolean;
}

const PARAM_REGEX:RegExp = /([^:?]+)(\?)?(?:: (.+))?/;

export function normalizeDocsProcessor(tsHost:Host, log:any):NormalizeDocs {
	return new NormalizeDocs(tsHost, log);
}

export class NormalizeDocs implements Processor {

	$runAfter = [ "processing-docs" ];
	$runBefore = [ "docs-processed" ];
	docs: DocCollection;

	private readonly tsHost:Host;
	private readonly log:any;

	constructor( tsHost:Host, log:any ) {
		this.$runAfter = [ "processing-docs" ];
		this.$runBefore = [ "docs-processed" ];

		this.tsHost = tsHost;
		this.log = log;

	}

	$process( docs:DocCollection ) {
		this.docs = docs;
		docs.forEach( doc => {
			if( [ "module", "index" ].includes( doc.docType ) ) return;

			switch( doc.docType ) {
				case "class":
					this._normalizeClass( doc );
					break;

				case "interface":
					this._normalizeInterface( doc );
					break;

				case "function":
					this._normalizeParams( doc );
					break;
			}
		} );
		return docs;
	}

	_normalizeClass( doc:ExtendedClassExportDoc ):void {
		this._normalizeContainer( doc );

		if( doc.constructorDoc )
			this._normalizeFunctionLike( doc.constructorDoc as MethodMemberDoc );

		if( doc.statics ) doc.statics
			.filter( isMethod )
			.forEach( this._normalizeFunctionLike, this );

		if( doc.extendsClauses.length )
			doc.extendsClauses.forEach( info =>
				this._normalizeClass( info.doc as ClassExportDoc ),
			);
			
			if (doc.interface) {
				doc.interface.description = this.tsHost.getContent( doc.symbol.getDeclarations()![ 0 ]! );
			}
	}

	_normalizeInterface( doc:InterfaceExportDoc ):void {
		this._normalizeContainer( doc );
		this._normalizeInterfaceWithConstant(doc);
		
		if( doc.members ) doc.members
			.filter<IndexMemberDoc>( isIndex )
			.forEach( index => {
				index.isIndex = true;
			} );
	}

	_normalizeContainer( doc:ContainerExportDoc ):void {
		if( doc.members ) doc.members
			.filter( isNotGetter )
			.filter( isMethod )
			.forEach( this._normalizeFunctionLike, this );
	}

	_normalizeFunctionLike( doc:MethodMemberDoc | FunctionExportDoc ):void {
		this._normalizeParams( doc );

		const overloads:( MethodMemberDoc | OverloadInfo )[] = doc.overloads;
		if( overloads ) overloads.forEach( this._normalizeParams, this );
	}

	_normalizeParams( doc:( MethodMemberDoc | FunctionExportDoc | OverloadInfo ) & Partial<JSDocMethod> ):void {
		if( ! doc.parameters ) return;
		doc.params = doc.params ? doc.params : [];

		doc.parameters.forEach( parameter => {
			const [ , name, optional, type = "any" ] = parameter.match( PARAM_REGEX );

			let jsDocParam = doc.params.find( param => param.name == name );
			if( ! jsDocParam ) doc.params.push( jsDocParam = { name } );

			jsDocParam.optional = ! ! optional;
			jsDocParam.type = type;
		} );
	}
	
	_normalizeInterfaceWithConstant(doc:any){
		// Not only an interface
		if( ! (doc.symbol.flags ^ SymbolFlags.Interface) ) return;

		// Remove interface momentary
		doc.symbol.flags = doc.symbol.flags ^ SymbolFlags.Interface;

		// If it is an interface with a constant merged export:
		switch( getExportDocType( doc.symbol ) ) {
			case "const":
				let index = this.docs.indexOf(doc.constants[0]) // get the index of the consant from full document list
				let numberOfMembers = doc.constants[0].members.length; // get the number of methods associated with that constant
				doc.constants[0].members.forEach(member => {this._normalizeParams(member)}) // for each method normalize it's parameters
				this.docs.splice(index, numberOfMembers+1); // remove the constant and members from the full document list
				doc.description = this.tsHost.getContent( doc.symbol.getDeclarations()![ 0 ]! ); // update interface description
				break;
			default:
				this.log.error( `Other declaration merged for ${ doc.name }` );
				break;
		}

		// Return interface flag
		doc.symbol.flags = doc.symbol.flags | SymbolFlags.Interface;
	}

}

function isMethod( doc:MemberDoc ):doc is MethodMemberDoc {
	return "parameters" in doc;
}

function isIndex( doc:MemberDoc ):doc is IndexMemberDoc {
	return doc.name === "__index";
}

function isNotGetter( doc:MemberDoc ):boolean {
	return ! doc.isGetAccessor;
}
