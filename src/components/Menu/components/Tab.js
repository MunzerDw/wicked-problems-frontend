import Flex from 'components/Flex'
import Icon from 'components/Icon'
import { Link } from 'react-router-dom'

function Tab({ text, icon, to, ...props }) {
  const selected = window.location.pathname === to

  return (
    <div
      className={
        'trans ' + (selected ? 'opacity-100' : 'opacity-50 hover:opacity-80')
      }
    >
      <Link to={to}>
        <Flex.Row>
          <Icon name={icon} />
          <div>{text}</div>
        </Flex.Row>
      </Link>
    </div>
  )
}
export default Tab
