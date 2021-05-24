import Page from '../../components/Page'
import Project from './components/Project'
import ProjectEditor from './components/ProjectEditor'
import ProjectsState from '../../states/ProjectsState'

function Projects() {
  return (
    <Page className="flex flex-col space-y-6">
      <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-900 p-4 rounded">
        <div className="text-2xl font-medium">Projects</div>
        <ProjectEditor />
      </div>
      <div className="grid gap-6 grid-flow-row grid-cols-4 w-max px-4">
        <ProjectsState.Context.Consumer>
          {({ projects }) =>
            projects.map((project, i) => <Project key={i} project={project} />)
          }
        </ProjectsState.Context.Consumer>
      </div>
    </Page>
  )
}

export default Projects
