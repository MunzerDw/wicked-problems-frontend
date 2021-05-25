import Button from '../../../components/Button'
import Flex from '../../../components/Flex'
import NumberStat from '../../../components/NumberStat'
import ProjectsState from '../../../states/ProjectsState'
import TimeAgo from 'javascript-time-ago'
import ProjectEditor from './ProjectEditor'

function Project({ project }) {
  const currentdate = new Date(project.createdAt)
  const timeAgo = new TimeAgo('en-EN')
  const timeSince = timeAgo.format(currentdate)
  return (
    <Flex.Col
      space="2"
      justify="between"
      className="p-4 rounded shadow-xl hover:shadow-2xl trans bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 w-full"
      onClick={() => {
        window.location.href =
          window.location.origin + '/projects/' + project.name
      }}
    >
      <Flex.Row justify="between" align="start" space="8" className="w-full">
        <span className="text-h2 font-medium truncate">{project.name}</span>
        <ProjectsState.Context.Consumer>
          {({ deleteProject, setEditorProject }) => (
            <Flex.Row space="1">
              <ProjectEditor
                trigger={
                  <Button
                    onClick={() => {
                      setEditorProject(project)
                    }}
                    icon="FaEdit"
                    color="transparent"
                  />
                }
              />
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
      <NumberStat.Small value={timeSince} text="Created" icon="FaCalendarAlt" />
    </Flex.Col>
  )
}
export default Project
