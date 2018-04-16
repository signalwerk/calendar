const { Parser } = require("./src/Parser");
const { icsExporter } = require("./src/icsExporter");

const parser = new Parser();
parser.parse("./data/Elementare Typographie/2016-FS.txt");
parser.parse("./data/Elementare Typographie/2018-FS.txt");
parser.parse("./data/sechseläuten.txt");

let ics = new icsExporter(parser.events);
ics.ics("./public/all.ics");
