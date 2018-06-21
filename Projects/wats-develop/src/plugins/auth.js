export default ({ app, store, router, Vue }) => {
  router.beforeEach(async (to, from, next) => {
    if (!store.getters.auth) {
      await store.dispatch("getAuth");
    }
    if (!store.getters.auth && to.name !== "login") {
      next({
        name: "login",
        query: {
          redirect: to.fullPath
        }
      });
    } else if (store.getters.auth && to.name === "login") {
      next({
        name: "overview"
      });
    } else {
      next();
    }
  });
};
