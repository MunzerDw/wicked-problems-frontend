import Button from 'components/Button'
import Flex from 'components/Flex'
import { observer } from 'mobx-react'
import importData from 'models/ImportData'
import snapshotEditor from 'models/SnapshotEditor'
import snapshots from 'models/Snapshots'
import { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { useDarkMode } from 'hooks/useDarkMode'

function formatDate(date) {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}

const Snapshot = observer(({ id, ...props }) => {
  const { darkMode } = useDarkMode()
  const [expanded, setExpanded] = useState(true)
  const snapshot = snapshots.findSnapshot(id)
  const data = snapshot.data
    ?.slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const lineData = {
    labels: data?.map((obj) => formatDate(new Date(obj.date))),
    datasets: [
      {
        lineTension: 0.3,
        label: false,
        borderColor: 'rgb(129, 140, 248)',
        borderWidth: 2,
        pointBorderWidth: 1,
        pointRadius: 2,
        data: data?.map((obj) => obj.value),
      },
    ],
  }
  console.log(snapshot)
  return (
    <Flex.Col className="w-full rounded bg-gray-200 dark:bg-gray-900 shadow-md trans hover:shadow-lg">
      <Flex.Row
        justify="between"
        className="w-full p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
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
          <Button
            basic
            icon="FaDatabase"
            color="green"
            onClick={() => {
              importData.setSnapshotId(id)
              importData.setOpen(true)
            }}
          />
        </Flex.Row>
      </Flex.Row>
      {expanded && (
        <div className="w-full p-4" style={{ minHeight: '200px' }}>
          <Line
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: darkMode ? 'white' : 'black',
                      beginAtZero: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: darkMode ? 'white' : 'black',
                      maxRotation: 45,
                      minRotation: 45,
                      maxTicksLimit: 20,
                    },
                    gridLines: {
                      color: 'gray',
                      lineWidth: 1,
                    },
                  },
                ],
              },
            }}
            data={lineData}
          />
        </div>
      )}
    </Flex.Col>
  )
})

export default Snapshot
