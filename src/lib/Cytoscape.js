/* eslint-disable no-new */
import cytoscape from 'cytoscape'

import Config from './Cytoscape/Config'
import Actions from './Cytoscape/Actions'
import Options from './Cytoscape/Options'

import Taphold from '../lib/Cytoscape/Events/Taphold'

export default class {
  constructor () {
    new Config(cytoscape)
    this.cytoscape = cytoscape(new Options())
  }

  cy = () => this.cytoscape

  update (elements, callback) {
    this.remove()
    this.setEvents((data) => { callback(data) })
    new Actions(this.cytoscape)
    this.addElements(elements)
  }

  remove () {
    this.cytoscape.remove(this.cytoscape.elements())
  }

  addElements (elements) {
    this.cytoscape.add(elements)
  }

  setEvents (callback) {
    this.cytoscape.on('tap', 'node', function () { callback(this.data()) })
    this.cytoscape.on('taphold', 'node', function () { new Taphold(this) })
  }
}
