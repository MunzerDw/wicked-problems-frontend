import Icon from 'components/Icon'
import React from 'react'

function NodesBar() {
  const onDragStart = (event, nodeType) => {
    console.log('dragging')
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className="absolute rounded-full flex justify-around bg-white border border-gray-500 dark:border-none text-black"
      style={{
        zIndex: '100',
        bottom: '20px',
        left: '50%',
        transform: 'translate(-50%)',
      }}
    >
      <div
        draggable={true}
        className="flex p-4 dndnode QUESTION cursor-pointer"
        onDragStart={(event) => onDragStart(event, 'QUESTION')}
      >
        <Icon size={30} name={'FaQuestion'} color="yellow" className="m-auto" />
      </div>
      <div
        draggable={true}
        className="flex p-4 dndnode IDEA cursor-pointer"
        onDragStart={(event) => onDragStart(event, 'IDEA')}
      >
        <Icon
          size={30}
          name={'FaLightbulb'}
          color="orange"
          className="m-auto"
        />
      </div>
      <div
        draggable={true}
        className="flex p-4 dndnode ACTION cursor-pointer"
        onDragStart={(event) => onDragStart(event, 'ACTION')}
      >
        <Icon
          size={30}
          name={'FaArrowsAlt'}
          color="indigo"
          className="m-auto"
        />
      </div>
      <div
        draggable={true}
        className="flex p-4 dndnode ARGUMENT cursor-pointer"
        onDragStart={(event) => onDragStart(event, 'ARGUMENT')}
      >
        <Icon size={30} name={'FaCheck'} color="green" className="m-auto" />
      </div>
      <div
        draggable={true}
        className="flex p-4 dndnode ARGUMENT cursor-pointer"
        onDragStart={(event) => onDragStart(event, 'ARGUMENT')}
      >
        <Icon size={30} name={'FaTimes'} color="red" className="m-auto" />
      </div>
    </div>
  )
}

export default NodesBar
