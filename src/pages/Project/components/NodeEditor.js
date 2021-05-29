import React from 'react'

function NodeEditor() {
  return (
    <div
      className="fixed top-0 right-0 w-96 h-full flex justify-around bg-white dark:bg-gray-700 shadow-lg dark:border-none text-black overflow-hidden"
      style={{
        zIndex: '110',
      }}
    ></div>
  )
}

export default NodeEditor
