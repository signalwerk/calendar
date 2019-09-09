(window.webpackJsonpcalendar=window.webpackJsonpcalendar||[]).push([[0],{43:function(e,t,n){e.exports=n(80)},48:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var a=n(4),r=n.n(a),o=n(36),u=n.n(o),c=(n(48),n(40)),i=n(24),s=n(25),l=n(37),p=n.n(l),b=n(81),m=n(86),d=n(17),y=n(91),h=n(88),f=n(82),v=n(83),O=n(92),j=n(84),E=n(89),w=n(85),D=n(41),A=n(93),T=n(90),k=n(87),g=["Januar|Jan.?","Februar|Febr.?|Feb.?","M\xe4rz|M\xe4r.?|Marz|Mrz.?","April|Apr.?","Mai.?","Juni|Jun.?","Juli|Jul.?","August|Aug.?","September|Sept.?|Sep.?","Oktober|Okt.?","November|Nov.?","Dezember|Dez.?"],x=g.join("|"),N="([01]\\d|2[0-3]):?([0-5]\\d)?([ ]*(h|uhr))*",P=RegExp("^"+("(3[01][.]?|[12][0-9][.]?|0[1-9][.]?|[1-9][.]?)[. ]*"+("(1[012][.]?|0[1-9][.]?|[1-9][.]?|"+x+")")+"[. ]*(19\\d\\d|20\\d\\d|\\d\\d)")+"$","i"),R=RegExp("^"+N+"$","i"),I=RegExp("^"+N+"[ ]*([-\u2013]|to|bis)[ ]*"+N+"$","i"),S=/^(\u270f\ufe0f|notes|note|Notes|Note)[:]?[ ]?(.*)/,C=Object(b.a)(Object(m.a)(Object(k.a)(P),Object(y.a)("body")),(function(e){return function(e){var t=P.exec(e),n=t[2],a=parseInt(t[3]);return a<1900&&(a+=2e3),g.forEach((function(e,t){n=n.replace(RegExp(e,"i"),t+1)})),{type:"date",date:{from:{day:t[1],month:n,year:a}}}}(e.body)}),(function(e){return e})),J=Object(b.a)(Object(m.a)(Object(k.a)(R),Object(y.a)("body")),(function(e){return function(e){var t=R.exec(e);return{type:"time",date:{from:{hour:t[1],minute:t[2]}}}}(e.body)}),(function(e){return e})),M=Object(b.a)(Object(m.a)(Object(k.a)(I),Object(y.a)("body")),(function(e){return function(e){var t=I.exec(e);return{type:"time",date:{from:{hour:t[1],minute:t[2]},to:{hour:t[6],minute:t[7]}}}}(e.body)}),(function(e){return e})),L=Object(b.a)(Object(m.a)(Object(k.a)(S),Object(y.a)("body")),(function(e){return t=e.body,{type:"notes",notes:S.exec(t)[2]};var t}),(function(e){return e})),U=function(e){return{type:"title",title:{body:e.body},body:e.body}},V=function(e,t){return Object(b.a)(Object(m.a)(Object(d.a)("unknown"),Object(y.a)("type")),(function(e){return t(e)}),(function(e){return e}))(e)},Z=function(){function e(){Object(i.a)(this,e),this.events=[]}return Object(s.a)(e,[{key:"entry",value:function(e,t){var n=this.line(e),a=Object(h.a)(n,t);return a.date.to=Object(h.a)(a.date.to,a.date.from),a.title.prefix&&a.title.body&&(a.title=[a.title.prefix,a.title.body].join(a.title.join)),a.title.prefix&&!a.title.body&&(a.title=a.title.prefix),a.title.prefix||!a.title.body&&""!==a.title.body||(a.title=a.title.body),n.notes&&t.notes&&(a.notes=t.notes+"\n"+n.notes),a=Object(f.a)(["date","title","notes"],a),this.events.push(a),a}},{key:"line",value:function(e){var t=e;return t=this.parseLine(t)}},{key:"parseDateTime",value:function(e){return Object(m.a)(Object(v.a)(V(C)),Object(v.a)(V(J)),Object(v.a)(V(M)),Object(v.a)(V(L)),Object(v.a)(V(U)))(e)}},{key:"splitByComma",value:function(e){for(var t=[],n="",a=0,r=e.length;a<r;a+=1){var o=e.charAt(a);"\\"===o?n+=e.charAt(++a):","!==o?n+=o:(t.push(n),n="")}return t.push(n),t}},{key:"parseLine",value:function(e){var t=Object(m.a)(Object(O.a)(j.a),this.splitByComma),n=Object(O.a)((function(e){return{type:"unknown",body:e}})),a=Object(m.a)(n,t)(e),r=a=Object(O.a)(this.parseDateTime,a);return r=Object(h.a)(Object(E.a)(Object(w.a)("type","time"))(a)||{},Object(E.a)(Object(w.a)("type","date"))(a)||{}),r=Object(h.a)(r,Object(E.a)(Object(w.a)("type","notes"))(a)||{}),r=Object(h.a)(r,Object(E.a)(Object(w.a)("type","title"))(a)||{})}},{key:"parse",value:function(e){var t=this,n=p()(e),a=Object(h.a)(n.attributes,{date:"1.1.1970",title:"event",url:"",notes:""});a.date&&(a.date=this.parseDateTime({type:"unknown",body:a.date}).date);var r=Object(m.a)(Object(D.a)((function(e){return!Object(A.a)(e)})),Object(O.a)(j.a),Object(T.a)(/[\r\n]+/g));Object(O.a)((function(e){t.entry(e,a)}),r(n.body))}}]),e}(),z=n(28),B=n.n(z),$=n(5),F=n(38),W=n.n(F),Y=new B.a,q=function(){function e(t){Object(i.a)(this,e),this.events=t||[]}return Object(s.a)(e,[{key:"icsEvent",value:function(e){var t=e.date.from,n=e.date.to,a=e.title,r=e.url,o=e.notes,u=[];return u.push(new $.Property({name:"UID",value:W.a.v1()}),new $.Property({name:"DTSTAMP",value:Y.toDate(),parameters:{TZID:"Europe/Zurich"}}),new $.Property({name:"SUMMARY",value:a||"no Title"})),t.month&&(t.month=t.month-1),n.month&&(n.month=n.month-1),t={minute:t.minute||0,hour:t.hour||0,day:t.day||1,month:t.month||0,year:t.year||1900},n={minute:n.minute||t.minute,hour:n.hour||t.hour,day:n.day||t.day,month:n.month||t.month,year:n.year||t.year},t=new B.a(t),n=new B.a(n),0===t.diff(n)?(n.add(1,"d"),u.push(new $.Property({name:"DTSTART",value:t.toDate(),parameters:{VALUE:"DATE"}}),new $.Property({name:"DTEND",value:n.toDate(),parameters:{VALUE:"DATE"}}))):u.push(new $.Property({name:"DTSTART",value:t.toDate(),parameters:{TZID:"Europe/Zurich"}}),new $.Property({name:"DTEND",value:n.toDate(),parameters:{TZID:"Europe/Zurich"}})),r&&u.push(new $.Property({name:"URL",value:r,parameters:{VALUE:"URI"}})),o&&u.push(new $.Property({name:"DESCRIPTION",value:o})),new $.Component({name:"VEVENT",properties:u})}},{key:"ics",value:function(){var e=this,t=[];return this.events.forEach((function(n){t.push(e.icsEvent(n))})),new $.Component({name:"VCALENDAR",components:t,properties:[new $.Property({name:"VERSION",value:2}),new $.Property({name:"PRODID",value:"signalwerk-generator"})]}).toString()}}]),e}(),G=n(39);n(79);var H=function(){var e=Object(a.useState)(""),t=Object(c.a)(e,2),n=t[0],o=t[1],u=new Z;return u.parse(n),r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Events"),r.a.createElement("button",{onClick:function(e){e.preventDefault();var t=new q(u.events).ics(),n=new Blob([t],{type:"text/calendar;charset=utf-8"});Object(G.saveAs)(n,"events.ics")}},"save"),r.a.createElement("textarea",{className:"App-input",value:n,onChange:function(e){return o(e.target.value)}}),u.events&&u.events.length>0&&u.events.map((function(e){return r.a.createElement("div",{className:"App-event"},r.a.createElement("h3",null,e.title),r.a.createElement("p",null,e.date.from.day,e.date.from.month,e.date.from.year,e.date.from.hour&&e.date.from.minute&&r.a.createElement("span",null," ",e.date.from.hour,":",e.date.from.minute),"\u2013",e.date.to.day,e.date.to.month,e.date.to.year),e.notes&&r.a.createElement("p",null,e.notes))}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[43,1,2]]]);
//# sourceMappingURL=main.499f058a.chunk.js.map