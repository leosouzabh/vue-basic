/* eslint-disable no-new */
let _firstSuccessorIsNone = (firstSuccessor) => {
  return firstSuccessor.style('display') === 'none'
}

let _hideSucessors = (successors) => {
  successors.forEach(el => { el.style('display', 'none') })
}

let _showUpSucessors = (successors) => {
  successors.forEach(el => { el.style('display', 'element') })
}

let _firstSuccessor = (node) => {
  return _successors(node)[0]
}

let _successors = (element) => {
  return element.successors().targets()
}

export default class {
  constructor (node) {
    let successors = _successors(node)
    let firstSuccessor = _firstSuccessor(node)

    if (_firstSuccessorIsNone(firstSuccessor)) {
      _showUpSucessors(successors)
    } else {
      _hideSucessors(successors)
    }
  }
}
