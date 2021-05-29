import { makeAutoObservable } from 'mobx'

// Model the application state.
class NodeEditor {
  editorNode = {}
  open = false
  onChange

  constructor() {
    makeAutoObservable(this)
  }

  getEditorNode() {
    return this.editorNode
  }

  setEditorNode(editorNode) {
    const oldEditorNode = Object.assign({}, { ...this.editorNode })
    this.editorNode = Object.assign({}, { ...editorNode })
    if (this.onChange) {
      if (
        JSON.stringify(editorNode) !== JSON.stringify(oldEditorNode) &&
        this.editorNode?.id
      ) {
        this.onChange(editorNode)
      }
    }
  }

  setOpen(state) {
    this.open = state
  }

  setOnChange(onChange) {
    this.onChange = onChange
  }
}

const nodeEditor = new NodeEditor()

export default nodeEditor
