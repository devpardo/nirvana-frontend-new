<template lang="html">
  <div class="body">
    <my-banks v-if="actions.length && !loadFlag" :actions="actions" :select="selected" :methods="methods"></my-banks>
    <p class="plus fa" @click="go()">{{ plus }}<span class="add-card">添加银行卡</span></p>
    <loading v-if="loadFlag"></loading>
  </div>
</template>

<script>
import MyBanks from "@/components/Setting/MyBanks.vue"
import Loading from "@/components/Shared/Loading.vue"

export default {
  data () {
    return {
      selected: { select: 0 },
      plus: this.$fontawesome("plus"),
      loadFlag: true,
      actions: [],
      methods: {
        deleteBank: this.deleteBank
      }
    }
  },
  components: { MyBanks, Loading },
  methods: {
    go () {
      this.$router.push({ name: "AddBank" })
    },
    deleteBank (id) {
      this.api.deleteBank(id).then(() => {
        this.getCards()
        this.$toast({
          message: "删除成功",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    getCards () {
      this.api.getBankCards().then((res) => {
        if (res.data) {
          this.actions = res.data.items
        }
        this.loadFlag = false
      }).catch((error) => {
        this.loadFlag = false
        console.log(error)
      })
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.getCards()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.plus {
  font-size: $font-h3;
  color: $color-red;
  border: $px solid $color-red;
  text-align: center;
  padding: 15px 10px;
  margin: 10px auto;
  width: 90%;
  border-radius: 6px;
}
.add-card {
  color: $color-red;
  font-size: $font-h3-1;
  padding: 0px 10px;
}
</style>
