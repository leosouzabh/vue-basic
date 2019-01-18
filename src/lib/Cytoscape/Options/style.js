export default [
  {
    selector: 'node',
    style: {
      'content': 'data(id)',
      'text-opacity': 1,
      'font-size': 4,
      'height': 10,
      'width': 10,
      'background-color': '#8F9A9C',
      'color': '#879395',
      'font-weight': 'bold',
      'text-halign': 'right',
      'text-valign': 'center',
      'text-margin-x': 2,
      'shape': 'roundrectangle'
    }
  },
  {
    selector: ':parent',
    style: {
      'background-color': '#FFF',
      'border-color': '#879395',
      'border-width': 0.7,
      'background-opacity': 1,
      'text-valign': 'top',
      'text-halign': 'center',
      'text-margin-y': -1
    }
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'width': 0.7,
      'target-arrow-shape': 'triangle',
      'line-color': '#879395',
      'target-arrow-color': '#879395'
    }
  },
  {
    selector: ':selected',
    style: {
      'border-width': 0.7,
      'background-color': '#FFF',
      'border-color': '#F0AB00'
    }
  }
]
