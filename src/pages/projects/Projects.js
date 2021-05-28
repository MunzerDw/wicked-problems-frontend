import Page from 'components/Page'
import ProjectCard from './components/ProjectCard'
import { contexts } from 'states'
import CreateProject from './components/CreateProject'

function Projects() {
  return (
    <Page className="flex flex-col space-y-6">
      <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-900 p-4 rounded">
        <div className="text-2xl font-medium">Projects</div>
        <CreateProject />
      </div>
      <div className="grid gap-6 grid-flow-row grid-cols-3 md:grid-cols-3 2xl:grid-cols-5 w-full px-4">
        <contexts.ProjectsStateCtx.Consumer>
          {({ projects }) =>
            projects
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((project, i) => <ProjectCard key={i} project={project} />)
          }
        </contexts.ProjectsStateCtx.Consumer>
      </div>
    </Page>
  )
}

export default Projects
