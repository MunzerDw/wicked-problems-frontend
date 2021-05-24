import ProjectsState from './ProjectsState'

function States(props) {
  return <ProjectsState.Provider>{props.children}</ProjectsState.Provider>
}

export default States
