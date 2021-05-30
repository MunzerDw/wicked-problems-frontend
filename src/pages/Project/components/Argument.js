import Node from './Node'

function Argument({ ...props }) {
  return (
    <Node
      {...props}
      color={props.data.for ? '#10B981' : '#EF4444'}
      icon={props.data.for ? 'FaCheck' : 'FaTimes'}
    >
      {(data) => (
        <>
          <div>{data?.data?.text}</div>
        </>
      )}
    </Node>
  )
}

export default Argument
