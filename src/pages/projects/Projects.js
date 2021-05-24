import Page from '../../components/Page'
import Project from './components/Project'

function Projects() {
  const projects = [{ name: 'tesdt projec' }, { name: 'default projec' }]
  return (
    <Page className="flex flex-col space-y-6">
      <div className="text-2xl">Projects</div>
      <div className="grid gap-6 grid-flow-col w-max">
        {projects.map((project, i) => (
          <Project key={i} project={project} />
        ))}
      </div>
    </Page>
  )
}

export default Projects
