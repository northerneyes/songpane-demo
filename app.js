app=angular.module("SongPane",[]),function(t){t.config(["$routeProvider",function(t){t.when("/").when("/set/:setId/:songId").when("/:view/:songId").otherwise("/")}]).run(["$rootScope","collection","util","transitioner","keyboard","modal","notifier","$window","locale",function(t,e,n,o,r,i,a,s,c){var u,l;s.navigator,c._,s.notify=a.notify,t.change=!1,t.$on("ready",function(){t.ready=!0}),u=t.sets=e({songs:[],isNeeded:function(t){var e=this.songs,o=t.songs;return o.forEach(function(t){var r=t._id;o[r]=t,n.list(e,r)}),!0},url:"sets.json"}),l=t.songs=e({url:"songs.json",getKey:function(t,e){var n=l[t];return e&&u[e]&&u[e].songs&&u[e].songs[t]&&u[e].songs[t].key||n.userKey||n.key}}),u.run(function(){l.run(function(){t.$emit("ready")})}),t.modal=i,t.toggleState=function(e){t[e]=!t[e],t.changedState=!0},t.resetState=function(){return t.changedState?(t.changedState=!1,undefined):(["menu","em"].forEach(function(e){t[e]&&(t[e]=!1)}),undefined)},r.on("ctrl+shift",function(){t.slow=!t.slow}).on(["h","?"],function(){return i("keyboard"),t.$apply(),!1})}])}(app),app.controller("addController",["$scope","$routeParams","$rootScope","util",function(t,e,n,o){var r=n.sets;n.songs,t.addNew=function(t){var n=e.songId;return r.save({title:t,songs:[{_id:n}]})},t.addExisting=function(t){var n=e.songId;return o.list(r[t].songs,{_id:n})&&r.save(r[t])}}]),app.controller("confirmController",["$scope","$routeParams","$rootScope","util","$location",function(t,e,n,o,r){var i=n.sets,a=n.songs;t.trashSong=function(){var t=e.songId,n=e.setId;return i.forEach(function(e){o.unlist(e.songs,t)||i.remove(e._id)}),r.path((n?"set":e.view)+"/"+(i[n]?n+"/":"")),a.remove(t)}}]),app.controller("newController",["$scope","$rootScope","transposer","songMode","$routeParams","util","locale","notifier",function(t,e,n,o,r,i,a,s){var c=e.songs,u=r.edit,l=a._;t.songMode=o,t.langs=a.langs,u&&(t.song=i.extend({},c[r.songId]),"clone"==u&&delete t.song._id,t.song.tempo=t.song.tempo-0),t.saveSong=function(t,e){var o="("+n.getScale(t.key).join("|")+")";return~t.body.search("^(?:\\[[1-9bcpio]\\]\\n(?:(?: *"+o+"[1-9adgijmsu,\\(\\)]*(?:\\/"+o+")?)*\\n[^\\[\\n].+(?:\\n|$))+)+$")?(e&&(t._acl={gr:!1}),c.save(t)):(s.notify({message:l.checkBody,icon:"alert"}),void 0)},t.keys=n.getAllKeys()}]),app.controller("renameController",["$scope","$rootScope",function(t,e){var n=e.sets;t.renameSet=function(t,e){var o=n[t];return e!==o.title?(o.title=e,n.save(o)):!1}}]),app.controller("searchController",["$scope","$rootScope","locale",function(t,e,n){e.songs,t._=n._,t.message="",t.search=function(){}}]),app.controller("settingsController",["$scope","settings",function(t,e){t.s=e.settings,t.toggle=function(t){e.toggle(t)},t.setFont=function(t){e.set("fontSize",t)}}]),app.controller("shareController",["$scope","$routeParams","$rootScope","md5","util",function(t,e,n,o,r){var i=r.list,a=r.unlist,s=n.sets,c=e.setId,u=t.e=s.getWriters(c).slice(0),l=t.c=s.getReaders(c).slice(0);t.owner=s.getOwner(c),t.md5=o,t.allowAccess=function(t,e){return i(l,t),"edit"==e&&i(u,t),!0},t.denyAccess=function(t){a(u,t),a(l,t)},t.isOwner=function(){return s.isOwner(s[c])},t.save=function(){return s.setReaders(c,l).setWriters(c,u).save(s[c])}}]),app.controller("uiController",["$scope","$rootScope","$routeParams","$location","settings","util","keyboard","transposer","transitioner","locale","$timeout","modal",function(t,e,n,o,r,i,a,s,c,u,l,d){function f(t,e,n){var o,r,i,a,c,u,l,d,f,p,h=[];return t.split("[").forEach(function(t){if(""!==t){for(o=t.split("]"),r={type:o[0].toLowerCase(),lines:[]},i=o[1].replace(/[\r\t\v\f\0\x0B]|^\n+|\s+$/g,"").split("\n"),a=0,c=i.length;c>a;a+=2){for(u=i[a].match(/\S+/g)||[],f=i[a].match(/\s+/g)||[]," "!==i[a].charAt(0)&&f.unshift(""),p=[],l=0,d=u.length;d>l;l++)e!==n&&(u[l]=s.transpose(u[l],e,n)),p.push({space:f[l],chord:u[l]});r.lines.push({chords:p,text:i[a+1]})}h.push(r)}}),h}function p(t,e,n){t.forEach(function(t){t.lines.forEach(function(t){t.chords.forEach(function(o,r){var i=s.transpose(o.chord,e,n);void 0!==t.chords[r+1]&&(t.chords[r+1].spaces+=o.chord.length-i.length),o.chord=i})})})}var h=u._,g=e.sets,v=e.songs,m=e.songSlide={to:"left"},y=e.viewSlide={to:"left"};e.r=n,e.p=function(t){o.path(t)},e.q=function(t,e){o.search(t,e)},e._=h,t.s=r.settings,t.nextSong=function(){var t,e,r=n.setId,i=n.songId;r&&i&&(t=g[r].songs,t.forEach(function(t,n){t._id==i&&(e=n)}),t.length-1>e?e++:e=0,o.path("/set/"+r+"/"+t[e]._id))},t.prevSong=function(){var t,e,r=n.setId,i=n.songId;r&&i&&(t=g[r].songs,t.forEach(function(t,n){t._id==i&&(e=n)}),e>0?e--:e=t.length-1,o.path("/set/"+r+"/"+t[e]._id))},t.getKeys=function(){return n.songId&&v[n.songId]&&s.getKeys("m"===v[n.songId].key.slice(-1))||[]},t.pad=i.pad,t.trashSet=function(){o.path("/"),g.remove(n.setId)},t.duplicateSet=function(){var t=g[n.setId];o.path("set/"+g.save({title:t.title+" ("+h.copy+")",songs:t.songs.slice(0)})+"/")},t.rmSong=function(e){var r=n.setId,i=g[r],a=i.songs;o.path("set/"+r+"/"),a.splice(e,1),a.length?g.save(i):t.trashSet()},t.curKey=function(){var t=n.songId;return t&&v.getKey(t,n.setId)},t.updateKey=function(t){var e,o,r,i=n.setId,a=n.songId,s=v[a];i?(e=g[i],o=e.songs[a],r=o.key||s.key,t!==s.key?o.key=t:delete o.key,g.save(e)):(r=s.userKey||s.key,s.userKey=t),p(m.model,r,t)},t.sortSet=function(t,e){i.move(g,t,e)},t.sortSong=function(t,e){var o=g[n.setId];i.move(o.songs,t,e),g.save(o)},t.isSongOwner=function(){return n.songId&&v.isOwner(v[n.songId])},t.editSong=function(t){o.search("edit",t?"clone":void 0),d("new")},t.$on("$routeChangeSuccess",function(e,n,r){if("/"===o.path())return g.length?o.path("sets/"):o.path("search/"),void 0;if(n){var i,a,s,u,l=n.params.view,d=n.params.setId,p=n.params.songId;if(r&&(i=r.params.view,a=r.params.setId,s=r.params.songId),l){if(-1==["sets","catalog","search"].indexOf(l))return g.length?o.path("sets/"):o.path("search/"),void 0;a?(y.to="right",y.model=l):l!=i&&(y.to="left",y.model=l)}if(d){if(!g[d])return g.length?o.path("sets/"):o.path("search/"),void 0;d!=a&&(y.force=!0,y.to="left",y.model="set")}if(p){if(!v[p])return o.path(l+"/"),void 0;u=f(v[p].body,v[p].key,v.getKey(p,d)),t.k=t.curKey(),r?p!==s&&(a&&a===d&&g[d].songs.indexOf(p)<g[d].songs.indexOf(s)?(m.to="right",m.model=u):(m.to="left",m.model=u)):(m.to="left",m.model=u)}else s&&c.apply("song-view",function(){m.model=""})}}),a.on(["left","k"],function(){return t.$apply(function(){t.prevSong()}),!1}).on("c",function(){return t.$apply(function(){r.toggle("hideChords")}),!1}).on("=",function(){var e=r.settings.fontSize||0;2>e&&(r.set("fontSize",e+1),t.$apply())}).on("-",function(){var e=r.settings.fontSize||0;e&&(r.set("fontSize",e-1),t.$apply())}),t.$emit("$routeChangeSuccess",{params:n})}]),app.directive("editor",["$window","util","parse",function(t,e,n){var o=t.document,r=t.setTimeout,i=t.clearTimeout;return{restrict:"E",replace:!0,transclude:!0,scope:{mode:"&",placeholder:"@",model:"="},template:'<div class="editor"><div class="editor-inner"><div></div><span class="hide"></span><textarea class="input" placeholder="{{placeholder}}" ng-model="model" ng-transclude></textarea></div></div>',link:function(t,a){a=a.children()[0];var s,c=a.children,u=c[0],l=e.element(c[1]),d=c[2],f=t.mode(),p=e.throttle,h=0,g=function(){var t=d.selectionStart||0;t!=h&&(l.attr("pad",d.value.substr(0,t)).removeClass("hide"),h=t)},v=function(){var t=o.createElement("div");g(),n(d.value,f,function(e,n){var r;n&&"chords"!=n?(r=t.appendChild(o.createElement("span")),r.className=n):r=t,r.appendChild(o.createTextNode(e))}),a.replaceChild(t,u),u=t};e.element(d).bind("input",p(v,10)).bind("focus",function(){(function t(){g(),i(s),s=r(t,100)})()}).bind("blur",function(){i(s),l.addClass("hide"),h=null}),r(v,50)}}}]),app.directive("spFocus",["$timeout","util",function(t){function e(t){if(t&&0!==t.length){var e=(""+t).toLowercase;t=!("f"==e||"0"==e||"false"==e||"no"==e||"n"==e||"[]"==e)}else t=!1;return t}return function(n,o,r){function i(){t(function(){a.focus()},400)}var a=o[0];0===r.spFocus.length?i():n.$watch(r.spFocus,function(t){e(t)&&a.focus()})}}]),app.directive("spIf",function(){return{transclude:"element",priority:1e3,terminal:!0,compile:function(t,e,n){return function(t,e,o){var r,i;t.$watch(o.spIf,function(o){r&&(r.remove(),r=void 0),i&&(i.$destroy(),i=void 0),o&&(i=t.$new(),n(i,function(t){r=t,e.after(t)}))})}}}}),app.directive("spNotifier",["util","notifier","transitioner","$compile","touch","$timeout",function(t,e,n,o,r,i){return{link:function(a,s){function c(e){function c(){l.removeClass("tl"),n.after(l,function(){l.remove(),f.$destroy(),l=f=null})}var l,d,f=a.$new();t.extend(f,e),l=t.element(s.prepend(u).children()[0]),o(l.contents())(f),i(function(){l.addClass("tl")}),d=i(c,e.delay||5e3),r.tap(l,function(){i.cancel(d),c()})}var u='<div class="notification"><article ng-class="\'icon-\'+icon"><h6>{{title}}</h6><p>{{message}}</p></article></div>';e.setCallback(c).get().forEach(c)}}}]),app.directive("spParse",["touch","util",function(){return function(t,e,n){var o=t.$eval(n.spParse),r=e.find("div"),i=e.find("textarea"),a=function(){var t=i.val();r.html(o(t)||"")};i.bind("keyup",a)}}]),app.directive("select",["util",function(){return{restrict:"E",link:function(t,e){e.wrap('<span class="'+e[0].className+' select"/>')[0].className=""}}}]),app.directive("spSlide",["util","transitioner",function(t,e){return{transclude:"element",priority:1e3,terminal:!0,compile:function(t,n,o){return function(t,r){var i,a,s,c=n.spSlide,u=r.parent();u.addClass("t3d"),t.$watch(function(t){var n,l=t.$eval(c);!l.model&&s&&(a.remove(),i.$destroy(),a=i=s=null),l.model&&(l.model!=s||l.force)&&(l.force=!1,n=t.$new(),n.model=l.model,o(n,function(t){if(r.after(t),a){var o=a,c=i;"left"==l.to?(t.addClass("tr"),u.addClass("transition tl")):(t.addClass("tl"),u.addClass("transition tr")),a.bind("$destroy",function(){u.removeClass("transition tl tr"),t.removeClass("tr tl")}),e.apply(u[0].id,function(){o.remove(),c.$destroy()})}a=t,i=n,s=l.model}))})}}}}]),app.directive("spSortable",["touch","$timeout","util",function(t,e,n){function o(t){var e=0;do e+=t.prop("offsetTop")-t.prop("scrollTop"),t=n.element(t.prop("offsetParent"));while(void 0!==t.prop("offsetTop"));return e}function r(){c&&c.css("margin",""),d.length>s+1&&(c=d.eq(s+1),c.css("marginTop",u-1+"px"))}var i,a,s,c,u,l,d,f,p,h,g=Math.min,v=Math.max;return function(n,m,y){t.hold(m,function(t,n){t.preventDefault(),d=m.children();var c=d.eq(0);h=o(m),l=c.prop("offsetTop")-c.prop("scrollTop"),u=d[0].offsetHeight-1,p=u*d.length,f=g(v(0,n.y-h-l),p),a=s=g(Math.floor(f/u),d.length-1),i=d.eq(a),i.addClass("dragged").css("top",g(v(f+l-u/2,0),p-u/2)+"px"),e(function(){m.addClass("sorting")},0,!1),r()}).drag(m,function(t,e){t.preventDefault(),h=o(m);var n=g(v(0,e.y-h-l),p);if(i.css("top",g(v(n+l-u/2,l),p-u/2-l)+"px"),s!==g(Math.floor(n/u),d.length-1)){var a=Math.round(n/u);a!==s&&a!==s+1&&(a>s?(d.splice(a-1,0,d.splice(s,1)[0]),s=a-1):(d.splice(a,0,d.splice(s,1)[0]),s=a),r())}}).release(m,function(t){t.preventDefault(),m.removeClass("sorting"),c.css("margin",""),i.removeClass("dragged").css("top",""),n.$apply(y.spSortable+"("+a+","+s+")")})}}]),app.directive("spTap",["touch","keyboard",function(t,e){return function(n,o,r){t.tap(o,function(){return n.$apply(r.spTap)}),r.spKbd&&e.on(n.$eval(r.spKbd),function(){return n.$apply(r.spTap)})}}]),app.value("songMode",{startState:function(){return{next:"part"}},token:function(t,e){var n=null;return"part"==e.next?t.match(/^\[[1-9bcpio]\](?=$|\n)/)?(n="part",e.next="chords"):t.skip():"chords"==e.next?t.eat("\n")?(n="chords",e.next="chord"):t.skip():"chord"==e.next?t.eat("\n")?e.next="text":t.eatWhile(" ")?/^[A-G]$/.test(t.peek())||t.skip():t.match(/^[A-G][#b12345679adgijmsu,\(\)]*(?:\/[A-G][#b]?)?(?=($| +|\n))/)?n="chord":t.skip():"text"==e.next?t.match(/^.+\S/)?(n="text",e.next="partOrChords"):t.skip():"partOrChords"==e.next?t.match(/^\n+(?=\[)/)?e.next="part":t.eat("\n")?(n="chords",e.next="chord"):t.skip():t.skip(),n}}),app.factory("collection",["$templateCache","$http","$timeout","util",function(t,e,n,o){var r=function(t){var e=this;return e.syncDown(t||o.noop),e},i=function(t){var n=this;return e.get(o.buildUrl(n.url,n.params)).success(function(t){t.forEach(function(t){var e=t._id;n[e]?n.saveLocal(t):n.add(t,null,!0)})}).success(t||o.noop).error(t||o.noop),n},a=function(t){var e=this,n=t._id;"trash"==t.status?e.removeLocal(n):o.extend(e[n],t)},s=function(t,e){var n=this;o.toArray(t).forEach(function(t){"trash"!=t.status&&(n[t._id]||(n.isNeeded(t)?n.push(t):n.aux.push(t)),n[t._id]=t)}),e&&e.call(n,t)},c=function(t){var e=this;o.unlist(e,e[t]),delete e[t]},u=function(t){var e=this;return e[t].status="trash",o.unlist(e,e[t]),e.save(e[t],function(){e.removeLocal(t)})},l=function(t,e){var n=this,r=t._id;if(r||(r=t._id=o.generateId(),t.created=(new Date).toISOString(),t._acl||(t._acl={}),t._acl.creator="demo@songpane.com",!n.onNew||n.onNew(t)))return n[r]?o.extend(n[r],t):n.push(n[r]=t),e&&e(),r},d=function(){return!0},f=function(t){return this[t]._acl.creator},p=function(t,e){var n=this,r=n[t]._acl.r;return r||(r=n[t]._acl.r=[]),o.list(r,e),n},h=function(t,e){var n=this,r=n[t]._acl.w;return r||(r=n[t]._acl.w=[]),o.list(r,e),n},g=function(t,e){var n=this,r=n[t]._acl.r;return r&&o.unlist(r,e),n},v=function(t,e){var n=this,r=n[t]._acl.w;return r&&o.unlist(r,e),n},m=function(t){var e=this[t]._acl;return e&&e.r||[]},y=function(t){var e=this[t]._acl;return e&&e.w||[]},b=function(t,e){var n=this,o=n[t]._acl;return o.r=e,n},S=function(t,e){var n=this,o=n[t]._acl;return o.w=e,n};return function(t){var e=[],n={url:"",run:r,save:l,remove:u,isOwner:d,getOwner:f,syncDown:i,addWriter:h,addReader:p,removeWriter:v,removeReader:g,getReaders:m,getWriters:y,setReaders:b,setWriters:S,add:s,saveLocal:a,removeLocal:c,isNeeded:function(){return!0}};return o.extend(e,n,t),e}}]),app.factory("keyboard",["$document","$timeout",function(t,e){function n(t){var n,o,r,a=t.keyCode,s=t.type;if((93==a||224==a)&&(a=91),a>95&&106>a&&(a-=48),110==a&&(a=190),109==a&&(a=189),111==a&&(a=191),"keyup"==s&&(r=u.indexOf(a),-1!==r&&u.splice(r,1)),n=t.target,3==n.nodeType&&(n=n.parentNode),"INPUT"==n.tagName||"SELECT"==n.tagName||"TEXTAREA"==n.tagName||n.contentEditable&&"true"==n.contentEditable){if(27!=a)return;n.blur()}if("keydown"==s){if(-1!==u.indexOf(a))return;u.push(a),i&&e.cancel(i),i=e(function(){u.length=0},1e3,!1)}o=c[s+":"+u.join("+")],o&&o.forEach(function(e){e(t)===!1&&(t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.returnValue=!1,t.cancelBubble=!0)})}function o(t,e){var n=[],o="+"===t?["+"]:t.split("+");return o.forEach(function(t){s[t]&&(n.push(16),t=s[t]),a[t]&&n.push(a[t])}),e+":"+n.join("+")}function r(t,e){var n,r;for(r in t)n=o(r,e),c[n]||(c[n]=[]),c[n].push(t[r])}var i,a={backspace:8,tab:9,enter:13,"return":13,shift:16,ctrl:17,control:17,alt:18,option:18,capslock:20,esc:27,escape:27,space:32,pageup:33,pagedown:34,end:35,home:36,left:37,up:38,right:39,down:40,ins:45,insert:45,del:46,"delete":46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,meta:91,command:91,"super":91,windows:91,"*":106,"+":107,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},s={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},c={},u=[];t.bind("keydown",n),t.bind("keyup",n);var l={on:function(){var t=arguments,e=t[0],n=t[2],o={};return"string"==typeof e?o[e]=t[1]:Array.isArray(e)?e.forEach(function(e){o[e]=t[1]}):(o=t[0],n=t[1]),r(o,n||"keydown"),this},off:function(t,e){var n=o(t,e);return c[n]&&delete c[n],this},reset:function(){return c={},this}};return l}]),app.factory("locale",function(){var t={};return t.langs=[{code:"cs",name:"Czech","native":"Česky"},{code:"da",name:"Danish","native":"Dansk"},{code:"de",name:"German","native":"Deutsch"},{code:"en",name:"English","native":"English"},{code:"es",name:"Spanish","native":"Español"},{code:"fr",name:"French","native":"Français"},{code:"it",name:"Italian","native":"Italiano"},{code:"lv",name:"Latvian","native":"Latviešu"},{code:"lt",name:"Lithuanian","native":"Lietuvių"},{code:"hu",name:"Hungarian","native":"Magyar"},{code:"nl",name:"Dutch","native":"Nederlands"},{code:"no",name:"Norwegian","native":"Norsk"},{code:"pl",name:"Polish","native":"Polski"},{code:"pt",name:"Portuguese","native":"Português"},{code:"ro",name:"Romanian","native":"Română"},{code:"sq",name:"Albanian","native":"Shqip"},{code:"sk",name:"Slovak","native":"Slovenčina"},{code:"sl",name:"Slovene","native":"Slovenščina"},{code:"fi",name:"Finnish","native":"Suomi"},{code:"sv",name:"Swedish","native":"Svenska"},{code:"tr",name:"Turkish","native":"Türkçe"},{code:"el",name:"Greek","native":"Ελληνικά"},{code:"bg",name:"Bulgarian","native":"български"},{code:"ru",name:"Russian","native":"Pусский"},{code:"uk",name:"Ukrainian","native":"Українська"}],t._={newSong:"New Song",editSong:"Edit Song",addToSet:"Add to Set",renameSet:"Rename Set",shareSet:"Share Set",settings:"Settings",noConnection:"Could not connect to the server!",outOfSync:"SongPane is out of sync. Please make sure you have an active internet connection.",quotaExceeded:"The local storage limit has been reached or local storage is disabled.",alert:"Alert",copy:"copy",keyboard:"Keyboard Shortcuts",illegalOperation:"You tried to perform an illegal operation!",key:"Key",currentKey:"Current Key",originalKey:"Original Key",tempo:"Tempo",signature:"Signature",timeSignature:"Time Signature",artist:"Artist(s)",copyright:"Copyright",profile:"Profile",buddies:"Buddies",remove:"Remove",owner:"Owner",save:"Save",add:"Add",addToNewSet:"Add the song to a new set",addToExistingSet:"or an existing set",selectSet:"Select a set",hideChords:"Hide chords",disconnect:"Disconnect",disconnectAccount:"Disconnect account",songTitle:"Song title",lyricsAndChords:"Lyrics and chords",nameSet:"Give this set a name",done:"Done",email:"Email",enterEmail:"Enter an email address",password:"Password",createAccount:"Create Account",resetPassword:"Reset Password",searchSongs:"Search songs",sets:"Sets",catalog:"Catalog",search:"Search",noSets:"No Sets",creatingSets:"Sets are created by adding songs to them.",emptyCatalog:"Empty Catalog",aboutCatalog:"The catalog contains all the songs that you use or songs that you add to SongPane.",noResults:"No Results",searching:"Searching...",wait:"Wait...",standalone:"To enjoy this app to the fullest we recommend adding it to your Home Screen.",loggedOut:"You have been logged out.",notFound:"The resource was not found on the server.",genericError:"Something went wrong and it’s probably our fault.",confirm:"Are you sure?",explainDelSong:"Deleting the song makes it unavailable to any set that is currently using it!",del:"Delete",cancel:"Cancel",nextSongOrSet:"Next song or set",prevSongOrSet:"Previous song or set",toggleChords:"Toggle chord display",changeFontSize:"Decrease/increase font size",fontSize:"Font size",small:"Small",medium:"Medium",large:"Large",priv:"Private",pub:"Public",language:"Language",visibility:"Visibility",toggleFullscreen:"Toggle fullscreen",toggleInfo:"Toggle song info",toggleHelp:"Toggle help (this screen)",toggleSettings:"Toggle settings",esc:"Cancel actions, close modal windows",checkBody:"Please check the body of the song.",invalidCredentials:"Invalid credentials!",SPInvalidData:"The data you submitted was invalid.",SPOperationNotPermitted:"You are trying to perform an illegal operation.",SPInvalidQuery:""},t}),app.factory("md5",function(){function t(t,e){var a=t[0],s=t[1],c=t[2],u=t[3];a=n(a,s,c,u,e[0],7,-680876936),u=n(u,a,s,c,e[1],12,-389564586),c=n(c,u,a,s,e[2],17,606105819),s=n(s,c,u,a,e[3],22,-1044525330),a=n(a,s,c,u,e[4],7,-176418897),u=n(u,a,s,c,e[5],12,1200080426),c=n(c,u,a,s,e[6],17,-1473231341),s=n(s,c,u,a,e[7],22,-45705983),a=n(a,s,c,u,e[8],7,1770035416),u=n(u,a,s,c,e[9],12,-1958414417),c=n(c,u,a,s,e[10],17,-42063),s=n(s,c,u,a,e[11],22,-1990404162),a=n(a,s,c,u,e[12],7,1804603682),u=n(u,a,s,c,e[13],12,-40341101),c=n(c,u,a,s,e[14],17,-1502002290),s=n(s,c,u,a,e[15],22,1236535329),a=o(a,s,c,u,e[1],5,-165796510),u=o(u,a,s,c,e[6],9,-1069501632),c=o(c,u,a,s,e[11],14,643717713),s=o(s,c,u,a,e[0],20,-373897302),a=o(a,s,c,u,e[5],5,-701558691),u=o(u,a,s,c,e[10],9,38016083),c=o(c,u,a,s,e[15],14,-660478335),s=o(s,c,u,a,e[4],20,-405537848),a=o(a,s,c,u,e[9],5,568446438),u=o(u,a,s,c,e[14],9,-1019803690),c=o(c,u,a,s,e[3],14,-187363961),s=o(s,c,u,a,e[8],20,1163531501),a=o(a,s,c,u,e[13],5,-1444681467),u=o(u,a,s,c,e[2],9,-51403784),c=o(c,u,a,s,e[7],14,1735328473),s=o(s,c,u,a,e[12],20,-1926607734),a=r(a,s,c,u,e[5],4,-378558),u=r(u,a,s,c,e[8],11,-2022574463),c=r(c,u,a,s,e[11],16,1839030562),s=r(s,c,u,a,e[14],23,-35309556),a=r(a,s,c,u,e[1],4,-1530992060),u=r(u,a,s,c,e[4],11,1272893353),c=r(c,u,a,s,e[7],16,-155497632),s=r(s,c,u,a,e[10],23,-1094730640),a=r(a,s,c,u,e[13],4,681279174),u=r(u,a,s,c,e[0],11,-358537222),c=r(c,u,a,s,e[3],16,-722521979),s=r(s,c,u,a,e[6],23,76029189),a=r(a,s,c,u,e[9],4,-640364487),u=r(u,a,s,c,e[12],11,-421815835),c=r(c,u,a,s,e[15],16,530742520),s=r(s,c,u,a,e[2],23,-995338651),a=i(a,s,c,u,e[0],6,-198630844),u=i(u,a,s,c,e[7],10,1126891415),c=i(c,u,a,s,e[14],15,-1416354905),s=i(s,c,u,a,e[5],21,-57434055),a=i(a,s,c,u,e[12],6,1700485571),u=i(u,a,s,c,e[3],10,-1894986606),c=i(c,u,a,s,e[10],15,-1051523),s=i(s,c,u,a,e[1],21,-2054922799),a=i(a,s,c,u,e[8],6,1873313359),u=i(u,a,s,c,e[15],10,-30611744),c=i(c,u,a,s,e[6],15,-1560198380),s=i(s,c,u,a,e[13],21,1309151649),a=i(a,s,c,u,e[4],6,-145523070),u=i(u,a,s,c,e[11],10,-1120210379),c=i(c,u,a,s,e[2],15,718787259),s=i(s,c,u,a,e[9],21,-343485551),t[0]=l(a,t[0]),t[1]=l(s,t[1]),t[2]=l(c,t[2]),t[3]=l(u,t[3])}function e(t,e,n,o,r,i){return e=l(l(e,t),l(o,i)),l(e<<r|e>>>32-r,n)}function n(t,n,o,r,i,a,s){return e(n&o|~n&r,t,n,i,a,s)}function o(t,n,o,r,i,a,s){return e(n&r|o&~r,t,n,i,a,s)}function r(t,n,o,r,i,a,s){return e(n^o^r,t,n,i,a,s)}function i(t,n,o,r,i,a,s){return e(o^(n|~r),t,n,i,a,s)}function a(e){var n,o=e.length,r=[1732584193,-271733879,-1732584194,271733878];for(n=64;e.length>=n;n+=64)t(r,s(e.substring(n-64,n)));e=e.substring(n-64);var i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(n=0;e.length>n;n++)i[n>>2]|=e.charCodeAt(n)<<(n%4<<3);if(i[n>>2]|=128<<(n%4<<3),n>55)for(t(r,i),n=0;16>n;n++)i[n]=0;return i[14]=8*o,t(r,i),r}function s(t){var e,n=[];for(e=0;64>e;e+=4)n[e>>2]=t.charCodeAt(e)+(t.charCodeAt(e+1)<<8)+(t.charCodeAt(e+2)<<16)+(t.charCodeAt(e+3)<<24);return n}function c(t){for(var e="",n=0;4>n;n++)e+=f[15&t>>8*n+4]+f[15&t>>8*n];return e}function u(t){for(var e=0;t.length>e;e++)t[e]=c(t[e]);return t.join("")}function l(t,e){return 4294967295&t+e}function d(t){return u(a(t||""))}var f="0123456789abcdef".split("");return d}),app.factory("modal",["$rootScope","$location","$routeParams","transitioner","$timeout",function(t,e,n,o,r){function i(t){e.search("modal",t||null)}var a=function(e){return t.modalClass?(t.modalClass="",o.apply("modal",function(){i(),e!=n.modal&&r(function(){i(e)})})):e&&i(e),!0};return a.isOn=function(e){return e?t.modalClass===e:t.modalClass},a}]),app.factory("notifier",function(){var t,e={title:"",icon:"info",delay:5e3},n=[],o=Object.keys;return{setCallback:function(e){return t=e,this},notify:function(r){return o(e).forEach(function(t){r[t]||(r[t]=e[t])}),n.push(r),t&&t(r),this},get:function(){return n}}}),app.factory("parse",["$window",function(){function t(t){var e=this;e.pos=e.start=0,e.string=t}return t.prototype={eof:function(){return this.pos>=this.string.length},sof:function(){return!this.pos},eol:function(){return this.pos>=this.string.length||"\n"==this.string.charAt(this.pos)},sol:function(){return!this.pos||"\n"==this.string.charAt(this.pos-1)},peek:function(){return this.string.charAt(this.pos)||null},next:function(){return this.pos<this.string.length&&this.string.charAt(this.pos++)},eat:function(t){var e,n=this.string.charAt(this.pos);return e="string"==typeof t?n==t:n&&(t.test?t.test(n):t(n)),e?(++this.pos,n):void 0},eatWhile:function(t){for(var e=this.pos;this.eat(t););return this.pos>e},eatSpace:function(){for(var t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>t},skip:function(){this.pos=this.string.length},skipTo:function(t){var e=this.string.indexOf(t,this.pos);return~e?(this.pos=e,!0):void 0},skipLine:function(){return this.skipTo("\n")&&this.pos<this.string.length&&++this.pos},backUp:function(t){this.pos-=t},column:function(){return this.start},match:function(t,e){if("string"!=typeof t){var n=this.string.slice(this.pos).match(t);return n&&e!==!1&&(this.pos+=n[0].length),n}return this.string.indexOf(t,this.pos)==this.pos?(e!==!1&&(this.pos+=t.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)}},function(e,n,o){var r,i,a=n.startState()||!0;for(r=new t(e);!r.eof();)i=n.token(r,a),o(r.current(),i),r.start=r.pos}}]),function(){var t,e=navigator.userAgent;/AppleWebKit/.test(e)&&/Mobile\/\w+/.test(e)?t="ios":~e.toLowerCase().indexOf("firefox")&&(t="ff"),t&&(document.documentElement.className+=" "+t),app.constant("platform",t)}(),app.factory("settings",["util",function(){var t={},e=function(e,n){t[e]=n};return{settings:t,set:e,toggle:function(n){e(n,!t[n])}}}]),app.factory("touch",["$window","$timeout",function(t,e){function n(t){return b&&(t=t.touches[0]||t.changedTouches[0]),{x:t.pageX,y:t.pageY}}function o(t){var e=n(t);return e.dx=e.x-v.x,e.dy=e.y-v.y,e}function r(t,e){return $(E(e.x-t.x,2)+E(e.y-t.y,2))}function i(t){p=!0,v=n(t),h=t.target,m=e(function(){c("hold",v,t),g=!0},1e3)}function a(t){p&&(g?c("drag",o(t),t):e.cancel(m))}function s(t){p&&(e.cancel(m),g?c("release",o(t),t):10>r(n(t),v)&&c("tap",t),h=p=g=!1)}function c(t,e,n){for(var o,r,i=h;i&&i!=S&&(o=i.parentNode,r=C.indexOf(i),-1==r||!w[r][t]||!1!==w[r][t](n,e));)i=o}function u(t,e,n){e.length&&(e=e[0]);var o=C.indexOf(e);-1==o&&(o=C.push(e)-1,w[o]={}),w[o][t]=n}var l,d,f,p,h,g,v,m,y={},b="ontouchstart"in t,S=t.document,C=[],w=[],E=Math.pow,$=Math.sqrt;return b?(l="touchstart",d="touchmove",f="touchend"):(l="mousedown",d="mousemove",f="mouseup"),S.addEventListener(l,i,!0),S.addEventListener(d,a,!0),S.addEventListener(f,s,!0),["tap","hold","drag","release"].forEach(function(t){y[t]=function(e,n){return u(t,e,n),this}}),y}]),app.factory("transitioner",["$rootScope","$document","util",function(t,e,n){function o(){var t,n=e[0].createElement("dummy"),o={transition:"transitionend",OTransition:"oTransitionEnd",MSTransition:"msTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in o)if(void 0!==n.style[t])return o[t]}var r=o(),i={},a=[];return r&&e.bind(r,function(e){var n=e.target.id;if(n&&n in i){for(;i[n].length;)t.$apply(i[n].shift());delete i[n]}}),{apply:function(t,e,n){return r?(t in i&&!n||(i[t]=[]),i[t].push(e),void 0):(e(),void 0)},after:function(t,e,o){t[0]&&(t=t[0]),t.id||(t.id=n.generateId()),this.apply(t.id||a.push(t)-1,e,o)}}}]),app.factory("transposer",function(){var t=/C#|D#|E#|F#|G#|A#|B#|Cb|Db|Eb|Fb|Gb|Ab|Bb|C|D|E|F|G|A|B/g,e=[["C","C#","Db","D","Eb","E","F","F#","Gb","G","Ab","A","Bb","B","Cb"],["Am","A#m","Bbm","Bm","Cm","C#m","Dm","D#m","Ebm","Em","Fm","F#m","Gm","G#m","Abm"]],n=[["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C#","D","D#","E","E#","F#","G","G#","A","A#","B","B#"],["Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B","C"],["D","D#","E","F","F#","G","G#","A","A#","B","C","C#"],["Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db","D"],["E","F","F#","G","G#","A","A#","B","C","C#","D","D#"],["F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E"],["F#","G","G#","A","A#","B","C","C#","D","D#","E","E#"],["Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E","F"],["G","G#","A","A#","B","C","C#","D","D#","E","F","F#"],["Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G"],["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],["Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab","A"],["B","C","C#","D","D#","E","F","F#","G","G#","A","A#"],["Cb","C","Db","D","Eb","Fb","F","Gb","G","Ab","A","Bb"]];return{getKeys:function(t){return e[Number(t)]},getAllKeys:function(){return e[0].concat(e[1])},getScale:function(t){return n[e["m"===t.slice(-1)?1:0].indexOf(t)]},transpose:function(o,r,i){var a="m"===r.slice(-1)?1:0,s=e[a].indexOf(r),c=e[a].indexOf(i);return o.replace(t,function(t){return n[c][n[s].indexOf(t)]})}}}),function(t,e){app.service("util",["$window",function(n){var o=this,r=n.document,i=n.setTimeout,a=n.clearTimeout;o.toArray=function(t){return t&&t.forEach?t:[t]},o.list=function(t,e){var n=t.length;return o.toArray(e).forEach(function(e){var n=t.indexOf(e);~n||t.push(e)}),t.length-n},o.unlist=function(t,e){var n=t.indexOf(e);return~n&&t.splice(n,1),t.length},o.move=function(t,e,n){return t.splice(n,0,t.splice(e,1)[0]),t},o.pad=function(t){return Array(t+1).join(" ")},o.buildUrl=function(n,r){if(!r)return n;var i=[];return t.forEach(r,function(n,r){null!==n&&n!==e&&(t.isObject(n)&&(n=o.toJson(n)),i.push(encodeURIComponent(r)+"="+encodeURIComponent(n)))}),n+(-1==n.indexOf("?")?"?":"&")+i.join("&")},o.element=function(e){return t.isString(e)&&(e=r.getElementById(e)),t.element(e)},o.randomHex=function(t){for(var e="";t>0;)e+=Math.floor(Math.random()*Math.pow(10,16)).toString(16).substr(0,8>t?t:8),t-=8;return e},o.generateId=function(){return Math.floor(Date.now()/1e3).toString(16)+o.randomHex(16)},o.throttle=function(t,e){var n=null;return function(){var o=this,r=arguments;a(n),n=i(function(){t.apply(o,r),n=null},e)}},o.toJson=n.JSON.stringify,["copy","extend","forEach","identity","fromJson","isObject","isString","isArray","lowercase","noop"].forEach(function(e){o[e]=t[e]})}])}(angular);