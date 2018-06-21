import Vue from "vue";
import Vuex from "vuex";
import { encodeToken, decodeToken } from "src/utils";
import student from "./student";
import teacher from "./teacher";
import parent from "./parent";
import admin from "./admin";
import subject from "./subject";
import assignment from "./assignment";
import test from "./test";
import schedule from "./schedule";
import activity from "./activity";
import staff from "./staff";

Vue.use(Vuex);

const state = () => ({
  auth: null,
  student: null
});

const getters = {
  auth: state => state.auth,
  student: state => state.student,
  route: state => state.route,
  params: (state, getters) => getters.route.params
};

const mutations = {
  SET_AUTH: (state, payload) => {
    state.auth = payload;
  },
  SET_STUDENT: (state, payload) => {
    state.student = payload;
  }
};

const actions = {
  async login({ commit, dispatch }, payload = {}) {
    if (!payload) throw new Error("Fields empty");
    const { username: user, password: pass } = payload;
    const { data: [data] } = await this.axios({
      method: "post",
      url: "/userinfo",
      data: {
        user,
        pass
      }
    });
    if (!data) throw new Error("Invalid Login");
    data.image =
      "https://scontent.fmnl8-1.fna.fbcdn.net/v/t31.0-8/477597_10150879126872986_1945926737_o.jpg?_nc_cat=0&_nc_eui2=v1%3AAeE6SdO05Zo-_Av66gDsLqa4Dp_36iyZxVaUejHfE10PICuXB2pUCrHBEoKwN0v2WRGPMi_cWMzU4DBkW1V1ge1H4iVywTfpa8tiq4pZorZdjA&oh=00eaccbace2a2ef08bfe6e88febdb9c0&oe=5B448285";
    const token = await encodeToken({
      salt: data.id,
      data
    });
    sessionStorage.setItem("token", token);
    commit("SET_AUTH", data);
    this.router.push({ name: "overview" });
  },
  async getAuth({ commit }) {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    const data = await decodeToken(token);
    commit("SET_AUTH", data);
  },

  async logout({ commit }) {
    sessionStorage.removeItem("token");
    commit("SET_AUTH", null);
    this.router.push({ name: "login" });
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    student,
    teacher,
    parent,
    admin,
    subject,
    assignment,
    test,
    activity,
    schedule,
    staff
  }
});

export default store;
