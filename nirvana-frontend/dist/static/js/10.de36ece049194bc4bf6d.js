webpackJsonp([10],{316:function(n,t,e){e(779);var a=e(5)(e(498),e(693),"data-v-1cd6159a",null);a.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/views/Setting/Likes.vue",a.esModule&&Object.keys(a.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] Likes.vue: functional components are not supported with templates, they should use render functions."),n.exports=a.exports},338:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(75),o=(e.n(a),e(76)),s=e.n(o);t.default={name:"InfiniteScroll",props:["fetchHandler","items","loading","totalFetched","q"],methods:{loadMore:function(){this.q.page&&this.items.length&&(this.totalFetched?this.q.page>1&&this.$toast({message:"无更多数据可加载",position:"middle",duration:2e3}):(this.q.page=this.q.page+1,this.fetchHandler&&this.fetchHandler()))}},components:{InfiniteScroll:s.a}}},339:function(n,t,e){t=n.exports=e(1)(),t.push([n.i,".infinit-scroll-wrap {\n  position: relative;\n  height: 100%;\n  overflow: scroll;\n}\n\n.loading {\n  text-align: center;\n}\n\n.load-position {\n  margin: 0 auto;\n  display: inline-block;\n  left: -0.133333rem;\n  top: 0.133333rem;\n  position: relative;\n}\n\n.load-txt {\n  position: relative;\n  top: -0.133333rem;\n}",""])},340:function(n,t,e){e(342);var a=e(5)(e(338),e(341),null,null);a.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Shared/InfiniteScroll.vue",a.esModule&&Object.keys(a.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] InfiniteScroll.vue: functional components are not supported with templates, they should use render functions."),n.exports=a.exports},341:function(n,t,e){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"infinit-scroll-wrap"},[e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:n.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},[n._t("top"),n._v(" "),n._l(n.items,function(t,a){return e("div",{key:a},[n._t("default",null,{item:t,index:a})],2)}),n._v(" "),n._t("bottom"),n._v(" "),n.loading&&!n.items.length?e("p",{staticClass:"loading"},[e("mt-spinner",{staticClass:"load-position",attrs:{type:"fading-circle"}}),n._v(" "),e("span",{staticClass:"load-txt"},[n._v("加载中")])],1):n._e()],2)])},staticRenderFns:[]},n.exports.render._withStripped=!0},342:function(n,t,e){var a=e(339);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(2)("4d47160c",a,!1)},343:function(n,t,e){e(347);var a=e(5)(e(344),e(346),"data-v-a8ef9cc2",null);a.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Shared/DataLoading.vue",a.esModule&&Object.keys(a.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] DataLoading.vue: functional components are not supported with templates, they should use render functions."),n.exports=a.exports},344:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["dataLoad"]}},345:function(n,t,e){t=n.exports=e(1)(),t.push([n.i,".loading[data-v-a8ef9cc2] {\n  text-align: center;\n}\n\n.load-position[data-v-a8ef9cc2] {\n  margin: 0 auto;\n  display: inline-block;\n  left: -0.133333rem;\n  top: 0.133333rem;\n  position: relative;\n}\n\n.load-txt[data-v-a8ef9cc2] {\n  position: relative;\n  top: -0.133333rem;\n}",""])},346:function(n,t,e){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[n.dataLoad.flag?e("p",{staticClass:"loading"},[e("mt-spinner",{staticClass:"load-position",attrs:{type:"fading-circle"}}),e("span",{staticClass:"load-txt"},[n._v(n._s(n.dataLoad.data))])],1):n._e()])},staticRenderFns:[]},n.exports.render._withStripped=!0},347:function(n,t,e){var a=e(345);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(2)("35e8fe72",a,!1)},349:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["starsData"],data:function(){return{starO:this.$fontawesome("star-o"),starHalfO:this.$fontawesome("star-half-o"),star:this.$fontawesome("star")}}}},350:function(n,t,e){t=n.exports=e(1)(),t.push([n.i,".color-yellow[data-v-d89821f0] {\n  color: #F6A623;\n}",""])},351:function(n,t,e){e(353);var a=e(5)(e(349),e(352),"data-v-d89821f0",null);a.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Game/Star.vue",a.esModule&&Object.keys(a.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] Star.vue: functional components are not supported with templates, they should use render functions."),n.exports=a.exports},352:function(n,t,e){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return n.starsData?e("span",[n._l(parseInt(n.starsData),function(t){return e("span",[t?e("span",{staticClass:"fa color-yellow"},[n._v(n._s(n.star))]):n._e(),n._v(" "),t+.5===parseFloat(n.starsData)?e("span",{staticClass:"fa color-yellow"},[n._v(n._s(n.starHalfO))]):n._e()])}),n._v(" "),n.starsData&&"0"!==n.starsData?e("span",[n._v("("+n._s(n.starsData)+")")]):"0"!==n.starsData&&n.starsData?n._e():e("span",[n._v("暂无评分")])],2):e("span",[n._v("暂无评分")])},staticRenderFns:[]},n.exports.render._withStripped=!0},353:function(n,t,e){var a=e(350);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(2)("404845d3",a,!1)},354:function(n,t,e){e(359);var a=e(5)(e(356),e(358),"data-v-14a47955",null);a.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Shared/Game.vue",a.esModule&&Object.keys(a.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] Game.vue: functional components are not supported with templates, they should use render functions."),n.exports=a.exports},356:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(351),o=e.n(a),s=e(340),i=e.n(s);t.default={props:["gameList","query"],data:function(){return{heart:this.$fontawesome("heart-o"),heartFiled:this.$fontawesome("heart"),imgListStars:"",likesStars:"",vendorImgListStars:""}},computed:{games:function(){return this.gameList}},components:{Star:o.a,InfiniteScroll:i.a},methods:{goDetail:function(n){this.$router.push({name:"GameDetail",params:{gid:n}})},handleLike:function(n,t){this.$store.state.user.email?this.$emit("handleLike",n,t):this.$store.dispatch("setQuicklyLogin",{quicklyLogin:!0})},handleUnlike:function(n,t){this.$store.state.user.email?this.$emit("handleUnlike",n,t):this.$store.dispatch("setQuicklyLogin",{quicklyLogin:!0})},open:function(n){var t=this;if(this.$store.state.user.email){var e=this.$toast({message:"正在加载游戏展厅...",position:"center"});this.api.postLaunch(n.gid).then(function(a){t.$store.dispatch("setCurrentlyPlayedGames",n),e.close(),window.location.href=a.data.game_url}).catch(function(n){e.close(),console.log(n)})}else this.$store.dispatch("setQuicklyLogin",{quicklyLogin:!0})}}}},357:function(n,t,e){t=n.exports=e(1)(),t.push([n.i,'@charset "UTF-8";\n\np[data-v-14a47955] {\n  padding: 0;\n  margin: 0;\n}\n\n.dl[data-v-14a47955] {\n  display: inline-block;\n}\n\n#games .p-top[data-v-14a47955] {\n  padding-top: 0.213333rem;\n}\n\n.perform[data-v-14a47955] {\n  padding: 0.032rem 0.213333rem;\n  border-radius: 0.08rem;\n  color: #0b0e31;\n  transform: scale(0.7);\n  display: inline-block;\n}\n\n.bg-color-red[data-v-14a47955] {\n  background-color: #cb202d;\n}\n\n.bg-color-yellow[data-v-14a47955] {\n  background-color: #fcd667;\n}\n\n.bg-color-blue[data-v-14a47955] {\n  background-color: #4990E2;\n}\n\n.color-red[data-v-14a47955] {\n  color: #cb202d;\n}\n\n.tag[data-v-14a47955] {\n  padding-top: 0.08rem;\n  font-size: 0.2rem;\n}\n\n.tag .grey[data-v-14a47955] {\n  background-color: #999999;\n  color: #ffffff;\n}\n\n.tag .yellow[data-v-14a47955] {\n  background-color: #fcd667;\n  font-weight: bold;\n  color: #0b0e31;\n}\n\n.tag span[data-v-14a47955] {\n  padding: 0.026667rem 0.266667rem;\n  margin-right: 0.133333rem;\n  border-radius: 0.213333rem;\n}\n\n.opacity[data-v-14a47955] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n\n.opacity[data-v-14a47955]:before {\n  color: #cb202d;\n  content: "\\6B63\\5728\\7EF4\\62A4";\n  width: inherit;\n  height: inherit;\n  position: absolute;\n  font-size: 0.533333rem;\n  font-weight: bold;\n  top: 40%;\n  left: 75%;\n  transform: rotate(-45deg);\n}\n\n.opacity-number[data-v-14a47955] {\n  opacity: 0.5;\n}\n\n.opacity-sold-out[data-v-14a47955] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n\n.opacity-sold-out[data-v-14a47955]:before {\n  color: #edb240;\n  content: "\\5DF2\\4E0B\\67B6";\n  width: inherit;\n  height: inherit;\n  position: absolute;\n  font-size: 0.533333rem;\n  font-weight: bold;\n  top: 40%;\n  left: 75%;\n  transform: rotate(-45deg);\n}\n\n.venues[data-v-14a47955] {\n  margin: 0.3rem 0;\n  padding: 0.2rem;\n  background-color: rgba(255, 255, 255, 0.1);\n  position: relative;\n}\n\n.venues .button[data-v-14a47955] {\n  padding: 0.1rem 0.3rem;\n  font-weight: bold;\n  color: #0b0e31;\n  background-color: #fcd667;\n  border-radius: 0.08rem;\n  font-size: 0.32rem;\n  float: right;\n  display: inline-block;\n  position: relative;\n  top: 0.746667rem;\n}\n\n.venues .content[data-v-14a47955] {\n  padding: 0 0.16rem;\n  vertical-align: top;\n  width: 58%;\n}\n\n.venues .content .heart[data-v-14a47955] {\n  margin-left: 0.533333rem;\n}\n\n.venues .content .bottom[data-v-14a47955] {\n  padding-bottom: 0.186667rem;\n}\n\n.venues .content .h1[data-v-14a47955] {\n  font-size: 0.373333rem;\n  color: #ffffff;\n  font-weight: bold;\n}\n\n.venues .content .h2[data-v-14a47955] {\n  font-size: 0.346667rem;\n}\n\n.venues .content .h3[data-v-14a47955] {\n  color: #C6CCCC;\n}\n\n.venues .content .line-height[data-v-14a47955] {\n  padding: 0.053333rem 0;\n}\n\n.venues .content .padding-r[data-v-14a47955] {\n  padding-right: 0.133333rem;\n}\n\n.venues .content .info[data-v-14a47955] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 100%;\n}\n\n.venues .content .button .red[data-v-14a47955] {\n  background-color: #cb202d;\n  color: #ffffff;\n}\n\n.venues .content .button .blue[data-v-14a47955] {\n  background-color: #3eaeed;\n  color: #ffffff;\n}\n\n.venues .content .button .yellow[data-v-14a47955] {\n  background-color: #fcd667;\n  font-weight: bold;\n  color: #0b0e31;\n}\n\n.venues .content .button span[data-v-14a47955] {\n  padding: 0.029333rem 0.266667rem;\n  margin-right: 0.133333rem;\n  border-radius: 0.053333rem;\n}\n\n.venues .img[data-v-14a47955] {\n  width: 2.133333rem;\n  height: 2.133333rem;\n}\n\n.venues .img > img[data-v-14a47955] {\n  border-radius: 0.133333rem;\n}\n\n.scroll-height[data-v-14a47955] {\n  height: 13.333333rem;\n  -webkit-overflow-scrolling: touch;\n}',""])},358:function(n,t,e){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{class:{"scroll-height":n.query},attrs:{id:"games"}},[n.query?e("infinite-scroll",{attrs:{fetchHandler:n.query.fetchData,items:n.query.items,loading:n.query.loading,q:n.query.q,totalFetched:n.query.totalFetched},scopedSlots:n._u([{key:"default",fn:function(t){var a=t.item;return[e("div",{staticClass:"venues",class:{"opacity-number":a.maintain_at||!a.enabled}},[e("span",{staticClass:"img dl",on:{click:function(t){n.goDetail(a.gid)}}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.image_url,expression:"item.image_url"}],attrs:{width:"100%",height:"100%"}})]),n._v(" "),e("div",{staticClass:"content dl",class:{"p-top":!a.tag_list.length}},[e("p",[e("span",{staticClass:"h1 padding-r"},[n._v(n._s(a.name||"无名"))]),e("span",{staticClass:"perform bg-color-yellow"},[n._v(n._s(a.vendor_name||"无"))]),a.liked?n._e():e("span",{staticClass:"fa color-red heart",on:{click:function(t){n.handleLike(a.gid,a)}}},[n._v(n._s(n.heart))]),a.liked?e("span",{staticClass:"fa color-red heart",on:{click:function(t){n.handleUnlike(a.gid,a)}}},[n._v(n._s(n.heartFiled))]):n._e()]),n._v(" "),e("p",{staticClass:"h3 line-height",on:{click:function(t){n.goDetail(a.gid)}}},[e("star",{attrs:{starsData:a.star_rank}})],1),n._v(" "),e("p",{staticClass:"h3 info",class:{"p-top":!a.tag_list.length}},[n._v(n._s(a.recommended_desc||"暂无描述"))]),n._v(" "),a.tag_list.length?e("p",{staticClass:"tag"},n._l(a.tag_list,function(t){return e("span",{staticClass:"yellow"},[n._v(n._s(t))])})):n._e()]),n._v(" "),e("span",{staticClass:"button dl",attrs:{plain:""},on:{click:function(t){n.open(a)}}},[n._v("开始")]),n._v(" "),a.maintain_at&&a.enabled?e("div",{class:{opacity:a.maintain_at}}):n._e(),n._v(" "),!a.enabled&&a.maintain_at?e("div",{class:{"opacity-sold-out":!a.enabled}}):n._e()])]}}])}):n.games&&n.games.length?e("div",n._l(n.games,function(t){return e("div",{staticClass:"venues",class:{"opacity-number":t.maintain_at||!t.enabled}},[e("span",{staticClass:"img dl",on:{click:function(e){n.goDetail(t.gid)}}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.image_url,expression:"item.image_url"}],attrs:{width:"100%",height:"100%"}})]),n._v(" "),e("div",{staticClass:"content dl",class:{"p-top":!t.tag_list.length}},[e("p",[e("span",{staticClass:"h1 padding-r"},[n._v(n._s(t.name||"无名"))]),e("span",{staticClass:"perform bg-color-yellow"},[n._v(n._s(t.vendor_name||"无"))]),t.liked?n._e():e("span",{staticClass:"fa color-red heart",on:{click:function(e){n.handleLike(t.gid,t)}}},[n._v(n._s(n.heart))]),t.liked?e("span",{staticClass:"fa color-red heart",on:{click:function(e){n.handleUnlike(t.gid,t)}}},[n._v(n._s(n.heartFiled))]):n._e()]),n._v(" "),e("p",{staticClass:"h3 line-height",on:{click:function(e){n.goDetail(t.gid)}}},[e("star",{attrs:{starsData:t.star_rank}})],1),n._v(" "),e("p",{staticClass:"h3 info",class:{"p-top":!t.tag_list.length}},[n._v(n._s(t.recommended_desc||"暂无描述"))]),n._v(" "),t.tag_list.length?e("p",{staticClass:"tag"},n._l(t.tag_list,function(t){return e("span",{staticClass:"yellow"},[n._v(n._s(t))])})):n._e()]),n._v(" "),e("span",{staticClass:"button dl",attrs:{plain:""},on:{click:function(e){n.open(t)}}},[n._v("开始")]),n._v(" "),t.maintain_at&&t.enabled?e("div",{class:{opacity:t.maintain_at}}):n._e(),n._v(" "),!t.enabled&&t.maintain_at?e("div",{class:{"opacity-sold-out":!t.enabled}}):n._e()])})):n._e()],1)},staticRenderFns:[]},n.exports.render._withStripped=!0},359:function(n,t,e){var a=e(357);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(2)("83f7c952",a,!1)},498:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(354),o=e.n(a),s=e(343),i=e.n(s);t.default={data:function(){return{dataLoad:{flag:!0,data:"我的收藏加载中"},exclamation:this.$fontawesome("exclamation-circle"),likes:[]}},mounted:function(){var n={navigateTitle:!1};this.$store.dispatch("setNavigationTitle",n),this.handleLike()},components:{Game:o.a,DataLoading:i.a},methods:{handleLike:function(){var n=this;this.api.getLikeGames().then(function(t){n.likes=t.data.items,n.dataLoad.flag=!1}).catch(function(t){n.dataLoad.flag=!1,console.log(t)})},handleUnlike:function(n){var t=this;this.api.postUnlike(n).then(function(n){t.handleLike(),t.$toast({message:"已去除此条收藏",position:"middle",duration:5e3})}).catch(function(n){console.log(n)})}}}},529:function(n,t,e){t=n.exports=e(1)(),t.push([n.i,".body[data-v-1cd6159a] {\n  background-color: #0b0e31;\n  padding-left: 0.266667rem;\n  padding-right: 0.266667rem;\n}\n\n.body .g-title[data-v-1cd6159a] {\n  font-size: 0.426667rem;\n  padding-top: 0.133333rem;\n  margin: 0;\n  margin-top: 0.266667rem;\n}\n\n.questions[data-v-1cd6159a] {\n  margin-top: .3rem;\n  background-color: #122151;\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.questions p[data-v-1cd6159a] {\n  margin: 0;\n}\n\n.questions .question[data-v-1cd6159a] {\n  padding: 0.266667rem;\n  letter-spacing: 0.032rem;\n  text-align: justify;\n}\n\n.questions .title span[data-v-1cd6159a]:last-child {\n  padding-left: 0.133333rem;\n  display: inline-block;\n  width: 96%;\n  vertical-align: top;\n  text-align: justify;\n}\n\n.questions .content[data-v-1cd6159a] {\n  padding: 0.133333rem 0;\n  padding-left: 0.453333rem;\n  text-align: justify;\n}\n\n.loading[data-v-1cd6159a] {\n  text-align: center;\n}\n\n.load-position[data-v-1cd6159a] {\n  margin: 0 auto;\n  display: inline-block;\n  left: -0.133333rem;\n  top: 0.133333rem;\n  position: relative;\n}\n\n.load-txt[data-v-1cd6159a] {\n  position: relative;\n  top: -0.133333rem;\n}",""])},693:function(n,t,e){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"body"},[n.likes&&n.likes.length?e("div",[e("p",{staticClass:"g-title"},[n._v("我的收藏")]),n._v(" "),e("game",{attrs:{gameList:n.likes},on:{handleUnlike:n.handleUnlike}})],1):n._e(),n._v(" "),n.dataLoad.flag||n.likes&&n.likes.length?n._e():e("p",{staticClass:"no-data"},[n._v("\n    暂无收藏\n  ")]),n._v(" "),e("data-loading",{attrs:{dataLoad:n.dataLoad}}),n._v(" "),e("div",{staticClass:"questions"},[e("div",{staticClass:"question"},[e("p",{staticClass:"title"},[e("span",{staticClass:"fa"},[n._v(n._s(n.exclamation))]),e("span",[n._v("关于收藏:")])]),n._v(" "),e("p",{staticClass:"content"},[n._v("帮助用户最快速方便的查找到您喜爱的游戏。")]),n._v(" "),e("p",{staticClass:"title"},[e("span",{staticClass:"fa"},[n._v(n._s(n.exclamation))]),e("span",[n._v("使用说明:")])]),n._v(" "),e("p",{staticClass:"content"},[n._v("点击游戏名后方的[♡]心形按钮，点亮后该游戏就会出现在[我的收藏]中，您可以随时点亮或熄灭以管理您喜欢的游戏。")])])])],1)},staticRenderFns:[]},n.exports.render._withStripped=!0},779:function(n,t,e){var a=e(529);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(2)("4b0857e7",a,!1)}});