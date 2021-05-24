import { useState } from 'react'
import Button from '../../../components/Button'
import Flex from '../../../components/Flex'
import Form from '../../../components/Form'
import Input from '../../../components/Input'
import Popup from '../../../components/Popup'
import ProjectsState from '../../../states/ProjectsState'

function ProjectEditor() {
  const [open, setOpen] = useState(false)
  return (
    <Popup
      state={open}
      setState={setOpen}
      trigger={
        <Button basic color="green">
          New project
        </Button>
      }
    >
      <ProjectsState.Context.Consumer>
        {({ editorProject, setEditorProject, createProject }) => {
          return (
            <Form
              className="bg-gray-200 dark:bg-gray-700 shadow-lg rounded p-6"
              onSubmit={async () => {
                await createProject(editorProject)
                setEditorProject({ name: '' })
                setOpen(false)
              }}
            >
              <Input
                required
                label="Project name"
                value={editorProject.name}
                onChange={(e) => {
                  const value = e.currentTarget.value
                  setEditorProject({ ...editorProject, name: value })
                }}
              />
              <Flex.Row space="2">
                <Button basic color="green" type="submit">
                  Add
                </Button>
                <Button basic color="gray" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Flex.Row>
            </Form>
          )
        }}
      </ProjectsState.Context.Consumer>
    </Popup>
  )
}
export default ProjectEditor
