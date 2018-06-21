import { date as dateFormatter } from "quasar";

export const getSchedulesToday = async function({ commit }, payload = {}) {
  const { grade = 4, section = "J" } = payload;
  const { data } = await this.axios({
    method: "get",
    url: `/sched/${grade}-${section}`
  });
  commit("SET_SCHEDULES", data);
};

export const getSchedulesByDate = async function(
  { commit, getters },
  payload = {}
) {
  const { date = new Date(), grade = 4, section = "J" } = payload;
  const formattedDate = dateFormatter.formatDate(date, "YYYY-MM-DD");
  const { data } = await this.axios({
    method: "get",
    url: `/sched/${grade}-${section}/${formattedDate}`
  });
  commit("SET_SCHEDULES", data);
};
