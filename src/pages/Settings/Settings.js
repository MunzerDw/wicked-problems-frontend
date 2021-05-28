import CanvasPage from 'components/CanvasPage/CanvasPage'

function Settings() {
  const name = window.location.pathname.split('/')[2]
  return <CanvasPage>Settings | {name}</CanvasPage>
}

export default Settings
