function Col({ space, align, justify, className, children }) {
  return (
    <div
      className={`flex flex-col items-${align || 'start'} justify-${
        justify || 'start'
      } space-y-${space || '6'} ${className}`}
    >
      {children}
    </div>
  )
}

function Row({ space, align, justify, className, children }) {
  return (
    <div
      className={`flex items-${align || 'center'} justify-${
        justify || 'start'
      } space-x-${space || '6'} ${className}`}
    >
      {children}
    </div>
  )
}

const Flex = { Row: Row, Col: Col }

export default Flex
