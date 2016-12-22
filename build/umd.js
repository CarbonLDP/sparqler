// This file makes sure that the exported file ends up being the SPARQLER default export
// Without this file as an entry point, webpack would export an object like { SPARQLER: ..., default: ... }

import SPARQLER from "./../src/SPARQLER";

module.exports = SPARQLER;
