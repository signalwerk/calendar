const { Parser } = require("./src/Parser");
const { icsExporter } = require("./src/icsExporter");

const generator = (icsPath, filePaths) => {

  let parser = new Parser();
  filePaths.map(path => parser.parse(path))

  let ics = new icsExporter(parser.events);
  ics.ics(icsPath);

}

// https://signalwerk.github.io/calendar/ElementareTypographie.ics
generator(
  "./public/ElementareTypographie.ics",
  [
    "./data/Elementare Typographie/2016-FS.txt",
    "./data/Elementare Typographie/2018-FS.txt",
  ]
)

// https://signalwerk.github.io/calendar/PublicHoliday.ics
generator(
  "./public/PublicHoliday.ics",
  [
    "./data/sechseläuten.txt",
  ]
)

// https://signalwerk.github.io/calendar/Entsorgung.ics
generator(
  "./public/Entsorgung.ics",
  [
    "./data/Entsorgung/K14a.txt",
    "./data/Entsorgung/H355-Papier.txt",
    "./data/Entsorgung/H355-Karton.txt",
    "./data/Entsorgung/B585-Papier.txt",
    "./data/Entsorgung/B585-Karton.txt",
    "./data/Entsorgung/reminder.txt",
  ]
)
