import { makeAutoObservable } from 'mobx'
import axios from 'axios'

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
    if (!state) {
      this.setEditorNode({})
      this.setOnChange(null)
    }
    this.open = state
  }

  setOnChange(onChange) {
    this.onChange = onChange
  }

  //API FUNCTIONS
  async updateEditorNode(body) {
    try {
      const response = await axios.put('/nodes/' + this.editorNode.id, body)
      if (response.status === 200) {
        this.setEditorNode({
          ...this.editorNode,
          data: { ...this.editorNode.data, ...response.data },
        })
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

const nodeEditor = new NodeEditor()

export default nodeEditor
