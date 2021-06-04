import { makeAutoObservable } from 'mobx'

// Model the application state.
class NodeEditor {
  editorNode = {}
  open = false
  evidenceEditorOpen = false
  editorEvidence = {}

  constructor() {
    makeAutoObservable(this)
  }

  getEditorEvidence() {
    return this.editorEvidence
  }

  getEditorNode() {
    return this.editorNode
  }

  setEditorNode(editorNode) {
    this.editorNode = Object.assign({}, { ...editorNode })
  }

  setEditorEvidence(editorEvidence) {
    this.editorEvidence = Object.assign({}, { ...editorEvidence })
  }

  setEvidenceEditorOpen(state) {
    this.evidenceEditorOpen = state
    if (!state) {
      setTimeout(() => {
        this.setEditorEvidence({})
      }, 200)
    }
  }

  setOpen(state) {
    this.open = state
    if (!state) {
      setTimeout(() => {
        this.setEditorNode({})
        this.setOnChange(null)
        this.setEvidenceEditorOpen(false)
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
