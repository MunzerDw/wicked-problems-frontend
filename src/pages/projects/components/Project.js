import Button from '../../../components/Button'
import Flex from '../../../components/Flex'
import NumberStat from '../../../components/NumberStat'
import ProjectsState from '../../../states/ProjectsState'

function Project({ project }) {
  const currentdate = new Date(project.createdAt)
  const datetime =
    currentdate.getDate() +
    '.' +
    (currentdate.getMonth() + 1) +
    '.' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds()
  return (
    <Flex.Col
      space="2"
      justify="between"
      className="p-4 rounded shadow-xl hover:shadow-2xl trans bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 min-w-70"
    >
      <Flex.Row justify="between" space="8" className="w-full">
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
      <NumberStat.Small value={4} text="Users" icon="FaUsers" />
      <NumberStat.Small value={datetime} text="Created" icon="FaCalendarAlt" />
    </Flex.Col>
  )
}
export default Project
