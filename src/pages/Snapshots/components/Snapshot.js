import Button from 'components/Button'
import Flex from 'components/Flex'
import { observer } from 'mobx-react'
import snapshotEditor from 'models/SnapshotEditor'
import snapshots from 'models/Snapshots'

const Snapshot = observer(({ id, ...props }) => {
  const snapshot = snapshots.findSnapshot(id)
  console.log(snapshot)
  return (
    <Flex.Row justify="between" className="w-full">
      <div className="text-3xl">{snapshot.name}</div>
      <Flex.Row space="0">
        <Button
          basic
          icon="FaEdit"
          color="indigo-400"
          onClick={() => {
            snapshotEditor.setEditorSnapshot(snapshot)
            snapshotEditor.setOpen(true)
          }}
        />
        <Button
          basic
          icon="FaTrashAlt"
          color="yellow"
          onClick={() => {
            snapshots.deleteSnapshot(id)
          }}
        />
        <Button basic icon="FaDatabase" color="green" />
      </Flex.Row>
    </Flex.Row>
  )
})

export default Snapshot
