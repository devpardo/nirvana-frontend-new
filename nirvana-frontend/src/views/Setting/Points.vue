<template lang="html">
  <div class="body">
    <!--基础信息-->
    <div class="my-coin">
      <p class="number">{{ pointDatas && pointDatas.points || '0' }}</p>
      <p class="txt">可用亚太币</p>
    </div>
    <div class="draw-lottery">
      <router-link to="/setting/lottery"><button>马上去抽奖</button></router-link>
    </div>
    <!--亚太币列表-->
    <infinite-scroll :class="{ 'task-list': items.length > 0 }" :fetchHandler="fetchData" :items="items" :loading="loading" :q="q" :totalFetched="totalFetched">
      <template scope="{item}">
        <p class="li"><span>{{ item.created_at | date('yyyy-MM-dd' || '无') }}</span><span class="center">{{ item.log || '无说明' }}</span><span>{{ item.num_points || '无' }}亚太币</span></p>
      </template>
    </infinite-scroll>
    <!--亚太币规则-->
    <div class="questions">
      <div class="question">
        <p class="title"><span class="fa">{{ exclamation }}</span><span>亚太币有什么用途？</span></p>
        <p class="content">参与[亚太大转盘]抽奖活动，购买[亚太币商城]中的礼品(即将上线)。</p>
        <p class="title"><span class="fa">{{ exclamation }}</span><span>获取亚太币？</span></p>
        <p class="content">新用户完成邮箱验证、手机验证、每日签到等任务获得相应奖励亚太币。</p>
        <p class="title"><span class="fa">{{ exclamation }}</span><span>快速获取亚太币？</span></p>
        <p class="content">每次充值按照金额的1%比例赠送亚太币。例：充值1000元，将获得10亚太币，可参加两次大转盘抽奖。</p>
      </div>
    </div>
  </div>
</template>

<script>
import "@/libs/filters"
import InfiniteScroll from "@/components/Shared/InfiniteScroll"
import infiniteScrollMixin from "@/components/Shared/mixins/infiniteScrollMixin"

export default {
  mixins: [infiniteScrollMixin],
  data () {
    return {
      exclamation: this.$fontawesome("exclamation-circle"),
      pointDatas: ""
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
    if (this.$store.state.user.email) {
      this.fetchData()
    }
  },
  components: { InfiniteScroll },
  methods: {
    fetchData () {
      this._fetchData(this.api.getPoints(this.q)).then(res => {
        this.pointDatas = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.my-coin {
  position: relative;
  background-color: $color-blue8;
  padding: .5rem;
  .number, .txt{
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    word-wrap: break-word;
  }
  .number {
    font-size: $font-largest;
    color: $color-white;
  }
  .txt {
    color: rgba($color-white, .5);
  }
  .gain {
    width: 100%;
    padding: 10px;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -12px;
    background-color: $color-red4;
    .info {
      span {
        &:first-child, &:last-child {
          color: $color-white;
        }
      }
      .color {
        color: $color-yellow1;
        padding-left: 10px;
      }
    }
  }
}
.draw-lottery {
  padding: .3rem;
  width: 100%;
  background-color: $color-blue8;
  button {
    width: 100%;
    background-color: $color-yellow13;
    color: $color-blue8;
    padding: .2rem 0;
    border: $px solid $color-yellow5;
    border-radius: 2rem;
    font-weight: bold;
    font-size: $font-h3;
  }
}
.task-list {
  margin-top: .3rem;
  background-color: $color-blue8;
  height: 300px;
  padding: .5rem .3rem;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  p {
    margin: 0px;
    padding: 0px;
  }
  .li {
    padding: .3rem;
    color: $color-white;
    border-bottom: $px solid $color-blue9;
    word-wrap: break-word;
    span {
      &:first-child {
        display: inline-block;
        width: 20%;
        vertical-align: middle;
      }
      &:last-child {
        display: inline-block;
        width: 16%;
      }
    }
    .center {
      padding-left: 10px;
      display: inline-block;
      width: 63%;
      vertical-align: middle;
    }
  }
  .more {
    @include line-height(40px);
    padding: 0px 10px;
    color: $color-blue1;
  }
}
.questions {
  margin-top: .3rem;
  background-color: $color-blue8;
  padding: .5rem .3rem;
  color: rgba($color-white, .5);
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
.loading {
  text-align: center;
}
.load-position {
  margin: 0 auto;
  display: inline-block;
  left: -5px;
  top: 5px;
  position: relative;
}
.load-txt {
  position: relative;
  top: -5px;
}
</style>
