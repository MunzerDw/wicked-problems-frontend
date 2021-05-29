import Node from './Node'

function Constraint({ ...props }) {
  return (
    <Node {...props} color={'yellow'} icon="FaQuestion">
      {(data) => (
        <>
          <div>{data?.text}</div>
        </>
      )}
    </Node>
  )
}

export default Constraint
