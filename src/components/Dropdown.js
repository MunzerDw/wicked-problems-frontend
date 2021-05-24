import React, { useState } from 'react'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Dropdown({ placeholder, data, className, label }) {
  const [active, setActive] = useState(false)

  document.addEventListener(
    'click',
    function (event) {
      if (!event.target.matches('[class*="dropdownAction"]')) {
        active && setActive(false)
      }
    },
    false
  )
  return (
    <div className={'flex flex-col ' + className}>
      <label className="block text-h5">{label}</label>
      <div className="relative">
        <button
          className={
            'dropdownAction w-full focus:outline-none inputParent trans flex justify-between items-center space-x-2 p-3 cursor-pointer '
          }
          onClick={() => setActive(!active)}
        >
          <div className="dropdownAction cursor-pointer">{placeholder}</div>
          <div className="dropdownAction inline-flex items-center px-3 cursor-pointer ">
            <FontAwesomeIcon
              className="pointer-events-none"
              icon={active ? faAngleUp : faAngleDown}
            />
          </div>
        </button>
        <div
          className={
            'dropdownAction absolute max-h-32 w-full mt-1 overflow-auto flex flex-col shadow trans rounded origin-bottom-left z-40 bg-white ' +
            (active
              ? 'opacity-100 scale-100 visible'
              : 'opacity-0 scale-75 hidden')
          }
        >
          {data.map((item, i) => {
            return (
              <Item
                key={i}
                onClick={() => {
                  item.onClick()
                  setActive(false)
                }}
              >
                {item.key}
              </Item>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Item({ ...props }) {
  return (
    <div
      className={
        'dropdownAction text-h5 cursor-pointer trans px-3 py-2 hover:bg-secondary-100 '
      }
      {...props}
    >
      {props.children}
    </div>
  )
}
