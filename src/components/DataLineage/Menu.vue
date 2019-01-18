<template>
  <div id="menu">
    <md-toolbar class="md-transparent" md-elevation="0">
      <span>Select a schema</span>
    </md-toolbar>

    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="schema">Schema</label>

          <md-select v-model="selectedSchema" name="schema" id="schema">
            <md-option v-for="(schema, key) in schemas" :key="key" :value="schema.Database">
              {{ schema.Database }}
            </md-option>
          </md-select>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-new */
import DataLineageService from '@/services/DataLineageService'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'DataLineageMenu',
  computed: {
    ...mapState('dataLineage', ['schema', 'schemaDetails']),
    ...mapState('cytoscape', ['elements'])
  },
  mounted () {
    this.dataLineageService().getSchemas().then((res) => {
      this.schemas = res.body.data
    })
  },
  data () {
    return {
      selectedSchema: '',
      schemas: []
    }
  },
  methods: {
    ...mapActions('dataLineage', ['setSchema']),
    ...mapActions('cytoscape', ['setElements']),
    ...mapActions('messageBar', ['setMessageBarText', 'setShowMessageBar']),

    dataLineageService () {
      return new DataLineageService(this.$http, this.$route.params.source)
    }
  },
  watch: {
    selectedSchema: function (selectedSchema) {
      const self = this
      self.setSchema(selectedSchema)

      this.setShowMessageBar(true)
      this.setMessageBarText('Loading...')

      self.dataLineageService().getSchema(selectedSchema).then((res) => {
        self.setElements('')
        self.setElements(res.body.elements)
        this.setShowMessageBar(false)
        this.setMessageBarText('')
      })
    }
  }
}
</script>

<style scoped>
.message-bar {
  background: #EAF1F7;
  padding: 4px 8px;
  text-align: center;
  position: relative;
  color: #FFF;
  z-index: 999999;
}
.md-layout.md-gutter {
  padding: 0 16px;
}
</style>
