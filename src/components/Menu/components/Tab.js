import { Link } from 'react-router-dom'

function Tab({ text, icon, to, ...props }) {
  return (
    <div className="">
      <Link to={to}>{text}</Link>
    </div>
  )
}
export default Tab
