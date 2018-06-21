export const getTeachers = async function({ commit }, payload = {}) {
  const { grade = 4, section = "J" } = payload;

  const { data } = await this.axios({
    method: "get",
    url: `/teachers/${grade}-${section}`
  });

  commit("SET_TEACHERS", data);
  return data;
};
export const getTeacher = async function(
  { commit, rootGetters },
  payload = {}
) {
  const { id = rootGetters.params.id } = payload;

  const { data } = await this.axios({
    method: "get",
    url: `/tprofile/${id}`
  });

  commit("SET_TEACHER", data);
  return data;
};
