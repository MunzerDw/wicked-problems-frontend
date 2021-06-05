import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import nodeEditor from './NodeEditor'
import socketIOClient from 'socket.io-client'

// Model the application state.
class Project {
  project = {}
  nodes = []
  edges = []
  logs = []
  socket

  constructor() {
    makeAutoObservable(this)
  }

  connectSocket(auth) {
    // Real Time
    this.socket = socketIOClient(process.env.REACT_APP_BACKEND_URL, {
      extraHeaders: {
        authorization: auth,
      },
    })
    this.socket.on('update-node', (id, body) => {
      this.editNode(body, id)
    })
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

  setLogs(logs) {
    this.logs = logs
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
  addEvidence(evidence) {
    const nodeIndex = this.nodes.findIndex((obj) => obj.id === evidence.nodeId)
    this.nodes[nodeIndex].data.evidences = [
      ...(this.nodes[nodeIndex].data.evidences || []),
      evidence,
    ]
  }
  removeEvidence(ids, nodeId) {
    const nodeIndex = this.nodes.findIndex((obj) => obj.id === nodeId)
    this.nodes[nodeIndex].data.evidences = this.nodes[
      nodeIndex
    ].data.evidences.filter((ev) => !ids.includes(ev.id))
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
        const node = this.findNode(body.nodeId)
        const newVote = response.data
        const oldVote = node.data.votes?.find((vote) => {
          return vote.id === newVote?.id
        })
        if (oldVote) {
          const votesFiltered = node.data.votes?.filter((vote) => {
            return vote.id !== oldVote.id
          })
          project.editNode(
            {
              vote: newVote,
              votes: [...votesFiltered, newVote],
            },
            node.id
          )
        } else if (newVote) {
          project.editNode(
            {
              votes: [...(node.data.votes || []), newVote],
              vote: newVote,
            },
            node.id
          )
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
      if (!id) return
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
      if (!id) return
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
  async fetchLogs(id) {
    try {
      if (!id) return
      const response = await axios('/logs?projectId=' + id)
      this.setLogs(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async createEvidence(evidence) {
    try {
      const data = new FormData()
      const keys = Object.keys(evidence)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        data.append(key, evidence[key])
      }
      const response = await axios.post('/evidences', data)
      this.addEvidence(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async deleteEvidences(evidences) {
    try {
      const response = await axios.delete('/evidences', {
        data: { ids: evidences.map((ev) => ev.id) },
      })
      if (response.status === 204) {
        this.removeEvidence(
          evidences.map((ev) => ev.id),
          evidences[0]?.nodeId
        )
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
    await this.fetchLogs(project.id)
  }
}

const project = new Project()

export default project
