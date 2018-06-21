import { date as dateFormatter } from "quasar";
export const getAssignmentsToday = async function({ commit }, payload = {}) {
  const { grade = 4, section = "J" } = payload;
  const { data } = await this.axios({
    method: "get",
    url: `/assignments/${grade}-${section}`
  });
  commit("SET_ASSIGNMENTS", data);
};

export const getAssignmentsByDate = async function(
  { commit, getters },
  payload = {}
) {
  const { date = new Date(), grade = 4, section = "J" } = payload;
  const formattedDate = dateFormatter.formatDate(date, "YYYY-MM-DD");
  const { data } = await this.axios({
    method: "get",
    url: `/assignments/${grade}-${section}/${formattedDate}`
  });
  commit("SET_ASSIGNMENTS", data);
};
