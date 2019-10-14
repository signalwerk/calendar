(window.webpackJsonpcalendar=window.webpackJsonpcalendar||[]).push([[0],{41:function(e,t,n){e.exports=n(79)},46:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(36),c=n.n(o),u=(n(46),n(28)),i=n(24),l=n(25),s=n(31),b=n.n(s),m=n(80),p=n(85),d=n(17),y=n(90),h=n(87),O=n(81),f=n(82),j=n(91),v=n(83),E=n(88),w=n(84),g=n(39),A=n(92),D=n(89),k=n(86),T=["Januar|Jan.?","Februar|Febr.?|Feb.?","M\xe4rz|M\xe4r.?|Marz|Mrz.?","April|Apr.?","Mai.?","Juni|Jun.?","Juli|Jul.?","August|Aug.?","September|Sept.?|Sep.?","Oktober|Okt.?","November|Nov.?","Dezember|Dez.?"],x=T.join("|"),N="([01]\\d|2[0-3]):?([0-5]\\d)?([ ]*(h|uhr))*",S=RegExp("^"+("(3[01][.]?|[12][0-9][.]?|0[1-9][.]?|[1-9][.]?)[. ]*"+("(1[012][.]?|0[1-9][.]?|[1-9][.]?|"+x+")")+"[. ]*(19\\d\\d|20\\d\\d|\\d\\d)")+"$","i"),P=RegExp("^"+N+"$","i"),I=RegExp("^"+N+"[ ]*([-\u2013]|to|bis)[ ]*"+N+"$","i"),R=/^(\u270f\ufe0f|notes|note|Notes|Note)[:]?[ ]?(.*)/,C=/^(\ud83d\udccd|place|location|ort)[:]?[ ]?(.*)/,J=/^(http|www)(.*)/,M=Object(m.a)(Object(p.a)(Object(k.a)(S),Object(y.a)("body")),(function(e){return function(e){var t=S.exec(e),n=t[2],a=parseInt(t[3]);return a<1900&&(a+=2e3),T.forEach((function(e,t){n=n.replace(RegExp(e,"i"),t+1)})),{type:"date",date:{from:{day:t[1],month:n,year:a}}}}(e.body)}),(function(e){return e})),L=Object(m.a)(Object(p.a)(Object(k.a)(P),Object(y.a)("body")),(function(e){return function(e){var t=P.exec(e);return{type:"time",date:{from:{hour:t[1],minute:t[2]}}}}(e.body)}),(function(e){return e})),U=Object(m.a)(Object(p.a)(Object(k.a)(I),Object(y.a)("body")),(function(e){return function(e){var t=I.exec(e);return{type:"time",date:{from:{hour:t[1],minute:t[2]},to:{hour:t[6],minute:t[7]}}}}(e.body)}),(function(e){return e})),V=Object(m.a)(Object(p.a)(Object(k.a)(R),Object(y.a)("body")),(function(e){return t=e.body,{type:"notes",notes:R.exec(t)[2]};var t}),(function(e){return e})),Z=Object(m.a)(Object(p.a)(Object(k.a)(C),Object(y.a)("body")),(function(e){return t=e.body,{type:"location",location:C.exec(t)[2]};var t}),(function(e){return e})),z=Object(m.a)(Object(p.a)(Object(k.a)(J),Object(y.a)("body")),(function(e){return t=e.body,{type:"url",url:J.exec(t)[0]};var t}),(function(e){return e})),B=function(e){return{type:"title",title:{body:e.body},body:e.body}},$=function(e,t){return Object(m.a)(Object(p.a)(Object(d.a)("unknown"),Object(y.a)("type")),(function(e){return t(e)}),(function(e){return e}))(e)},F=function(){function e(){Object(i.a)(this,e),this.events=[]}return Object(l.a)(e,[{key:"entry",value:function(e,t){var n=this.line(e),a=Object(h.a)(n,t);return a.date.to=Object(h.a)(a.date.to,a.date.from),a.title.prefix&&a.title.body&&(a.title=[a.title.prefix,a.title.body].join(a.title.join||" \u2013 ")),a.title.prefix&&!a.title.body&&(a.title=a.title.prefix),a.title.prefix||!a.title.body&&""!==a.title.body||(a.title=a.title.body),n.notes&&t.notes&&(a.notes=t.notes+"\n"+n.notes),a=Object(O.a)(["date","title","notes","location","url"],a),this.events.push(a),a}},{key:"line",value:function(e){var t=e;return t=this.parseLine(t)}},{key:"parseDateTime",value:function(e){return Object(p.a)(Object(f.a)($(M)),Object(f.a)($(L)),Object(f.a)($(U)),Object(f.a)($(V)),Object(f.a)($(z)),Object(f.a)($(Z)),Object(f.a)($(B)))(e)}},{key:"splitByComma",value:function(e){for(var t=[],n="",a=0,r=e.length;a<r;a+=1){var o=e.charAt(a);"\\"===o?n+=e.charAt(++a):","!==o?n+=o:(t.push(n),n="")}return t.push(n),t}},{key:"parseLine",value:function(e){var t=Object(p.a)(Object(j.a)(v.a),this.splitByComma),n=Object(j.a)((function(e){return{type:"unknown",body:e}})),a=Object(p.a)(n,t)(e),r=a=Object(j.a)(this.parseDateTime,a);return r=Object(h.a)(Object(E.a)(Object(w.a)("type","time"))(a)||{},Object(E.a)(Object(w.a)("type","date"))(a)||{}),r=Object(h.a)(r,Object(E.a)(Object(w.a)("type","notes"))(a)||{}),r=Object(h.a)(r,Object(E.a)(Object(w.a)("type","location"))(a)||{}),r=Object(h.a)(r,Object(E.a)(Object(w.a)("type","url"))(a)||{}),r=Object(h.a)(r,Object(E.a)(Object(w.a)("type","title"))(a)||{})}},{key:"parse",value:function(e){var t=this,n={body:e};if(b.a.test(e))try{n=b()(e)}catch(o){n.body=n.body.replace(/^---(.|[\r\n])*---/,""),console.log("illegal frontmatter header")}var a=Object(h.a)(n.attributes,{date:"1.1.1970",title:"event",url:"",notes:""});a.date&&(a.date=this.parseDateTime({type:"unknown",body:a.date}).date);var r=Object(p.a)(Object(g.a)((function(e){return!Object(A.a)(e)})),Object(j.a)(v.a),Object(D.a)(/[\r\n]+/g));Object(j.a)((function(e){t.entry(e,a)}),r(n.body))}}]),e}(),W=n(32),G=n.n(W),Y=n(5),q=n(37),H=n.n(q),K=["e","x","p","o","r","t","e","r",".",".",".","0",".","0",".","1"],Q=function(){function e(t){Object(i.a)(this,e),this.events=t||[]}return Object(l.a)(e,[{key:"icsEvent",value:function(e){var t=e.date.from,n=e.date.to,a=e.title,r=e.url,o=e.location,c=e.notes,u=[];return t.month&&(t.month=t.month-1),n.month&&(n.month=n.month-1),t={minute:t.minute||0,hour:t.hour||0,day:t.day||1,month:t.month||0,year:t.year||1900},n={minute:n.minute||t.minute,hour:n.hour||t.hour,day:n.day||t.day,month:n.month||t.month,year:n.year||t.year},t=new G.a(t),n=new G.a(n),u.push(new Y.Property({name:"UID",value:H()(JSON.stringify(e),K)}),new Y.Property({name:"DTSTAMP",value:t.toDate(),parameters:{TZID:"Europe/Zurich"}}),new Y.Property({name:"SUMMARY",value:a||"no Title"})),0===t.diff(n)?(n.add(1,"d"),u.push(new Y.Property({name:"DTSTART",value:t.toDate(),parameters:{VALUE:"DATE"}}),new Y.Property({name:"DTEND",value:n.toDate(),parameters:{VALUE:"DATE"}}))):u.push(new Y.Property({name:"DTSTART",value:t.toDate(),parameters:{TZID:"Europe/Zurich"}}),new Y.Property({name:"DTEND",value:n.toDate(),parameters:{TZID:"Europe/Zurich"}})),r&&u.push(new Y.Property({name:"URL",value:r,parameters:{VALUE:"URI"}})),o&&u.push(new Y.Property({name:"LOCATION",value:o})),c&&u.push(new Y.Property({name:"DESCRIPTION",value:c})),new Y.Component({name:"VEVENT",properties:u})}},{key:"ics",value:function(){var e=this,t=[];return this.events.forEach((function(n){t.push(e.icsEvent(n))})),new Y.Component({name:"VCALENDAR",components:t,properties:[new Y.Property({name:"VERSION",value:2}),new Y.Property({name:"PRODID",value:"signalwerk-generator"})]}).toString()}}]),e}(),X=n(38),_=(n(78),'title:\n  prefix: "Meetup"\ndate: 18:00\u201322:00\nurl: https://test.com\nlocation: Switzerland\nnotes: bring beer.\n'),ee="22.2.2026, Simple Event\n23.2.2026, 16:00\u201317:00, Time Event\n24.2.2026, Event with notes, notes: it's nice\n25.2.2026, Event with location, location: Zurich\n26.2.2026, Event with link, http://test.ch";var te=function(){var e=Object(a.useState)(ee),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(!1),i=Object(u.a)(c,2),l=i[0],s=i[1],b=Object(a.useState)(_),m=Object(u.a)(b,2),p=m[0],d=m[1],y=new F;return y.parse(l?"---\n".concat(p,"\n---\n").concat(n):n),r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"Events")),r.a.createElement("div",{className:"App-content"},y.events&&y.events.length>0&&r.a.createElement("button",{className:"App-save",onClick:function(e){e.preventDefault();var t=new Q(y.events).ics(),n=new Blob([t],{type:"text/calendar;charset=utf-8"});Object(X.saveAs)(n,"events.ics")}},"save .ics-file"),r.a.createElement("div",{className:"App-frontmatter"},r.a.createElement("label",null,"Use Global attributes:",r.a.createElement("input",{name:"use frontmatter",type:"checkbox",checked:l,onChange:function(e){return s(e.target.checked)}})),r.a.createElement("br",null),r.a.createElement("br",null)),l&&r.a.createElement("div",{className:"App-frontmatter"},r.a.createElement("textarea",{className:"App-input App-input--frontmatter",value:p,onChange:function(e){return d(e.target.value)}})),r.a.createElement("textarea",{className:"App-input",value:n,onChange:function(e){return o(e.target.value)}}),y.events&&y.events.length>0&&y.events.map((function(e){return r.a.createElement("div",{className:"App-event"},r.a.createElement("h3",null,e.title),r.a.createElement("p",null,"\ud83d\udcc5 ",e.date.from.day,e.date.from.month,e.date.from.year,e.date.from.hour&&r.a.createElement("span",null," ",e.date.from.hour,":",e.date.from.minute?e.date.from.minute:"00"),"\u202f\u2013\u202f",e.date.to.day,e.date.to.month,e.date.to.year,e.date.to.hour&&r.a.createElement("span",null," ",e.date.to.hour,":",e.date.to.minute?e.date.to.minute:"00")),e.notes&&r.a.createElement("p",null,r.a.createElement("span",{role:"img","aria-label":"notes"},"\u270f\ufe0f")," ",e.notes),e.location&&r.a.createElement("p",null,r.a.createElement("span",{role:"img","aria-label":"location"},"\ud83d\udccd")," ",e.location),e.url&&r.a.createElement("p",null,r.a.createElement("span",{role:"img","aria-label":"url"},"\ud83d\udd17")," ",e.url),r.a.createElement("details",null,r.a.createElement("summary",null,"Debug-Infos"),r.a.createElement("pre",null,JSON.stringify(e,null,2))))}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[41,1,2]]]);
//# sourceMappingURL=main.49742825.chunk.js.map