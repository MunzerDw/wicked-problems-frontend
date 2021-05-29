import Node from './Node'

function Idea({ data, ...props }) {
  return (
    <Node {...props} color={'#F59E0B'} icon="FaLightbulb">
      <div>{data.text}</div>
    </Node>
  )
}

export default Idea
