<template lang="html">
  <div v-if="tasks.length">
    <div class="category" v-for="(category, index) in tasks">
      <mt-cell>
        <span slot="icon" class="img"><img v-lazy="category.image_url" width="100%" height="100%"/></span>
        <span class="title">{{ category.task_cate_name || '无' }}</span>
      </mt-cell>
      <div class="block-margin">
        <div v-for="quest in category.quests">
          <div class="mycell" @click="showQuest(quest, category)">
            <span class="inline icon fl"><img v-lazy="quest.image_url" width="100%" height="100%"/></span>
            <div class="inline center">
              <p>
                <span class="name">{{ quest.name || '无名字' }}</span>
              </p>
              <p class="info">
                <span>奖励: {{ quest.desc || '无描述' }}</span>
              </p>
            </div>
          </div>
          <div class="cell-list" v-if="quest.$unfold">
            <ul v-if="quest.schedules && quest.schedules.length">
              <p class="regular" v-if="quest.match_intr">{{ quest.match_intr }}<span class="check-red fa" v-if="quest.finished">{{ check }}</span><span class="check-grey fa" v-else>{{ check }}</span></p>
              <span v-for="schedule in quest.schedules">
                <li v-if="schedule.finished">{{ schedule.text }}<span class="check-red fa">{{ check }}</span></li>
                <li class="color-grey" v-else>{{ schedule.text }}<span class="check-grey fa">{{ check }}</span></li>
              </span>
            </ul>
            <ul v-else-if="quest.schedules">暂无步骤</ul>
          </div>
          <div class="footer">
            <span class="inline mybutton fr bg-fill" v-if="quest.status === 'status_completed'" @click.stop="getTaskMakeReceived(quest, category)">领取奖励</span>
            <span class="inline mybutton fr button-grey" v-else-if="quest.status === 'status_received'">已领取</span>
            <span class="inline mybutton fr button-grey" v-else-if="quest.status === 'status_expired'">已过期</span>
            <span class="inline mybutton fr button-red" v-else-if="quest.status === 'status_created'" @click.stop="makeProcess(quest, category)">接受</span>
            <span class="inline mybutton percent fr" v-else-if="quest.status === 'status_processing'"><span class="inline" :style="{ width: `${quest.percent}px` }"></span><span class="inline">{{ quest.percent }}%</span></span>
          </div>
        </div>
      </div>
    </div>
    <!--优惠规则-->
    <div class="questions">
      <div class="question">
        <p class="title"><span class="fa">{{ exclamation }}</span><span>操作指南: </span></p>
        <p class="content">[接受]任务后，点击[优惠图标]即可查看完成进度。</p>
      </div>
    </div>
    <privileges v-if="cellOb.show" :obj="cellOb"></privileges>
  </div>
  <div v-else>
    <data-loading :dataLoad="dataLoad" v-if="dataLoad.flag"></data-loading>
    <p v-else class="no-data">您暂无任务</p>
  </div>
</template>

<script>
import Privileges from "@/components/Task/Privileges"
import DataLoading from "@/components/Shared/DataLoading.vue"

export default {
  data () {
    return {
      check: this.$fontawesome("check-circle-o"),
      exclamation: this.$fontawesome("exclamation-circle"),
      dataLoad: {
        flag: true,
        data: "福利加载中"
      },
      cellOb: {
        show: false
      },
      tasks: [],
      selectTasks: {}
    }
  },
  watch: {
    "$store.state.user.email" () {
      if (this.$store.state.user.email) {
        this.fetchTasks()
      }
    }
  },
  mounted () {
    if (this.$store.state.user.email) {
      this.fetchTasks()
    } else {
      this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true })
    }
  },
  components: { Privileges, DataLoading },
  methods: {
    showQuest (quest) {
      this.$set(quest, "$unfold", !quest.$unfold)
      if (!quest.schedules) {
        this.$set(quest, "schedules", {})
      }
      if (quest.$unfold) {
        this.getQuest(quest)
      }
    },
    getQuest (quest) {
      this.api.getTask(quest.id, {klass_name: quest.klass_name}).then((res) => {
        Object.assign(quest, res.data)
        quest.schedule = res.data.schedule
      }).catch((error) => {
        console.log(error)
      })
    },
    makeProcess (quest) {
      if (quest._isQuestProcess) {
        return
      }
      quest._isQuestProcess = true
      this.api.postTaskMakeProcess(quest.id, { "klass_name": quest.klass_name }).then((res) => {
        Object.assign(quest, res.data)
        this.getQuest(quest)
      }).catch(() => {
        quest._isQuestProcess = false
      })
    },
    getTaskMakeReceived (quest) {
      this.$store.dispatch("setPrivileges", "请稍等,奖励提取中...")
      this.cellOb.show = true
      this.api.postTaskMakeReceived(quest.id, { "klass_name": quest.klass_name }).then((res) => {
        this.$store.dispatch("setPrivileges", res.data.items)
        this.getQuest(quest)
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchTasks () {
      this.dataLoad.flag = true
      this.api.getTasks().then((res) => {
        this.tasks = res.data.items
        this.dataLoad.flag = false
      }).catch((error) => {
        this.dataLoad.flag = false
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.block-margin {
  padding: 0 .3rem;
}
.category {
  margin-bottom: .5rem;
}
.regular {
  color: $color-yellow13;
  span {
    padding-left: 10px;
  }
}
.questions {
  margin-top: 10px;
  color: $color-white;
  p {
    margin: 0px;
  }
  .question {
    padding: 10px;
    letter-spacing: $px;
    text-align: justify;
  }
  .title {
    span {
      &:last-child {
        padding-left: 5px;
        display: inline-block;
        width: 96%;
        vertical-align: top;
        text-align: justify;
      }
    }
  }
  .content {
    padding: 5px 0px;
    padding-left: 17px;
    text-align: justify;
  }
}
.mycell {
  width: 100%;
  background-color: $color-blue8;
  padding: .3rem;
  margin: .1rem auto;
  margin-bottom: 0px;
  p { margin: 0px; }
  .icon {
    vertical-align: top;
    position: relative;
    bottom: 5px;
    width: 48px;
    height: 48px;
    color: $color-green;
    font-size: $font-h2;
    img {
      border-radius: 5px;
    }
  }
  .inline {
    display: inline-block;
  }
  .center {
    letter-spacing: $px;
    max-width: 80%;
    padding-left: 10px;
    position: relative;
    bottom: 3px;
    .notice {
      font-size: $font-h5;
      color: $color-grey2;
      padding-left: 2px;
    }
    .name {
      font-size: $font-h4;
      color: $color-white;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .info {
      color: $color-yellow13;
      font-weight: bold;
      margin-top: 4px;
      .pl {
        padding-left: 5px;
      }
    }
  }
}
.mybutton {
  padding: 3px 10px;
  border-radius: 5px;
  text-align: center;
  letter-spacing: $px;
  font-size: $font-h4;
}
.bg-fill {
  background-color: $color-orange1;
  color: $color-white;
}
.button-red {
  background-color: $color-orange1;
  color: $color-white;
}
.button-grey {
  border: $px solid $color-grey2;
  color: $color-grey2;
}
.percent {
  color: $color-yellow13;
  border: $px solid $color-yellow13;
  width: 80px;
  @include line-height(27px);
  position: relative;
  span {
    &:first-child {
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      z-index: 0;
      background-color: $color-orange1;
    }
    &:last-child {
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      right: 0px;
      z-index: 1;
      width: 100%;

    }
  }
}
.cell-list {
  background-color: $color-blue8;
  color: $color-white;
  .color-grey {
    color: $color-grey2;
  }
  .check-red {
    color: $color-red;
  }
  .check-grey {
    color: $color-grey1;
  }
  ul {
    margin: 0px;
    padding: 0px;
    padding:10px;
    li {
      transform: scale(0.9);
      line-height: 2em;
      list-style-type: decimal;
      a {
        text-decoration: underline;
        padding: 0px 5px;
      }
      span {
        padding-left: 10px;
        vertical-align: middle;
      }
    }
  }
}
.mint-cell {
  .title {
    color: $color-white;
    font-size: $font-h4;
    position: absolute;
    font-weight: bold;
    left: 40px;
    top: 17px;
  }
  .img {
    width: 21px;
    height: 19px;
    display: inline-block;
    img {
      border-radius: 5px;
    }
  }
  background-color: $color-blue8;
  min-height: 1.2rem;
  margin: 0 .3rem;
}
.footer {
  background-color: $color-blue8;
  padding: 0 .3rem;
  min-height: 1.2rem;
}
</style>
