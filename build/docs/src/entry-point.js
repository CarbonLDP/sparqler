// Semantic UI
//  js
import "../semantic-ui/dist/semantic.min";
//  css
import "../semantic-ui/dist/semantic.min.css";

// Highlight.js
// js
import hljs from "highlight.js/lib/highlight";
import hljsTypescript from "highlight.js/lib/languages/typescript";
hljs.registerLanguage( "typescript", hljsTypescript );
// css
import "highlight.js/styles/darcula.css";

// Customs
//  js
import "./scripts/main";
//  css
import "./styles/main.scss";