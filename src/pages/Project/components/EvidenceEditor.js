import Toogle from 'components/Toogle'
import Button from 'components/Button'
import Flex from 'components/Flex'
import Form from 'components/Form'
import Input from 'components/Input'
import Popup from 'components/Popup'
import nodeEditor from 'models/NodeEditor'
import Textarea from 'components/Textarea'
import { observer } from 'mobx-react'
import axios from 'axios'
import Icon from 'components/Icon'
import project from 'models/Project'

const EvidenceEditor = observer(() => {
  const readFile = (e) => {
    e.preventDefault()
    const files = e.target?.files || e.dataTransfer?.files
    const file = files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
      const file = event.target.result
      nodeEditor.setEditorEvidence({
        ...nodeEditor.editorEvidence,
        file: file,
      })
    }
    reader.readAsDataURL(file)
  }
  return (
    <Popup
      state={nodeEditor.evidenceEditorOpen}
      setState={nodeEditor.setEvidenceEditorOpen}
    >
      <Form
        className="bg-gray-200 dark:bg-gray-700 shadow-lg rounded p-6"
        onSubmit={async () => {
          project.createEvidence({
            ...nodeEditor.editorEvidence,
            nodeId: nodeEditor.editorNode.id,
          })
          nodeEditor.setEvidenceEditorOpen(false)
        }}
      >
        <Textarea
          label="Text"
          value={nodeEditor.editorEvidence?.text}
          onChange={(e) => {
            const value = e.currentTarget.value
            nodeEditor.setEditorEvidence({
              ...nodeEditor.editorEvidence,
              text: value,
            })
          }}
        />
        <Flex.Col>
          <div>File</div>
          {/* <div className="w-full h-64 flex items-center justify-center border rounded">
            <span className="">Drop or click here</span>
          </div> */}
          {!nodeEditor.editorEvidence.file ? (
            <>
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={readFile}
                id="file-upload"
              />
              <div
                style={{
                  maxWidth: '1000px',
                }}
                className={
                  'flex justify-center items-center h-64 w-full rounded border hover:bg-gray-100 dark:hover:bg-gray-800 trans '
                }
                onDragEnter={() => {
                  // setHighlighted(true)
                }}
                onDragLeave={() => {
                  // setHighlighted(false)
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                }}
                onMouseUp={() => {
                  // setHighlighted(false)
                }}
                onDrop={readFile}
                onClick={() => {
                  document.getElementById('file-upload').click()
                }}
              >
                <div className="w-full h-full border border-dashed border-secondary-200 flex items-center justify-center italic">
                  Drop file or click here
                </div>
              </div>
            </>
          ) : (
            <div className="h-64">
              <Flex.Row justify="between">
                <div>file awdasd awd</div>
                <Button
                  icon="FaTimes"
                  iconColor="red"
                  onClick={() => {
                    nodeEditor.setEditorEvidence({
                      ...nodeEditor.editorEvidence,
                      file: null,
                    })
                  }}
                />
              </Flex.Row>
            </div>
          )}
        </Flex.Col>
        <Flex.Row space="2">
          <Button basic color="green" type="submit">
            {nodeEditor.editorEvidence.id ? 'Save' : 'Add'}
          </Button>
          <Button
            basic
            color="gray"
            onClick={() => {
              nodeEditor.setEvidenceEditorOpen(false)
            }}
          >
            Cancel
          </Button>
        </Flex.Row>
      </Form>
    </Popup>
  )
})
export default EvidenceEditor
