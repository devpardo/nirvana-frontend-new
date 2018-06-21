<template>
  <q-list class="custom-list" multiline highlight separator>
    <q-list-header class="custom-header default glossy">ASSIGNMENTS
      <div class="pull-right dtpicker">
        <q-btn glossy size="sm" icon="date_range" color="secondary" round>
          <q-popover>
            <q-datetime-picker v-model="date" type="date" />
          </q-popover>
        </q-btn>
      </div>
    </q-list-header>
    <template v-for="(assignment,index) of assignments">
      <q-item :key="index">
        <q-item-main>
          <q-item-tile label class="desc"> {{assignment.description}} </q-item-tile>
          <q-item-tile class="subject" sublabel> Subject: {{assignment.subject}} </q-item-tile>
          <q-item-tile sublabel> Teacher: {{assignment.tcher_title}} {{assignment.tchr_fname}} {{assignment.tchr_lname}} </q-item-tile>
          <q-item-tile sublabel> Publish Date: {{assignment.pubdate}} </q-item-tile>
        </q-item-main>
      </q-item>
    </template>
  </q-list>

  <!-- <list-view :items="assignments" label="Assignments">
    <template slot="label" slot-scope="{ item }">
      {{item.description}}
    </template>
    <template slot="sublabel-first" slot-scope="{ item }">
      {{item.tcher_title}} {{item.tchr_fname}} {{item.tchr_lname}}
    </template>
    <template slot="sublabel-last" slot-scope="{ item }">
      {{item.pubdate}}
    </template>
  </list-view> -->
</template>

<script>
  import ListView from "src/components/ListView";
  export default {
    name: "ComponentAssignments",
    components: {
      ListView
    },
    props: {
      assignments: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        date: new Date()
      };
    }
  };
</script>

<style lang="stylus" scoped>
  .desc
    font-size: 14px
    cursor: pointer

  .subject
    text-transform: capitalize

  .dtpicker
    margin: 0 10px
</style>
