import CanvasPage from 'components/CanvasPage/CanvasPage'
import Flex from 'components/Flex'
import NumberStat from 'components/NumberStat'
import project from 'models/Project'
import { Bar, Line } from 'react-chartjs-2'
import { observer } from 'mobx-react'
import Table from 'components/Table'
import Badge from 'components/Badge'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import { useDarkMode } from 'hooks/useDarkMode'

function formatDate(date) {
  return (
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' @ ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  )
}

function calculateStatistics() {
  const nodes = project.nodes
  const edges = project.edges
  const date = new Date(project.project.createdAt)
  let result = {}
  result.totalNodes = nodes.length
  result.actionsTaken = nodes.filter((node) => {
    return node.type === 'ACTION' && node.data.doneAt
  }).length
  result.users = (project.project.invites?.length || 0) + 1
  result.created = formatDate(date)
  const ideaNodesIds = nodes
    .filter((node) => node.type === 'IDEA')
    .map((node) => node.id)
  const questionsEdgesToIdeas = nodes
    .filter((node) => node.type === 'QUESTION')
    .map((node) => {
      const edgesFromQuestionToIdeas = edges.filter(
        (edge) => edge.source === node.id && ideaNodesIds.includes(edge.target)
      )
      return edgesFromQuestionToIdeas.length
    })
  result.maxIdeasPerQuestion = Math.max(...questionsEdgesToIdeas)
  result.minIdeasPerQuestion = Math.min(...questionsEdgesToIdeas)
  try {
    result.avgIdeasPerQuestion =
      questionsEdgesToIdeas.reduce((x, y) => x + y, 0) /
      questionsEdgesToIdeas.length
  } catch (error) {
    result.avgIdeasPerQuestion = '-'
  }
  result.nodes = [
    nodes.filter((node) => {
      return node.type === 'QUESTION'
    }).length,
    nodes.filter((node) => {
      return node.type === 'IDEA'
    }).length,
    nodes.filter((node) => {
      return node.type === 'ACTION'
    }).length,
    nodes.filter((node) => {
      return node.type === 'ARGUMENT' && node.data.for
    }).length,
    nodes.filter((node) => {
      return node.type === 'ARGUMENT' && !node.data.for
    }).length,
    nodes.filter((node) => {
      return node.type === 'CONSTRAINT'
    }).length,
  ]
  return result
}

const Statistics = observer(() => {
  const { darkMode } = useDarkMode()
  const statistics = calculateStatistics()
  let logsDates = {}
  project.project.logs?.forEach((log) => {
    // https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
    const dateObj = new Date(log.createdAt)
    const month = dateObj.getUTCMonth() + 1 //months from 1-12
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    const formatedDate = day + '/' + month + '/' + year
    logsDates[formatedDate] = isNaN(logsDates[formatedDate])
      ? 0
      : logsDates[formatedDate] + 1
  })

  const lineData = {
    labels: Object.keys(logsDates).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    ),
    datasets: [
      {
        lineTension: 0.3,
        label: false,
        borderColor: 'rgb(129, 140, 248)',
        borderWidth: 5,
        pointBorderWidth: 1,
        pointRadius: 0,
        data: Object.keys(logsDates)
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
          .map((date) => logsDates[date]),
      },
    ],
  }
  const barData = {
    labels: [
      'Questions',
      'Ideas',
      'Actions',
      'Arguments For',
      'Arguments Against',
      'Constraints',
    ],
    datasets: [
      {
        legend: {
          display: false,
        },
        data: statistics.nodes,
        backgroundColor: [
          'rgb(252, 231, 30, .9)',
          'rgb(245, 158, 11, .9)',
          'rgb(129, 140, 248, .9)',
          'rgb(16, 185, 129, .9)',
          'rgb(239, 68, 68, .9)',
          'rgb(0,0,0, .9)',
        ],
        borderColor: [
          'rgb(252, 231, 30)',
          'rgb(245, 158, 11)',
          'rgb(129, 140, 248)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
          'rgb(0,0,0)',
        ],
        borderWidth: 2,
      },
    ],
  }
  return (
    <CanvasPage className="p-12">
      <div className="text-4xl font-medium mb-16">Statistics</div>
      <div className="grid grid-cols-2 gap-16">
        <Flex.Col>
          <div className="text-2xl">Details</div>
          <div className="grid grid-cols-2 pa-y-2 gap-x-8 flex items-center">
            <div className="opacity-75">
              Average number of ideas to a question
            </div>
            <div className="font-bold text-lg">
              {statistics.avgIdeasPerQuestion}
            </div>
            <div className="opacity-75">
              Maximum number of ideas to a question
            </div>
            <div className="font-bold text-lg">
              {statistics.maxIdeasPerQuestion}
            </div>
            <div className="opacity-75">
              Minimum number of ideas to a question
            </div>
            <div className="font-bold text-lg">
              {statistics.minIdeasPerQuestion}
            </div>
            <div className="opacity-75">Project created at</div>
            <div className="font-bold text-lg">{statistics.created}</div>
          </div>
        </Flex.Col>
        <Flex.Row space="8">
          <NumberStat.Medium
            value={statistics.totalNodes}
            text="nodes"
            icon="FaProjectDiagram"
            className="bg-gradient-to-r from-indigo-300 to-indigo-400 text-white"
          />
          <NumberStat.Medium
            value={statistics.actionsTaken}
            text="actions taken"
            icon="FaArrowsAlt"
            className="bg-gradient-to-r from-green-300 to-green-400 text-white"
          />
          <NumberStat.Medium
            value={statistics.users}
            text="users"
            icon="FaUsers"
            className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-white"
          />
        </Flex.Row>
        <Flex.Col>
          <div className="text-2xl">Nodes</div>
          <div className="w-full" style={{ minHeight: '400px' }}>
            <Bar
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontColor: darkMode ? 'white' : 'black',
                        beginAtZero: true,
                        userCallback: function (label, index, labels) {
                          if (Math.floor(label) === label) {
                            return label
                          }
                        },
                      },
                    },
                  ],
                  xAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        fontColor: darkMode ? 'white' : 'black',
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
                legend: {
                  display: false,
                },
              }}
              data={barData}
            />
          </div>
        </Flex.Col>
        <Flex.Col>
          <div className="text-2xl">Activity</div>
          <div className="w-full" style={{ minHeight: '400px' }}>
            <Line
              options={{
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                  display: false,
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      ticks: {
                        fontColor: darkMode ? 'white' : 'black',
                        maxRotation: 45,
                        minRotation: 45,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
              data={lineData}
            />
          </div>
        </Flex.Col>
        <Flex.Col className="col-span-2" style={{ maxHeight: '500px' }}>
          <div className="text-2xl">Logs</div>
          <Table>
            <Table.Head className="bg-gray-200 dark:bg-gray-900">
              <Table.Cell>User</Table.Cell>
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>Action</Table.Cell>
              <Table.Cell>Node</Table.Cell>
              <Table.Cell>Details</Table.Cell>
            </Table.Head>
            <Table.Body>
              {project.project.logs
                ?.slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((log, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>
                        <FirebaseAuthConsumer>
                          {({ isSignedIn, user, providerId, ...authState }) => {
                            return user.uid === log.userId &&
                              user.uid === project.project.userId
                              ? 'Admin (you)'
                              : user.uid !== log.userId &&
                                log.userId === project.project.userId
                              ? 'Admin'
                              : user.uid === log.userId &&
                                log.userId !== project.project.userId
                              ? 'Collaborator (you)'
                              : 'Collaborator'
                          }}
                        </FirebaseAuthConsumer>
                      </Table.Cell>
                      <Table.Cell>
                        {formatDate(new Date(log.createdAt))}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          color={
                            log.type === 'CREATE'
                              ? 'indigo-400'
                              : log.type === 'UPDATE'
                              ? 'yellow-500'
                              : 'red-500'
                          }
                          text={log.type}
                          className="text-white"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        {log.nodeId ? (
                          <>
                            <span className="font-bold">{log.node.type}</span>
                            <span>
                              {log.node.text ? ': ' + log.node.text : ''}
                            </span>
                          </>
                        ) : (
                          '-'
                        )}
                      </Table.Cell>
                      <Table.Cell>{JSON.stringify(log.details)}</Table.Cell>
                    </Table.Row>
                  )
                })}
            </Table.Body>
          </Table>
        </Flex.Col>
      </div>
    </CanvasPage>
  )
})

export default Statistics
