import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import project from './Project'

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
