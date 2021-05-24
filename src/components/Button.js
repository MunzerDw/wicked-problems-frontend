import React from 'react'
import Loading from './Loading'
import { useHistory } from 'react-router'
import Icon from './Icon'

function Button({
  className,
  color,
  icon,
  basic,
  iconBtn,
  loading,
  iconSize,
  iconColor,
  form,
  ...props
}) {
  const history = useHistory()
  let style = ''
  if (props.disabled) {
    style += 'bg-secondary-300 cursor-not-allowed'
  } else {
    color = color || 'gray'
    style += basic
      ? `bg-transparent text-${color}-500 border border-${color}-500 hover:text-${color}-600 hover:border-${color}-600`
      : `bg-${color}-500 hover:bg-${color}-600`
  }
  style += ` h-8 relative text-white trans focus:outline-none leading-none flex space-x-2 cursor-pointer
    ${icon ? 'justify-between' : 'justify-center'} 
    ${iconBtn ? 'w-8 p-2 border-none' : 'rounded px-4 py-2'} 
    ${className ? className : ''} `

  const children = (
    <>
      {iconBtn ? (
        <Icon
          className={
            'm-auto ' + (loading ? 'invisible' : 'visible') + ' ' + iconColor
          }
          name={icon}
          size={iconSize || 'lg'}
        />
      ) : (
        <>
          {icon && (
            <div>
              <Icon name={icon} className={loading ? 'invisible' : 'visible'} />
            </div>
          )}
          <div className={'text-h4 ' + (loading ? 'invisible' : 'visible')}>
            {props.children}
          </div>
        </>
      )}
      {loading && <Loading />}
    </>
  )
  if (props.type === 'submit' && !loading) {
    return (
      <input
        type="submit"
        className={style}
        disabled={props.disabled || loading}
        value={props.children}
        form={form}
      />
    )
  } else if (props.href) {
    return (
      <a
        {...props}
        disabled={props.disabled || loading}
        className={style}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (props.href) {
            history.push(props.href)
          } else if (props.onClick) {
            props.onClick(e)
          }
        }}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        {...props}
        disabled={props.disabled || loading}
        className={style}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (props.href) {
            history.push(props.href)
          } else if (props.onClick) {
            props.onClick(e)
          }
        }}
      >
        {children}
      </button>
    )
  }
}

export default Button
