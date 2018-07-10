const fs = require("fs");
const fm = require("front-matter");
const R = require("ramda");
const moment = require("moment");

const {
  parseIfIsDate,
  parseIfIsTime,
  parseIfIsTimeRange,
  parseIfIsNotes,
  parseTitle
} = require("./fieldParsers");

const typeUndefCb = (entry, cb) =>
  R.ifElse(
    R.compose(R.equals("unknown"), R.prop("type")),
    item => cb(item),
    item => item
  )(entry);

class Parser {
  constructor() {
    this.events = [];
  }

  entry(entry, defaults) {
    let parsedEntry = this.line(entry);
    let out = R.mergeDeepLeft(parsedEntry, defaults);

    out.date.to = R.mergeDeepLeft(out.date.to, out.date.from);

    if (out.title.prefix && out.title.body) {
      out.title = [out.title.prefix, out.title.body].join(out.title.join);
    }

    if (out.title.prefix && !out.title.body) {
      out.title = out.title.prefix;
    }

    if (!out.title.prefix && out.title.body) {
      out.title = out.title.body;
    }

    if (parsedEntry.notes && defaults.notes) {
      out.notes = defaults.notes + "\n" + parsedEntry.notes;
    }

    out = R.pick(["date", "title", "notes"], out);

    this.events.push(out);
    return out;
  }

  line(line) {
    let out = line;

    out = this.parseLine(out);
    return out;
  }

  parseDateTime(item) {
    // parse array
    return R.compose(
      R.curry(typeUndefCb(parseIfIsDate)),
      R.curry(typeUndefCb(parseIfIsTime)),
      R.curry(typeUndefCb(parseIfIsTimeRange)),
      R.curry(typeUndefCb(parseIfIsNotes)),
      R.curry(typeUndefCb(parseTitle))
    )(item);
  }

  // see https://rosettacode.org/wiki/Tokenize_a_string_with_escaping#JavaScript
  splitByComma(s) {
    let esc = "\\";
    let sep = ",";
    for (var a = [], t = "", i = 0, e = s.length; i < e; i += 1) {
      var c = s.charAt(i);
      if (c == esc) t += s.charAt(++i);
      else if (c != sep) t += c;
      else a.push(t), (t = "");
    }
    a.push(t);
    return a;
  }

  parseLine(line) {
    // split up the line into components
    // 30.4.2018, 18–20Uhr, Frühlingsferien => ['30.4.2018', '18–20Uhr', 'Frühlingsferien']
    const splitter = R.compose(R.map(R.trim), this.splitByComma);

    // convert the string array to a object array
    const addType = R.map(value => ({ type: "unknown", body: value }));

    // build array
    let data = R.compose(addType, splitter)(line);

    // parse array
    data = R.map(this.parseDateTime, data);

    let out = data;

    out = R.mergeDeepLeft(
      R.find(R.propEq("type", "time"))(data),
      R.find(R.propEq("type", "date"))(data)
    );

    out = R.mergeDeepLeft(out, R.find(R.propEq("type", "notes"))(data) || {});
    out = R.mergeDeepLeft(out, R.find(R.propEq("type", "title"))(data) || {});

    return out;
  }


  parse(path) {
    // parse frontmatter
    var content = fm(fs.readFileSync(path, "utf8"));

    let defaults = content.attributes;

    if (defaults.date) {
      defaults.date = this.parseDateTime({
        type: "unknown",
        body: defaults.date
      }).date;
    }

    var isEven = n => n % 2 === 0;

    const splitter = R.compose(
      R.filter(x => !R.isEmpty(x)),
      R.map(R.trim),
      R.split(/[\r\n]+/g /* here comes the line */)
    );

    let runLIne = item => {
      this.entry(item, defaults);
    };
    let data = R.map(runLIne, splitter(content.body));
  }
}




var exports = module.exports = {
  Parser
};
