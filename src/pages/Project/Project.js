import CanvasPage from '../../components/CanvasPage/CanvasPage'

function Project() {
  const name = window.location.pathname.split('/')[2]
  console.log(window.location)
  return <CanvasPage>project {name}</CanvasPage>
}

export default Project
