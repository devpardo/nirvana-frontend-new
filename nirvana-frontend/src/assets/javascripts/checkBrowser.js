export const getUserAgent = () => {
  var u = navigator.userAgent,
    app = navigator.appVersion
  return { // 绉诲姩缁堢娴忚鍣ㄧ増鏈俊鎭�
    trident: u.indexOf("Trident") > -1, // IE鍐呮牳
    presto: u.indexOf("Presto") > -1, // opera鍐呮牳
    webKit: u.indexOf("AppleWebKit") > -1, // 鑻规灉銆佽胺姝屽唴鏍�
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, // 鐏嫄鍐呮牳
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 鏄惁涓虹Щ鍔ㄧ粓绔�
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios缁堢
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, // android缁堢鎴栬€卽c娴忚鍣�
    iPhone: u.indexOf("iPhone") > -1, // 鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
    iPad: u.indexOf("iPad") > -1, // 鏄惁iPad
    webApp: u.indexOf("Safari") == -1, // 鏄惁web搴旇绋嬪簭锛屾病鏈夊ご閮ㄤ笌搴曢儴
    isBaiduApp: u.toLowerCase().indexOf("baiduboxapp") != -1 // 鏄惁鎵嬫満鐧惧害
  }
}
// var browser = {
//   versions: function() {
//       var u = navigator.userAgent,
//           app = navigator.appVersion;
//       return { //绉诲姩缁堢娴忚鍣ㄧ増鏈俊鎭�
//           trident: u.indexOf('Trident') > -1, //IE鍐呮牳
//           presto: u.indexOf('Presto') > -1, //opera鍐呮牳
//           webKit: u.indexOf('AppleWebKit') > -1, //鑻规灉銆佽胺姝屽唴鏍�
//           gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //鐏嫄鍐呮牳
//           mobile: !!u.match(/AppleWebKit.*Mobile.*/), //鏄惁涓虹Щ鍔ㄧ粓绔�
//           ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios缁堢
//           android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android缁堢鎴栬€卽c娴忚鍣�
//           iPhone: u.indexOf('iPhone') > -1, //鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
//           iPad: u.indexOf('iPad') > -1, //鏄惁iPad
//           webApp: u.indexOf('Safari') == -1, //鏄惁web搴旇绋嬪簭锛屾病鏈夊ご閮ㄤ笌搴曢儴
//           isBaiduApp: u.toLowerCase().indexOf("baiduboxapp") != -1 //鏄惁鎵嬫満鐧惧害
//       };
//   }(),
//   language: (navigator.browserLanguage || navigator.language).toLowerCase()
// }
// if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
//   browser.versions.iPhone || browser.versions.iPad) {
// } else {
//   window.location.href = "http://www.baidu.com";
// }
// if (browser.versions.isBaiduApp) {
//   if (browser.versions.iPhone) {
//       location.href = JUMP_URL;
//   }
// };
