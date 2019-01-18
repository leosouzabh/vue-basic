<template>
  <div>
    <md-list id="dataLineageDetails" v-if="schemaDetails">
      <md-list-item v-bind:class="{ 'background-red': !schemaDetails.id }">
        <md-icon>info</md-icon>
        <span class="md-list-item-text">{{ schemaDetails.id }}</span>
      </md-list-item>

      <md-list-item v-bind:class="{ 'background-red': !schemaDetails.table_comment }">
        <md-icon>comment</md-icon>

        <md-field>
          <label for="first-name">Comment (press enter to update)</label>
          <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="schemaDetails.table_comment" v-bind:placeholder="schemaDetails.table_comment" v-on:keyup.enter="update = true" />
        </md-field>
      </md-list-item>

      <md-list-item v-bind:class="{ 'background-red': !schemaDetails.create_time }">
        <md-icon>access_time</md-icon>
        <span class="md-list-item-text">{{ schemaDetails.create_time | formatDate }}</span>
      </md-list-item>
    </md-list>

    <md-dialog-confirm
      :md-active.sync="update"
      md-title="Are you sure?"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-cancel="onCancel"
      @md-confirm="onConfirm()" />

    <md-snackbar :md-active.sync="updated">Table updated successfully!</md-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DataLineageService from '@/services/DataLineageService'

export default {
  name: 'DataLineageDetails',
  computed: {
    ...mapState('dataLineage', ['schemaDetails'])
  },
  data () {
    return {
      update: false,
      updated: false,
      updateValue: null
    }
  },
  methods: {
    onConfirm () {
      const dataLineageService = new DataLineageService(
        this.$http,
        this.$route.params.source
      )

      dataLineageService.updateTableComment(
        this.schemaDetails.parent,
        this.schemaDetails.id,
        this.schemaDetails.table_comment
      ).then((res) => { this.updated = true })
    },
    onCancel () {
      this.deleteValue = 'Disagreed'
    }
  }
}
</script>

<style scoped>
.background-red {
  background: #ff4956;
}
</style>
