import { ifElse, compose, test, prop } from "ramda";

// 01.01.1900 and 31.12.2099
// https://stackoverflow.com/questions/12472976/regex-validate-european-date-format-with-multiple-separators
const DayDef = "(3[01][.]?|[12][0-9][.]?|0[1-9][.]?|[1-9][.]?)";
const MonthNumberDef = "1[012][.]?|0[1-9][.]?|[1-9][.]?";

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
const DateDef = DayDef + "[. ]*" + MonthDef + "[. ]*(19\\d\\d|20\\d\\d|\\d\\d)";

// h
const hourDef = "([ ]*(h|uhr))*";

// 00:01 - 23:59
const TimeDef = "([01]\\d|2[0-3]):?([0-5]\\d)?" + hourDef;

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
  let year = parseInt(parsed[3]);

  // if the year is just in two digits assume we are speaking about 20??
  if (year < 1900) {
    year = year + 2000;
  }

  // parse names of month to month
  MonthNameDE.forEach((def, index) => {
    month = month.replace(RegExp(def, "i"), index + 1);
  });

  return {
    type: "date",
    date: {
      from: {
        day: parsed[1],
        month: month,
        year: year
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

export const parseIfIsDate = ifElse(
  compose(
    test(testDate),
    prop("body")
  ),
  item => parseDate(item.body),
  item => item
);

export const parseIfIsTime = ifElse(
  compose(
    test(testTime),
    prop("body")
  ),
  item => parseTime(item.body),
  item => item
);

export const parseIfIsTimeRange = ifElse(
  compose(
    test(testTimeRange),
    prop("body")
  ),
  item => parseTimeRange(item.body),
  item => item
);

export const parseIfIsNotes = ifElse(
  compose(
    test(testNotes),
    prop("body")
  ),
  item => parseNotes(item.body),
  item => item
);

export const parseTitle = item => ({
  type: "title",
  title: { body: item.body },
  body: item.body
});
