export default {
  data () {
    return {
      items: [],
      loading: false,
      firstFetched: false,
      q: {
        page: 1,
        per_page: 10
      },
      paginateMeta: null
    }
  },
  computed: {
    totalFetched () {
      return this.firstFetched && this.items && this.items.length === this.paginateMeta.total_count
    }
  },
  methods: {
    beforeFetch () {
      this.loading = true
    },
    fetchData () {},
    _fetchData (promise) {
      return new Promise((resolve, reject) => {
        this.beforeFetch()
        promise.then((res) => {
          if (res.data.items) {
            if (this.q.page === 1) {
              this.items = res.data.items
            } else {
              this.items = this.items.concat(res.data.items)
            }
            this.afterFetch(res.data)
            resolve(res)
          }
        }).catch((e) => {
          this.loading = false
          reject(e)
        })
      })
    },
    afterFetch (data) {
      this.firstFetched = true
      this.loading = false
      this.q.page = data.paginate_meta.page || this.q.page
      this.q.per_page = data.paginate_meta.per_page || this.q.per_page
      this.paginateMeta = data.paginate_meta
    }
  }
}
