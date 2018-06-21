<template lang="html">
  <div class="body">
    <div class="level-container">
      <div class="levels">
        <p class="img"><img v-lazy="photo" width="100%" height="100%"></p>
        <p class="level"><span>当前等级：</span><router-link to="/setting/privilege_level"><span class="lv">Lv.{{ vipData.vip_level || '0' }}</span><span class="link">(点击查看等级分类)</span></router-link></p>
        <p class="condition"><span>晋级条件：</span>上月统计流水已达到<span class="rank">{{ rank }}</span></p>
        <p class="rank" v-if="rank >= 5">您本月等级达到至尊</p>
      </div>
      <div class="info">
        <p><span>上月统计流水: </span><span class="yellow">{{ vipData.last_month_amount || '0.0' }}</span></p>
        <p><span>本月统计流水: </span><span class="yellow p-space">{{ vipData.current_month_amount || '0.0'  }}</span></p>
      </div>
      <span class="forecast">预计下月可晋级等级: </span>
      <div class="lv-graphic">
        <table>
          <tr>
            <span class="color-width" :class="{ 'full-width': levelWidth >= 100 }" :style="{ width: levelWidth + '%' }"></span>
            <td>
              <span class="lv-before yellow">Lv.0</span>
              <span class="lv" :class="{ 'yellow': percentage >= 1/5 }">Lv.1</span>
            </td>
            <td><span class="lv" :class="{ 'yellow': percentage >= 2/5 }">Lv.2</span></td>
            <td><span class="lv" :class="{ 'yellow': percentage >= 3/5 }">Lv.3</span></td>
            <td><span class="lv" :class="{ 'yellow': percentage >= 4/5 }">Lv.4</span></td>
            <td><span class="lv" :class="{ 'yellow': percentage >= 5/5 }">Lv.5</span></td>
          </tr>
        </table>
      </div>
    </div>
    <privilege class="m-top" :level="vipData && vipData.vip_level"></privilege>
    <privilege-rule class="m-top"></privilege-rule>
  </div>
</template>

<script>
import Privilege from "@/components/Setting/Privilege.vue"
import PrivilegeRule from "@/components/Setting/PrivilegeRule.vue"

export default {
  data () {
    return {
      levelWidth: 0,
      percentage: 0,
      section: 1 / 5,
      rank: "--",
      vipData: "",
      photo: ""
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchProfile()
    this.vipIntroduce()
  },
  components: { Privilege, PrivilegeRule },
  methods: {
    fetchProfile () {
      this.api.getProfile().then((res) => {
        this.photo = res.data.aws_url || ""
      }).catch((error) => {
        console.log(error)
      })
    },
    vipIntroduce () {
      this.api.getVipIntro().then((res) => {
        if (res.data) {
          this.vipData = res.data
          let arr = []
          if (this.vipData && this.vipData.vip_level_hash) {
            for (let item in this.vipData.vip_level_hash) {
              arr.push(this.vipData.vip_level_hash[item])
            }
            let currentMonthAmount = parseFloat(this.vipData.current_month_amount)
            let index = ""
            let len = arr.length
            for (let i = 0; i < len; i++) {
              if (arr[i] <= currentMonthAmount) {
                index = i
              }
            }
            let ind = parseInt(this.vipData.vip_level)
            if (ind >= len - 1) { this.rank = arr[len - 1] } else { this.rank = arr[ind] }
            if (index >= len - 1) {
              this.percentage = 1
              this.levelWidth = 100
            } else {
              let beforeAmount = arr[index]
              let afterAmount = arr[index + 1]
              let differ = currentMonthAmount - beforeAmount
              let sectionPercentage = 0
              if ((index >= 1) && (index <= len - 2)) {
                sectionPercentage = ((differ / (afterAmount - beforeAmount)) + 0.03) * this.section
              } else {
                sectionPercentage = (differ / (afterAmount - beforeAmount)) * this.section
              }
              this.percentage = (index * this.section + sectionPercentage)
              this.levelWidth = 100 * this.percentage
              if (this.levelWidth > 0 && this.levelWidth <= 0.3) {
                this.levelWidth = 0.3
              }
            }
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  margin: 2px 0px;
}
.red {
  color: $color-red;
}
.yellow {
  color: $color-yellow13;
}
.p-space {
  padding-right: 5px;
}
.m-top {
  margin-top: 10px;
}
.rank {
  padding-left: 5px;
  color: $color-yellow13;
}
.forecast {
  padding: 10px;
  margin-bottom: 5px;
  display: inline-block;
  font-weight: bold;
  color: $color-white;
}
.level-container {
  background-color: $color-blue8;
  padding: 10px;
  color: $color-white;
  .info {
    padding: .3rem;
  }
  .condition {
    color: rgba($color-white, .5) !important;
  }
}
.levels {
  text-align: center;
  position: relative;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    img { border-radius: 50%; }
    margin: 0 auto;
    margin-bottom: 5px;
  }
  .level {
    font-size: $font-h5;
    .lv {
      color: $color-yellow13;
    }
    .link {
      padding-left: 10px;
      color: $color-yellow13;
      text-decoration: underline;
      font-size: 12px;
    }
  }
  .condition {
    color: $color-grey2;
  }
}
.full-width {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
.lv-graphic {
  margin: 10px auto;
  padding: 0px 10px;
  table {
    width: 100%;
    height: .2rem;
    background-color: rgba($color-white, .5);
    border-radius: 5px;
    position: relative;
    .color-width {
      position: absolute;
      display: inline-block;
      background: linear-gradient(to right, $color-yellow5, $color-yellow13);
      left: 0px;
      top: 0px;
      bottom: 0px;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      width: 100%;
      background-color: green;
      &:after {
        content: '';
        left: 98%;
        bottom: -7px;
        position: absolute;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid $color-yellow13;
      }
    }
    td {
      position: relative;
      .lv {
        position: absolute;
        top: -20px;
        right: -12px;
      }
      .lv-before {
        position: absolute;
        top: -20px;
        left: -10px;
      }
    }
    td:not(:last-child) {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 100%;
        top: -2px;
        height: 8px;
        width: 1px;
        background-color: $color-blue8;
      }
    }
  }
}
</style>
