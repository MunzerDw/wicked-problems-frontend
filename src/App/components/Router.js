import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from '../../pages/NotFound/NotFound'
import Project from '../../pages/Project/Project'
import Projects from '../../pages/projects/Projects'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Projects />
        </Route>
        <Route exact path="/projects/:id">
          <Project />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default Router
