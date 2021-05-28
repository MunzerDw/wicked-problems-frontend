import CanvasPage from 'components/CanvasPage/CanvasPage'
import React, { useContext, useEffect, useState } from 'react'
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer'
import { contexts } from 'states'
import Question from './components/Question'
import initialElements from './mockElements'

// HELPERS
const nodeTypes = {
  question: Question,
}

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance)
  reactFlowInstance.fitView()
}

function Project() {
  const urlSafeName = window.location.pathname.split('/')[2]
  const { nodes, project, setNodes, loadProjectAndNodes } = useContext(
    contexts.ProjectCtx
  )
  console.log(urlSafeName, window.location.pathname.split('/'))
  useEffect(() => {
    loadProjectAndNodes(urlSafeName)
  }, [])
  const onElementsRemove = (elementsToRemove) =>
    setNodes((els) => removeElements(elementsToRemove, els))
  const onConnect = (params) => setNodes((els) => addEdge(params, els))
  console.log(nodes)
  console.log(project)
  return (
    <CanvasPage topBar={<div>{project?.name}</div>}>
      <ReactFlow
        elements={nodes}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        snapToGrid={false}
        snapGrid={[15, 15]}
        nodeTypes={nodeTypes}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background
            if (n.type === 'input') return '#0041d0'
            if (n.type === 'output') return '#ff0072'
            if (n.type === 'default') return '#1a192b'
            if (n.type === 'question') return 'orange'

            return '#eee'
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background

            return '#fff'
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </CanvasPage>
  )
}

export default Project
