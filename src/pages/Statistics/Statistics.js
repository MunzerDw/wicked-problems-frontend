import CanvasPage from 'components/CanvasPage/CanvasPage'
import Flex from 'components/Flex'
import NumberStat from 'components/NumberStat'
import project from 'models/Project'
import { Bar } from 'react-chartjs-2'
import { observer } from 'mobx-react'
import Table from 'components/Table'

function calculateStatistics() {
  const nodes = project.nodes
  const edges = project.edges
  console.log(project.logs)
  const date = new Date(project.project.createdAt)
  let result = {}
  result.totalNodes = nodes.length
  result.actionsTaken = nodes.filter((node) => {
    return node.type === 'ACTION' && node.data.done
  }).length
  result.users = 1
  result.created =
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
  const statistics = calculateStatistics()
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
      <Flex.Col space="16">
        <div className="text-4xl font-medium">Statistics</div>
        <Flex.Col>
          <div className="text-2xl">Details</div>
          <div className="grid grid-cols-2 pa-y-2 gap-x-8 flex items-center">
            <div className="opacity-75">Maximum ideas to a question</div>
            <div className="font-bold text-lg">
              {statistics.maxIdeasPerQuestion}
            </div>
            <div className="opacity-75">Minimum ideas to a question</div>
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
          <div
            className="text-white"
            style={{
              minHeight: '350px',
              minWidth: '700px',
            }}
          >
            {/* https://stackoverflow.com/questions/37699485/skip-decimal-points-on-y-axis-in-chartjs */}
            <Bar
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontColor: 'white',
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
                        fontColor: 'white',
                      },
                    },
                  ],
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={barData}
            />
          </div>
        </Flex.Col>
        <Flex.Col>
          <div className="text-2xl">Logs</div>
          <Table>
            <Table.Head className="bg-gray-200 dark:bg-gray-900">
              <Table.Cell>Id</Table.Cell>
              <Table.Cell>User</Table.Cell>
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>Action</Table.Cell>
              <Table.Cell>Node</Table.Cell>
              <Table.Cell>Details</Table.Cell>
            </Table.Head>
            <Table.Body>
              {project.logs.map((log, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>{log.id}</Table.Cell>
                    <Table.Cell>{log.userId}</Table.Cell>
                    <Table.Cell>{log.createdAt}</Table.Cell>
                    <Table.Cell>{log.type}</Table.Cell>
                    <Table.Cell>{log.nodeId}</Table.Cell>
                    <Table.Cell>{JSON.stringify(log.details)}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Flex.Col>
      </Flex.Col>
    </CanvasPage>
  )
})

export default Statistics
