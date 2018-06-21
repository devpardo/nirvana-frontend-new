<template>
  
  <q-page padding>
      <q-tabs class="custom-tab" color="secondary" glossy>
      <q-tab default slot="title" name="overview" label="Overview"  />
      <q-tab slot="title" name="attendance" label="Attendance"  />
      <q-tab-pane name="overview">
        <div class="row gutter-md">
          <div class="col-sm-6 col-xs-12">
            <assignments :assignments="assignments" />
            <q-btn glossy color="secondary" @click="previousAssignmentsDate" class="custom-btn pull-left">
              <div class="date">Yesterday </div>
              <div>
                {{ assignmentsDatePrevious | date("MMMM DD, YYYY") }}
              </div>
            </q-btn>
            <q-btn glossy color="secondary" @click="nextAssignmentsDate"  class="custom-btn pull-right"> 
              <div>
                {{ assignmentsDateNext | date("dddd") }}
              </div>
              <div>
                {{ assignmentsDateNext | date("MMMM DD, YYYY") }}
              </div>
            </q-btn>
          </div>
          <div class="col-sm-6 col-xs-12">
            <schedules :schedules="schedules" />
            <q-btn  glossy color="secondary" @click="previousAssignmentsDate" class="custom-btn pull-left">
              <div class="date">Yesterday </div>
              <div>
                {{ assignmentsDatePrevious | date("MMMM DD, YYYY") }}
              </div>
            </q-btn>
            <q-btn glossy color="secondary" @click="nextAssignmentsDate"  class="custom-btn pull-right">
              <div>
                {{ assignmentsDateNext | date("dddd") }}
              </div>
              <div>
                {{ assignmentsDateNext | date("MMMM DD, YYYY") }}
              </div>
            </q-btn>
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="attendace">
        <div class="row gutter-md">
          <div class="col-xs-12">
          </div>
        </div>
      </q-tab-pane>
    </q-tabs>
    <div class="row gutter-md">
      <div class="col-xs-6">
        <q-list class="custom-list for-calendar" multiline highlight separator>
          <q-list-header class="custom-header primary glossy">CALENDAR</q-list-header>
            <q-item >
              <q-item-main>
                <q-item-tile label> 
                  <calendar/> 
                </q-item-tile>
              </q-item-main>
            </q-item>
        </q-list>
      </div>
    </div>
    
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapActions, mapGetters } from "vuex";
import Assignments from "src/components/Assignments";
import Calendar from "src/components/Calendar";
import Schedules from "src/components/Schedules";
export default {
  name: "PageOverview",
  components: {
    Assignments,
    Schedules,
    Calendar
  },
  data() {
    return {
      date: {
        assignments: new Date()
      }
    };
  },
  computed: {
    ...mapGetters("assignment", ["assignments"]),
    ...mapGetters("schedule", ["schedules"]),
    assignmentsDatePrevious() {
      return date.subtractFromDate(this.date.assignments, {
        days: 1
      });
    },
    assignmentsDateNext() {
      return date.addToDate(this.date.assignments, {
        days: 1
      });
    }
  },
  watch: {
    $route: {
      async handler(val) {
        await Promise.all([
          this.getAssignmentsToday(),
          this.getSchedulesToday()
        ]);
      },
      immediate: true
    },
    ["date.assignments"]: {
      async handler(val) {
        await this.getAssignmentsByDate({
          date: val
        });
      }
    }
  },
  methods: {
    ...mapActions("assignment", [
      "getAssignmentsToday",
      "getAssignmentsByDate"
    ]),
    ...mapActions("schedule", ["getSchedulesToday", "getSchedulesByDate"]),
    async previousAssignmentsDate() {
      this.date.assignments = this.assignmentsDatePrevious;
    },
    nextAssignmentsDate() {
      this.date.assignments = this.assignmentsDateNext;
    }
  }
};
</script>

<style>

</style>
