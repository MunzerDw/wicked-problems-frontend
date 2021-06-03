import CanvasPage from 'components/CanvasPage/CanvasPage'
import Flex from 'components/Flex'
import NumberStat from 'components/NumberStat'
import project from 'models/Project'
import { Bar } from 'react-chartjs-2'
import { observer } from 'mobx-react'

function calculateStatistics() {
  const nodes = project.nodes
  const edges = project.edges
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
  console.log(statistics)
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
          'rgb(252, 231, 30, .4)',
          'rgb(245, 158, 11, .4)',
          'rgb(129, 140, 248, .4)',
          'rgb(16, 185, 129, .4)',
          'rgb(239, 68, 68, .4)',
          'rgb(0,0,0, .4)',
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
            className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
          />
          <NumberStat.Medium
            value={statistics.actionsTaken}
            text="actions taken"
            icon="FaArrowsAlt"
            className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
          />
          <NumberStat.Medium
            value={statistics.users}
            text="users"
            icon="FaUsers"
            className="bg-gradient-to-r from-green-300 to-blue-400 text-white"
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
      </Flex.Col>
    </CanvasPage>
  )
})

export default Statistics
