<template>
  <div id="app">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible" v-if="currentUser.roles && currentUser.roles.indexOf('admin') != -1">
          <md-icon>menu</md-icon>
        </md-button>

        <a class="logo-mm" href="/"></a>
        <span class="md-title mm-title">Data Lineage</span>

        <div class="md-toolbar-section-end">
           <md-menu>
            <md-button class="md-icon-button" md-menu-trigger>
              <md-avatar class="md-small">
                <img v-bind:src="currentUser.thumbnail || 'data:image/png;base64,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'" v-bind:alt="currentUser.username">
              </md-avatar>
            </md-button>

            <md-menu-content>
              <md-list-item v-bind:to="'/users/'+ currentUser._id + '/edit'">Edit</md-list-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar md-elevation="0" class="toolbar-nav">Navigation</md-toolbar>

        <md-list>
          <md-list-item @click="onUsers">
            <md-icon>supervisor_account</md-icon>
            <span class="md-list-item-text">Manage Users</span>
          </md-list-item>

          <md-list-item @click="onDataLineage">
            <md-icon>device_hub</md-icon>
            <span class="md-list-item-text">Data Lineage</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import UserService from '@/services/UsersService'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  mounted () {
    this.getCurrentUser()
  },
  data: () => ({
    menuVisible: false
  }),
  computed: {
    ...mapState('currentUser', ['currentUser'])
  },
  methods: {
    ...mapActions('currentUser', ['setCurrentUser']),
    getCurrentUser () {
      let userService = new UserService(this.$http)
      userService.currentUser((user) => this.setCurrentUser(user))
    },
    onUsers () {
      this.$router.push({ name: 'ListUsers' })
      this.menuVisible = !this.menuVisible
    },
    onDataLineage () {
      this.$router.push({ name: 'DataLineage', params: { source: 'mysql' } })
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme("default", (
  primary: #2D8ABD,
  accent: #F36B6b
));

@import "~vue-material/dist/theme/all";

.md-app-content {
  background: #f0f5f9 !important;
}

.button-green {
  background: #1abc9c !important;
}
</style>

<style lang="scss" scoped>
.toolbar-nav {
  background: #f0f5f9 !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.logo-mm {
  display: block;
  width: 137px;
  height: 40px;
  background: url(https://static.maxmilhas.com.br/img/logo-mm-white.svg) no-repeat;
  background-size: auto auto;
  background-size: contain;
  margin: 0;
  float: left;
  z-index: 99;
  position: relative;
  color: #fff;
}
.mm-title {
  font-size: 12px;
  font-weight: bold !important;
  text-transform: uppercase;
  font-style: italic;
  padding-top: 25px;
  margin-left: 4px !important;
}
.md-app, .md-app-container, .md-app-content {
  min-height: 100%;
  min-width: 100%;
}
</style>
