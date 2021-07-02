import Flex from 'components/Flex'
import Icon from './Icon'

function SimpleButton({ text, icon, onClick, className, iconRight, ...props }) {
  return (
    <Flex.Row
      onClick={onClick}
      space="1"
      className={'cursor-pointer opacity-75 hover:opacity-100 ' + className}
    >
      {icon && !iconRight && <Icon size={12} name={icon} />}
      <div>{text}</div>
      {icon && iconRight && <Icon size={12} name={icon} />}
    </Flex.Row>
  )
}

export default SimpleButton
