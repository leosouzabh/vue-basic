<template>
  <div id="list">
    <md-table v-if="currentUser.roles && currentUser.roles.indexOf('admin') != -1">
      <md-table-row>
        <md-table-head>NAME</md-table-head>
        <md-table-head>EMAIL</md-table-head>
        <md-table-head>ROLES</md-table-head>
        <md-table-head class="remove-cell"></md-table-head>
      </md-table-row>

      <md-table-row v-for="(user, index) in users" :key="index">
        <md-table-cell>{{ user.username }}</md-table-cell>
        <md-table-cell>
          <span>
            {{ user.email }}
            <md-tooltip md-direction="top">
              Google ID ({{ user.googleId || 'Not logged yet' }})
            </md-tooltip>
          </span>
        </md-table-cell>
        <md-table-cell>{{ user.roles.join(', ') }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-accent" @click="active = true" v-if="user._id != currentUser._id">
            <md-icon>delete</md-icon>
          </md-button>

          <md-dialog-confirm
            :md-active.sync="active"
            md-title="Are you sure?"
            md-confirm-text="Agree"
            md-cancel-text="Disagree"
            @md-cancel="onCancel"
            @md-confirm="onConfirm(user._id, index)" />
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-snackbar :md-active.sync="userDestroyed">User has removed successfully!</md-snackbar>
  </div>
</template>

<script>
import UserService from '@/services/UsersService'
import { mapState } from 'vuex'

export default {
  data: () => ({
    users: [],
    userDestroyed: false,
    active: false,
    deleteValue: null
  }),
  mounted () {
    this.listUsers()
  },
  computed: {
    ...mapState('currentUser', ['currentUser'])
  },
  methods: {
    listUsers () {
      let userService = new UserService(this.$http)
      userService.listUsers().then((res) => { this.users = res.body.users })
    },
    onConfirm (id, index) {
      let userService = new UserService(this.$http)

      userService.destroyUser(id).then((res) => {
        this.users.splice(index, 1)
        this.userDestroyed = true
      })
    },
    onCancel () {
      this.deleteValue = 'Disagreed'
    }
  }
}
</script>

<style scoped>
#list {
  background: #EAF1F7;
  width: 100%;
  height: 100%;
  padding: 16px;
  position: absolute;
  left: 0;
  top: 0;
}
.remove-cell {
  width: 50px;
}
</style>
