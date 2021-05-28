import CanvasPage from 'components/CanvasPage/CanvasPage'

function Snapshots() {
  const name = window.location.pathname.split('/')[2]
  return <CanvasPage>Snapshots | {name}</CanvasPage>
}

export default Snapshots
