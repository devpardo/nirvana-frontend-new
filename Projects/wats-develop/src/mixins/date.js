import { date } from "quasar";

export const generate = key => ({
  data() {
    return {
      [`date${key}`]: new Date()
    };
  },
  computed: {
    [`previousDate${key}`]() {
      return date.subtractFromDate(this[`date${key}`], {
        days: 1
      });
    },
    [`nextDate${key}`]() {
      return date.addToDate(this[`date${key}`], {
        days: 1
      });
    }
  },
  watch: {
    async [`date${key}`](val) {
      await this.getAssignmentsByDate({
        date: val
      });
    }
  },
  methods: {
    async [`previous${key}`]() {
      this[`date${key}`] = this[`previousDate${key}`];
    },
    async [`next${key}`]() {
      this[`date${key}`] = this[`previousDate${key}`];
    }
  }
});

export default {
  data() {
    return {
      date: new Date()
    };
  },
  computed: {
    previousDate() {
      return date.subtractFromDate(this.date, {
        days: 1
      });
    },
    nextDate() {
      return date.addToDate(this.date, {
        days: 1
      });
    }
  },
  watch: {
    async date(val) {
      await this.getAssignmentsByDate({
        date: val
      });
    }
  },
  methods: {
    async previous() {
      this.date = this.previousDate;
    },
    async next() {
      this.date = this.nextDate;
    }
  }
};
