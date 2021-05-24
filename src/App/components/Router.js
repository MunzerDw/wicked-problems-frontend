import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from '../../pages/NotFound/NotFound'
import Projects from '../../pages/projects/Projects'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Projects />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default Router
