const { Parser } = require("./src/Parser");

const parser = new Parser();
parser.parse("./data/Elementare Typographie/2016-FS.txt");
parser.parse("./data/Elementare Typographie/2018-FS.txt");
parser.parse("./data/sechseläuten.txt");
parser.ics("./public/all.ics");
