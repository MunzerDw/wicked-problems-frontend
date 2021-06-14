import Button from 'components/Button'
import CanvasPage from 'components/CanvasPage/CanvasPage'
import Flex from 'components/Flex'
import { observer } from 'mobx-react'
import snapshotEditor from 'models/SnapshotEditor'
import snapshots from 'models/Snapshots'
import ImportData from './components/ImportData'
import Snapshot from './components/Snapshot'
import SnapshotEditor from './components/SnapshotEditor'
import SnapshotsCombined from './components/SnapshotsCombined'

const Snapshots = observer(() => {
  const name = window.location.pathname.split('/')[2]
  return (
    <CanvasPage
      onLoad={() => snapshots.loadSnapshots(name)}
      className="flex justify-center p-12"
    >
      <Flex.Col className="w-full" style={{}} space="16">
        <Flex.Col space="1" className="w-full">
          <Flex.Row className="w-full" justify="between">
            <div className="text-4xl font-medium">Snapshots</div>
            <Button
              basic
              color="green"
              onClick={() => {
                snapshotEditor.setEditorSnapshot({ name: '' })
                snapshotEditor.setOpen(true)
              }}
            >
              Add Snapshot
            </Button>
          </Flex.Row>
          <Flex.Row space="0">
            <div>view: </div>
            <Button
              basic
              icon="FaList"
              color={snapshots.getView() === 'list' ? 'lightgray' : 'gray'}
              onClick={() => {
                snapshots.setView('list')
              }}
            />
            <Button
              basic
              icon="FaTh"
              color={snapshots.getView() === 'one' ? 'lightgray' : 'gray'}
              onClick={() => {
                snapshots.setView('one')
              }}
            />
          </Flex.Row>
        </Flex.Col>
        {snapshots.view === 'list' ? (
          snapshots.snapshots?.map((snaphshot, i) => {
            return <Snapshot key={i} id={snaphshot.id} />
          })
        ) : (
          <SnapshotsCombined />
        )}
        <div className="opacity-0">I have to add this I dont know why lol</div>
      </Flex.Col>
      <SnapshotEditor />
      <ImportData />
    </CanvasPage>
  )
})

export default Snapshots
