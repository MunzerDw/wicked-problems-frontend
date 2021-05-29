import { makeAutoObservable } from 'mobx'
import axios from 'axios'

// Model the application state.
class Project {
  project = {}
  nodes = []
  edges = []

  constructor() {
    makeAutoObservable(this)
  }

  setProject(project) {
    this.project = project
  }

  setNodes(nodes) {
    this.nodes = nodes
  }

  setEdges(edges) {
    this.edges = edges
  }

  // STATE FUNCTIONS
  addNode(node) {
    this.setNodes([
      ...this.nodes,
      {
        id: node.id,
        position: {
          x: node.x,
          y: node.y,
        },
        data: { ...node, label: '' },
        type: node.type,
      },
    ])
  }
  removeNodes(ids) {
    this.setNodes(this.nodes.filter((node) => !ids.includes(node.id)))
  }
  // editNode(id, body) {
  //   this.setNodes(
  //     this.nodes.map((node) => (node.id !== id ? node : { ...node, ...body }))
  //   )
  // }
  addEdge(edge) {
    this.setEdges([
      ...this.edges,
      {
        id: edge.id,
        source: edge.source,
        target: edge.target,
      },
    ])
  }
  removeEdges(ids) {
    this.setEdges(this.edges.filter((edge) => !ids.includes(edge.id)))
  }

  // API FUNCTIONS
  async getProject(name) {
    try {
      const response = await axios('/projects/' + name)
      this.setProject(response.data)
      return response.data
    } catch (error) {
      alert(error.message)
    }
  }
  async getNodes(id) {
    try {
      const response = await axios('/nodes?projectId=' + id)
      this.setNodes(
        response.data.map((node) => ({
          id: node.id,
          position: {
            x: node.x,
            y: node.y,
          },
          data: { ...node, label: '' },
          type: node.type,
        }))
      )
    } catch (error) {
      alert(error.message)
    }
  }
  async createNode(node) {
    try {
      const response = await axios.post('/nodes', {
        ...node,
        projectId: this.project.id,
      })
      this.addNode(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async deleteNodes(ids) {
    try {
      const response = await axios.delete('/nodes', { data: { ids: ids } })
      if (response.status === 204) {
        this.removeNodes(ids)
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }
  async getEdges(id) {
    try {
      const response = await axios('/edges?projectId=' + id)
      this.setEdges(
        response.data.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        }))
      )
    } catch (error) {
      alert(error.message)
    }
  }
  async createEdge(edge) {
    try {
      const response = await axios.post('/edges', {
        ...edge,
        projectId: this.project.id,
      })
      this.addEdge(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async deleteEdges(ids) {
    try {
      const response = await axios.delete('/edges', { data: { ids: ids } })
      if (response.status === 204) {
        this.removeEdges(ids)
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  // ONLOAD
  async loadProjectAndNodes(name) {
    const project = await this.getProject(name)
    await this.getNodes(project.id)
    await this.getEdges(project.id)
  }
}

const project = new Project()

export default project
