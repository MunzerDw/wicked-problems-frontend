import Node from './Node'

function Question({ ...props }) {
  return (
    <Node {...props} color={'#fce71e'} icon="FaQuestion">
      {(data) => {
        return (
          <>
            <div>{data?.data?.text}</div>
          </>
        )
      }}
    </Node>
  )
}

export default Question
