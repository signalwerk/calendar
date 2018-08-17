const R = require("ramda");

// 01.01.1900 and 31.12.2099
// https://stackoverflow.com/questions/12472976/regex-validate-european-date-format-with-multiple-separators
const DayDef = "([1-9][.]?|0[1-9][.]?|[12][0-9][.]?|3[01][.]?)";
const MonthNumberDef = "[1-9][.]?|0[1-9][.]?|1[012][.]?";

const MonthNameDE = [
  "Januar|Jan.?",
  "Februar|Febr.?|Feb.?",
  "März|Mär.?|Marz|Mrz.?",
  "April|Apr.?",
  "Mai.?",
  "Juni|Jun.?",
  "Juli|Jul.?",
  "August|Aug.?",
  "September|Sept.?|Sep.?",
  "Oktober|Okt.?",
  "November|Nov.?",
  "Dezember|Dez.?"
];
const MonthNameDEDef = MonthNameDE.join("|");
const MonthDef = "(" + MonthNumberDef + "|" + MonthNameDEDef + ")";
const DateDef = DayDef + "[. ]*" + MonthDef + "[. ]*(19\\d\\d|20\\d\\d)";

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

// notes
const testNotes = /^(✏️|notes|note|Notes|Note)[:]?[ ]?(.*)/;

const parseDate = txt => {
  let parsed = testDate.exec(txt);

  let month = parsed[2];

  // parse names of month to month
  MonthNameDE.map((def, index) => {
    month = month.replace(RegExp(def, "i"), index + 1);
  });

  return {
    type: "date",
    date: {
      from: {
        day: parsed[1],
        month: month,
        year: parsed[3]
      }
    }
  };
};

const parseNotes = txt => {
  let parsed = testNotes.exec(txt);
  return {
    type: "notes",
    notes: parsed[2]
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

const parseIfIsNotes = R.ifElse(
  R.compose(R.test(testNotes), R.prop("body")),
  item => parseNotes(item.body),
  item => item
);

const parseTitle = item => ({
  type: "title",
  title: { body: item.body },
  body: item.body
});

var exports = (module.exports = {
  parseIfIsDate,
  parseIfIsTime,
  parseIfIsTimeRange,
  parseIfIsNotes,
  parseTitle
});
