import Node from './Node'
import Dropdown from 'components/Dropdown'
import Flex from 'components/Flex'
import Icon from 'components/Icon'
import project from 'models/Project'
import nodeEditor from 'models/NodeEditor'

function Idea({ ...props }) {
  return (
    <Node {...props} color={'#F59E0B'} icon="FaLightbulb">
      {(data, setData, onDoubleClick) => {
        const vote = data.data?.vote
        function handleNewVote(newVote) {
          if (!newVote) return
          const oldVote = data.data.votes?.find((vote) => {
            return vote.id === newVote?.id
          })
          if (oldVote) {
            const votesFiltered = data.data.votes?.filter((vote) => {
              return vote.id !== oldVote.id
            })
            setData({
              ...data,
              data: {
                ...data.data,
                vote: newVote,
                votes: [...votesFiltered, newVote],
              },
            })
          } else {
            setData({
              ...data,
              data: {
                ...data.data,
                votes: [...(data.data.votes || []), newVote],
                vote: newVote,
              },
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
              <Flex.Row justify="end" className="w-full h-8" space="1">
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
              <Flex.Row justify="end" className="w-full h-8" space="2">
                <Flex.Row
                  space="1"
                  className={
                    'hover:text-indigo-400 cursor-pointer w-8 ' +
                    (vote?.vote === true && 'text-indigo-400')
                  }
                  onClick={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log(vote?.vote)
                    const newVote = await nodeEditor.vote({
                      nodeId: data.id,
                      vote: vote?.vote === true ? null : true,
                    })
                    handleNewVote(newVote)
                  }}
                >
                  <Icon title="downvote" name="FaChevronUp" />
                  <div>
                    {data.data?.votes?.filter((vote) => {
                      return vote.vote === true
                    }).length || '0'}
                  </div>
                </Flex.Row>
                <Flex.Row
                  space="1"
                  className={
                    'hover:text-red-500 cursor-pointer w-8 ' +
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
                  <div>
                    {data.data?.votes?.filter((vote) => {
                      return vote.vote === false
                    }).length || '0'}
                  </div>
                </Flex.Row>
              </Flex.Row>
            </Flex.Col>
          </>
        )
      }}
    </Node>
  )
}

export default Idea
