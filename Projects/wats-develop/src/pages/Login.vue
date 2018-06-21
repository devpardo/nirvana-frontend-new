<template>

  <q-page class="flex flex-center">
    <q-card class="login">
      <q-toolbar>
        <q-toolbar-title>
          Login
        </q-toolbar-title>
      </q-toolbar>
      <q-card-main>
        <q-field icon="email" helper="Your username">
          <q-input v-model="form.username" float-label="Username" />
        </q-field>
        <q-field icon="vpn_key" helper="Your password">
          <q-input v-model="form.password" type="password" float-label="Password" />
        </q-field>
      </q-card-main>

      <q-card-actions>
        <q-btn class="full-width" color="secondary" @click="login(form)">Login</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "PageLogin",
    data() {
      return {
        form: {
          username: "",
          password: ""
        }
      };
    },
    methods: {
      ...mapActions(["login"])
    }
  };
</script>

<style lang="stylus" scoped>
  .login
    min-width: 400px
</style>
