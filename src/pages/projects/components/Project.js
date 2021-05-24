import Button from '../../../components/Button'
import Flex from '../../../components/Flex'
import ProjectsState from '../../../states/ProjectsState'

function Project({ project }) {
  return (
    <div className="p-4 rounded shadow-xl hover:shadow-2xl trans space-y-2 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
      <Flex.Row justify="between" space="8">
        <span className="text-h2 font-medium">{project.name}</span>
        <ProjectsState.Context.Consumer>
          {({ deleteProject }) => (
            <Flex.Row space="1">
              <Button icon="FaEdit" color="transparent" />
              <Button
                icon="FaTrashAlt"
                iconColor="yellow-500"
                onClick={() => {
                  deleteProject(project.id)
                }}
              />
            </Flex.Row>
          )}
        </ProjectsState.Context.Consumer>
      </Flex.Row>
      <hr />
      <br />
    </div>
  )
}
export default Project
