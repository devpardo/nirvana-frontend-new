export const getStudents = async function({ commit }, payload = {}) {
  const { grade = 4, section = "J" } = payload;

  const { data } = await this.axios({
    method: "get",
    url: `/students/${grade}-${section}`
  });
  const { students } = data;
  commit("SET_STUDENTS", students);
  return data;
};
export const getStudent = async function(
  { commit, rootGetters },
  payload = {}
) {
  const { id = rootGetters.student ? rootGetters.student.id : -1 } = payload;

  const { data } = await this.axios({
    method: "get",
    url: `/sprofile/${id}`
  });

  commit("SET_STUDENT", data);
  return data;
};
