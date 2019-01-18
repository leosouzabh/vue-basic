<template>
  <div id="cy"></div>
</template>

<script>
import Cytoscape from '@/lib/Cytoscape'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      cytoscape: ''
    }
  },
  mounted () {
    this.clearElements()
    this.loadCytoscape()
  },
  computed: {
    ...mapState('cytoscape', ['elements'])
  },
  methods: {
    ...mapActions('dataLineage', ['setSchemaDetails']),

    loadCytoscape () {
      this.cytoscape = new Cytoscape()
    },

    clearElements () {
      this.setSchemaDetails('')
    },

    updateElements () {
      this.cytoscape.update(this.elements, (data) => {
        this.setSchemaDetails(data)
      })
    }
  },
  watch: {
    elements: function (elements) {
      this.updateElements()
    }
  }
}
</script>

<style scoped>
#cy {
  background: #EAF1F7;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
