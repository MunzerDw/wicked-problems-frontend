import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const Context = createContext()

function Provider(props) {
  // STATE
  const [projects, setProjects] = useState([])
  const [editorProject, setEditorProject] = useState({ name: '' })

  // STATE FUNCTIONS
  function addProject(project) {
    setProjects([...projects, project])
  }
  function removeProject(id) {
    setProjects(projects.filter((project) => project.id !== id))
  }

  // API FUNCTIONS
  async function getProjects() {
    try {
      const response = await axios('/projects')
      setProjects(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async function createProject(project) {
    try {
      const response = await axios.post('/projects', project)
      addProject(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async function deleteProject(id) {
    try {
      const response = await axios.delete('/projects/' + id)
      if (response.status === 204) {
        removeProject(id)
      } else {
        alert(response.status)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  // ONLOAD
  useEffect(() => {
    getProjects()
  }, [])

  // EXPORTS
  const value = {
    projects,
    editorProject,
    setEditorProject,
    createProject,
    deleteProject,
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

const exports = { Context, Provider }

export default exports
