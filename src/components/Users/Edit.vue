<template>
  <div id="edit">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 form">
        <md-card-header>
          <div class="md-title">Edit user</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="first-name">Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="user.username" v-bind:placeholder="currentUser.username" :disabled="sending" />
                <span class="md-error" v-if="!$v.user.username.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.user.username.minlength">Invalid first name</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised button-green" :disabled="sending">Update</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userUpdated">The user {{ currentUser.username }} was saved successfully!</md-snackbar>
    </form>
  </div>
</template>

<script>
import UserService from '@/services/UsersService'
import { validationMixin } from 'vuelidate'
import { mapState, mapActions } from 'vuex'

import {
  required,
  minLength
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  mounted () {
    this.getCurrentUser()
  },
  computed: {
    ...mapState('currentUser', ['currentUser'])
  },
  data: () => ({
    user: {
      username: null
    },
    userUpdated: false,
    sending: false
  }),
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    ...mapActions('currentUser', ['setCurrentUser']),
    getCurrentUser () {
      let userService = new UserService(this.$http)
      userService.currentUser((user) => this.setCurrentUser(user))
    },
    getValidationClass (fieldName) {
      const field = this.$v.user[fieldName]

      if (field) { return { 'md-invalid': field.$invalid && field.$dirty } }
    },
    updateUser () {
      this.sending = true

      let userService = new UserService(this.$http)

      userService.updateUser(this.currentUser._id, this.user).then((res) => {
        this.userUpdated = true
        this.sending = false
      })
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.updateUser()
      }
    }
  }
}
</script>

<style scoped>
.form {
  margin: 0;
  min-width: 100%;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
#edit {
  background: #EAF1F7;
  width: 100%;
  height: 100%;
  padding: 16px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
