<template>

  <q-page padding>
    <pre>{{teacher}}</pre>
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "PageTeacher",
    computed: {
      ...mapGetters("teacher", ["teacher"])
    },
    watch: {
      $route: {
        async handler(val) {
          await this.getTeacher();
        }
      }
    },
    methods: {
      ...mapActions("teacher", ["getTeacher"])
    }
  };
</script>

<style>

</style>
