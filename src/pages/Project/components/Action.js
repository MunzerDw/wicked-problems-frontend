import Node from './Node'

function Action({ ...props }) {
  return (
    <Node {...props} color={'#818CF8'} icon="FaArrowsAlt">
      {(data) => (
        <>
          <div>{data?.data?.text}</div>
        </>
      )}
    </Node>
  )
}

export default Action
