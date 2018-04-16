const R = require("ramda");

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





var exports = module.exports = {
  parseIfIsDate,
  parseIfIsTime,
  parseIfIsTimeRange,
  parseTitle,
};
