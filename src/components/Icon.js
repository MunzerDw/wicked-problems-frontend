import React from 'react'
import * as Icons from 'react-icons/fa'

function Icon({ name, ...props }) {
  const IconComponent = Icons[name]

  if (!IconComponent) {
    // Return a default one
    return <Icons.FaBeer {...props} />
  }

  return <IconComponent {...props} />
}

export default Icon
