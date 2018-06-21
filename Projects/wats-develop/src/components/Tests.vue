<template>
  <!-- <q-list multiline highlight separator>
    <q-list-header>Tests</q-list-header>
    <template v-for="(test,index) of tests">
      <q-item :key="index" :to="{ name: 'test', params: { id: test.id } }">
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
  </q-list> -->
  <list-view :items="tests" label="Tests" @select="onSelectTest">
    <template slot="label" slot-scope="{ item }">
      {{item.title}}
    </template>
    <template slot="sublabel-first" slot-scope="{ item }">
      Period: {{item.period}}
    </template>
    <template slot="sublabel-last" slot-scope="{ item }">
      Publish Date: {{item.date}}
    </template>
  </list-view>
</template>

<script>
  import ListView from "src/components/ListView";
  export default {
    name: "ComponentTests",
    components: {
      ListView
    },
    props: {
      tests: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      onSelectTest(event) {
        this.$router.push({ name: "test", params: { id: event.id } });
      }
    }
  };
</script>

<style>

</style>
