import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import Flex from 'components/Flex'
import Icon from 'components/Icon'
import nodeEditor from 'models/NodeEditor'
import project from 'models/Project'
import Node from './Node'

function Action({ ...props }) {
  return (
    <Node {...props} color={'#818CF8'} icon="FaArrowsAlt">
      {(data, setData, onDoubleClick) => {
        const upvotes = data.data?.votes?.filter((vote) => {
          return vote.vote === true
        }).length
        const downvotes = data.data?.votes?.filter((vote) => {
          return vote.vote === false
        }).length
        const vote = data.data?.votes?.find((vote) => {
          return vote.userId === data.data.userId
        })
        console.log(vote)
        function handleNewVote(newVote) {
          const oldVote = data.data.votes?.find((vote) => {
            return vote.id === newVote.id
          })
          if (oldVote) {
            const votesFiltered = data.data.votes?.filter((vote) => {
              return vote.id !== oldVote.id
            })
            setData({
              ...data,
              data: { ...data.data, votes: [...votesFiltered, newVote] },
            })
          } else {
            setData({
              ...data,
              data: { ...data.data, votes: [...data.data.votes, newVote] },
            })
          }
        }

        return (
          <>
            <Flex.Col
              justify="between"
              space="1"
              className="w-full p-1 pl-0"
              style={{
                minHeight: '120px',
              }}
            >
              <Flex.Row justify="end" className="w-full" space="1">
                <Button
                  title="Action has been taken?"
                  icon="FaBullseye"
                  iconColor={data.data?.done ? 'red' : 'gray'}
                  onClick={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const newData = await nodeEditor.updateEditorNode(
                      {
                        done: !data.data?.done,
                      },
                      data.id
                    )
                    setData({ ...data, data: { ...data.data, ...newData } })
                  }}
                />
                <Dropdown
                  trigger={
                    <Icon name="FaEllipsisV" className="cursor-pointer" />
                  }
                  actions={[
                    {
                      key: (
                        <Flex.Row>
                          <Icon name="FaEdit" />
                          <div>edit</div>
                        </Flex.Row>
                      ),
                      action: () => {
                        onDoubleClick()
                      },
                    },
                    {
                      key: (
                        <Flex.Row>
                          <Icon name="FaTrashAlt" />
                          <div>delete</div>
                        </Flex.Row>
                      ),
                      action: () => {
                        project.deleteNodes([data.id])
                      },
                    },
                  ]}
                />
              </Flex.Row>
              {data?.data?.text ? (
                <div>{data?.data?.text}</div>
              ) : (
                <div className="opacity-50">
                  {'Double click to edit the node'}
                </div>
              )}
              <Flex.Row justify="end" className="w-full" space="2">
                <Flex.Row
                  space="1"
                  className={
                    'hover:text-indigo-400 cursor-pointer h-8 w-8 ' +
                    (vote?.vote === true && 'text-indigo-400')
                  }
                  onClick={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const newVote = await nodeEditor.vote({
                      nodeId: data.id,
                      vote: vote?.vote === true ? null : true,
                    })
                    handleNewVote(newVote)
                  }}
                >
                  <Icon title="downvote" name="FaChevronUp" />
                  <div>{upvotes}</div>
                </Flex.Row>
                <Flex.Row
                  space="1"
                  className={
                    'hover:text-red-500 cursor-pointer h-8 w-8 ' +
                    (vote?.vote === false && 'text-red-500')
                  }
                  onClick={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const newVote = await nodeEditor.vote({
                      nodeId: data.id,
                      vote: vote?.vote === false ? null : false,
                    })
                    handleNewVote(newVote)
                  }}
                >
                  <Icon title="downvote" name="FaChevronDown" />
                  <div>{downvotes}</div>
                </Flex.Row>
              </Flex.Row>
            </Flex.Col>
          </>
        )
      }}
    </Node>
  )
}

export default Action
