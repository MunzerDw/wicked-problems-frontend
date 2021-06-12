import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import project from './Project'

// Model the application state.
class Snapshots {
  snapshots = []

  constructor() {
    makeAutoObservable(this)
  }

  getDatGroups() {
    return this.snapshots
  }

  setSnapshots(snapshots) {
    this.snapshots = snapshots
  }

  findSnapshot(id) {
    return this.snapshots.find((snapshot) => snapshot.id === id)
  }

  // STATE FUNCTIONS
  addSnapshot(snapshot) {
    this.snapshots = [...this.snapshots, snapshot]
  }
  editSnapshot(newData, id) {
    const snapshotIndex = this.snapshots.findIndex((obj) => obj.id === id)
    for (let i = 0; i < Object.keys(newData).length; i++) {
      const key = Object.keys(newData)[i]
      this.snapshots[snapshotIndex][key] = newData[key]
    }
  }
  removeSnapshot(id) {
    this.setSnapshots(this.snapshots.filter((snapshot) => id !== snapshot.id))
  }

  // API FUNCTIONS
  async fetchSnapshots(name) {
    try {
      if (!name) return
      const response = await axios('/snapshots?urlSafeName=' + name)
      this.setSnapshots(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async createSnapshot(snapshot) {
    try {
      const response = await axios.post('/snapshots', {
        ...snapshot,
        projectId: project.project?.id,
      })
      this.addSnapshot(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async deleteSnapshot(id) {
    try {
      const response = await axios.delete('/snapshots/' + id)
      if (response.status === 204) {
        this.removeSnapshot(id)
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }
  async updateSnapshot(body, id) {
    try {
      const response = await axios.put('/snapshots/' + id, body)
      if (response.status === 200) {
        this.editSnapshot(response.data, id)
        return response.data
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  // ONLOAD
  async loadSnapshots(name) {
    await this.fetchSnapshots(name)
  }
}

const snapshots = new Snapshots()

export default snapshots
