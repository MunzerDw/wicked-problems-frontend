import Flex from 'components/Flex'
import Button from 'components/Button'
import project from 'models/Project'

function Invite({ invite }) {
  return (
    <Flex.Row className="p-2 rounded bg-gray-200 dark:bg-gray-900">
      <div>{invite.email}</div>
      <Button
        icon="FaUserSlash"
        color="red"
        basic
        onClick={() => {
          project.deleteInvite(invite.id)
        }}
      >
        Kick
      </Button>
    </Flex.Row>
  )
}

export default Invite
