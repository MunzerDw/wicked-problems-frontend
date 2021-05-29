import Node from './Node'

function Argument({ data, ...props }) {
  return (
    <Node
      {...props}
      color={data.for ? '#10B981' : '#EF4444'}
      icon={data.for ? 'FaCheck' : 'FaTimes'}
    >
      <div>{data.text}</div>
    </Node>
  )
}

export default Argument
