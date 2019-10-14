import moment from "moment";
import { Property, Component } from "immutable-ics";
import uuidv5 from "uuid/v5";

// const nameSpace = "exporter...0.0.1".split(/(?=.)/g);
const nameSpace = [
  "e",
  "x",
  "p",
  "o",
  "r",
  "t",
  "e",
  "r",
  ".",
  ".",
  ".",
  "0",
  ".",
  "0",
  ".",
  "1"
];

class icsExporter {
  constructor(events) {
    this.events = events || [];
  }

  // generate the icsEvent
  icsEvent(data) {
    let {
      date: { from },
      date: { to },
      title,
      url,
      location,
      notes
    } = data;
    var properties = [];

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

    properties.push(
      new Property({
        name: "UID",
        value: uuidv5(JSON.stringify(data), nameSpace)
      }),

      // the value is generated from the
      // start-date to keep it stable over multiple
      // runs.
      // const now = new moment();
      // value: now.toDate(),
      new Property({
        name: "DTSTAMP",
        value: from.toDate(), // keep stable
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

    if (location) {
      properties.push(
        new Property({
          name: "LOCATION",
          value: location
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
  ics() {
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
    return out;
  }
}

export default icsExporter;
