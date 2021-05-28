import { createContext, useState } from 'react'
import axios from 'axios'

const Context = createContext()

function Provider(props) {
  // STATE
  const [project, setProject] = useState()
  const [nodes, setNodes] = useState([])

  // STATE FUNCTIONS
  function addNode(node) {
    setNodes([...nodes, node])
  }
  function removeNode(id) {
    setNodes(nodes.filter((node) => node.id !== id))
  }

  // API FUNCTIONS
  async function getProject(name) {
    try {
      const response = await axios('/projects/' + name)
      setProject(response.data)
      return response.data
    } catch (error) {
      alert(error.message)
    }
  }
  async function getNodes(id) {
    try {
      const response = await axios('/nodes?projectId=' + id)
      setNodes(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async function createNode(node) {
    try {
      const response = await axios.post('/nodes', {
        ...node,
        projectId: project.id,
      })
      addNode(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async function deleteNode(id) {
    try {
      const response = await axios.delete('/nodes/' + id)
      if (response.status === 204) {
        removeNode(id)
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  // ONLOAD
  async function loadProjectAndNodes(name) {
    const project = await getProject(name)
    await getNodes(project.id)
  }

  // EXPORTS
  const value = {
    project,
    setProject,
    nodes,
    setNodes,
    getProject,
    getNodes,
    createNode,
    deleteNode,
    loadProjectAndNodes,
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

const exports = { Context, Provider }

export default exports
