import Node from './Node'

function Idea({ ...props }) {
  return (
    <Node {...props} color={'#F59E0B'} icon="FaLightbulb">
      {(data) => (
        <>
          <div>{data?.text}</div>
        </>
      )}
    </Node>
  )
}

export default Idea
