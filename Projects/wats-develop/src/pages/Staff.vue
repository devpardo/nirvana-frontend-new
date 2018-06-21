<template>

  <q-page padding>
    <pre>
      {{staff}}
    </pre>
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "PageStaff",
    computed: {
      ...mapGetters("staff", ["staff"])
    },
    watch: {
      $route: {
        async handler(val) {
          await this.getStaff();
        },
        immediate: true
      }
    },
    methods: {
      ...mapActions("staff", ["getStaff"])
    }
  };
</script>

<style>

</style>
