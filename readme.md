## calendar parser
A human editable (.txt) and machine readable (.ics) calendar-list.

You can create a text with dates:
```
21.3.2016, 10–11, Meeting 
22.3.2016, Birthday
```
This will result in two calendar entries. The first is titled "Meeting" and has a time-range, the second is a whole day event with a title of "Birthday".

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
This will produce two events, one with the Title `Meetup – HTML` and one with `Meetup – JS`. Both have a note and a time-range.


## Similar Projects
* [Duckling](https://github.com/facebook/duckling)

## ToDo
* [Parser Visualizer](https://mattmazzola.github.io/slate-entity-labeler/)
