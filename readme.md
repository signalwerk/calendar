## calendar parser

Some test to build a human editable and machine readable calendar-list.

You create a file with dates:
```
21.3.2016, 10–11, Meeting 
22.3.2016, Birthday
```
This will produce two calendar entries. The meeting with a time-range and a whole day event.

If you have many repeating events you can also have a template-like header:


```
---
title:
  prefix: "Meetup"
  join: " – "
date: 18:00–22:00
notes: bring beer.
---
22.2.2016, HTML
29.2.2016, JS
```
This will produce two events one with the Title `Meetup – HTML` and one with `Meetup – JS` both have a note and a time-range.
