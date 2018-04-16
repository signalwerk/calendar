const moment = require("moment");
const { Component, Property } = require("immutable-ics");
const uuid = require("uuid");
const fs = require("fs");
const now = new moment();

class icsExporter {
  constructor(events) {
    this.events = events || [];
  }

  // generate the icsEvent
  icsEvent(data) {
    let { date: { from }, date: { to }, title, url, notes } = data;
    var properties = [];

    properties.push(
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
        value: title || "no Title"
      })
    );

    // zero based month in js
    if (from.month) {
      from.month = from.month - 1;
    }

    // zero based month in js
    if (to.month) {
      to.month = to.month - 1;
    }

    from = {
      minute: from.minute || 0,
      hour: from.hour || 0,
      day: from.day || 1,
      month: from.month || 0,
      year: from.year || 1900
    };

    to = {
      minute: to.minute || from.minute,
      hour: to.hour || from.hour,
      day: to.day || from.day,
      month: to.month || from.month,
      year: to.year || from.year
    };

    from = new moment(from);
    to = new moment(to);

    if (from.diff(to) === 0) {
      // whole day handling
      to.add(1, "d");
      properties.push(
        new Property({
          name: "DTSTART",
          value: from.toDate(),
          parameters: {
            // VALUE: 'DATE-TIME',
            VALUE: "DATE"
          }
        }),
        new Property({
          name: "DTEND",
          value: to.toDate(),
          parameters: {
            // VALUE: 'DATE-TIME',
            VALUE: "DATE"
          }
        })
      );
    } else {
      // handling with time
      properties.push(
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
      );
    }

    if (url) {
      properties.push(
        new Property({
          name: "URL",
          value: url,
          parameters: {
            VALUE: "URI"
          }
        })
      );
    }

    if (notes) {
      properties.push(
        new Property({
          name: "DESCRIPTION",
          value: notes
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
}

var exports = (module.exports = {
  icsExporter
});
