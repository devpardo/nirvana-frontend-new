<template>
  <!-- <q-list multiline highlight separator>
    <q-list-header>Teachers</q-list-header>
    <template v-for="(teacher,index) of teachers">
      <q-item :key="index" :to="{ name: 'test', params: { id: teacher.id } }">
        <q-item-main>
          <q-item-tile label> {{teacher.title}} {{teacher.firstname}} {{teacher.lastname}} </q-item-tile>
          <q-item-tile sublabel> Subject: {{teacher.subj}} </q-item-tile>
          <q-item-tile sublabel> Email: {{teacher.t_email}} </q-item-tile>
        </q-item-main>
      </q-item>
    </template>
  </q-list> -->
  <list-view :items="teachers" label="Teachers">
    <template slot="label" slot-scope="{ item }">
      {{item.title}} {{item.firstname}} {{item.lastname}}
    </template>
    <template slot="sublabel-first" slot-scope="{ item }">
      {{item.subj}}
    </template>
    <template slot="sublabel-last" slot-scope="{ item }">
      {{item.t_email}}
    </template>
  </list-view>
</template>

<script>
  import ListView from "src/components/ListView";
  export default {
    name: "ComponentTeachers",
    components: {
      ListView
    },
    props: {
      teachers: {
        type: Array,
        default: () => []
      }
    }
  };
</script>

<style>

</style>
