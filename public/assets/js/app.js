webpackJsonp([1],{"+xur":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={mounted:function(){console.log("Component mounted.")}}},0:function(e,t,n){n("sV/x"),e.exports=n("xZZD")},OU1E:function(e,t,n){var o=n("VU/8")(n("+xur"),n("uUKm"),!1,null,null,null);e.exports=o.exports},"VU/8":function(e,t){e.exports=function(e,t,n,o,s,r){var i,c=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(i=e,c=e.default);var d,u="function"==typeof c?c.options:c;if(t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),s&&(u._scopeId=s),r?(d=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},u._ssrRegister=d):o&&(d=o),d){var l=u.functional,f=l?u.render:u.beforeCreate;l?(u._injectStyles=d,u.render=function(e,t){return d.call(t),f(e,t)}):u.beforeCreate=f?[].concat(f,d):[d]}return{esModule:i,exports:c,options:u}}},WRGp:function(e,t,n){window._=n("M4fF"),window.Popper=n("Zgw8").default;try{window.$=window.jQuery=n("7t+N"),n("K3J8")}catch(e){}window.axios=n("mtWM"),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";var o=document.head.querySelector('meta[name="csrf-token"]');o?window.axios.defaults.headers.common["X-CSRF-TOKEN"]=o.content:console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token")},"sV/x":function(e,t,n){n("WRGp"),window.Vue=n("I3G/"),Vue.component("example-component",n("OU1E"));new Vue({el:"#app"})},uUKm:function(e,t){e.exports={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"container"},[t("div",{staticClass:"row justify-content-center"},[t("div",{staticClass:"col-md-8"},[t("div",{staticClass:"card card-default"},[t("div",{staticClass:"card-header"},[this._v("Example Component")]),this._v(" "),t("div",{staticClass:"card-body"},[this._v("\n                    I'm an example component.\n                ")])])])])])}]}},xZZD:function(e,t){}},[0]);