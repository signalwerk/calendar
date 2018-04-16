const fs = require("fs");
const fm = require("front-matter");
const R = require("ramda");
const moment = require("moment");
const uuid = require("uuid");
const { Component, Property } = require("immutable-ics");

// 01.01.1900 and 31.12.2099
// https://stackoverflow.com/questions/12472976/regex-validate-european-date-format-with-multiple-separators
const DateDef =
  "([1-9]|0[1-9]|[12][0-9]|3[01])[.]+[ ]*([1-9]|0[1-9]|1[012])[.]+[ ]*(19\\d\\d|20\\d\\d)";

// h
const hourDef = "([ ]*(h|uhr))*";

// 00:01 - 23:59
const TimeDef = "([01]\\d|2[0-3]):?([0-5]\\d)?" + hourDef;
const TimeRange = "([01]\\d|2[0-3]):?([0-5]\\d)?" + hourDef;

// to
const toDef = "[ ]*([-–]|to|bis)[ ]*";

const testDate = RegExp("^" + DateDef + "$", "i");
const testTime = RegExp("^" + TimeDef + "$", "i");
const testTimeRange = RegExp("^" + TimeDef + toDef + TimeDef + "$", "i");

const now = new moment();

const typeUndefCb = (entry, cb) =>
  R.ifElse(
    R.compose(R.equals("unknown"), R.prop("type")),
    item => cb(item),
    item => item
  )(entry);

const parseDate = txt => {
  let parsed = testDate.exec(txt);
  return {
    type: "date",
    date: {
      from: {
        day: parsed[1],
        month: parsed[2],
        year: parsed[3]
      }
    }
  };
};

const parseTime = txt => {
  let parsed = testTime.exec(txt);
  return {
    type: "time",
    date: {
      from: {
        hour: parsed[1],
        minute: parsed[2]
      }
    }
  };
};

const parseTimeRange = txt => {
  let parsed = testTimeRange.exec(txt);
  return {
    type: "time",
    date: {
      from: {
        hour: parsed[1],
        minute: parsed[2]
      },
      to: {
        hour: parsed[6],
        minute: parsed[7]
      }
    }
  };
};

const parseIfIsDate = R.ifElse(
  R.compose(R.test(testDate), R.prop("body")),
  item => parseDate(item.body),
  item => item
);

const parseIfIsTime = R.ifElse(
  R.compose(R.test(testTime), R.prop("body")),
  item => parseTime(item.body),
  item => item
);

const parseIfIsTimeRange = R.ifElse(
  R.compose(R.test(testTimeRange), R.prop("body")),
  item => parseTimeRange(item.body),
  item => item
);

const parseTitle = item => ({
  type: "title",
  title: { body: item.body },
  body: item.body
});

class Parser {
  constructor() {
    this.events = [];
  }

  // generate the icsEvent
  icsEvent(data) {
    // zero based month in js
    if (data.date.from.month) {
      data.date.from.month = data.date.from.month - 1;
    }

    // zero based month in js
    if (data.date.to.month) {
      data.date.to.month = data.date.to.month - 1;
    }

    let from = new moment(data.date.from);
    let to = new moment(data.date.to);

    from = new moment(from);
    to = new moment(to);

    if (from.diff(to) === 0) {
      to = from.add(1, "d");
    }

    var properties = [
      new Property({
        name: "UID",
        value: uuid.v1()
      }),
      new Property({
        name: "DTSTAMP",
        value: now.toDate(),
        parameters: {
          // VALUE: 'DATE-TIME',
          TZID: "Europe/Zurich"
        }
      }),
      new Property({
        name: "SUMMARY",
        value: data.title || "no Title"
      }),
      new Property({
        name: "DTSTART",
        value: from.toDate(),
        parameters: {
          // VALUE: 'DATE-TIME',
          TZID: "Europe/Zurich"
        }
      }),
      new Property({
        name: "DTEND",
        value: to.toDate(),
        parameters: {
          // VALUE: 'DATE-TIME',
          TZID: "Europe/Zurich"
        }
      })
    ];

    if (data.url) {
      properties.push(
        new Property({
          name: "URL",
          value: data.url,
          parameters: {
            VALUE: "URI"
          }
        })
      );
    }

    if (data.notes) {
      properties.push(
        new Property({
          name: "DESCRIPTION",
          value: data.notes
        })
      );
    }

    var event = new Component({
      name: "VEVENT",
      properties
    });

    return event;
  }

  // generate the ics
  ics(path) {
    var events = [];

    this.events.forEach(value => {
      events.push(this.icsEvent(value));
    });

    const calendar = new Component({
      name: "VCALENDAR",
      components: events,
      properties: [
        new Property({
          name: "VERSION",
          value: 2
        }),
        new Property({
          name: "PRODID",
          value: "signalwerk-generator"
        })
      ]
    });

    let out = calendar.toString();
    fs.writeFileSync(path, out);
    console.log("ics written to " + path);
  }

  entry(entry, defaults) {
    let out = R.mergeDeepLeft(this.line(entry), defaults);

    out.date.to = R.mergeDeepLeft(out.date.to, out.date.from);

    if (out.title.prefix && out.title.body) {
      out.title = [out.title.prefix, out.title.body].join(out.title.join);
    }

    if (out.title.prefix && !out.title.body) {
      out.title = out.title.prefix;
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
      R.curry(typeUndefCb(parseTitle))
    )(item);
  }

  parseLine(line) {
    // split up the line into components
    // 30.4.2018, 18–20Uhr, Frühlingsferien => ['30.4.2018', '18–20Uhr', 'Frühlingsferien']
    const splitter = R.compose(
      R.map(R.trim),
      R.split(/,|\|/ /* here comes the line */)
    );

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

const parser = new Parser();
parser.parse("./data/Elementare Typographie/2016-FS.txt");
parser.parse("./data/Elementare Typographie/2018-FS.txt");
parser.parse("./data/sechseläuten.txt");
parser.ics("./public/all.ics");
