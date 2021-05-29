import Node from './Node'

function Action({ data, ...props }) {
  return (
    <Node {...props} color={'indigo'} icon="FaArrowsAlt">
      <div>{data.text}</div>
    </Node>
  )
}

export default Action
