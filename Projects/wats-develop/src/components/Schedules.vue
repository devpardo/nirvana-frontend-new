<template>
  <q-list class="custom-list" multiline highlight separator>
    <q-list-header class="custom-header default glossy">SCHEDULES
      <div class="pull-right dtpicker">
        <q-btn glossy size="sm" icon="date_range" color="secondary" round>
          <q-popover>
           <q-datetime-picker v-model="date" type="date" />
          </q-popover>
        </q-btn>
      </div>
    </q-list-header> <template v-for="(schedule,index) of schedules">
      <q-item :key="index">
        <q-item-main>
          <q-item-tile label> Time:</q-item-tile>
          <q-item-tile sublabel> Subject: </q-item-tile>
          <q-item-tile sublabel> Teacher:  </q-item-tile>
        </q-item-main>
      </q-item>
    </template>
  </q-list>
</template>

<script>
export default {
  name: "ComponentSchedules",
  props: {
    schedules: {
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
.dtpicker {
  margin: 0 10px;
}
</style>

