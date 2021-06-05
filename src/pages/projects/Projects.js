import Page from 'components/Page'
import ProjectCard from './components/ProjectCard'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import ProjectEditor from './components/ProjectEditor'
import Button from 'components/Button'
import projectsModel from 'models/Projects'
import projectEditor from 'models/ProjectEditor'
import { FirebaseAuthConsumer } from '@react-firebase/auth'

const Projects = observer(() => {
  useEffect(() => {
    projectsModel.loadProjects()
    // eslint-disable-next-line
  }, [])
  return (
    <Page>
      <ProjectEditor />
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-900 p-4 rounded">
          <div className="text-2xl font-medium">
            Projects ({projectsModel.projects.length})
          </div>
          <Button
            onClick={() => {
              projectEditor.setEditorProject({ name: '' })
              projectEditor.setOpen(true)
            }}
            basic
            color="green"
          >
            New project
          </Button>
        </div>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId, ...authState }) => {
            const ownProjects = projectsModel.projects
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .filter((project) => project.userId === user.uid)
            const guestProjects = projectsModel.projects
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .filter((project) => project.userId !== user.uid)
            return (
              <>
                <div>Own projects</div>
                <div className="grid gap-6 grid-flow-row grid-cols-3 md:grid-cols-3 2xl:grid-cols-5 w-full px-4">
                  {ownProjects.length ? (
                    ownProjects.map((project, i) => (
                      <ProjectCard key={i} id={project.id} />
                    ))
                  ) : (
                    <div className="opacity-50">None</div>
                  )}
                </div>
                <div>Guest projects</div>
                <div className="grid gap-6 grid-flow-row grid-cols-3 md:grid-cols-3 2xl:grid-cols-5 w-full px-4">
                  {guestProjects.length ? (
                    guestProjects.map((project, i) => (
                      <ProjectCard key={i} id={project.id} />
                    ))
                  ) : (
                    <div className="opacity-50">None</div>
                  )}
                </div>
              </>
            )
          }}
        </FirebaseAuthConsumer>
      </div>
    </Page>
  )
})

export default Projects
