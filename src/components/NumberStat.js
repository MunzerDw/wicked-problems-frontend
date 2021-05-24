import Flex from './Flex'
import Icon from './Icon'

function Small({ value, text, icon, ...props }) {
  return (
    <Flex.Row justify="between" className="text-gray-500 w-full">
      <Flex.Row space="1">
        <Icon name={icon} />
        <div>{text}</div>
      </Flex.Row>
      <div className="font-bold">{value}</div>
    </Flex.Row>
  )
}

const NumberStat = {
  Small,
}

export default NumberStat
