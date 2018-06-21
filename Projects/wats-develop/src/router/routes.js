export default [
  {
    path: "/",
    component: () => import("layouts/default"),
    children: [
      {
        path: "",
        component: () => import("pages/Index"),
        name: "index",
        redirect: {
          name: "login"
        }
      },
      { path: "/login", component: () => import("pages/Login"), name: "login" }
    ]
  },
  {
    path: "/overview",
    component: () => import("layouts/auth"),
    children: [
      {
        path: "",
        component: () => import("pages/Overview"),
        name: "overview"
      },
      // {
      //   path: "/subjects",
      //   component: () => import("pages/Subjects"),
      //   name: "subjects"
      // },
      {
        path: "/subjects/:id",
        component: () => import("pages/Subject"),
        name: "subject",
        props: true
      },
      {
        path: "/assignments",
        component: () => import("pages/Assignments"),
        name: "assignments"
      },
      {
        path: "/assignments/:id",
        component: () => import("pages/Assignment"),
        name: "assignment",
        props: true
      },
      {
        path: "/tests",
        component: () => import("pages/Tests"),
        name: "tests"
      },
      {
        path: "/tests/:id",
        component: () => import("pages/Test"),
        name: "test",
        props: true
      },
      {
        path: "/teachers",
        component: () => import("pages/Teachers"),
        name: "teachers"
      },
      {
        path: "/teachers/:id",
        component: () => import("pages/Teacher"),
        name: "teacher",
        props: true
      },
      {
        path: "/classmates",
        component: () => import("pages/Classmates"),
        name: "classmates"
      },
      {
        path: "/staff",
        component: () => import("pages/Staff"),
        name: "staff"
      }
    ]
  },

  {
    // Always leave this as last one
    path: "*",
    component: () => import("pages/404")
  }
];
