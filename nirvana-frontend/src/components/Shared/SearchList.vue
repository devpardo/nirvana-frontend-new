<template lang="html">
  <div class="search-position">
    <div>
      <div class="input dl">
        <search placeholder="搜索游戏名称" :searchData="searchData"></search>
      </div>
      <span class="dl" @click="handleClose()">取消</span>
    </div>
    <div v-if="!searchData.value">
      <div class="hot-game" v-if="searchData.searchTopGames">
        <p class="title">热门搜索</p>
        <span @click="handleSearchValue($event, item.gid, item.name)" v-for="item in searchData.searchTopGames">{{ item.name }}</span>
      </div>
      <div class="hot-game" v-if="historyList.length">
        <p class="title">历史搜索</p>
        <span @click="handleSearchValue($event, item.gid, item.name)" v-for="item in historyList">{{ item.name }}</span>
      </div>
    </div>
    <div v-else>
      <div class="game-list" v-if="searchData.searchList && searchData.searchList.length">
        <p v-for="item in searchData.searchList" @click="goDetail(item.gid, item.name)"><span class="fa">{{ searchIco }}</span>{{ item.name }}</p>
      </div>
       <div class="no-data" v-else>
        共0条结果
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Shared/Search.vue"
import { indexOf } from "@/libs/utils"

export default {
  props: ["placeholder", "search"],
  data () {
    return {
      historyList: [],
      searchIco: this.$fontawesome("search"),
      searchData: {
        searchTopGames: "",
        searchList: [],
        value: ""
      }
    }
  },
  watch: {
    "searchData.value": function () {
      if (this.searchData.value) {
        this.handleSearch()
      }
    }
  },
  mounted () {
    if (localStorage.getItem("searchHistory")) {
      this.historyList = (JSON.parse(localStorage.getItem("searchHistory"))).reverse()
    }
    this.fetchTopVisited()
  },
  components: { Search },
  methods: {
    fetchTopVisited () {
      this.api.getTopVisited().then((res) => {
        this.searchData.searchTopGames = res.data.items
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSearch () {
      let obj = {
        q_name_cont: this.searchData.value
      }
      this.api.getSearchGames(obj).then((res) => {
        this.searchData.searchList = res.data.items
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSearchValue (event, id, n) {
      this.searchData.value = n
      this.goDetail(id, n)
    },
    handleClose () {
      this.search.flag = false
      this.searchData.value = ""
    },
    setHistory (id, n, arr) {
      let ob = {
        gid: id,
        name: n
      }
      let temp = ""
      if (arr && arr.length) {
        // 重复时 之所以先放再删 是为了让其显示在前
        let flag = false
        let ind = indexOf(arr, id)
        if (ind >= 0) {
          flag = true
        }
        // 不重复
        if (!flag) {
          let length = arr.length
          // 存5个
          if (length >= 5) {
            arr.splice(0, 1)
          }
        }
        arr.push(ob)
        // 重复
        if (flag) {
          let index = indexOf(arr, id)
          if (index >= 0) {
            arr.splice(index, 1)
          }
        }
        temp = JSON.stringify(arr)
      } else {
        let arrN = []
        arrN.push(ob)
        temp = JSON.stringify(arrN)
      }

      localStorage.setItem("searchHistory", temp)
    },
    goDetail (gid, n) {
      // 处理历史记录
      if (localStorage.getItem("searchHistory")) {
        let arr = JSON.parse(localStorage.getItem("searchHistory"))
        this.setHistory(gid, n, arr)
      } else {
        this.setHistory(gid, n)
      }
      this.historyList = (JSON.parse(localStorage.getItem("searchHistory"))).reverse()
      this.search.flag = false
      // 去详情
      this.$router.push({ name: "GameDetail", params: {gid} })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.search-position {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 100%;
  overflow: hidden;
  z-index: 320;
  background-color: $color-white;
  .dl {
    display: inline-block;
  }
  .input {
    width: 88%;
    search {
      z-index: 360;
    }
  }
  .hot-game {
    padding: 0px 10px;
    .title {
      font-size: $font-h5-1;
      color: $color-grey2;
    }
    span {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 15px;
      border: $px solid $color-grey1;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.game-list {
  padding: 10px;
  padding-bottom: 50px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  top: 40px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  .fa {
    font-size: $font-h5;
    color: $color-grey2;
    padding-right: 10px;
  }
  p {
    margin: 0px;
    padding: 10px 0px;
    border-bottom: $px solid $color-grey4;
  }
}
</style>
