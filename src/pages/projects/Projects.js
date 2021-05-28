import Page from 'components/Page'
import ProjectCard from './components/ProjectCard'
import { contexts } from 'states'
import { useContext, useEffect } from 'react'
import ProjectEditor from './components/ProjectEditor'
import Button from 'components/Button'

function Projects() {
  const { getProjects, projects, setEditorOpen, setEditorProject } = useContext(
    contexts.ProjectsCtx
  )
  useEffect(() => {
    getProjects()
  }, [])
  return (
    <Page>
      <ProjectEditor />
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-900 p-4 rounded">
          <div className="text-2xl font-medium">Projects</div>
          <Button
            onClick={() => {
              setEditorProject({ name: '' })
              setEditorOpen(true)
            }}
            basic
            color="green"
          >
            New project
          </Button>
        </div>
        <div className="grid gap-6 grid-flow-row grid-cols-3 md:grid-cols-3 2xl:grid-cols-5 w-full px-4">
          {projects
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
        </div>
      </div>
    </Page>
  )
}

export default Projects
