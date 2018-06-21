<template>

  <q-page padding>
    <pre>{{students}}</pre>
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "PageClassmates",
    computed: {
      ...mapGetters("student", ["students"])
    },
    watch: {
      $route: {
        async handler(val) {
          await this.getStudents();
        },
        immediate: true
      }
    },
    methods: {
      ...mapActions("student", ["getStudents"])
    }
  };
</script>

<style>

</style>
