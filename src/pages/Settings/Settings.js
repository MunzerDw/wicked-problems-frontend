import CanvasPage from 'components/CanvasPage/CanvasPage'
import Toogle from 'components/Toogle'
import { observer } from 'mobx-react'
import projectModel from 'models/Project'
import Flex from 'components/Flex'
import InviteUser from './components/InviteUser'
import Invite from './components/Invite'

function formatDate(date) {
  return (
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' @ ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  )
}

const Settings = observer(() => {
  const project = projectModel.project
  return (
    <CanvasPage className="p-12">
      <div className="text-4xl font-medium mb-16">Settings</div>
      <Flex.Col>
        <div className="grid grid-cols-2 gap-y-6 gap-x-8 flex items-center w-96">
          <div className="opacity-75">Public</div>
          <div className="font-bold text-lg">
            <Toogle
              checked={project.public ? true : false}
              onChange={(value) => {
                projectModel.updateProject({
                  public: value,
                })
              }}
            />
          </div>
          <div className="opacity-75">Created at</div>
          <div className="font-bold text-lg">
            {formatDate(new Date(project.createdAt))}
          </div>
          <div className="opacity-75">Last updated at</div>
          <div className="font-bold text-lg">
            {formatDate(new Date(project.updatedAt))}
          </div>
        </div>
        <div className="text-2xl">Users</div>
        <InviteUser />
        <Flex.Col>
          {project.invites?.map((invite) => {
            return <Invite invite={invite} />
          })}
        </Flex.Col>
      </Flex.Col>
    </CanvasPage>
  )
})

export default Settings
