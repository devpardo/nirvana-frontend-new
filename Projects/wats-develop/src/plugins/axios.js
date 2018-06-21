import axios from "axios";

export default ({ Vue, store }) => {
  axios.defaults.baseURL = `${window.location.protocol}//stpcentral.net`;
  Vue.prototype.$axios = axios;
  store.axios = axios;
};
