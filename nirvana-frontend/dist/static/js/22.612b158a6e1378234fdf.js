webpackJsonp([22],{320:function(t,n,e){e(803);var a=e(5)(e(503),e(716),"data-v-4b399d16",null);a.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/views/Setting/Points.vue",a.esModule&&Object.keys(a.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] Points.vue: functional components are not supported with templates, they should use render functions."),t.exports=a.exports},338:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(75),i=(e.n(a),e(76)),o=e.n(i);n.default={name:"InfiniteScroll",props:["fetchHandler","items","loading","totalFetched","q"],methods:{loadMore:function(){this.q.page&&this.items.length&&(this.totalFetched?this.q.page>1&&this.$toast({message:"无更多数据可加载",position:"middle",duration:2e3}):(this.q.page=this.q.page+1,this.fetchHandler&&this.fetchHandler()))}},components:{InfiniteScroll:o.a}}},339:function(t,n,e){n=t.exports=e(1)(),n.push([t.i,".infinit-scroll-wrap {\n  position: relative;\n  height: 100%;\n  overflow: scroll;\n}\n\n.loading {\n  text-align: center;\n}\n\n.load-position {\n  margin: 0 auto;\n  display: inline-block;\n  left: -0.133333rem;\n  top: 0.133333rem;\n  position: relative;\n}\n\n.load-txt {\n  position: relative;\n  top: -0.133333rem;\n}",""])},340:function(t,n,e){e(342);var a=e(5)(e(338),e(341),null,null);a.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Shared/InfiniteScroll.vue",a.esModule&&Object.keys(a.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] InfiniteScroll.vue: functional components are not supported with templates, they should use render functions."),t.exports=a.exports},341:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"infinit-scroll-wrap"},[e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},[t._t("top"),t._v(" "),t._l(t.items,function(n,a){return e("div",{key:a},[t._t("default",null,{item:n,index:a})],2)}),t._v(" "),t._t("bottom"),t._v(" "),t.loading&&!t.items.length?e("p",{staticClass:"loading"},[e("mt-spinner",{staticClass:"load-position",attrs:{type:"fading-circle"}}),t._v(" "),e("span",{staticClass:"load-txt"},[t._v("加载中")])],1):t._e()],2)])},staticRenderFns:[]},t.exports.render._withStripped=!0},342:function(t,n,e){var a=e(339);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(2)("4d47160c",a,!1)},348:function(t,n,e){"use strict";function a(t,n){if(!t)return"";"string"==typeof t&&(t=new Date(t)),n=n||"yyyy-MM-dd HH:mm:ss";var e={year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate(),hour:t.getHours(),minutes:t.getMinutes(),seconds:t.getSeconds()};for(var a in e){var i=e[a];i=i<10?"0"+i:i,e[a]=i.toString()}var o=e.year,s=e.month,r=e.day,l=e.hour,d=e.minutes,c=e.seconds;return n.replace(/y+/,function(t){return o.substring(o.length,-t.length)}).replace(/M+/,function(){return s}).replace(/d+/,function(){return r}).replace(/H+/,function(){return l}).replace(/h+/,function(){return l%12==0?12:l%12}).replace(/m+/,function(){return d}).replace(/s+/,function(){return c})}e(0).default.filter("date",a)},355:function(t,n,e){"use strict";var a=e(24),i=e.n(a);n.a={data:function(){return{items:[],loading:!1,firstFetched:!1,q:{page:1,per_page:10},paginateMeta:null}},computed:{totalFetched:function(){return this.firstFetched&&this.items&&this.items.length===this.paginateMeta.total_count}},methods:{beforeFetch:function(){this.loading=!0},fetchData:function(){},_fetchData:function(t){var n=this;return new i.a(function(e,a){n.beforeFetch(),t.then(function(t){t.data.items&&(1===n.q.page?n.items=t.data.items:n.items=n.items.concat(t.data.items),n.afterFetch(t.data),e(t))}).catch(function(t){n.loading=!1,a(t)})})},afterFetch:function(t){this.firstFetched=!0,this.loading=!1,this.q.page=t.paginate_meta.page||this.q.page,this.q.per_page=t.paginate_meta.per_page||this.q.per_page,this.paginateMeta=t.paginate_meta}}}},503:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=(e(348),e(340)),i=e.n(a),o=e(355);n.default={mixins:[o.a],data:function(){return{exclamation:this.$fontawesome("exclamation-circle"),pointDatas:""}},mounted:function(){var t={navigateTitle:!1};this.$store.dispatch("setNavigationTitle",t),this.$store.state.user.email&&this.fetchData()},components:{InfiniteScroll:i.a},methods:{fetchData:function(){var t=this;this._fetchData(this.api.getPoints(this.q)).then(function(n){t.pointDatas=n.data})}}}},553:function(t,n,e){n=t.exports=e(1)(),n.push([t.i,".my-coin[data-v-4b399d16] {\n  position: relative;\n  background-color: #122151;\n  padding: .5rem;\n}\n\n.my-coin .number[data-v-4b399d16],\n.my-coin .txt[data-v-4b399d16] {\n  font-weight: bold;\n  margin: 0 auto;\n  text-align: center;\n  word-wrap: break-word;\n}\n\n.my-coin .number[data-v-4b399d16] {\n  font-size: 1.6rem;\n  color: #ffffff;\n}\n\n.my-coin .txt[data-v-4b399d16] {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.my-coin .gain[data-v-4b399d16] {\n  width: 100%;\n  padding: 0.266667rem;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -0.32rem;\n  background-color: #A3131E;\n}\n\n.my-coin .gain .info span[data-v-4b399d16]:first-child,\n.my-coin .gain .info span[data-v-4b399d16]:last-child {\n  color: #ffffff;\n}\n\n.my-coin .gain .info .color[data-v-4b399d16] {\n  color: #F6A623;\n  padding-left: 0.266667rem;\n}\n\n.draw-lottery[data-v-4b399d16] {\n  padding: .3rem;\n  width: 100%;\n  background-color: #122151;\n}\n\n.draw-lottery button[data-v-4b399d16] {\n  width: 100%;\n  background-color: #fcd667;\n  color: #122151;\n  padding: .2rem 0;\n  border: 0.032rem solid #F8E81C;\n  border-radius: 2rem;\n  font-weight: bold;\n  font-size: 0.426667rem;\n}\n\n.task-list[data-v-4b399d16] {\n  margin-top: .3rem;\n  background-color: #122151;\n  height: 8rem;\n  padding: .5rem .3rem;\n  overflow: scroll;\n  -webkit-overflow-scrolling: touch;\n}\n\n.task-list p[data-v-4b399d16] {\n  margin: 0;\n  padding: 0;\n}\n\n.task-list .li[data-v-4b399d16] {\n  padding: .3rem;\n  color: #ffffff;\n  border-bottom: 0.032rem solid #0b0e31;\n  word-wrap: break-word;\n}\n\n.task-list .li span[data-v-4b399d16]:first-child {\n  display: inline-block;\n  width: 20%;\n  vertical-align: middle;\n}\n\n.task-list .li span[data-v-4b399d16]:last-child {\n  display: inline-block;\n  width: 16%;\n}\n\n.task-list .li .center[data-v-4b399d16] {\n  padding-left: 0.266667rem;\n  display: inline-block;\n  width: 63%;\n  vertical-align: middle;\n}\n\n.task-list .more[data-v-4b399d16] {\n  height: 1.066667rem;\n  line-height: 1.066667rem;\n  padding: 0 0.266667rem;\n  color: #4990E2;\n}\n\n.questions[data-v-4b399d16] {\n  margin-top: .3rem;\n  background-color: #122151;\n  padding: .5rem .3rem;\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.questions p[data-v-4b399d16] {\n  margin: 0;\n}\n\n.questions .question[data-v-4b399d16] {\n  padding: 0.266667rem;\n  letter-spacing: 0.032rem;\n  text-align: justify;\n}\n\n.questions .title span[data-v-4b399d16]:last-child {\n  padding-left: 0.133333rem;\n  display: inline-block;\n  width: 96%;\n  vertical-align: top;\n  text-align: justify;\n}\n\n.questions .content[data-v-4b399d16] {\n  padding: 0.133333rem 0;\n  padding-left: 0.453333rem;\n  text-align: justify;\n}\n\n.loading[data-v-4b399d16] {\n  text-align: center;\n}\n\n.load-position[data-v-4b399d16] {\n  margin: 0 auto;\n  display: inline-block;\n  left: -0.133333rem;\n  top: 0.133333rem;\n  position: relative;\n}\n\n.load-txt[data-v-4b399d16] {\n  position: relative;\n  top: -0.133333rem;\n}",""])},716:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"body"},[e("div",{staticClass:"my-coin"},[e("p",{staticClass:"number"},[t._v(t._s(t.pointDatas&&t.pointDatas.points||"0"))]),t._v(" "),e("p",{staticClass:"txt"},[t._v("可用亚太币")])]),t._v(" "),e("div",{staticClass:"draw-lottery"},[e("router-link",{attrs:{to:"/setting/lottery"}},[e("button",[t._v("马上去抽奖")])])],1),t._v(" "),e("infinite-scroll",{class:{"task-list":t.items.length>0},attrs:{fetchHandler:t.fetchData,items:t.items,loading:t.loading,q:t.q,totalFetched:t.totalFetched},scopedSlots:t._u([{key:"default",fn:function(n){var a=n.item;return[e("p",{staticClass:"li"},[e("span",[t._v(t._s(t._f("date")(a.created_at,"yyyy-MM-dd")))]),e("span",{staticClass:"center"},[t._v(t._s(a.log||"无说明"))]),e("span",[t._v(t._s(a.num_points||"无")+"亚太币")])])]}}])}),t._v(" "),e("div",{staticClass:"questions"},[e("div",{staticClass:"question"},[e("p",{staticClass:"title"},[e("span",{staticClass:"fa"},[t._v(t._s(t.exclamation))]),e("span",[t._v("亚太币有什么用途？")])]),t._v(" "),e("p",{staticClass:"content"},[t._v("参与[亚太大转盘]抽奖活动，购买[亚太币商城]中的礼品(即将上线)。")]),t._v(" "),e("p",{staticClass:"title"},[e("span",{staticClass:"fa"},[t._v(t._s(t.exclamation))]),e("span",[t._v("获取亚太币？")])]),t._v(" "),e("p",{staticClass:"content"},[t._v("新用户完成邮箱验证、手机验证、每日签到等任务获得相应奖励亚太币。")]),t._v(" "),e("p",{staticClass:"title"},[e("span",{staticClass:"fa"},[t._v(t._s(t.exclamation))]),e("span",[t._v("快速获取亚太币？")])]),t._v(" "),e("p",{staticClass:"content"},[t._v("每次充值按照金额的1%比例赠送亚太币。例：充值1000元，将获得10亚太币，可参加两次大转盘抽奖。")])])])],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},803:function(t,n,e){var a=e(553);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(2)("9e812c4c",a,!1)}});