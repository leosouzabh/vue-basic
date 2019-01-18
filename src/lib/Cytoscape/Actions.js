export default class {
  constructor (cy) {
    const api = cy.expandCollapse({
      layoutBy: {
        name: 'dagre',
        animate: true,
        randomize: false,
        fit: true
      },
      expandCollapseCueSize: 0,
      expandCollapseCueLineSize: 0,
      fisheye: false,
      undoable: false
    })

    api.collapseAll()
    api.collapseRecursively(cy.$(':selected'))
  }
}
