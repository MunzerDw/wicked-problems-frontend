import Button from 'components/Button'
import CanvasPage from 'components/CanvasPage/CanvasPage'
import Flex from 'components/Flex'
import { observer } from 'mobx-react'
import snapshotEditor from 'models/SnapshotEditor'
import snapshots from 'models/Snapshots'
import ImportData from './components/ImportData'
import Snapshot from './components/Snapshot'
import SnapshotEditor from './components/SnapshotEditor'

const Snapshots = observer(() => {
  const name = window.location.pathname.split('/')[2]
  return (
    <CanvasPage
      onLoad={() => snapshots.loadSnapshots(name)}
      className="flex justify-center p-12"
    >
      <Flex.Col
        className="w-full"
        style={{
          maxWidth: '800px',
        }}
        space="16"
      >
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
        {snapshots.snapshots?.map((snaphshot, i) => {
          return <Snapshot key={i} id={snaphshot.id} />
        })}
        <div className="opacity-0">I have to add this I dont know why lol</div>
      </Flex.Col>
      <SnapshotEditor />
      <ImportData />
    </CanvasPage>
  )
})

export default Snapshots
