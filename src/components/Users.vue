<template>
  <div class="page-container md-layout-row" id="users">
    <md-app>
      <md-app-drawer md-permanent="full" v-if="currentUser.roles && currentUser.roles.indexOf('admin') != -1">
        <md-toolbar md-elevation="0">
          <span>Options</span>
        </md-toolbar>

        <md-list>
          <md-list-item @click="onListUsers">
            <md-icon>reorder</md-icon>
            <span class="md-list-item-text">List users</span>
          </md-list-item>

          <md-list-item @click="onNewUser">
            <md-icon>person_add</md-icon>
            <span class="md-list-item-text">New user</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('currentUser', ['currentUser'])
  },
  methods: {
    onNewUser () {
      this.$router.push({ name: 'NewUser' })
    },
    onListUsers () {
      this.$router.push({ name: 'ListUsers' })
    }
  }
}
</script>

<style scoped>
.md-toolbar {
  background: #f0f5f9 !important;
}
#users {
  display: flex;
  min-height: 100%;
  border-radius: 4px;
  box-shadow: 1px 1px 12px #879395;
}
.md-app, .md-app-container {
  min-height: 100%;
  min-width: 100%;
}
.md-app-container, .md-app-content {
  overflow: hidden;
  padding: 0;
}
</style>
