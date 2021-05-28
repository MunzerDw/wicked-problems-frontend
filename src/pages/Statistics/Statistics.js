import CanvasPage from 'components/CanvasPage/CanvasPage'

function Statistics() {
  const name = window.location.pathname.split('/')[2]
  return <CanvasPage>Statistics | {name}</CanvasPage>
}

export default Statistics
