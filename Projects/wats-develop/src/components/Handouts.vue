<template>
  <q-list multiline highlight separator>
    <q-list-header>Tests</q-list-header>
    <template v-for="(test,index) of tests">
      <q-item :key="index">
        <q-item-main>
          <q-item-tile label> {{test.title}} </q-item-tile>
          <q-item-tile sublabel> Period: {{test.period}} </q-item-tile>
          <q-item-tile sublabel> Publish Date: {{test.date}} </q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile>Score: 0</q-item-tile>
        </q-item-side>
      </q-item>
    </template>
  </q-list>
</template>

<script>
  export default {
    name: "ComponentTests",
    props: {
      tests: {
        type: Array,
        default: () => []
      }
    }
  };
</script>

<style>

</style>
