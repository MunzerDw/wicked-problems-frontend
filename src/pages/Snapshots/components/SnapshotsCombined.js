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
import SelectMultiple from 'components/SelectMultiple'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Icon from 'components/Icon'

function formatDate(date) {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}
function getColor(i) {
  const blueShades = [
    '#5F9EA0',
    '#4682B4',
    '#B0C4DE',
    '#ADD8E6',
    '#87CEFA',
    '#6495ED',
    '#00BFFF',
    '#1E90FF',
    '#4169E1',
    '#0000FF',
    '#00008B',
  ]
  return blueShades[i % blueShades.length]
}
// https://renatello.com/javascript-array-of-years/
function generateArrayOfYears() {
  var max = new Date().getFullYear()
  var min = 1970
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  return years
}

const years = generateArrayOfYears()
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const SnapshotsCombined = observer(() => {
  const { darkMode } = useDarkMode()
  const [expanded, setExpanded] = useState(true)
  const actions = project
    .getNodes()
    ?.filter((node) => node.data.type === 'ACTION' && node.data.doneAt)
  const datesUnfiltered = snapshots.dates
  const minDate = new Date(datesUnfiltered[0])
  const maxDate = new Date(datesUnfiltered[datesUnfiltered.length - 1])
  const [startDate, setStartDate] = useState(minDate)
  const [endDate, setEndDate] = useState(maxDate)
  const dates = snapshots.dates?.filter((date) => {
    if (startDate) {
      if (startDate.getTime() > new Date(date).getTime()) {
        return false
      }
    }
    if (endDate) {
      if (endDate.getTime() < new Date(date).getTime()) {
        return false
      }
    }
    return true
  })
  const lineData = {
    labels: dates?.map((date) => formatDate(new Date(date))),
    datasets: [
      {
        label: 'bar',
        label: 'Actions',
        borderColor: '#e23fa9',
        backgroundColor: '#e23fa9',
        borderWidth: 2,
        pointBorderWidth: 4,
        pointRadius: 4,
        data: dates?.map((d) => {
          const actionExists = actions.find(
            (action) =>
              formatDate(new Date(action.data.doneAt)) ===
              formatDate(new Date(d))
          )
          return actionExists ? 100 : null
        }),
      },
      ...snapshots.filteredSnapshots.map((ss, i) => {
        const values = ss.data.map((d) => d.value)
        const maxValue = Math.max(...values)
        let dataObject = {}
        ss.data.forEach((d) => {
          dataObject[formatDate(new Date(d.date))] = d.value
        })
        return {
          label: ss.name,
          lineTension: 0.3,
          borderColor: getColor(i),
          borderWidth: 2,
          pointBorderWidth: 1,
          pointRadius: 1,
          spanGaps: true,
          data: dates?.map((date) => {
            const value = dataObject[formatDate(new Date(date))]
            if (value) {
              return (value * 100) / maxValue
            }
            return
          }),
        }
      }),
    ],
  }
  console.log(lineData)
  console.log(snapshots.filteredSnapshots)
  return (
    <Flex.Col className="w-full rounded bg-gray-200 dark:bg-gray-900 shadow-md trans hover:shadow-lg">
      <Flex.Row justify="between" className="w-full p-4">
        <Flex.Row>
          <div
            className="text-3xl cursor-default hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            Snapshots combined
          </div>
          <DatePicker
            renderCustomHeader={({
              customHeaderCount,
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {'<'}
                </button>
                <select
                  value={
                    (date.getMonth() + customHeaderCount) % months.length === 0
                      ? date.getFullYear() + customHeaderCount
                      : date.getFullYear()
                  }
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={
                    months[
                      (date.getMonth() + customHeaderCount) % months.length
                    ]
                  }
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {'>'}
                </button>
              </div>
            )}
            monthsShown={2}
            selected={startDate}
            onChange={(dates, e) => {
              e.stopPropagation()
              e.preventDefault()
              const [start, end] = dates
              setStartDate(start)
              setEndDate(end)
            }}
            customInput={
              <Flex.Row
                space="1"
                className="rounded p-2 py-1 dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 hover:bg-white shadow-md cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <div>Date range</div>
                <Icon name="FaCalendarAlt" />
                {startDate && (
                  <div>
                    from <b>{formatDate(startDate)}</b>
                  </div>
                )}
                {endDate && (
                  <div>
                    to <b>{formatDate(endDate)}</b>
                  </div>
                )}
              </Flex.Row>
            }
            startDate={startDate}
            endDate={endDate}
            selectsRange
          />
        </Flex.Row>
        <Flex.Row space="2">
          <SelectMultiple
            label="filter snapshots"
            data={snapshots.snapshots.map((s) => ({
              key: s.name,
              value: s,
            }))}
            selectedItems={snapshots.filteredSnapshots.map((s) => ({
              key: s.name,
              value: s,
            }))}
            setSelectedItems={(data) =>
              snapshots.setFilteredSnapshots(data.map((d) => d.value))
            }
          />
        </Flex.Row>
      </Flex.Row>
      {expanded && (
        <div className="w-full p-4" style={{ minHeight: '500px' }}>
          <Line
            options={{
              plugins: {
                actions: {
                  nodes: JSON.parse(JSON.stringify(actions)),
                  maxValue: 100,
                },
              },
              legend: {
                display: true,
                labels: {
                  fontColor: darkMode ? 'white' : 'black',
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              tooltips: {
                callbacks: {
                  beforeTitle: (items, data) => {
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
                      if (item['datasetIndex'] === 0) return null
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
                          return val.toLocaleString('de-DE') + ' %'
                        } else {
                          return val + ' %'
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
      )}
    </Flex.Col>
  )
})

export default SnapshotsCombined
