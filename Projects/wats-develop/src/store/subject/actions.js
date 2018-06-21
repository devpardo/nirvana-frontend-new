export const getSubjectAssignments = async function(
  { commit, rootGetters },
  payload = {}
) {
  const { subject = rootGetters.params.id, grade = 4, section = "J" } = payload;
  commit("SET_LOADER", 1);
  const { data } = await this.axios({
    method: "get",
    url: `/assignments/subject/${subject.replace(" ", "_")}/${grade}-${section}`
  });

  commit("SET_SUBJECT_ASSIGNMENTS", data);
  commit("SET_LOADER", -1);
};
export const getSubjectTests = async function(
  { commit, rootGetters },
  payload = {}
) {
  const { subject = rootGetters.params.id, grade = 4, section = "J" } = payload;
  commit("SET_LOADER", 1);
  const { data } = await this.axios({
    method: "get",
    url: `/tests/${subject.replace(" ", "_")}/${grade}-${section}`
  });

  commit("SET_SUBJECT_TESTS", data);
  commit("SET_LOADER", -1);
};
export const getSubjectActivities = async function(
  { commit, rootGetters },
  payload = {}
) {
  const { subject = rootGetters.params.id, grade = 4, section = "J" } = payload;
  commit("SET_LOADER", 1);
  const { data } = await this.axios({
    method: "get",
    url: `/activitysheets/${subject.replace(" ", "_")}/${grade}-${section}`
  });

  commit("SET_SUBJECT_ACTIVITIES", data);
  commit("SET_LOADER", -1);
};
export const getSubjectHandouts = async function(
  { commit, rootGetters },
  payload = {}
) {
  const { subject = rootGetters.params.id, grade = 4, section = "J" } = payload;
  commit("SET_LOADER", 1);
  // const { data } = await axios({
  //   method: "get",
  //   url: `/activitysheets/${subject.replace(" ", "_")}/${grade}-${section}`
  // });
  const data = [];
  commit("SET_SUBJECT_HANDOUTS", data);
  commit("SET_LOADER", -1);
};
