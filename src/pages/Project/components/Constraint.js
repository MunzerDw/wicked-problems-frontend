import Node from './Node'

function Constraint({ data, ...props }) {
  return (
    <Node {...props} color={'yellow'} icon="FaQuestion">
      <div>{data.question}</div>
    </Node>
  )
}

export default Constraint
