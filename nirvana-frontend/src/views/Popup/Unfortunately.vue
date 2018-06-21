<template lang="html">
  <div>
    <section>
      <div class="popup-div">
        <div class="right-side">
          <button class="btn-footer" @click="back()"></button>
        </div>
        <div class="unfortunately body">
          <div class="container">
              <p>
                  <img src="./images/unfortunately/text_01.png"/>
              </p>
              <br/>
              <p>
                  <img src="./images/unfortunately/text_02.png"/>
              </p>
          </div>
          <div class="footer">
            <div class="left-side">
              <p>抢红包时间：</p>
              <p>12:00、15:00</p>
              <p>18:00、21:00、24:00</p>
            </div>
            <div class="right-side">
              <p> 本活动解释权归亚太娱乐所有 </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.push({ name: "Prize" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'sass/styles';
</style>
