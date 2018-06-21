export const getStaff = async function({ commit }) {
  commit("SET_STAFF", [
    {
      name: "Gino"
    },
    {
      name: "Neneth"
    }
  ]);
};
