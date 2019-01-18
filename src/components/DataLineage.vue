<template>
  <div class="page-container md-layout-row" id="dataLineage">
    <md-app>
      <md-app-drawer md-permanent="full">
        <data-lineage-menu></data-lineage-menu>
        <md-divider></md-divider>
        <data-lineage-details></data-lineage-details>
      </md-app-drawer>

      <md-app-content>
        <message-bar></message-bar>
        <cytoscape></cytoscape>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Cytoscape from '@/components/DataLineage/Cytoscape'
import MessageBar from '@/components/DataLineage/MessageBar'
import DataLineageMenu from '@/components/DataLineage/Menu'
import DataLineageDetails from '@/components/DataLineage/Details'

import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    this.setShowMessageBar(true)
    this.setMessageBarText('Select a schema in sidebar')
  },
  computed: {
    ...mapState('dataLineage', ['schema']),
    ...mapState('messageBar', ['showMessageBar', 'messageBarText'])
  },
  components: {
    'cytoscape': Cytoscape,
    'message-bar': MessageBar,
    'data-lineage-menu': DataLineageMenu,
    'data-lineage-details': DataLineageDetails
  },
  methods: {
    ...mapActions('dataLineage', ['setSchema']),
    ...mapActions('messageBar', ['setMessageBarText', 'setShowMessageBar'])
  },
  watch: {
    schema: function (schema) {
      if (schema) {
        this.setShowMessageBar(false)
        this.setMessageBarText('')
      }
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
body {
  font-family: helvetica;
  font-size: 14px;
}
.md-app, .md-app-container {
  min-height: 100%;
  min-width: 100%;
}
.md-app-container, .md-app-content {
  overflow: hidden;
  padding: 0;
}
#dataLineage {
  display: flex;
  min-height: 100%;
  border-radius: 4px;
  box-shadow: 1px 1px 12px #879395;
}
</style>
