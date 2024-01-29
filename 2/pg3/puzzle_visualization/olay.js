!function(){"use strict";var e,t,n,o,s,i={523:function(e,t){var n,o=this&&this.__assign||function(){return o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var s in t=arguments[n])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},o.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.ReconnectingWebSocket=t.ReconnectingWebSocketError=void 0,function(e){e.NOT_OPEN="not-open"}(n=t.ReconnectingWebSocketError||(t.ReconnectingWebSocketError={}));var s=function(){function e(e){this.onopen=function(){},this.onmessage=function(){},this.onerror=function(){},this.onclose=function(){},this.options=o({minReconnectionDelay:250,maxReconnectionDelay:5e3,reconnectionDelayGrowFactor:1.3},e),this.reconnectionDelay=this.options.minReconnectionDelay,this.createNewWebSocket()}return e.prototype.createNewWebSocket=function(){this.ws=new WebSocket(this.options.url),this.ws.onopen=this.onWebSocketOpen.bind(this),this.ws.onmessage=this.onWebSocketMessage.bind(this),this.ws.onerror=this.onWebSocketError.bind(this),this.ws.onclose=this.onWebSocketClose.bind(this)},e.prototype.onWebSocketOpen=function(e){this.reconnectionDelay=this.options.minReconnectionDelay,this.onopen(e)},e.prototype.onWebSocketMessage=function(e){this.onmessage(e)},e.prototype.onWebSocketClose=function(e){var t=this;this.ws&&(this.ws.onopen=null,this.ws.onmessage=null,this.ws.onerror=null,this.ws.onclose=null,this.ws=void 0),this.reconnectionDelay=Math.min(this.reconnectionDelay*this.options.reconnectionDelayGrowFactor,this.options.maxReconnectionDelay),setTimeout((function(){return t.createNewWebSocket()}),this.reconnectionDelay),this.onclose(e)},e.prototype.onWebSocketError=function(e){this.onerror(e)},e.prototype.send=function(e){if(!this.ws||1!==this.ws.readyState)throw new Error(n.NOT_OPEN);this.ws.send(e)},e}();t.ReconnectingWebSocket=s},5:function(e,t){var n,o,s;Object.defineProperty(t,"__esModule",{value:!0}),t.WebSocketMesageDataKey=t.WebSocketMessageType=t.InternalSessionEventType=void 0,(s=t.InternalSessionEventType||(t.InternalSessionEventType={})).WEB_CLIENT_CONNECT="_connect",s.WEB_CLIENT_DISCONNECT="_disconnect",s.WEB_CLIENT_INIT="_init",(o=t.WebSocketMessageType||(t.WebSocketMessageType={})).WEB_CLIENT_INIT="wc_inited",o.WEB_CLIENT_ADD_EVENT="wc_add_event",o.CUSTOM_CLIENT_UPDATE_METADATA="cc_update_metadata",o.CUSTOM_CLIENT_ADD_EVENT="cc_add_event",(n=t.WebSocketMesageDataKey||(t.WebSocketMesageDataKey={})).LOCAL_TIME="localTime",n.LOCATION="location",n.REFERRER="referrer",n.USER_AGENT="userAgent"},296:function(e,t,n){n.r(t),n.d(t,{customAlphabet:function(){return r},customRandom:function(){return i},nanoid:function(){return c},random:function(){return s},urlAlphabet:function(){return o}});const o="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let s=e=>crypto.getRandomValues(new Uint8Array(e)),i=(e,t,n)=>{let o=(2<<Math.log(e.length-1)/Math.LN2)-1,s=-~(1.6*o*t/e.length);return(i=t)=>{let r="";for(;;){let t=n(s),c=s;for(;c--;)if(r+=e[t[c]&o]||"",r.length===i)return r}}},r=(e,t=21)=>i(e,t,s),c=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+((t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_")),"")}},r={};function c(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={exports:{}};return i[e].call(n.exports,n,n.exports,c),n.exports}c.d=function(e,t){for(var n in t)c.o(t,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e=c(296),t=c(5),n=c(523),o=function(){function o(t){var o,s=this;this.sessionId=(0,e.nanoid)(),this.isInitMessageSent=!1,this.messagesToRetry=[],this.epoch=(null==t?void 0:t.epoch)||Date.now(),null===(o=null==t?void 0:t.bufferedEvents)||void 0===o||o.forEach((function(e){var t=e.localTime,n=e.type,o=e.metadata;return s.addEvent(n,o,t)}));var i=document.currentScript.src,r=new URL(i);r.pathname=r.pathname.replace("client-web.js","ws"),r.protocol={"http:":"ws:","https:":"wss:"}[r.protocol],r.search="".concat(r.search,"&sid=").concat(this.sessionId),this.rws=new n.ReconnectingWebSocket({url:r.href}),this.rws.onopen=function(){return s.onConnected()}}return o.prototype.onConnected=function(){var e=this;if(!this.isInitMessageSent){var n={type:t.WebSocketMessageType.WEB_CLIENT_INIT,data:{localTime:Date.now()-this.epoch,location:location.href,referrer:document.referrer,userAgent:navigator.userAgent}};this.send(n),this.isInitMessageSent=!0}if(this.messagesToRetry.length>0){var o=this.messagesToRetry;this.messagesToRetry=[],o.forEach((function(t){return e.send(t)}))}},o.prototype.send=function(e){try{this.rws.send(JSON.stringify(e))}catch(t){this.messagesToRetry.push(e),this.messagesToRetry.length>500&&this.messagesToRetry.splice(0,this.messagesToRetry.length-500)}},o.prototype.addEvent=function(e,n,o){void 0===n&&(n={}),void 0===o&&(o=Date.now()-this.epoch);var s={localTime:o,type:e,metadata:n};this.send({type:t.WebSocketMessageType.WEB_CLIENT_ADD_EVENT,data:s})},o}(),s=window.olay,window.olay=new o({epoch:null==s?void 0:s.epoch,bufferedEvents:null==s?void 0:s.bufferedEvents})}();