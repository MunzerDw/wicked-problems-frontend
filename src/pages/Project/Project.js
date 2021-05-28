import CanvasPage from 'components/CanvasPage/CanvasPage'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from 'react-flow-renderer'
import { contexts } from 'states'
import NodesBar from './components/NodesBar'
import Question from './components/Question'
import { v4 as uuidv4 } from 'uuid'
// import './dnd.css'

// HELPERS
const nodeTypes = {
  QUESTION: Question,
}

function Project() {
  const urlSafeName = window.location.pathname.split('/')[2]
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const {
    nodes,
    project,
    setNodes,
    createNode,
    deleteNode,
    loadProjectAndNodes,
  } = useContext(contexts.ProjectCtx)
  useEffect(() => {
    loadProjectAndNodes(urlSafeName)
    // eslint-disable-next-line
  }, [])

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance)
  const onElementsRemove = (elementsToRemove) =>
    deleteNode(elementsToRemove.map((element) => element.id))
  const onConnect = (params) => setNodes((els) => addEdge(params, els))
  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }
  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow')
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })
    const newNode = {
      id: uuidv4(),
      type,
      position,
      data: { label: `${type} node` },
    }
    const newNodeFormated = {
      id: newNode.id,
      type: type,
      x: newNode.position.x,
      y: newNode.position.y,
    }
    console.log(newNodeFormated)
    createNode(newNodeFormated)
  }

  console.log(nodes)
  console.log(project)
  return (
    <CanvasPage topBar={<div>{project?.name}</div>}>
      <div className="dndflow w-full h-full">
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper w-full h-full"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodeTypes={nodeTypes}
              elements={nodes}
              onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <Background variant="dots" gap={12} />
              <MiniMap
                maskColor="#1F2937"
                style={{
                  backgroundColor: '#374151',
                  border: 'none',
                }}
                nodeStrokeColor={(n) => {
                  if (n.style?.background) return n.style.background
                  if (n.type === 'input') return '#0041d0'
                  if (n.type === 'output') return '#ff0072'
                  if (n.type === 'default') return '#1a192b'
                  if (n.type === 'QUESTION') return 'orange'

                  return '#eee'
                }}
                nodeColor={(n) => {
                  if (n.style?.background) return n.style.background

                  return 'transparent'
                }}
                nodeBorderRadius={2}
              />
              <Controls />
            </ReactFlow>
          </div>
          <NodesBar />
        </ReactFlowProvider>
      </div>
    </CanvasPage>
  )
}

export default Project
