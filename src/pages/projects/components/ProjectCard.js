import Button from 'components/Button'
import Flex from 'components/Flex'
import NumberStat from 'components/NumberStat'
import ProjectsState from 'states/ProjectsState'
import TimeAgo from 'javascript-time-ago'
import { Link } from 'react-router-dom'
import Icon from 'components/Icon'

function ProjectCard({ project }) {
  const currentdate = new Date(project.createdAt)
  const timeAgo = new TimeAgo('en-EN')
  const timeSince = timeAgo.format(currentdate)

  return (
    <>
      <Link to={'/projects/' + project.urlSafeName} className="cursor-pointer">
        <Flex.Col
          space="2"
          justify="between"
          className="p-4 rounded shadow-xl hover:shadow-2xl trans bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 w-full h-full cursor-pointer"
        >
          <Flex.Row
            justify="between"
            align="start"
            space="8"
            className="w-full"
          >
            <span className="text-h2 font-medium">{project.name}</span>
            <ProjectsState.Context.Consumer>
              {({ deleteProject, setEditorProject, setEditorOpen }) => (
                <Flex.Row space="1">
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setEditorProject(project)
                      setEditorOpen(true)
                    }}
                    icon="FaEdit"
                    color="transparent"
                  />
                  <Button
                    icon="FaTrashAlt"
                    iconColor="yellow-500"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      deleteProject(project.id)
                    }}
                  />
                </Flex.Row>
              )}
            </ProjectsState.Context.Consumer>
          </Flex.Row>
          <hr />
          <br />
          <NumberStat.Small
            value={
              <Icon
                className={project.public ? 'text-green-600' : ''}
                name={project.public ? 'FaCheck' : 'FaTimes'}
              />
            }
            text="Public"
            icon="FaGlobeEurope"
          />
          <NumberStat.Small value={4} text="Users" icon="FaUsers" />
          <NumberStat.Small
            value={timeSince}
            text="Created"
            icon="FaCalendarAlt"
          />
        </Flex.Col>
      </Link>
    </>
  )
}
export default ProjectCard
