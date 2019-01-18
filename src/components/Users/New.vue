<template>
  <div id="new">
    <form novalidate class="md-layout" @submit.prevent="validateUser" v-if="currentUser.roles && currentUser.roles.indexOf('admin') != -1">
      <md-card class="md-layout-item md-size-50 md-small-size-100 form">
        <md-card-header>
          <div class="md-title">New user</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="first-name">Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="user.username" :disabled="sending" />
                <span class="md-error" v-if="!$v.user.username.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.user.username.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="user.email" placeholder="email@maxmilhas.com.br" :disabled="sending" />
                <span class="md-error" v-if="!$v.user.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.user.email.email">Invalid email</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('roles')">
                <label for="roles">Roles</label>
                <md-select name="roles" id="roles" v-model="user.roles" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="admin">Admin</md-option>
                  <md-option value="viewer">Viewer</md-option>
                </md-select>
                <span class="md-error">The roles is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised button-green" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved successfully!</md-snackbar>
      <md-snackbar :md-active.sync="errors">The user {{ lastUser }} was not saved. Errors: {{ errorsMessage }}</md-snackbar>
    </form>
  </div>
</template>

<script>
import UserService from '@/services/UsersService'
import { validationMixin } from 'vuelidate'
import { mapState } from 'vuex'

import {
  required,
  email,
  minLength
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  computed: {
    ...mapState('currentUser', ['currentUser'])
  },
  data: () => ({
    user: {
      username: null,
      roles: null,
      email: null
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    errors: false,
    errorsMessage: null
  }),
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(3)
      },
      roles: { required },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.user[fieldName]

      if (field) { return { 'md-invalid': field.$invalid && field.$dirty } }
    },
    clearUser () {
      this.$v.$reset()
      this.user.username = null
      this.user.roles = null
      this.user.email = null
    },
    saveUser () {
      this.sending = true

      let userService = new UserService(this.$http)

      userService.createUser(this.user).then((res) => {
        if (res.status === 200) {
          this.errors = false
          this.lastUser = this.user.username
          this.userSaved = true
          this.clearUser()
        } else if (res.status === 500) {
          this.getErrors(res)
        }
        this.sending = false
      })
    },
    getErrors (res) {
      this.errors = true
      let errors = res.body.errors
      let keys = Object.keys(errors)

      this.errorsMessage = keys.map((key) => {
        if (errors[key].message) {
          return errors[key].message
        }
      }).join(',')
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
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
#new {
  background: #EAF1F7;
  width: 100%;
  height: 100%;
  padding: 16px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
