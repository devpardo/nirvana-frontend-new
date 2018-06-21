export const getTest = async function({ commit, rootGetters }, payload = {}) {
  const { id = rootGetters.params.id } = payload;
  const { data } = await this.axios({
    method: "get",
    url: `/test/${id}`
  });
  commit("SET_TEST", data);
};
