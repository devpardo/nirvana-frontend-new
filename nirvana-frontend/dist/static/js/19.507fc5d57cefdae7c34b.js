webpackJsonp([19],{307:function(e,n,t){t(809);var r=t(5)(t(489),t(722),"data-v-52f8c394",null);r.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/views/Register.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] Register.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},445:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:["rules"],data:function(){return{pickerUp:this.$fontawesome("chevron-circle-up"),close:this.$fontawesome("times-circle")}}}},463:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"NirvanaInput",props:{label:{type:String},value:{type:[String,Number]},type:{type:String,default:"text"},placeholder:{type:String,default:""},valid:{type:Boolean,default:!0},errorMessage:{type:String,default:function(){return(this.label||"Input")+" is invalid"}}},data:function(){return{triggered:!1}},computed:{hasError:function(){return this.triggered&&!this.valid},errorClasses:function(){return{error:this.hasError}}},methods:{onBlur:function(){this.triggered=!0,this.$emit("blur",this.triggered)},onInput:function(e){this.$emit("input",e.target.value)}}}},489:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(30),a=t.n(r),s=t(28),i=t.n(s),o=t(27),l=t.n(o),c=t(77),d=t.n(c),u=t(25),m=t.n(u),p=t(74),f=t(664),g=t.n(f),v=t(29),h=t.n(v),b=t(681),_=t.n(b),w=t(26);t(74);n.default={name:"Register",components:{Rule:g.a,NirvanaInput:_.a},data:function(){return{disabled:!1,baseCount:60,left:this.$fontawesome("angle-left"),plusSquare:this.$fontawesome("plus-square-o"),refresh:this.$fontawesome("refresh"),imgUrl:"http://api.mw006.net//v1/users/captcha",channel_code:"",limits:{name:{min:7,max:12},password:{min:6,max:12}},triggered:{email:!1,name:!1,password:!1,mobile:!1,confirmPassword:!1},registerForm:{name:"",email:"",password:"",confirmPassword:"",mobile:"",code:"",wechat:""},rules:{flag:!1},unique:{username:{message:""},email:{message:""},mobile:{message:""}},errors:{username:!1,email:!1,mobile:!1}}},computed:m()({},t.i(w.a)(["channelCode"]),{mobileErrorMessage:function(){return this.unique.mobile.message||"必须是数字和11个字符长"},emailErrorMessage:function(){return this.unique.email.message||"无效的电子邮件格式"},passwordErrorMessage:function(){return"密码长度不得小于"+this.limits.password.min+"个字符或大于"+this.limits.password.max+"个字符。"},confirmPasswordErrorMessage:function(){return this.isPasswordInLimit?this.isPasswordSame?"密码无效":"确认密码必须与密码相一致":this.passwordErrorMessage},nameErrorMessage:function(){return this.unique.username.message||"名称必须是"+this.limits.name.min+"-"+this.limits.name.max+"个字符长"},passwordPlaceholder:function(){return"确认密码(字数在"+this.limits.password.min+"~"+this.limits.password.max+"之间)"},confirmPasswordPlaceholder:function(){return"确认密码(字数在"+this.limits.password.min+"~"+this.limits.password.max+"之间)"},hasPassword:function(){return this.registerForm.password&&this.registerForm.confirmPassword},isPasswordInLimit:function(){return this.isInRange("password")},isPasswordSame:function(){return this.hasPassword&&this.registerForm.password===this.registerForm.confirmPassword},isPasswordValid:function(){return this.isPasswordSame&&this.isPasswordInLimit},isNameInLimit:function(){return this.registerForm.name&&this.isInRange("name")},validations:function(){var e=this;return["email","mobile"].reduce(function(n,r){return n[r]=t.i(p.d)(r,e.registerForm[r]),n},{})},isValid:function(){var e=this;return d()(this.validations).every(function(n){return e.validations[n]})&&this.isPasswordValid}}),mounted:function(){this.channel_code=this.channelCode},methods:{hasErrorMessage:function(e){var n=this;return l()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("ERROR",e,n.unique.username.message),t.abrupt("return",!!n.unique[e].message);case 2:case"end":return t.stop()}},t,n)}))()},isUnique:function(e){var n=this;return l()(i.a.mark(function t(){var r,a,s,o,l,c,d;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r="name"===e?"username":e,n.errors[r]=!1,n.unique[r].message="",t.prev=3,a=n.registerForm[e],t.next=7,n.api.checkUser(r,a).then(function(e){return e.data});case 7:s=t.sent,o=s.msg,l=s.message,t.next=23;break;case 12:if(t.prev=12,t.t0=t.catch(3),c=t.t0.response,console.log(c),!c){t.next=23;break}return n.errors[r]=!0,d=c.data.message,console.log(d),t.next=22,d;case 22:n.unique[r].message=t.sent;case 23:case"end":return t.stop()}},t,n,[[3,12]])}))()},isInRange:function(e){var n=this.registerForm[e].toString().length,t=this.limits[e],r=t.min,a=t.max;return n>=r&&n<=a},goBack:function(){window.history.go(-1)},login:function(){this.$router.push("/login")},refreshCode:function(){this.imgUrl="http://api.mw006.net//v1/users/captcha?rnd="+Math.random()},getPhoneCode:function(){var e=this;if(!this.registerForm.mobile)return void this.$toast({message:"手机号不能为空",position:"middle",duration:5e3});this.disabled=!0;var n=setInterval(function(){e.baseCount=e.baseCount-1,e.baseCount<=0&&(window.clearInterval(n),e.baseCount=60,e.disabled=!1)},1e3);this.api.mobileCaptcha({mobile:this.registerForm.mobile}).then(function(){e.$toast({message:"验证码已发送，请注意查收",position:"middle",duration:5e3})})},goRegister:function(){var e=this;return l()(i.a.mark(function n(){var t,r,s,o,l,c,d;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(""!==e.registerForm.name&&""!==e.registerForm.email){n.next=3;break}return e.$toast({message:"用户名或邮箱不能为空",position:"middle",duration:5e3}),n.abrupt("return");case 3:if(e.registerForm.mobile){n.next=6;break}return e.$toast({message:"手机号不能为空",position:"middle",duration:5e3}),n.abrupt("return");case 6:if(e.registerForm.code){n.next=9;break}return e.$toast({message:"手机验证码不能为空",position:"middle",duration:5e3}),n.abrupt("return");case 9:if(e.isNameInLimit){n.next=12;break}return e.$toast({message:"用户名字数不符合规则",position:"middle",duration:5e3}),n.abrupt("return");case 12:if(e.validations.email){n.next=15;break}return e.$toast({message:"邮箱格式不对",position:"middle",duration:5e3}),n.abrupt("return");case 15:if(e.validations.mobile){n.next=18;break}return e.$toast({message:"手机号格式不对",position:"middle",duration:5e3}),n.abrupt("return");case 18:if(e.isPasswordSame){n.next=21;break}return e.$toast({message:"密码不能为空且设置的两次密码必须一样",position:"middle",duration:5e3}),n.abrupt("return");case 21:if(e.isPasswordInLimit){n.next=24;break}return e.$toast({message:"密码字数不符合规则",position:"middle",duration:5e3}),n.abrupt("return");case 24:return t={email:e.registerForm.email.replace(/\s/g,""),password:e.registerForm.password.replace(/\s/g,""),username:e.registerForm.name.replace(/\s/g,""),channel_code:e.channel_code,mobile:e.registerForm.mobile.replace(/\s/g,""),code:e.registerForm.code.replace(/\s/g,""),wechat:e.registerForm.wechat.replace(/\s/g,"")},n.prev=25,n.next=28,e.api.registeredUser(t);case 28:return r=n.sent,s=r.data,s=void 0===s?{}:s,o=s.access_token,h.a.set("accessToken",o,{path:"/"}),n.next=35,e.api.getProfile();case 35:return l=n.sent,c=l.data,localStorage.setItem("user",a()(c)),n.next=40,e.$store.dispatch("setUserInfo",c);case 40:return e.$toast({message:"注册成功",position:"middle",duration:5e3}),d=c.unread_count,n.next=44,e.$store.dispatch("setMessageCount",d);case 44:localStorage.setItem("messageCount",d),e.$router.push("/"),localStorage.removeItem("channel_code"),n.next=53;break;case 49:n.prev=49,n.t0=n.catch(25),console.log(n.t0),e.refreshCode();case 53:case"end":return n.stop()}},n,e,[[25,49]])}))()}}}},537:function(e,n,t){n=e.exports=t(1)(),n.push([e.i,".bounce-enter-active[data-v-27560578] {\n  animation: bounce-in 0.5s;\n}\n\n.bounce-leave-active[data-v-27560578] {\n  animation: bounce-in 0.5s reverse;\n}\n\n@keyframes bounce-in {\n  0% {\n    transform: scale(0);\n  }\n\n  50% {\n    transform: scale(1.5);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n}\n\n.nirvana-input .input[data-v-27560578] {\n  width: 100%;\n  height: 1.2rem;\n  line-height: 1.2rem;\n  margin-bottom: 0.3rem;\n  padding: 0 0.133333rem;\n  border-radius: 0.1rem;\n  border: 0.032rem solid rgba(62, 174, 237, 0.2);\n  background-color: #0b0e31;\n  color: #ffffff;\n  font-weight: bold;\n  font-size: 0.373333rem;\n  line-height: 0.8rem;\n  padding-left: 0.3rem;\n}\n\n.nirvana-input .input[data-v-27560578]::-webkit-input-placeholder {\n  font-size: 0.373333rem;\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.nirvana-input .input[data-v-27560578]:-ms-input-placeholder {\n  font-size: 0.373333rem;\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.nirvana-input .input[data-v-27560578]::placeholder {\n  font-size: 0.373333rem;\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.nirvana-input .label[data-v-27560578] {\n  color: #fff !important;\n  font-weight: bold;\n  border-left: 0.08rem yellow solid;\n  padding-left: 0.266667rem;\n  margin-bottom: 0.213333rem;\n}\n\n.nirvana-input .message[data-v-27560578] {\n  text-align: center;\n  color: #cb202d;\n  padding-bottom: 0.266667rem;\n  font-weight: bold;\n}\n\n.nirvana-input.error .input[data-v-27560578] {\n  border: 0.032rem solid #cb202d !important;\n  position: relative;\n}",""])},559:function(e,n,t){n=e.exports=t(1)(),n.push([e.i,".text-red[data-v-52f8c394] {\n  color: #cb202d !important;\n}\n\n.text-center[data-v-52f8c394] {\n  text-align: center;\n}\n\n.alert-icon input[data-v-52f8c394] {\n  border: 0.032rem solid #cb202d !important;\n  position: relative;\n}\n\n.head[data-v-52f8c394] {\n  height: 1.2rem;\n  line-height: 1.2rem;\n  padding: 0 0.266667rem;\n  background-color: #0b0e31;\n  text-align: center;\n  color: #ffffff;\n  font-size: 0.426667rem;\n  font-weight: bold;\n  position: fixed;\n  width: 100%;\n  z-index: 30;\n}\n\n.head .fl[data-v-52f8c394],\n.head .fr[data-v-52f8c394] {\n  line-height: inherit;\n}\n\n.head .fl[data-v-52f8c394] {\n  font-size: 0.64rem;\n}\n\n.register[data-v-52f8c394] {\n  overflow: hidden;\n  background-color: #0b0e31;\n}\n\n.register .img[data-v-52f8c394] {\n  width: 5.36rem;\n  height: 1.893333rem;\n  margin: 0.266667rem auto;\n  margin-top: 1.866667rem;\n}\n\n.register .button[data-v-52f8c394] {\n  width: 100%;\n  margin: 0.3rem auto;\n  height: 1.2rem;\n  line-height: 1.2rem;\n  background-color: #fcd667;\n  color: #0b0e31;\n  text-align: center;\n  border-radius: 2rem;\n  font-size: 0.373333rem;\n  font-weight: bold;\n}\n\n.register .forgot[data-v-52f8c394] {\n  text-align: center;\n  color: #fcd667;\n  font-weight: bold;\n  font-size: 0.373333rem;\n}\n\n.register .sign[data-v-52f8c394] {\n  text-align: center;\n  color: #999999;\n}\n\n.register .sign .rule[data-v-52f8c394] {\n  color: #4990E2;\n}\n\n.register .sign span[data-v-52f8c394]:last-child {\n  color: #4990E2;\n  text-decoration: underline;\n}\n\n.register .sign span[data-v-52f8c394]:last-child {\n  padding-left: 0.08rem;\n  position: relative;\n  top: 0.032rem;\n}\n\n.register .main[data-v-52f8c394] {\n  margin: 0.3rem;\n  margin-top: 2rem;\n  padding: 0.5rem 0.3rem;\n  background-color: #122151;\n}\n\n.register .main input[data-v-52f8c394] {\n  width: 100%;\n  height: 1.2rem;\n  line-height: 1.2rem;\n  margin-bottom: 0.3rem;\n  padding: 0 0.133333rem;\n  border-radius: 0.1rem;\n  border: 0.032rem solid rgba(62, 174, 237, 0.2);\n  background-color: #0b0e31;\n  color: #ffffff;\n  font-weight: bold;\n  font-size: 0.373333rem;\n  line-height: 0.8rem;\n  padding-left: 0.3rem;\n}\n\n.register .main input[data-v-52f8c394]::-webkit-input-placeholder {\n  font-size: 0.373333rem;\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.register .main input[data-v-52f8c394]:-ms-input-placeholder {\n  font-size: 0.373333rem;\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.register .main input[data-v-52f8c394]::placeholder {\n  font-size: 0.373333rem;\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.register .main .phone-code input[data-v-52f8c394] {\n  width: 60%;\n}\n\n.register .main .phone-code button[data-v-52f8c394] {\n  margin-left: 0.3rem;\n  background-color: #fcd667;\n  padding: 0.25rem 0;\n  width: 3.1rem;\n  border: 0.032rem solid #F8E81C;\n  border-radius: 0.1rem;\n  font-size: 0.373333rem;\n  font-weight: bold;\n}\n\n.register .main .phone-code button[data-v-52f8c394]:disabled {\n  color: #333333;\n}\n\n.register .main .code[data-v-52f8c394] {\n  height: 0.032rem;\n  width: 100%;\n  background-color: #0b0e31;\n  display: block;\n  margin-bottom: 0.4rem;\n}\n\n.register .main .captcha-image[data-v-52f8c394] {\n  width: 5.333333rem;\n  height: 1.866667rem;\n  margin-bottom: 0.266667rem;\n  vertical-align: middle;\n}\n\n.register .main .fa[data-v-52f8c394] {\n  padding-right: 0.133333rem;\n}\n\n.register .main .code-change[data-v-52f8c394] {\n  vertical-align: middle;\n  padding-left: 0.533333rem;\n  cursor: pointer;\n  font-size: 0.4rem;\n  color: #407DC4;\n}",""])},578:function(e,n,t){n=e.exports=t(1)(),n.push([e.i,".rules[data-v-764006a1] {\n  margin: 0.3rem;\n  padding: 0.5rem 0.3rem;\n  background-color: #122151;\n  overflow: scroll;\n  position: fixed;\n  height: 100%;\n  z-index: 20;\n  top: 0;\n  right: 0;\n  left: 0;\n}\n\n.rules .block[data-v-764006a1] {\n  padding: 0.266667rem 0;\n  border-bottom: 0.032rem solid #0b0e31;\n}\n\n.rules .block .title[data-v-764006a1] {\n  font-size: 0.373333rem;\n  color: #ffffff;\n  font-weight: bold;\n  margin-top: 0.5rem;\n}\n\n.rules .block .info[data-v-764006a1] {\n  text-align: justify;\n  color: rgba(255, 255, 255, 0.5);\n  font-weight: bold;\n}\n\n.rules .block li[data-v-764006a1] {\n  color: #ffffff;\n  font-size: 0.373333rem;\n  font-weight: bold;\n}\n\n.pack-up[data-v-764006a1] {\n  background-color: rgba(255, 255, 255, 0.2);\n  position: fixed;\n  right: 0.3rem;\n  bottom: 0.3rem;\n  z-index: 30;\n  padding: 0.5rem;\n  border-radius: 1rem;\n  color: #fcd667;\n}\n\n.pack-up p[data-v-764006a1] {\n  text-align: center;\n  padding: 0;\n  margin: 0;\n}\n\n.pack-up p[data-v-764006a1]:first-child {\n  font-size: 0.64rem;\n}",""])},664:function(e,n,t){t(828);var r=t(5)(t(445),t(741),"data-v-764006a1",null);r.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Register/Rule.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] Rule.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},681:function(e,n,t){t(787);var r=t(5)(t(463),t(701),"data-v-27560578",null);r.options.__file="/Users/bryanpardo/Development/nirvana-frontend/src/components/Shared/NirvanaInput.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] NirvanaInput.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},701:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"nirvana-input",class:e.errorClasses},[e.label?t("div",{staticClass:"label"},[e._v(e._s(e.label))]):e._e(),e._v(" "),t("input",{staticClass:"input",attrs:{type:e.type,placeholder:e.placeholder},domProps:{value:e.value},on:{input:e.onInput,blur:e.onBlur}}),e._v(" "),t("transition",{attrs:{name:"bounce"}},[e.hasError?t("div",{staticClass:"message"},[e._v("\n      "+e._s(e.errorMessage)+"\n    ")]):e._e()])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},722:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"head"},[t("div",[t("span",{staticClass:"fa fl",on:{click:function(n){e.goBack()}}},[e._v(e._s(e.left))]),e._v(" "),t("span",[e._v("创建一个亚太账号")])])]),e._v(" "),t("div",{staticClass:"register"},[t("div",{staticClass:"main",attrs:{id:"scroll"}},[t("div",{staticClass:"fill-in",attrs:{id:"register"}},[t("nirvana-input",{attrs:{valid:e.isNameInLimit&&!e.errors.username,placeholder:"用户名(字数在7~12之间)",label:"名称","error-message":e.nameErrorMessage},on:{blur:function(n){e.isUnique("name")}},model:{value:e.registerForm.name,callback:function(n){e.registerForm.name=n},expression:"registerForm.name"}}),e._v(" "),t("nirvana-input",{attrs:{valid:e.validations.email&&!e.errors.email,type:"email",placeholder:"电子邮箱",label:"电子邮件","error-message":e.emailErrorMessage},on:{blur:function(n){e.isUnique("email")}},model:{value:e.registerForm.email,callback:function(n){e.registerForm.email=n},expression:"registerForm.email"}}),e._v(" "),t("nirvana-input",{attrs:{valid:e.isPasswordInLimit,type:"password",placeholder:e.passwordPlaceholder,label:"密码","error-message":e.passwordErrorMessage},model:{value:e.registerForm.password,callback:function(n){e.registerForm.password=n},expression:"registerForm.password"}}),e._v(" "),t("nirvana-input",{attrs:{valid:e.isPasswordSame&&e.isPasswordInLimit,type:"password",placeholder:e.confirmPasswordPlaceholder,label:"确认密码","error-message":e.confirmPasswordErrorMessage},model:{value:e.registerForm.confirmPassword,callback:function(n){e.registerForm.confirmPassword=n},expression:"registerForm.confirmPassword"}}),e._v(" "),t("nirvana-input",{attrs:{valid:e.validations.mobile&&!e.errors.mobile,placeholder:"常用手机号",label:"手机号码","error-message":e.mobileErrorMessage},on:{blur:function(n){e.isUnique("mobile")}},model:{value:e.registerForm.mobile,callback:function(n){e.registerForm.mobile=n},expression:"registerForm.mobile"}}),e._v(" "),t("div",{staticClass:"phone-code"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.code,expression:"registerForm.code"}],staticClass:"dl",attrs:{type:"text",placeholder:"手机验证码"},domProps:{value:e.registerForm.code},on:{input:function(n){n.target.composing||(e.registerForm.code=n.target.value)}}}),t("button",{staticClass:"dl",attrs:{disabled:e.disabled},on:{click:function(n){e.getPhoneCode()}}},[e.disabled?t("span",[e._v("剩余"+e._s(e.baseCount)+" 秒")]):t("span",[e._v("获取验证码")])])]),e._v(" "),t("span",{staticClass:"code"}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.wechat,expression:"registerForm.wechat"}],attrs:{type:"text",placeholder:"微信号（可获得更多优惠信息，建议填写。）"},domProps:{value:e.registerForm.wechat},on:{input:function(n){n.target.composing||(e.registerForm.wechat=n.target.value)}}}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.channel_code,expression:"channel_code"}],attrs:{type:"text",placeholder:"邀请码（可不填。）",disabled:!!e.channelCode},domProps:{value:e.channel_code},on:{input:function(n){n.target.composing||(e.channel_code=n.target.value)}}})],1),e._v(" "),t("div",[t("p",{staticClass:"sign",on:{click:function(n){e.rules.flag=!0}}},[t("span",[e._v("提交注册即视为已阅读并同意")]),t("span",{staticClass:"rule"},[e._v("《亚太娱乐服务与隐私协议》")])]),e._v(" "),t("p",{staticClass:"button",on:{click:function(n){e.goRegister()}}},[e._v("提交注册信息")]),e._v(" "),t("p",{staticClass:"forgot",on:{click:function(n){e.login()}}},[e._v("已拥有亚太账号？返回登录。")])])]),e._v(" "),e.rules.flag?t("rule",{attrs:{rules:e.rules}}):e._e()],1)])},staticRenderFns:[]},e.exports.render._withStripped=!0},741:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[e.rules&&e.rules.flag?t("div",{staticClass:"rules"},[e._m(0)]):e._e(),e._v(" "),e.rules&&e.rules.flag?t("div",{staticClass:"pack-up",on:{click:function(n){e.rules.flag=!1}}},[t("p",{staticClass:"fa"},[e._v(e._s(e.close))])]):e._e()])},staticRenderFns:[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"scroll"},[t("div",{staticClass:"block"},[t("div",{staticClass:"content"},[t("p",{staticClass:"title"},[e._v("账户条例")]),e._v(" "),t("p",{staticClass:"info"},[e._v("用户声明并承诺，用户在注册开户时所提供的资料，包括用户姓名、电邮地址、电话号码及ip地址，均真实、准确、完整。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("用户必须符合法定年龄（用户其居住地区的法律年龄限制），在不违反的情况下方可使用本网站的服务。用户如违法当地法律问题，本公司将不承担因客户违反当地博彩法律所引致之任何责任。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("用户所拥有的账户姓名必须与以下的身份证明一致:")]),e._v(" "),t("ul",[t("li",[e._v("身份证上的姓名")]),e._v(" "),t("li",[e._v("银行账户的姓名")])]),e._v(" "),t("p",{staticClass:"info"},[e._v("用户拥有超过一个账户，包括同一姓名，同一邮件地址，同一家庭，同一住址，同一借记卡/信用卡，同一银行账户，同一电脑（大学，团体，网吧，图书馆，办公室等），被视为联合账户或可疑账户，本网站有权在不通知的情况下冻结或关闭相关账户，并不退还款项。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("所有账户只限持有者一人使用，用户有责任确保用户的账户及密码隐私安全，如用户有意/无意透露或泄露账户资料导致被盗，或第三方以任何形式获得用户的账户及密码及进行游戏导致用户账户损失，所有损失及责任需由用户全部承担。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("所有账户若出现资金有误，用户有义务通知本网站作账户调整及不可使用相关错误金额，任何情况下，相关错误金额被视为无效金额，若用户使用该笔金额进行投注，所有投注被视为无效，一律取消并返还於本网站。")])])]),e._v(" "),t("div",{staticClass:"block"},[t("div",{staticClass:"content"},[t("p",{staticClass:"title"},[e._v("提款条例")]),e._v(" "),t("p",{staticClass:"info"},[e._v("所有提款申请必须符合本网站的提款政策，如存款未达到全额投注，即无法通过提款审核，提款申请将会被驳回。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("若有需要，用户必须提供个人资料如身份证副本、驾驶执照副本、银行交易记录截图、居民户口簿副本等资料。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("用户被严禁使用他人或第三者银行账户或银行卡进行取款业务。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("严禁客户用非真实ip地址登录游戏(vpn,远程主机等)\u2028。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("在没有申请优惠的情况下，提款需要存款的一倍流水。")])])]),e._v(" "),t("div",{staticClass:"block"},[t("div",{staticClass:"content"},[t("p",{staticClass:"title"},[e._v("存款条例")]),e._v(" "),t("p",{staticClass:"info"},[e._v("通过网银自助存款方式的会员，如果忘记填写附言，请及时联系在线客服。特别说明如果出现存款人姓名与游戏账户姓名不一致的情况，请配合提供网银电子回单，以便财务人员进行补单。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("通过第三方支付进行存款的会员，如果出现掉单的情况，请及时联系在线客服，并提供订单号，存款金额，存款时间，以便我们尽快为您补单。")])])]),e._v(" "),t("div",{staticClass:"block"},[t("div",{staticClass:"content"},[t("p",{staticClass:"title"},[e._v("优惠条例")]),e._v(" "),t("p",{staticClass:"info"},[e._v("若要获得本网站所有的优惠红利或回赠，用户必须符合所有条例及附加条款，方可享有相关优惠。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("用户涉及个人或团体以不正当的手法如下述，进行骗取或诈骗相关优惠奖金，本网站有权在不通知的情况下冻结或关闭相关账户，并不退还款项，用户将会被列入黑名单，并保留追究权利。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("用户拥有超过一个账户，包括同一姓名、同一邮件地址、同一住址、同一借记卡/信用卡、同一银行账户、同一电脑（大学，团体，网吧，图书馆，办公室等），被视为联合账户或可疑账户。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("亚太娱乐有权根据会员情况调整会员投注限额。")]),e._v(" "),t("p",{staticClass:"info"},[e._v("亚太线上娱乐拥有对优惠活动的最终解释及修改权。")])])])])}]},e.exports.render._withStripped=!0},787:function(e,n,t){var r=t(537);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t(2)("2cbef420",r,!1)},809:function(e,n,t){var r=t(559);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t(2)("53a19118",r,!1)},828:function(e,n,t){var r=t(578);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t(2)("2caaeab4",r,!1)}});