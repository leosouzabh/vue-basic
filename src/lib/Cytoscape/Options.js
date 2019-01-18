import style from './Options/style'

export default class {
  constructor () {
    return {
      container: document.getElementById('cy'),
      layout: { name: 'dagre' },
      style
    }
  }
}
