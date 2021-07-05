import Page from 'components/Page'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import projectsModel from 'models/Projects'

const PublicProjects = observer(() => {
  useEffect(() => {
    projectsModel.loadProjects()
    // eslint-disable-next-line
  }, [])
  return <Page>public projects</Page>
})

export default PublicProjects
