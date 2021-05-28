import CanvasPage from 'components/CanvasPage/CanvasPage'
import React, { useState } from 'react'
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer'
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
  const name = window.location.pathname.split('/')[2]
  const [elements, setElements] = useState(initialElements)
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els))
  const onConnect = (params) => setElements((els) => addEdge(params, els))
  console.log(elements)
  return (
    <CanvasPage>
      <ReactFlow
        elements={elements}
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
