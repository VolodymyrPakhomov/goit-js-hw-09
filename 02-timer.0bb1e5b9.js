var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("fbklV"),a=o("iQIUW");const s={input:document.querySelector("#datetime-picker"),startBtn:document.querySelector("[data-start]"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")};s.startBtn.disabled=!0;let d=null;function l(e){return String(e).padStart(2,"0")}const i={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<=Date.now()?a.Notify.failure("Please choose a date in the future"):(s.startBtn.disabled=!1,d=e[0])}};(0,r.default)(s.input,i);const u=new class{start(){s.startBtn.disabled=!0,s.input.disabled=!0,this.intervalId=setInterval((()=>{const e=Date.now(),t=d-e,n=function(e){const t=6e4,n=36e5,o=24*n;return{days:Math.floor(e/o),hours:Math.floor(e%o/n),minutes:Math.floor(e%o%n/t),seconds:Math.floor(e%o%n%t/1e3)}}(t);t<=1e3&&clearInterval(this.intervalId),this.updateClockface(n)}),1e3)}updateClockface({days:e,hours:t,minutes:n,seconds:o}){s.days.textContent=l(e),s.hours.textContent=l(t),s.minutes.textContent=l(n),s.seconds.textContent=l(o)}constructor(){this.intervalId=null,s.startBtn.disabled=!0}};s.startBtn.addEventListener("click",(()=>u.start()));
//# sourceMappingURL=02-timer.0bb1e5b9.js.map
