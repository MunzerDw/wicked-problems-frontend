import ProjectsState from './ProjectsState'
import GlobalState from './GlobalState'
import ProjectState from './ProjectState'

function States(props) {
  return (
    <ProjectsState.Provider>
      <ProjectState.Provider>
        <GlobalState.Provider>{props.children}</GlobalState.Provider>
      </ProjectState.Provider>
    </ProjectsState.Provider>
  )
}

const contexts = {
  ProjectsCtx: ProjectsState.Context,
  GlobalCtx: GlobalState.Context,
  ProjectCtx: ProjectState.Context,
}

export { States, contexts }
