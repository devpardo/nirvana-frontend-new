<template lang="html">
  <div class="body">
    <profile-header :amount="profile"></profile-header>
    <action-flex :amount="profile"></action-flex>
  </div>
</template>

<script>
import ActionFlex from "@/components/Profile/ActionFlex"
import ProfileHeader from "@/components/Profile/ProfileHeader"

export default {
  data () {
    return {
      profile: {
        amount: ""
      }
    }
  },
  mounted () {
    let sundry = { navigateTitle: true }
    this.$store.dispatch("setNavigationTitle", sundry)
  },
  components: { ActionFlex, ProfileHeader }
}
</script>

<style lang="scss" scoped>
</style>
