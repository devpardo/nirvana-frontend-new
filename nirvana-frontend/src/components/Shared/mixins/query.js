export default {
  data () {
    return {
      q: {}
    }
  },
  watch: {
    "$route": ["fillData"]
  },
  methods: {
    fillData () {
      let q = {
        page: 1,
        per_page: 10
      }
      // full data from url query, if admin just refresh page, can not load q_xxx keys.
      for (let key in this.$route.query) {
        if (key.startsWith("q_")) {
          q[key] = this.$route.query[key]
        }
      }
      this.q = Object.assign({}, this.q, q)
    }
  },
  mounted () {
    this.fillData()
  }
}
