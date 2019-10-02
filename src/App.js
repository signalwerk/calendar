import React, { useState } from "react";

import Parser from "./lib/Parser";
import icsExporter from "./lib/icsExporter";
import { saveAs } from "file-saver";

import "./App.css";

const demoFrontmatter = `title:
  prefix: "Meetup"
date: 18:00–22:00
url: https://test.com
location: Switzerland
notes: bring beer.
`;
const demoContent = `22.2.2026, Simple Event
23.2.2026, 16:00–17:00, Time Event
24.2.2026, Event with notes, notes: it's nice
25.2.2026, Event with location, location: Zurich
26.2.2026, Event with link, http://test.ch`;

function App() {
  const [content, setContent] = useState(demoContent);
  const [useFrontmatter, setUseFrontmatter] = useState(false);
  const [frontmatter, setFrontmatter] = useState(demoFrontmatter);
  let parser = new Parser();

  parser.parse(
    useFrontmatter ? `---\n${frontmatter}\n---\n${content}` : content
  );

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
        <h1>Events</h1>
      </header>
      <div className="App-content">
        {parser.events && parser.events.length > 0 && (
          <button className="App-save" onClick={handleClick}>
            save .ics-file
          </button>
        )}

        <div className="App-frontmatter">
          <label>
            Use Global attributes:
            <input
              name="use frontmatter"
              type="checkbox"
              checked={useFrontmatter}
              onChange={e => setUseFrontmatter(e.target.checked)}
            />
          </label>
          <br />
          <br />
        </div>

        {useFrontmatter && (
          <div className="App-frontmatter">
            <textarea
              className="App-input App-input--frontmatter"
              value={frontmatter}
              onChange={e => setFrontmatter(e.target.value)}
            />
          </div>
        )}
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
                  {"📅 "}
                  {event.date.from.day}
                  {event.date.from.month}
                  {event.date.from.year}
                  {event.date.from.hour && (
                    <span>
                      {" "}
                      {event.date.from.hour}
                      {":"}
                      {event.date.from.minute ? event.date.from.minute : "00"}
                    </span>
                  )}
                  {" – "}
                  {event.date.to.day}
                  {event.date.to.month}
                  {event.date.to.year}
                  {event.date.to.hour && (
                    <span>
                      {" "}
                      {event.date.to.hour}
                      {":"}
                      {event.date.to.minute ? event.date.to.minute : "00"}
                    </span>
                  )}
                </p>
                {event.notes && <p>✏️ {event.notes}</p>}
                {event.location && <p>📍 {event.location}</p>}
                {event.url && <p>🔗 {event.url}</p>}

                <details>
                  <summary>Debug-Infos</summary>
                  <pre>{JSON.stringify(event, null, 2)}</pre>
                </details>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
