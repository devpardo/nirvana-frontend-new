export const SET_SUBJECT_ASSIGNMENTS = (state, payload) => {
  state.assignments = payload;
};
export const SET_SUBJECT_TESTS = (state, payload) => {
  state.tests = payload;
};
export const SET_SUBJECT_ACTIVITIES = (state, payload) => {
  state.activities = payload;
};
export const SET_SUBJECT_HANDOUTS = (state, payload) => {
  state.handouts = payload;
};

export const SET_LOADER = (state, payload) => {
  state.loader += payload;
};
