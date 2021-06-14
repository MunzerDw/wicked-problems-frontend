import Button from 'components/Button'
import Flex from 'components/Flex'
import { observer } from 'mobx-react'
import importData from 'models/ImportData'
import snapshotEditor from 'models/SnapshotEditor'
import snapshots from 'models/Snapshots'
import { useState } from 'react'
import { Chart, Bar, Line } from 'react-chartjs-2'
import { useDarkMode } from 'hooks/useDarkMode'
import project from 'models/Project'
import moment from 'moment'

function formatDate(date) {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}
Chart.pluginService.register({
  id: 'actions',
  beforeDraw: function (chart, args, options) {
    const nodes = options.nodes
    const ctx = chart.ctx
    const topY = chart.scales['y-axis-0'].top
    const bottomY = chart.scales['y-axis-0'].bottom
    for (let i = 0; i < nodes?.length; i++) {
      const node = nodes[i]
      const x = chart.scales['x-axis-0'].getPixelForValue(
        formatDate(new Date(node.data.doneAt))
      )
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = 2
      ctx.strokeStyle = '#e23fa9'
      ctx.stroke()
      ctx.restore()
    }
  },
})

const Snapshot = observer(({ id, ...props }) => {
  const { darkMode } = useDarkMode()
  const [expanded, setExpanded] = useState(true)
  const snapshot = snapshots.findSnapshot(id)
  const actions = project
    .getNodes()
    ?.filter((node) => node.data.type === 'ACTION' && node.data.doneAt)
  let dates = [...(snapshot.data?.map((d) => d.date) || [])]
    ?.slice()
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  console.log(dates.length)
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    const nextDate = dates[i + 1]
    if (nextDate) {
      if (moment(nextDate).diff(moment(date), 'days') > 1) {
        dates.splice(i + 1, 0, moment(date).add(1, 'days').toDate())
      }
    }
  }
  console.log(dates.length)
  const data = snapshot.data || []
  const lineData = {
    labels: dates?.map((date) => formatDate(new Date(date))),
    datasets: [
      {
        label: 'line',
        lineTension: 0.3,
        label: false,
        borderColor: 'rgb(129, 140, 248)',
        borderWidth: 2,
        pointBorderWidth: 1,
        pointRadius: 2,
        data: dates?.map((d) => {
          const value = data.find((da) => da.date === d)?.value
          return value
        }),
      },
    ],
  }

  return (
    <Flex.Col className="w-full rounded bg-gray-200 dark:bg-gray-900 shadow-md trans hover:shadow-lg">
      <Flex.Row
        align="start"
        justify="between"
        className="w-full p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <Flex.Col space="1">
          <div className="text-3xl font-bold">{snapshot.name}</div>
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
            icon="FaEdit"
            color="indigo"
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
          <Button
            basic
            icon="FaMinus"
            color="yellow"
            onClick={() => {
              snapshots.deleteSnapshotData(id)
            }}
          />
        </Flex.Row>
      </Flex.Row>
      {(expanded && data.length && (
        <div className="w-full p-4" style={{ minHeight: '500px' }}>
          <Line
            options={{
              plugins: {
                actions: {
                  nodes: JSON.parse(JSON.stringify(actions)),
                },
              },
              lineAtIndex: [2, 4, 30],
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              tooltips: {
                callbacks: {
                  beforeTitle: (items, data) => {
                    console.log(items, data)
                    const date = items[0].xLabel
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
                      const value = JSON.parse(item.value)
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
              scales: {
                yAxes: [
                  {
                    ticks: {
                      callback: (val, index) => {
                        if (typeof val === 'number') {
                          return val.toLocaleString('de-DE')
                        } else {
                          return val
                        }
                      },
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
      )) ||
        ''}
    </Flex.Col>
  )
})

export default Snapshot
