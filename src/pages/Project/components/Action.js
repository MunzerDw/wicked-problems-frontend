import Node from './Node'

function Action({ data, ...props }) {
  return (
    <Node {...props} color={'#818CF8'} icon="FaArrowsAlt">
      <div>{data.text}</div>
    </Node>
  )
}

export default Action
