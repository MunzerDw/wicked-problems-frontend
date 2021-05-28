import React, { useState } from 'react'
import {
  faTimes,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SelectMultiple({
  label,
  className,
  data,
  selectedItems,
  setSelectedItems,
  placeholder,
  flowRight,
}) {
  const [active, setActive] = useState(false)

  document.addEventListener(
    'click',
    function (event) {
      if (!event.target.matches('[class*="selectMultiple"]')) {
        active && setActive(false)
      }
    },
    false
  )
  return (
    <div
      className={'flex flex-col space-y-2 justify-between w-full ' + className}
    >
      <label className="text-h5">{label}</label>
      <div className="relative border border-secondary-200 rounded">
        <button
          className={
            'selectMultiple w-full focus:outline-none trans flex justify-between items-center space-x-1 px-3 p-2 ' +
            (!selectedItems.length && 'cursor-pointer')
          }
          onClick={() => setActive(!active)}
        >
          <div className="flex space-x-1 truncate">
            {selectedItems.length ? (
              selectedItems.map((item, i) => (
                <Selected
                  key={i}
                  item={item}
                  onDelete={(e) => {
                    e.stopPropagation()
                    setSelectedItems(
                      selectedItems.filter((x) => x.value !== item.value)
                    )
                  }}
                />
              ))
            ) : (
              <div className="selectMultiple cursor-pointer">
                {placeholder || 'Select'}
              </div>
            )}
          </div>
          <div className="selectMultiple inline-flex items-center px-3 cursor-pointer ">
            <FontAwesomeIcon
              className="pointer-events-none"
              icon={active ? faAngleUp : faAngleDown}
            />
          </div>
        </button>
        <div
          className={
            'selectMultiple absolute max-h-64 w-64 mt-1 overflow-auto flex flex-col shadow trans rounded origin-bottom-left z-40 bg-white ' +
            (active
              ? 'opacity-100 scale-100 visible'
              : 'opacity-0 scale-75 hidden') +
            ' ' +
            (flowRight ? 'left-0' : 'right-0')
          }
        >
          {data.map((item, i) => {
            const selected = selectedItems.find((x) => x.value === item.value)
            return (
              <Item
                key={i}
                onClick={() => {
                  !selected
                    ? setSelectedItems([...selectedItems, item])
                    : setSelectedItems(
                        selectedItems.filter((x) => x.value !== item.value)
                      )
                }}
                selected={selected}
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

function Item({ selected, ...props }) {
  return (
    <div
      className={
        'selectMultiple text-h5 cursor-pointer trans px-3 py-2 hover:bg-secondary-100 ' +
        (!selected && 'opacity-50 bg-secondary-50')
      }
      {...props}
    >
      {props.children}
    </div>
  )
}

function Selected({ item, onDelete }) {
  return (
    <div className="flex space-x-2 whitespace-nowrap bg-gray-500 px-1 rounded text-h5">
      {item.key}
      <div className="inline-flex items-center px-3 cursor-pointer ">
        <FontAwesomeIcon icon={faTimes} onClick={onDelete} />
      </div>
    </div>
  )
}