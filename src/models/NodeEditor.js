import { makeAutoObservable } from 'mobx'

// Model the application state.
class NodeEditor {
  editorNode = {}
  open = false

  constructor() {
    makeAutoObservable(this)
  }

  getEditorNode() {
    return this.editorNode
  }

  setEditorNode(editorNode) {
    this.editorNode = Object.assign({}, { ...editorNode })
  }

  setOpen(state) {
    this.open = state
    if (!state) {
      setTimeout(() => {
        this.setEditorNode({})
        this.setOnChange(null)
      }, 200)
    }
  }

  setOnChange(onChange) {
    this.onChange = onChange
  }

  //API FUNCTIONS
}

const nodeEditor = new NodeEditor()

export default nodeEditor
