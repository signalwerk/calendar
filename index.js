import Parser from "./src/lib/Parser";
import icsExporter from "./src/lib/icsExporter";
import fs from "fs";

const generator = (icsPath, filePaths) => {
  let parser = new Parser();
  filePaths.map(path => parser.parse(fs.readFileSync(path, "utf8")));

  let ics = new icsExporter(parser.events);
  let out = ics.ics();
  fs.writeFileSync(icsPath, out);
};

// https://signalwerk.github.io/calendar/test.ics
// generator("./build/test.ics", ["./data/tests/fieldparser.txt"]);

// https://signalwerk.github.io/calendar/IAD-meetup.ics
generator("./build/IAD-meetup.ics", ["./data/IAD/hackathon.txt"]);

// https://signalwerk.github.io/calendar/ElementareTypographie.ics
generator("./build/ElementareTypographie.ics", [
  "./data/Elementare Typographie/2016-FS.txt",
  "./data/Elementare Typographie/2018-FS.txt",
  "./data/Elementare Typographie/2018-HS.txt",
  "./data/Elementare Typographie/2019-FS.txt",
  "./data/Elementare Typographie/2019-HS.txt"
]);

// https://signalwerk.github.io/calendar/PublicHoliday.ics
generator("./build/PublicHoliday.ics", [
  "./data/Feiertage/knabenschiessen.txt",
  "./data/Feiertage/sechseläuten.txt"
]);

// https://signalwerk.github.io/calendar/Entsorgung.ics
generator("./build/Entsorgung.ics", [
  "./data/Entsorgung/K14a.txt",
  "./data/Entsorgung/H355-Papier.txt",
  "./data/Entsorgung/H355-Karton.txt",
  "./data/Entsorgung/B585-Papier.txt",
  "./data/Entsorgung/B585-Karton.txt",
  "./data/Entsorgung/reminder.txt"
]);

// https://signalwerk.github.io/calendar/votes.ics
generator("./build/votes.ics", [
  "./data/Abstimmungen/work.txt",
  "./data/Abstimmungen/Eidgen.txt"
]);

// https://signalwerk.github.io/calendar/frontend.ics
generator("./build/frontend.ics", ["./data/Kurs/frontend-2019-HS.txt"]);
