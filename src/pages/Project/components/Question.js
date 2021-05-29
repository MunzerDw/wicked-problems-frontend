import Node from './Node'

function Question({ data, ...props }) {
  return (
    <Node {...props} color={'#fce71e'} icon="FaQuestion">
      <div>{data.text}</div>
    </Node>
  )
}

export default Question
