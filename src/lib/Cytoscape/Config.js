import jquery from 'jquery'
import dagre from 'cytoscape-dagre'
import expandCollapse from 'cytoscape-expand-collapse'

export default class {
  constructor (cytoscape) {
    dagre(cytoscape)
    expandCollapse(cytoscape, jquery)
  }
}
