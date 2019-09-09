import React, { useState } from "react";

import Parser from "./lib/Parser";
import icsExporter  from "./lib/icsExporter";
import { saveAs } from "file-saver";

import "./App.css";


function App() {
  const [content, setContent] = useState("");
  let parser = new Parser();

  parser.parse(content);

  // // Similar to componentDidMount and componentDidUpdate:
  //  useEffect(() => {
  //    // Update the document title using the browser API
  //    document.title = `You clicked ${count} times`;
  //  });
  //
  function handleClick(e) {
    e.preventDefault();

    let ics = new icsExporter(parser.events);
    let out = ics.ics();

    var blob = new Blob([out], { type: "text/calendar;charset=utf-8" });
    saveAs(blob, "events.ics");
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Events</p>

        <button onClick={handleClick}>save</button>
        <textarea
          className="App-input"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        {parser.events &&
          parser.events.length > 0 &&
          parser.events.map(event => {
            return (
              <div className="App-event">
                <h3>{event.title}</h3>
                <p>
                  {event.date.from.day}
                  {event.date.from.month}
                  {event.date.from.year}
                  {event.date.from.hour && event.date.from.minute && (
                    <span>
                      {" "}
                      {event.date.from.hour}
                      {":"}
                      {event.date.from.minute}
                    </span>
                  )}
                  –{event.date.to.day}
                  {event.date.to.month}
                  {event.date.to.year}
                </p>
                {event.notes && <p>{event.notes}</p>}
              </div>
            );
          })}
      </header>
    </div>
  );
}

export default App;
