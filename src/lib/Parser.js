import fm from "front-matter";
import {
  ifElse,
  compose,
  filter,
  map,
  trim,
  isEmpty,
  split,
  equals,
  prop,
  propEq,
  mergeDeepLeft,
  find,
  pick,
  curry
} from "ramda";

import {
  parseIfIsDate,
  parseIfIsTime,
  parseIfIsTimeRange,
  parseIfIsNotes,
  parseIfIsUrl,
  parseIfIsLocation,
  parseTitle
} from "./fieldParsers";

const typeUndefCb = (entry, cb) =>
  ifElse(
    compose(equals("unknown"), prop("type")),
    item => cb(item),
    item => item
  )(entry);

class Parser {
  constructor() {
    this.events = [];
  }

  entry(entry, defaults) {
    let parsedEntry = this.line(entry);
    let out = mergeDeepLeft(parsedEntry, defaults);

    out.date.to = mergeDeepLeft(out.date.to, out.date.from);

    if (out.title.prefix && out.title.body) {
      out.title = [out.title.prefix, out.title.body].join(
        out.title.join || " – "
      );
    }

    if (out.title.prefix && !out.title.body) {
      out.title = out.title.prefix;
    }

    if (!out.title.prefix && (out.title.body || out.title.body === "")) {
      out.title = out.title.body;
    }

    if (parsedEntry.notes && defaults.notes) {
      out.notes = defaults.notes + "\n" + parsedEntry.notes;
    }

    out = pick(["date", "title", "notes", "location", "url"], out);

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
    return compose(
      curry(typeUndefCb(parseIfIsDate)),
      curry(typeUndefCb(parseIfIsTime)),
      curry(typeUndefCb(parseIfIsTimeRange)),
      curry(typeUndefCb(parseIfIsNotes)),
      curry(typeUndefCb(parseIfIsUrl)),
      curry(typeUndefCb(parseIfIsLocation)),
      curry(typeUndefCb(parseTitle))
    )(item);
  }

  // see https://rosettacode.org/wiki/Tokenize_a_string_with_escaping#JavaScript
  splitByComma(s) {
    let esc = "\\";
    let sep = ",";
    for (var a = [], t = "", i = 0, e = s.length; i < e; i += 1) {
      var c = s.charAt(i);
      if (c === esc) {
        t += s.charAt(++i);
      } else if (c !== sep) {
        t += c;
      } else {
        a.push(t);
        t = "";
      }
    }
    a.push(t);
    return a;
  }

  parseLine(line) {
    // split up the line into components
    // 30.4.2018, 18–20Uhr, Frühlingsferien => ['30.4.2018', '18–20Uhr', 'Frühlingsferien']
    const splitter = compose(map(trim), this.splitByComma);

    // convert the string array to a object array
    const addType = map(value => ({ type: "unknown", body: value }));

    // build array
    let data = compose(addType, splitter)(line);

    // parse array
    data = map(this.parseDateTime, data);

    let out = data;

    out = mergeDeepLeft(
      find(propEq("type", "time"))(data) || {},
      find(propEq("type", "date"))(data) || {}
    );

    out = mergeDeepLeft(out, find(propEq("type", "notes"))(data) || {});
    out = mergeDeepLeft(out, find(propEq("type", "location"))(data) || {});
    out = mergeDeepLeft(out, find(propEq("type", "url"))(data) || {});
    out = mergeDeepLeft(out, find(propEq("type", "title"))(data) || {});

    return out;
  }

  parse(str) {
    // parse frontmatter
    var content = { body: str };

    if (fm.test(str)) {
      try {
        // try to parse the frontmatter
        content = fm(str);
      } catch (err) {
        // remove broken frontmatter
        content.body = content.body.replace(/^---(.|[\r\n])*---/, "");
        console.log("illegal frontmatter header");
      }
    }

    let _def = {
      date: "1.1.1970",
      title: "event",
      url: "",
      notes: ""
    };

    let defaults = mergeDeepLeft(content.attributes, _def);

    if (defaults.date) {
      defaults.date = this.parseDateTime({
        type: "unknown",
        body: defaults.date
      }).date;
    }

    const splitter = compose(
      filter(x => !isEmpty(x)),
      map(trim),
      split(/[\r\n]+/g /* here comes the line */)
    );

    let runLine = item => {
      this.entry(item, defaults);
    };

    map(runLine, splitter(content.body));
  }
}

export default Parser;
