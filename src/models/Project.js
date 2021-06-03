import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import nodeEditor from './NodeEditor'

// Model the application state.
class Project {
  project = {}
  nodes = []
  edges = []

  constructor() {
    makeAutoObservable(this)
  }

  getProject() {
    return this.project
  }

  findNode(id) {
    return this.nodes.find((node) => node.id === id)
  }

  getNodes() {
    return this.nodes
  }

  getEdges() {
    return this.edges
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
  editNode(newData, id) {
    const nodeIndex = this.nodes.findIndex((obj) => obj.id === id)
    this.nodes[nodeIndex].data = { ...this.nodes[nodeIndex].data, ...newData }
  }

  // API FUNCTIONS
  async updateNode(body, id) {
    try {
      const response = await axios.put(
        '/nodes/' + (id || nodeEditor.editorNode.id),
        body
      )
      if (response.status === 200) {
        if (nodeEditor.editorNode?.id) {
          nodeEditor.setEditorNode({
            ...nodeEditor.editorNode,
            data: { ...nodeEditor.editorNode.data, ...response.data },
          })
        }
        this.editNode(response.data, id || nodeEditor.editorNode.id)
        return response.data
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }
  async vote(body) {
    try {
      const response = await axios.put('/votes', body)
      if (response.status === 200) {
        if (nodeEditor.editorNode?.id) {
          nodeEditor.setEditorNode({
            ...nodeEditor.editorNode,
            data: { ...nodeEditor.editorNode.data, ...response.data },
          })
        }
        return response.data
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }
  async fetchProject(name) {
    try {
      const response = await axios('/projects/' + name)
      this.setProject(response.data)
      return response.data
    } catch (error) {
      alert(error.message)
    }
  }
  async fetchNodes(id) {
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
  async fetchEdges(id) {
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
    const project = await this.fetchProject(name)
    await this.fetchNodes(project.id)
    await this.fetchEdges(project.id)
  }
}

const project = new Project()

export default project
