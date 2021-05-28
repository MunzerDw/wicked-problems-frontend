import ProjectEditor from './../components/ProjectEditor'
import Button from '../../../components/Button'
import { useState } from 'react'

function CreateProject() {
  const [open, setOpen] = useState(false)
  return (
    <ProjectEditor
      open={open}
      setOpen={setOpen}
      trigger={
        <Button basic color="green">
          New project
        </Button>
      }
    />
  )
}

export default CreateProject
