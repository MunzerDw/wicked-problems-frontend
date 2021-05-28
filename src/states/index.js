import ProjectsState from './ProjectsState'
import GlobalState from './GlobalState'

function States(props) {
  return (
    <ProjectsState.Provider>
      <GlobalState.Provider>{props.children}</GlobalState.Provider>
    </ProjectsState.Provider>
  )
}

const contexts = {
  ProjectsStateCtx: ProjectsState.Context,
  GlobalCtx: GlobalState.Context,
}

export { States, contexts }
