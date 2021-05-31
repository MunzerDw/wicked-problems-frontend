import Node from './Node'
import Dropdown from 'components/Dropdown'
import Flex from 'components/Flex'
import Icon from 'components/Icon'
import project from 'models/Project'

function Constraint({ ...props }) {
  return (
    <Node {...props} color={''} icon="FaExclamationTriangle">
      {(data, setData, onDoubleClick) => {
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
              <Flex.Row
                justify="end"
                className="w-full h-8"
                space="2"
              ></Flex.Row>
            </Flex.Col>
          </>
        )
      }}
    </Node>
  )
}

export default Constraint
