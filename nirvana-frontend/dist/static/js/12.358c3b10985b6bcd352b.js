webpackJsonp([12],{335:function(e,n,t){t(817);var s=t(5)(t(518),t(730),"data-v-650082b7",null);s.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/views/Task/Tasks.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] Tasks.vue: functional components are not supported with templates, they should use render functions."),e.exports=s.exports},343:function(e,n,t){t(347);var s=t(5)(t(344),t(346),"data-v-a8ef9cc2",null);s.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Shared/DataLoading.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] DataLoading.vue: functional components are not supported with templates, they should use render functions."),e.exports=s.exports},344:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:["dataLoad"]}},345:function(e,n,t){n=e.exports=t(1)(),n.push([e.i,".loading[data-v-a8ef9cc2] {\n  text-align: center;\n}\n\n.load-position[data-v-a8ef9cc2] {\n  margin: 0 auto;\n  display: inline-block;\n  left: -0.133333rem;\n  top: 0.133333rem;\n  position: relative;\n}\n\n.load-txt[data-v-a8ef9cc2] {\n  position: relative;\n  top: -0.133333rem;\n}",""])},346:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[e.dataLoad.flag?t("p",{staticClass:"loading"},[t("mt-spinner",{staticClass:"load-position",attrs:{type:"fading-circle"}}),t("span",{staticClass:"load-txt"},[e._v(e._s(e.dataLoad.data))])],1):e._e()])},staticRenderFns:[]},e.exports.render._withStripped=!0},347:function(e,n,t){var s=t(345);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t(2)("35e8fe72",s,!1)},466:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(31),a=t.n(s),i=t(685),o=t.n(i),r=t(343),l=t.n(r);n.default={data:function(){return{check:this.$fontawesome("check-circle-o"),exclamation:this.$fontawesome("exclamation-circle"),dataLoad:{flag:!0,data:"福利加载中"},cellOb:{show:!1},tasks:[],selectTasks:{}}},watch:{"$store.state.user.email":function(){this.$store.state.user.email&&this.fetchTasks()}},mounted:function(){this.$store.state.user.email?this.fetchTasks():this.$store.dispatch("setQuicklyLogin",{quicklyLogin:!0})},components:{Privileges:o.a,DataLoading:l.a},methods:{showQuest:function(e){this.$set(e,"$unfold",!e.$unfold),e.schedules||this.$set(e,"schedules",{}),e.$unfold&&this.getQuest(e)},getQuest:function(e){this.api.getTask(e.id,{klass_name:e.klass_name}).then(function(n){a()(e,n.data),e.schedule=n.data.schedule}).catch(function(e){console.log(e)})},makeProcess:function(e){var n=this;e._isQuestProcess||(e._isQuestProcess=!0,this.api.postTaskMakeProcess(e.id,{klass_name:e.klass_name}).then(function(t){a()(e,t.data),n.getQuest(e)}).catch(function(){e._isQuestProcess=!1}))},getTaskMakeReceived:function(e){var n=this;this.$store.dispatch("setPrivileges","请稍等,奖励提取中..."),this.cellOb.show=!0,this.api.postTaskMakeReceived(e.id,{klass_name:e.klass_name}).then(function(t){n.$store.dispatch("setPrivileges",t.data.items),n.getQuest(e)}).catch(function(e){console.log(e)})},fetchTasks:function(){var e=this;this.dataLoad.flag=!0,this.api.getTasks().then(function(n){e.tasks=n.data.items,e.dataLoad.flag=!1}).catch(function(n){e.dataLoad.flag=!1,console.log(n)})}}}},467:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:["obj"],computed:{privileges:function(){return this.$store.state.sundry.privileges}},methods:{closed:function(){this.obj.show=!1}}}},518:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(684),a=t.n(s);n.default={mounted:function(){var e={navigateTitle:!0};this.$store.dispatch("setNavigationTitle",e)},components:{Cell:a.a}}},538:function(e,n,t){n=e.exports=t(1)(),n.push([e.i,".privileges[data-v-28439025] {\n  position: fixed;\n  top: 15%;\n  left: 15%;\n  z-index: 100;\n  padding: 0.266667rem;\n  padding-bottom: 0;\n  background-color: #f0f0f0;\n  border-radius: 0.133333rem;\n  min-width: 6.826667rem;\n  min-height: 2.666667rem;\n}\n\n.fill-in[data-v-28439025] {\n  position: relative;\n  text-align: center;\n}\n\n.fill-in .ok[data-v-28439025] {\n  border-top: 0.032rem solid #d8d8d8;\n  height: 0.8rem;\n  line-height: 1.066667rem;\n  font-size: 0.373333rem;\n}\n\n.mask-layer[data-v-28439025] {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: black;\n  opacity: 0.5;\n  z-index: 99;\n}",""])},566:function(e,n,t){n=e.exports=t(1)(),n.push([e.i,".block-margin[data-v-625095e5] {\n  padding: 0 .3rem;\n}\n\n.category[data-v-625095e5] {\n  margin-bottom: .5rem;\n}\n\n.regular[data-v-625095e5] {\n  color: #fcd667;\n}\n\n.regular span[data-v-625095e5] {\n  padding-left: 0.266667rem;\n}\n\n.questions[data-v-625095e5] {\n  margin-top: 0.266667rem;\n  color: #ffffff;\n}\n\n.questions p[data-v-625095e5] {\n  margin: 0;\n}\n\n.questions .question[data-v-625095e5] {\n  padding: 0.266667rem;\n  letter-spacing: 0.032rem;\n  text-align: justify;\n}\n\n.questions .title span[data-v-625095e5]:last-child {\n  padding-left: 0.133333rem;\n  display: inline-block;\n  width: 96%;\n  vertical-align: top;\n  text-align: justify;\n}\n\n.questions .content[data-v-625095e5] {\n  padding: 0.133333rem 0;\n  padding-left: 0.453333rem;\n  text-align: justify;\n}\n\n.mycell[data-v-625095e5] {\n  width: 100%;\n  background-color: #122151;\n  padding: .3rem;\n  margin: .1rem auto;\n  margin-bottom: 0;\n}\n\n.mycell p[data-v-625095e5] {\n  margin: 0;\n}\n\n.mycell .icon[data-v-625095e5] {\n  vertical-align: top;\n  position: relative;\n  bottom: 0.133333rem;\n  width: 1.28rem;\n  height: 1.28rem;\n  color: #3F880B;\n  font-size: 0.48rem;\n}\n\n.mycell .icon img[data-v-625095e5] {\n  border-radius: 0.133333rem;\n}\n\n.mycell .inline[data-v-625095e5] {\n  display: inline-block;\n}\n\n.mycell .center[data-v-625095e5] {\n  letter-spacing: 0.032rem;\n  max-width: 80%;\n  padding-left: 0.266667rem;\n  position: relative;\n  bottom: 0.08rem;\n}\n\n.mycell .center .notice[data-v-625095e5] {\n  font-size: 0.32rem;\n  color: #999999;\n  padding-left: 0.053333rem;\n}\n\n.mycell .center .name[data-v-625095e5] {\n  font-size: 0.373333rem;\n  color: #ffffff;\n  font-weight: bold;\n  margin-bottom: 0.133333rem;\n}\n\n.mycell .center .info[data-v-625095e5] {\n  color: #fcd667;\n  font-weight: bold;\n  margin-top: 0.106667rem;\n}\n\n.mycell .center .info .pl[data-v-625095e5] {\n  padding-left: 0.133333rem;\n}\n\n.mybutton[data-v-625095e5] {\n  padding: 0.08rem 0.266667rem;\n  border-radius: 0.133333rem;\n  text-align: center;\n  letter-spacing: 0.032rem;\n  font-size: 0.373333rem;\n}\n\n.bg-fill[data-v-625095e5] {\n  background-color: #FF7300;\n  color: #ffffff;\n}\n\n.button-red[data-v-625095e5] {\n  background-color: #FF7300;\n  color: #ffffff;\n}\n\n.button-grey[data-v-625095e5] {\n  border: 0.032rem solid #999999;\n  color: #999999;\n}\n\n.percent[data-v-625095e5] {\n  color: #fcd667;\n  border: 0.032rem solid #fcd667;\n  width: 2.133333rem;\n  height: 0.72rem;\n  line-height: 0.72rem;\n  position: relative;\n}\n\n.percent span[data-v-625095e5]:first-child {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 0;\n  background-color: #FF7300;\n}\n\n.percent span[data-v-625095e5]:last-child {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: 100%;\n}\n\n.cell-list[data-v-625095e5] {\n  background-color: #122151;\n  color: #ffffff;\n}\n\n.cell-list .color-grey[data-v-625095e5] {\n  color: #999999;\n}\n\n.cell-list .check-red[data-v-625095e5] {\n  color: #cb202d;\n}\n\n.cell-list .check-grey[data-v-625095e5] {\n  color: #d8d8d8;\n}\n\n.cell-list ul[data-v-625095e5] {\n  margin: 0;\n  padding: 0;\n  padding: 0.266667rem;\n}\n\n.cell-list ul li[data-v-625095e5] {\n  transform: scale(0.9);\n  line-height: 2em;\n  list-style-type: decimal;\n}\n\n.cell-list ul li a[data-v-625095e5] {\n  text-decoration: underline;\n  padding: 0 0.133333rem;\n}\n\n.cell-list ul li span[data-v-625095e5] {\n  padding-left: 0.266667rem;\n  vertical-align: middle;\n}\n\n.mint-cell[data-v-625095e5] {\n  background-color: #122151;\n  min-height: 1.2rem;\n  margin: 0 .3rem;\n}\n\n.mint-cell .title[data-v-625095e5] {\n  color: #ffffff;\n  font-size: 0.373333rem;\n  position: absolute;\n  font-weight: bold;\n  left: 1.066667rem;\n  top: 0.453333rem;\n}\n\n.mint-cell .img[data-v-625095e5] {\n  width: 0.56rem;\n  height: 0.506667rem;\n  display: inline-block;\n}\n\n.mint-cell .img img[data-v-625095e5] {\n  border-radius: 0.133333rem;\n}\n\n.footer[data-v-625095e5] {\n  background-color: #122151;\n  padding: 0 .3rem;\n  min-height: 1.2rem;\n}",""])},567:function(e,n,t){n=e.exports=t(1)(),n.push([e.i,"",""])},684:function(e,n,t){t(816);var s=t(5)(t(466),t(729),"data-v-625095e5",null);s.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Task/Cell.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] Cell.vue: functional components are not supported with templates, they should use render functions."),e.exports=s.exports},685:function(e,n,t){t(788);var s=t(5)(t(467),t(702),"data-v-28439025",null);s.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Task/Privileges.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] Privileges.vue: functional components are not supported with templates, they should use render functions."),e.exports=s.exports},702:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"privileges"},[t("div",{staticClass:"fill-in"},[e.privileges&&e.privileges[0]&&e.privileges[0].text?t("div",e._l(e.privileges,function(n){return t("p",[e._v(e._s(n.text))])})):t("div",{staticClass:"no-data"},[e._v(e._s(e.privileges))]),e._v(" "),t("p",{staticClass:"ok",on:{click:function(n){e.closed()}}},[e._v("确认")])])]),e._v(" "),t("div",{staticClass:"mask-layer"})])},staticRenderFns:[]},e.exports.render._withStripped=!0},729:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.tasks.length?t("div",[e._l(e.tasks,function(n,s){return t("div",{staticClass:"category"},[t("mt-cell",[t("span",{staticClass:"img",slot:"icon"},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.image_url,expression:"category.image_url"}],attrs:{width:"100%",height:"100%"}})]),e._v(" "),t("span",{staticClass:"title"},[e._v(e._s(n.task_cate_name||"无"))])]),e._v(" "),t("div",{staticClass:"block-margin"},e._l(n.quests,function(s){return t("div",[t("div",{staticClass:"mycell",on:{click:function(t){e.showQuest(s,n)}}},[t("span",{staticClass:"inline icon fl"},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.image_url,expression:"quest.image_url"}],attrs:{width:"100%",height:"100%"}})]),e._v(" "),t("div",{staticClass:"inline center"},[t("p",[t("span",{staticClass:"name"},[e._v(e._s(s.name||"无名字"))])]),e._v(" "),t("p",{staticClass:"info"},[t("span",[e._v("奖励: "+e._s(s.desc||"无描述"))])])])]),e._v(" "),s.$unfold?t("div",{staticClass:"cell-list"},[s.schedules&&s.schedules.length?t("ul",[s.match_intr?t("p",{staticClass:"regular"},[e._v(e._s(s.match_intr)),s.finished?t("span",{staticClass:"check-red fa"},[e._v(e._s(e.check))]):t("span",{staticClass:"check-grey fa"},[e._v(e._s(e.check))])]):e._e(),e._v(" "),e._l(s.schedules,function(n){return t("span",[n.finished?t("li",[e._v(e._s(n.text)),t("span",{staticClass:"check-red fa"},[e._v(e._s(e.check))])]):t("li",{staticClass:"color-grey"},[e._v(e._s(n.text)),t("span",{staticClass:"check-grey fa"},[e._v(e._s(e.check))])])])})],2):s.schedules?t("ul",[e._v("暂无步骤")]):e._e()]):e._e(),e._v(" "),t("div",{staticClass:"footer"},["status_completed"===s.status?t("span",{staticClass:"inline mybutton fr bg-fill",on:{click:function(t){t.stopPropagation(),e.getTaskMakeReceived(s,n)}}},[e._v("领取奖励")]):"status_received"===s.status?t("span",{staticClass:"inline mybutton fr button-grey"},[e._v("已领取")]):"status_expired"===s.status?t("span",{staticClass:"inline mybutton fr button-grey"},[e._v("已过期")]):"status_created"===s.status?t("span",{staticClass:"inline mybutton fr button-red",on:{click:function(t){t.stopPropagation(),e.makeProcess(s,n)}}},[e._v("接受")]):"status_processing"===s.status?t("span",{staticClass:"inline mybutton percent fr"},[t("span",{staticClass:"inline",style:{width:s.percent+"px"}}),t("span",{staticClass:"inline"},[e._v(e._s(s.percent)+"%")])]):e._e()])])}))],1)}),e._v(" "),t("div",{staticClass:"questions"},[t("div",{staticClass:"question"},[t("p",{staticClass:"title"},[t("span",{staticClass:"fa"},[e._v(e._s(e.exclamation))]),t("span",[e._v("操作指南: ")])]),e._v(" "),t("p",{staticClass:"content"},[e._v("[接受]任务后，点击[优惠图标]即可查看完成进度。")])])]),e._v(" "),e.cellOb.show?t("privileges",{attrs:{obj:e.cellOb}}):e._e()],2):t("div",[e.dataLoad.flag?t("data-loading",{attrs:{dataLoad:e.dataLoad}}):t("p",{staticClass:"no-data"},[e._v("您暂无任务")])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},730:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"body"},[t("cell")],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},788:function(e,n,t){var s=t(538);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t(2)("91566600",s,!1)},816:function(e,n,t){var s=t(566);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t(2)("281b9bfc",s,!1)},817:function(e,n,t){var s=t(567);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t(2)("e5856c5a",s,!1)}});