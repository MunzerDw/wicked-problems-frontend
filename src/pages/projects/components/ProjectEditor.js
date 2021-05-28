import Toogle from 'components/Toogle'
import Button from '../../../components/Button'
import Flex from '../../../components/Flex'
import Form from '../../../components/Form'
import Input from '../../../components/Input'
import Popup from '../../../components/Popup'
import ProjectsState from '../../../states/ProjectsState'

function ProjectEditor({ trigger, open, setOpen }) {
  return (
    <ProjectsState.Context.Consumer>
      {({ editorProject, setEditorProject, createProject, updateProject }) => {
        return (
          <Popup
            state={open}
            setState={setOpen}
            trigger={trigger}
            onClose={() => setEditorProject({ name: '' })}
          >
            <Form
              className="bg-gray-200 dark:bg-gray-700 shadow-lg rounded p-6"
              onSubmit={async () => {
                if (editorProject.id) {
                  await updateProject(editorProject.id, {
                    name: editorProject.name,
                    public: editorProject.public,
                  })
                } else {
                  await createProject(editorProject)
                }
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
              <Flex.Row>
                <div>Public</div>
                <Toogle
                  checked={editorProject.public ? true : false}
                  onChange={(value) => {
                    setEditorProject({ ...editorProject, public: value })
                  }}
                />
              </Flex.Row>
              <Flex.Row space="2">
                <Button basic color="green" type="submit">
                  {editorProject.id ? 'Save' : 'Add'}
                </Button>
                <Button
                  basic
                  color="gray"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  Cancel
                </Button>
              </Flex.Row>
            </Form>
          </Popup>
        )
      }}
    </ProjectsState.Context.Consumer>
  )
}
export default ProjectEditor
