import Vue from "vue"
import FontAwesome from "fontawesome"
import { Header, Field, Button, Tabbar, TabItem, TabContainer,
  TabContainerItem, Toast, Cell, Swipe, SwipeItem, Navbar, Picker, Progress, Search, MessageBox, Radio, Actionsheet, Lazyload, InfiniteScroll, Spinner, CellSwipe, Loadmore } from "mint-ui"

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Navbar.name, Navbar)
Vue.component(Picker.name, Picker)
Vue.component(Progress.name, Progress)
Vue.component(Search.name, Search)
Vue.component(Radio.name, Radio)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Spinner.name, Spinner)
Vue.component(CellSwipe.name, CellSwipe)
Vue.component(Loadmore.name, Loadmore)
Vue.use(InfiniteScroll)
Vue.use(Lazyload)

Vue.prototype.$toast = Toast
Vue.prototype.$messagebox = MessageBox
Vue.prototype.$fontawesome = FontAwesome
