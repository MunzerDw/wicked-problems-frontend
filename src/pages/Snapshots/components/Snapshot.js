import Button from 'components/Button'
import Flex from 'components/Flex'
import { observer } from 'mobx-react'
import importData from 'models/ImportData'
import snapshotEditor from 'models/SnapshotEditor'
import snapshots from 'models/Snapshots'
import { useState } from 'react'
import { Chart, Line } from 'react-chartjs-2'
import { useDarkMode } from 'hooks/useDarkMode'
import project from 'models/Project'
import moment from 'moment'

function formatDate(date) {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}
Chart.register({
  id: 'actions',
  beforeDraw: function (chart, args, options) {
    const nodes = options.nodes
    const maxValue = options.maxValue
    const ctx = chart.ctx
    const topY = chart.scales['y'].getPixelForValue(maxValue)
    const bottomY = chart.scales['y'].bottom
    for (let i = 0; i < nodes?.length; i++) {
      const node = nodes[i]
      const x = chart.scales['x'].getPixelForValue(
        formatDate(new Date(node.data.doneAt))
      )
      if (x) {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x, topY)
        ctx.lineTo(x, bottomY)
        ctx.lineWidth = 2
        ctx.strokeStyle = node.data.label?.color || '#e23fa9'
        ctx.stroke()
        ctx.restore()
      }
    }
  },
})

const Snapshot = observer(({ id, ...props }) => {
  const { darkMode } = useDarkMode()
  const [expanded, setExpanded] = useState(true)
  const snapshot = snapshots.findSnapshot(id)
  const actions = snapshots.getFilteredActions()
  let dates = [...(snapshot.data?.map((d) => d.date) || [])]
    ?.slice()
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    const nextDate = dates[i + 1]
    if (nextDate) {
      if (moment(nextDate).diff(moment(date), 'days') > 1) {
        dates.splice(i + 1, 0, moment(date).add(1, 'days').toDate())
      }
    }
  }
  const data = snapshot.data || []
  const maxValue = Math.max(...data.map((d) => d.value))
  const lineData = {
    labels: dates?.map((date) => formatDate(new Date(date))),
    datasets: [
      {
        lineTension: 0.3,
        label: 'data',
        borderColor: 'rgb(129, 140, 248)',
        borderWidth: 2,
        pointBorderWidth: 1,
        pointRadius: 2,
        spanGaps: true,
        data: dates?.map((d) => {
          const value = data.find((da) => da.date === d)?.value
          return value
        }),
      },
      {
        lineTension: 0.3,
        label: 'actions',
        borderColor: '#6B7280',
        backgroundColor: '#6B7280',
        borderWidth: 4,
        pointBorderWidth: 4,
        pointRadius: 4,
        data: dates?.map((d) => {
          const actionExists = actions.find(
            (action) =>
              formatDate(new Date(action.data.doneAt)) ===
              formatDate(new Date(d))
          )
          return actionExists ? maxValue : null
        }),
      },
    ],
  }

  return (
    <Flex.Col
      id={id}
      className="w-full rounded bg-gray-200 dark:bg-gray-900 shadow-md trans hover:shadow-lg"
    >
      <Flex.Row align="start" justify="between" className="w-full p-4">
        <Flex.Col space="1">
          <div
            className="text-3xl font-bold hover:underline cursor-default"
            onClick={() => setExpanded(!expanded)}
          >
            {snapshot.name}
          </div>
          {(dates.length && (
            <div className="">
              {formatDate(new Date(dates[0])) +
                ' to ' +
                formatDate(new Date(dates[dates.length - 1]))}
            </div>
          )) ||
            ''}
        </Flex.Col>
        <Flex.Row space="0">
          <Button
            basic
            title="edit snapshot"
            icon="FaEdit"
            color="indigo"
            onClick={() => {
              snapshotEditor.setEditorSnapshot(snapshot)
              snapshotEditor.setOpen(true)
            }}
          />
          <Button
            basic
            title="delete snapshot and its data"
            icon="FaTrashAlt"
            color="yellow"
            onClick={() => {
              if (
                window.confirm('Are you sure you want to delete this snapshot?')
              ) {
                snapshots.deleteSnapshot(id)
              }
            }}
          />
          <Button
            basic
            title="import data"
            icon="FaDatabase"
            color="green"
            onClick={() => {
              importData.setSnapshotId(id)
              importData.setOpen(true)
            }}
          />
          <Button
            basic
            title="delete imported data"
            icon="FaMinus"
            color="yellow"
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to delete the data of this snapshot?'
                )
              ) {
                snapshots.deleteSnapshotData(id)
              }
            }}
          />
        </Flex.Row>
      </Flex.Row>
      {(expanded && data.length && (
        <div className="w-full p-4" style={{ minHeight: '500px' }}>
          <Line
            options={{
              animation: {
                duration: 0,
              },
              plugins: {
                actions: {
                  nodes: JSON.parse(JSON.stringify(actions)),
                  maxValue: maxValue,
                },
                tooltip: {
                  callbacks: {
                    beforeTitle: (items) => {
                      const date = items[0].label
                      const filteredActions = actions.filter(
                        (action) =>
                          formatDate(new Date(action.data.doneAt)) === date &&
                          action.data.text
                      )
                      let result = '\n\nActions:\n\n'
                      for (let i = 0; i < filteredActions.length; i++) {
                        const action = filteredActions[i]
                        if (action.data.text) {
                          result += i + 1 + ') ' + action.data.text + '\n\n'
                        }
                      }
                      return filteredActions.length ? result : ''
                    },
                    label: (item, data) => {
                      try {
                        console.log(item)
                        if (item['datasetIndex'] === 1) {
                          return null
                        }
                        const value = JSON.parse(item.raw)
                        if (typeof value === 'number') {
                          return value.toLocaleString('de-DE')
                        }
                        return value
                      } catch (error) {
                        return item.value
                      }
                    },
                  },
                },
              },
              lineAtIndex: [2, 4, 30],
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (val, index) => {
                      if (typeof val === 'number') {
                        return val.toLocaleString('de-DE')
                      } else {
                        return val
                      }
                    },
                    color: darkMode ? 'white' : 'black',
                    beginAtZero: true,
                  },
                  grid: {
                    color: 'gray',
                    lineWidth: 1,
                  },
                },
                x: {
                  barPercentage: 0.4,
                  ticks: {
                    color: darkMode ? 'white' : 'black',
                    maxRotation: 45,
                    minRotation: 45,
                    maxTicksLimit: 20,
                  },
                },
              },
            }}
            data={lineData}
          />
        </div>
      )) ||
        ''}
    </Flex.Col>
  )
})

export default Snapshot
