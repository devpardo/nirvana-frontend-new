<template>

  <q-page padding>
    <q-search v-model="search" />
    <teachers :teachers="searchedTeachers" />
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import Teachers from "src/components/Teachers";
  export default {
    name: "PageTeachers",
    components: {
      Teachers
    },
    data() {
      return {
        search: ""
      };
    },
    computed: {
      ...mapGetters("teacher", ["teachers"]),
      searchedTeachers() {
        const fields = ["firstname", "lastname"];
        const regexSearch = new RegExp(this.search, "i");
        return this.search && this.teachers && this.teachers.length
          ? this.teachers.filter(teacher =>
              fields.some(field => regexSearch.test(teacher[field]))
            )
          : this.teachers;
      }
    },
    watch: {
      $route: {
        async handler(val) {
          await this.getTeachers();
        },
        immediate: true
      }
    },
    methods: {
      ...mapActions("teacher", ["getTeachers"])
    }
  };
</script>

<style>

</style>
