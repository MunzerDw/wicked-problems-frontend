import Flex from './Flex'
import Icon from './Icon'
import { useState } from 'react'
import SimpleButton from './SimpleButton'

function InfoPopup({ text, icon, className, onClick, expandDown, ...props }) {
  const [show, setShow] = useState(false)
  return (
    <div
      onMouseOver={() => {
        setShow(true)
      }}
      onMouseOut={() => {
        setShow(false)
      }}
      className="relative"
    >
      {show && (
        <div
          className="absolute max-w-96 p-2 bg-gray-200 dark:bg-gray-700 rounded shadow-lg fadeIn"
          style={{
            [expandDown ? 'top' : 'bottom']: '25px',
            zIndex: '9000',
            minWidth: '200px',
            left: '50%',
            transform: 'translate(-50%)',
          }}
        >
          {props.children}
        </div>
      )}
      <div
        className={
          'cursor-default opacity-75 hover:opacity-100 relative flex items-center ' +
          className
        }
      >
        <SimpleButton
          iconRight={true}
          text={text}
          icon={icon || 'FaExclamationCircle'}
          onClick={onClick}
        />
      </div>
    </div>
  )
}
export default InfoPopup
