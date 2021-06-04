import { makeAutoObservable } from 'mobx'
import evidenceEditor from './EvidenceEditor'

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
        evidenceEditor.setOpen(false)
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
