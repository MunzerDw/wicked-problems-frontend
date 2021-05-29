import Node from './Node'

function Idea({ data, ...props }) {
  return (
    <Node {...props} color={'orange'} icon="FaLightbulb">
      <div>{data.text}</div>
    </Node>
  )
}

export default Idea
