<template lang="html">
  <div class="body">
    <infinite-scroll :fetchHandler="fetchData" :items="items" :loading="loading" :q="q" :totalFetched="totalFetched">
      <template slot="top" v-if="items.length > 0 && unread_count">
        <div class="all-read" @click="handleReadAll()">全部标记为已读</div>
      </template>
      <template scope="{item}">
        <div class="notification clearfix">
          <div class="content">
            <span class="limit" :class="{'grey': item.user_read_at}">{{ item.title || '无'}}</span>
            <div class="info">
              <span class="date">{{ item.created_at || '无' }}</span><span class="more" v-if="item.content" @click="goNotifyDetail(item.id)"> 点击查看详情 >></span>
            </div>
            <div class="action"><span class="yellow" @click="handleDeleteNotify(item.id)">删除</span><span class="yellow" v-if="!item.user_read_at" @click="handleNotifyRead(item.id)">标记为已读</span></div>
          </div>
        </div>
      </template>
      <template slot="bottom">
        <p class="no-data" v-if="firstFetched && !items.length">无通知消息</p>
      </template>
    </infinite-scroll>
  </div>
</template>

<script>
import InfiniteScroll from "@/components/Shared/InfiniteScroll"
import infiniteScrollMixin from "@/components/Shared/mixins/infiniteScrollMixin"

export default {
  mixins: [infiniteScrollMixin],
  data () {
    return {
      unread_count: ""
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
    this.fetchData()
  },
  components: { InfiniteScroll },
  methods: {
    fetchData () {
      this._fetchData(this.api.getNotifications({ per_page: this.q.per_page, page: this.q.page })).then(res => {
        this.unread_count = res.data.unread_count
      })
    },
    goNotifyDetail (notificationId) {
      this.$router.push({ name: "NotificationDetail", params: {notificationId} })
    },
    handleDeleteNotify (id) {
      this.$messagebox.confirm("您确定要删除?", "确认删除").then(action => {
        this.api.deleteNotify(id).then(() => {
          this.$toast({
            message: "删除成功",
            position: "middle",
            duration: 5000
          })
          this.items.length = 0
          this.q.page = 1
          this.firstFetched = false
          this.fetchData()
        }).catch((error) => {
          console.log(error)
        })
      }).catch(function (error) { // 解决 它内部使用promise时 抓住异常
        console.log(error)
      })
    },
    handleNotifyRead (id) {
      this.api.postNotifyRead(id).then(() => {
        this.items.length = 0
        this.q.page = 1
        this.fetchData()
      }).catch((error) => {
        console.log(error)
      })
    },
    handleReadAll () {
      this.api.postReadAll().then(() => {
        this.items.length = 0
        this.q.page = 1
        this.fetchData()
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.all-read {
  margin: 10px auto;
  width: 90%;
  padding: 10px 0px;
  color: $color-blue3;
  background-color: $color-white;
  font-weight: bold;
  text-align: center;
  font-size: $font-h4;
  border-radius: 5px;
}
.p-bottom {
  padding-bottom: 60px;
}
.action {
  text-align: right;
  font-size: $font-h5;
  margin-top: 10px;
  .red {
    color: $color-red;
    border: $px solid $color-red;
  }
  .yellow {
    color: $color-yellow13;
    border: $px solid $color-yellow13;
    padding: .1rem .5rem;
  }
  span {
    padding: 2px 10px;
    border-radius: 5px;
    margin: 0px 6px;
  }
}
.notification {
  padding: 0 .3rem;
  margin: .3rem 0;
  .date {
    font-size: $font-h5;
    color: rgba($color-white, .5);
    padding-right: 10px;
  }
  .info {
    border-bottom: $px solid $color-blue9;
    padding-bottom: 10px;
  }
  .content {
    margin: 0 auto;
    margin-top: 10px;
    background-color: $color-blue8;
    padding: .5rem .3rem;
    border-radius: 5px;
    font-size: $font-h4;
    .limit {
      width: 100%;
      color: $color-black1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
    .grey {
      color: $color-white;
    }
  }
  .more {
    font-size: $font-h5;
    color: $color-blue3;
    display: inline-block;
    text-decoration: underline;
  }
}
</style>
