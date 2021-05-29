import Node from './Node'

function Argument({ data, ...props }) {
  return (
    <Node
      {...props}
      color={data.for ? 'green' : 'red'}
      icon={data.for ? 'FaCheck' : 'FaTimes'}
    >
      <div>{data.text}</div>
    </Node>
  )
}

export default Argument
